"use client";
import React, { useState, useContext, useEffect } from "react";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../FirebaseConfig";
import { useAuth } from "../context/AuthContext";

type Job = {
  id: string;
  title: string;
  type: string;
  shortDesc: string;
  description: string;
  requirements: string[];
};

export default function OpenPositions() {
  const { user } = useAuth();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    coverLetter: "",
    resume: null as File | null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch jobs from Firestore ("jobs" collection)
  useEffect(() => {
    const fetchJobs = async () => {
      const snap = await getDocs(collection(db, "jobs"));
      setJobs(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Job, "id">),
        }))
      );
    };
    fetchJobs();
  }, []);

  // Open modal for job details
  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setShowForm(false);
    setSuccess("");
    setError("");
  };

  // Open application form
  const handleApplyClick = () => {
    setShowForm(true);
    setSuccess("");
    setError("");
  };

  // Close modal
  const handleClose = () => {
    setSelectedJob(null);
    setShowForm(false);
    setForm({
      coverLetter: "",
      resume: null,
    });
    setSuccess("");
    setError("");
  };

  // Form input handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, resume: e.target.files?.[0] ?? null });
  };

  // Handle application submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess("");
    setError("");

    if (!user) {
      setError("You must be logged in to apply.");
      setSubmitting(false);
      return;
    }
    if (!form.resume) {
      setError("Please upload your resume.");
      setSubmitting(false);
      return;
    }

    try {
      // Upload resume to Firebase Storage
      const fileRef = storageRef(
        storage,
        `appliedApplications/resumes/${selectedJob!.id}_${user.uid}_${Date.now()}_${form.resume.name}`
      );
      await uploadBytes(fileRef, form.resume);
      const resumeUrl = await getDownloadURL(fileRef);

      // Store application in Firestore under 'appliedApplications'
      await addDoc(collection(db, "appliedApplications"), {
        jobId: selectedJob!.id,
        jobTitle: selectedJob!.title,
        userId: user.uid,
        userName: user.displayName || "",
        userEmail: user.email || "",
        coverLetter: form.coverLetter,
        resumeUrl,
        resumeName: form.resume.name,
        appliedAt: serverTimestamp(),
      });

      setSuccess("Your application has been submitted! Thank you.");
      setSubmitting(false);
      setForm({ coverLetter: "", resume: null });
      setShowForm(false);
      setSelectedJob(null);
    } catch (err) {
      setError("Failed to submit application. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <div
            key={job.id}
            className=" bg-[#14223c] rounded-2xl p-7 border-2 border-cyan-800 shadow-lg flex flex-col items-start hover:scale-[1.03] transition cursor-pointer min-h-[220px]"
            onClick={() => handleJobClick(job)}
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-2">{job.title}</h3>
            <span className="bg-cyan-900 text-cyan-300 px-3 py-1.5 rounded-full text-xs font-semibold mb-3">
              {job.type}
            </span>
            <p className="mb-4 text-gray-200">{job.shortDesc}</p>
            <button
              className="mt-auto text-cyan-300 underline font-semibold hover:text-cyan-400 transition"
              onClick={(e) => {
                e.stopPropagation();
                handleJobClick(job);
              }}
            >
              View More & Apply
            </button>
          </div>
        ))}
      </div>

      {/* Modal for job details and apply form */}
      {(selectedJob || success || error) && (
        <div className="fixed z-50 inset-0 bg-black/70 flex items-center justify-center px-3">
          <div className="bg-[#14223c] rounded-2xl shadow-2xl border-2 border-cyan-700 max-w-md w-full relative p-8 animate-fade-in">
            <button
              className="absolute top-3 right-4 text-2xl text-cyan-300 hover:text-cyan-500"
              onClick={handleClose}
              aria-label="Close"
            >
              &times;
            </button>
            {selectedJob && !showForm && (
              <div>
                <h3 className="text-2xl font-bold mb-1 text-cyan-400">{selectedJob.title}</h3>
                <span className="bg-cyan-900 text-cyan-300 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 inline-block">
                  {selectedJob.type}
                </span>
                <p className="mb-3 text-gray-200">{selectedJob.description}</p>
                <h4 className="font-semibold text-cyan-300 mb-2">Requirements:</h4>
                <ul className="pl-5 list-disc text-gray-300 text-sm mb-4">
                  {selectedJob.requirements.map((req) => (
                    <li key={req}>{req}</li>
                  ))}
                </ul>
                {user ? (
                  <button
                    className="w-full py-2 rounded-lg font-semibold bg-cyan-600 hover:bg-cyan-700 transition text-white shadow"
                    onClick={handleApplyClick}
                  >
                    Apply Now
                  </button>
                ) : (
                  <div className="text-sm text-cyan-300 font-semibold">Log in to apply</div>
                )}
              </div>
            )}

            {selectedJob && showForm && (
              <form onSubmit={handleSubmit} className="space-y-4 mt-2" encType="multipart/form-data">
                <h3 className="text-xl font-bold mb-2 text-cyan-400">Apply for {selectedJob.title}</h3>
                <div>
                  <label className="block mb-1 font-medium">Name</label>
                  <input
                    type="text"
                    value={user?.displayName || ""}
                    disabled
                    className="w-full px-4 py-2 rounded-lg bg-[#101828] border border-cyan-700 text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full px-4 py-2 rounded-lg bg-[#101828] border border-cyan-700 text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Cover Letter</label>
                  <textarea
                    name="coverLetter"
                    value={form.coverLetter}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg bg-[#101828] border border-cyan-700 text-white"
                    placeholder="Why are you a great fit for this role?"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Resume (PDF, DOC, DOCX)</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                    className="w-full text-white bg-[#101828] border border-cyan-700 rounded-lg py-2"
                  />
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <button
                  type="submit"
                  className="w-full py-2 mt-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            )}

            {success && (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="text-green-400 text-lg font-bold mb-3">✓ Application Submitted</div>
                <div className="text-gray-200 mb-2 text-center">{success}</div>
                <button
                  onClick={handleClose}
                  className="mt-2 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-full text-white font-semibold"
                >
                  Close
                </button>
              </div>
            )}
          </div>
          <style jsx>{`
            .animate-fade-in {
              animation: fadeIn 0.22s;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.97);}
              to { opacity: 1; transform: scale(1);}
            }
          `}</style>
        </div>
      )}
    </div>
  );
}