"use client";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { db } from "../../../FirebaseConfig";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

// --- Utility: Format Firestore Timestamp or string to readable date
function formatDate(dateInput: any) {
  if (!dateInput) return "";
  if (typeof dateInput === "string") return dateInput;
  if (typeof dateInput === "object" && typeof dateInput.seconds === "number") {
    const date = new Date(dateInput.seconds * 1000);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  }
  if (dateInput instanceof Date) {
    return dateInput.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  }
  return String(dateInput);
}

// --- Ads Component (Dummy placeholder, replace with actual ad script for prod)
function AdComponent({
  dataAdFormat,
  dataFullWidthResponsive,
  className = "",
}: {
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full h-32 bg-gradient-to-r from-cyan-800 to-cyan-500 rounded-xl flex items-center justify-center shadow border border-gray-800 ${className}`}
      style={{
        minHeight: "8rem",
        overflow: "hidden",
      }}
    >
      <span className="text-white font-bold text-lg">Sponsored Ad</span>
    </div>
  );
}

// --- Comment Type
type Comment = {
  id: string;
  name: string;
  avatar: string;
  date: string;
  comment: string;
};

type User = {
  name: string;
  avatar: string;
};

// --- Replace this with your actual authentication logic (NextAuth, Firebase Auth, etc.)
function useCurrentUser(): User | null {
  // Dummy: replace with real authentication logic.
  // Return null if not logged in, otherwise return user object.
  // For example, use Firebase Auth: const user = firebase.auth().currentUser;
  // return user ? { name: user.displayName, avatar: user.photoURL } : null;
  return null; // <--- Fix: implement your actual auth state here!
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogParam = searchParams.get("blog");
  const user = useCurrentUser();

  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);

  // --- Fetch blog post data from Firestore ---
  useEffect(() => {
    let unsub: (() => void) | null = null;
    async function fetchPost() {
      setLoading(true);
      try {
        const docRef = doc(db, "blogs", params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ ...docSnap.data(), id: params.id });
        } else if (blogParam) {
          let parsedPost = null;
          try {
            parsedPost = blogParam && JSON.parse(decodeURIComponent(blogParam));
          } catch {
            parsedPost = null;
          }
          setPost(parsedPost);
        } else {
          setPost(null);
        }
      } catch (e) {
        setPost(null);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
    return () => {
      unsub?.();
    };
  }, [params.id, blogParam]);

  // --- Fetch related posts from Firestore (same category, exclude current) ---
  useEffect(() => {
    if (!post || !post.category) {
      setRelatedPosts([]);
      setRelatedLoading(false);
      return;
    }
    setRelatedLoading(true);
    async function fetchRelated() {
      try {
        const q = query(
          collection(db, "blogs"),
          where("category", "==", post.category),
          orderBy("date", "desc")
        );
        const snap = await getDocs(q);
        const data = snap.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((p) => p.id !== post.id)
          .slice(0, 3);
        setRelatedPosts(data);
      } catch {
        setRelatedPosts([]);
      } finally {
        setRelatedLoading(false);
      }
    }
    fetchRelated();
  }, [post?.category, post?.id]);

  // --- Fetch comments for this post from Firestore ---
  useEffect(() => {
    if (!post?.id) {
      setComments([]);
      setCommentsLoading(false);
      return;
    }
    setCommentsLoading(true);
    async function fetchComments() {
      try {
        const q = query(
          collection(db, "blogs", post.id, "comments"),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        const data: Comment[] = snap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Comment[];
        setComments(data);
      } catch {
        setComments([]);
      } finally {
        setCommentsLoading(false);
      }
    }
    fetchComments();
  }, [post?.id]);

  // --- Comment submission handler (require login) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to comment.");
      return;
    }
    if (!newComment.trim() || !post?.id) return;
    const newCommentObj = {
      name: user.name,
      avatar: user.avatar || `https://randomuser.me/api/portraits/men/1.jpg`,
      date: "Just now",
      comment: newComment,
      createdAt: serverTimestamp(),
    };
    // Add to firestore
    const ref = await addDoc(
      collection(db, "blogs", post.id, "comments"),
      newCommentObj
    );
    setComments([
      { ...newCommentObj, id: ref.id, date: "Just now" },
      ...comments,
    ]);
    setNewComment("");
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] min-h-screen text-white py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Loading post...</h1>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] min-h-screen text-white py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blogs" className="text-cyan-400 hover:text-cyan-300">
            ← Back to all posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <div className="mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to all posts
          </Link>
        </div>

        {/* Main post content with image on right */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          <div className="lg:w-2/3">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-cyan-900 text-cyan-300 mb-4">
              {post.category || "Technology"}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center mb-8">
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Author"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="text-sm font-medium">
                    By {post.author || "John Doe"}
                  </p>
                  <p className="text-xs text-gray-400">{formatDate(post.date)}</p>
                </div>
              </div>
              <span className="ml-auto text-gray-400 text-sm">
                {Math.ceil(
                  ((post.summary?.length || 0) +
                    (post.description?.length || 0)) /
                    200
                ) || 1}{" "}
                min read
              </span>
            </div>

            <div className="prose prose-invert max-w-none text-gray-300 mb-8">
              {post.summary && (
                <p className="text-lg leading-relaxed mb-6">{post.summary}</p>
              )}
              {post.description && (
                <p className="leading-relaxed mb-6 whitespace-pre-line">
                  {post.description}
                </p>
              )}
            </div>
          </div>

          {/* Image on the right */}
          <div className="lg:w-1/3 lg:sticky lg:self-start lg:top-20">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-800">
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="w-full h-auto object-cover rounded-xl"
                  style={{ display: "block" }}
                  loading="eager"
                />
              )}
            </div>
          </div>
        </div>

        {/* Related posts (same category) */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-gray-800">
            Related Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedLoading ? (
              <div className="text-gray-400 text-center col-span-3">Loading related posts...</div>
            ) : relatedPosts.length === 0 ? (
              <div className="text-gray-400 text-center col-span-3">No related posts found.</div>
            ) : (
              relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={{
                    pathname: `/blogs/${relatedPost.id}`,
                    query: { blog: encodeURIComponent(JSON.stringify(relatedPost)) },
                  }}
                  className="group block rounded-xl overflow-hidden transition-transform hover:scale-[1.02]"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-sm text-cyan-300">Read more →</span>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-900">
                    <h3 className="font-medium text-white mb-1 group-hover:text-cyan-300 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-xs text-gray-400">{formatDate(relatedPost.date)}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Comments and Ads section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-gray-800">
            Comments ({comments.length})
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: comments form and list */}
            <div className="lg:col-span-2">
              {/* Comment Form */}
              <form
                onSubmit={handleSubmit}
                className="bg-gray-900 rounded-xl p-6 mb-8 w-full max-w-xl"
              >
                <h3 className="text-lg font-medium mb-4">Leave a comment</h3>
                {!user && (
                  <div className="mb-4 text-red-400 font-semibold">
                    Please login to comment.
                  </div>
                )}
                <textarea
                  id="comment"
                  rows={2}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write your comment here..."
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white mb-4"
                  required
                  disabled={!user}
                ></textarea>
                <button
                  type="submit"
                  className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors"
                  disabled={!user || !newComment.trim()}
                >
                  Post Comment
                </button>
              </form>
              {/* Comments List */}
              <div className="space-y-6 w-full max-w-xl">
                {commentsLoading ? (
                  <div className="text-gray-400 text-center">Loading comments...</div>
                ) : comments.length === 0 ? (
                  <div className="text-gray-400 text-center">No comments yet.</div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4 transition">
                      <img
                        src={comment.avatar}
                        alt={comment.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500 transition"
                      />
                      <div className="flex-1 bg-gradient-to-tr from-[#181924] to-[#23253a] rounded-2xl p-5 shadow-md border border-gray-800">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white transition">
                            {comment.name}
                          </h4>
                          <span className="text-xs text-gray-400 italic">
                            {comment.date}
                          </span>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* Right: Ads Section */}
            <div className="flex flex-col gap-8">
              <AdComponent
                dataAdFormat="auto"
                dataFullWidthResponsive={true}
                className="mb-6"
              />
              <AdComponent
                dataAdFormat="auto"
                dataFullWidthResponsive={true}
                className="mb-6 h-60"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}