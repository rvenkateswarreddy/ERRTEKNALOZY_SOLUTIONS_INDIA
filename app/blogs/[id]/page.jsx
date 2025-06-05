"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

// Dummy AdComponent implementation.
// In a real app, import AdComponent from your actual ad library.
function AdComponent({
  dataAdFormat,
  dataFullWidthResponsive,
  className = "",
}) {
  // Normally you'd inject a script or use a third-party component.
  // Here, we just display a placeholder.
  return (
    <div
      className={`relative w-full h-32 bg-gradient-to-r from-cyan-800 to-cyan-500 rounded-xl flex items-center justify-center shadow border border-gray-800 ${className}`}
      style={{
        minHeight: "8rem",
        overflow: "hidden",
      }}
    >
      <span className="text-white font-bold text-lg">
        {/* Simulate ad text */}
        Sponsored Ad
      </span>
      {/* Optionally, you can display props for debugging */}
      {/* <div className="absolute bottom-1 right-1 text-xs text-white">
        {dataAdFormat}, {dataFullWidthResponsive ? "Responsive" : "Fixed"}
      </div> */}
    </div>
  );
}

export default function BlogPost({ params }) {
  const searchParams = useSearchParams();
  const blogParam = searchParams.get("blog");

  // Sample related posts data
  const relatedPosts = [
    {
      id: 1,
      title: "Getting Started with Next.js",
      date: "May 15, 2023",
      image: "https://source.unsplash.com/random/300x200?nextjs",
    },
    {
      id: 2,
      title: "React Hooks Explained",
      date: "April 28, 2023",
      image: "https://source.unsplash.com/random/300x200?react",
    },
    {
      id: 3,
      title: "CSS Grid Layout Techniques",
      date: "March 10, 2023",
      image: "https://source.unsplash.com/random/300x200?css",
    },
  ];

  // Sample comments data
  const initialComments = [
    {
      id: 1,
      name: "Carlos Castillo",
      avatar: "https://randomuser.me/api/portraits/men/65.jpg",
      date: "21.08.2023",
      comment:
        "Wow, I never thought about approaching creativity from this angle before! This post has given me a fresh perspective and some really practical ideas to try out.",
    },
    {
      id: 2,
      name: "Carlos Castillo",
      avatar: "https://randomuser.me/api/portraits/men/65.jpg",
      date: "21.08.2023",
      comment:
        "Wow, I never thought about approaching creativity from this angle before! This post has given me a fresh perspective and some really practical ideas to try out.",
    },
  ];

  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !name.trim()) return;

    const newCommentObj = {
      id: comments.length + 1,
      name,
      avatar: `https://randomuser.me/api/portraits/${
        Math.random() > 0.5 ? "men" : "women"
      }/${Math.floor(Math.random() * 50)}.jpg`,
      date: "Just now",
      comment: newComment,
    };

    setComments([newCommentObj, ...comments]);
    setNewComment("");
    setName("");
  };

  let post = null;
  try {
    post = blogParam && JSON.parse(blogParam);
  } catch (e) {
    post = null;
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
                  <p className="text-xs text-gray-400">{post.date}</p>
                </div>
              </div>
              <span className="ml-auto text-gray-400 text-sm">
                {Math.ceil(post.summary.length / 200)} min read
              </span>
            </div>

            <div className="prose prose-invert max-w-none text-gray-300 mb-8">
              <p className="text-lg leading-relaxed mb-6">{post.summary}</p>
              <p className="leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                in dui mauris. Vivamus hendrerit arcu sed erat molestie
                vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh
                porttitor. Ut in nulla enim. Phasellus molestie magna non est
                bibendum non venenatis nisl tempor.
              </p>
              <p className="leading-relaxed">
                Suspendisse potenti. Sed egestas, ante et vulputate volutpat,
                eros pede semper est, vitae luctus metus libero eu augue. Morbi
                purus libero, faucibus adipiscing, commodo quis, gravida id,
                est. Sed lectus. Praesent elementum hendrerit tortor.
              </p>
            </div>
          </div>

          {/* Image on the right */}
          <div className="lg:w-1/3 lg:sticky lg:self-start lg:top-20">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-800">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Related posts */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-gray-800">
            Related Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href="#"
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
                  <p className="text-xs text-gray-400">{relatedPost.date}</p>
                </div>
              </Link>
            ))}
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
                <textarea
                  id="comment"
                  rows="2"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write your comment here..."
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white mb-4"
                  required
                ></textarea>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 mb-4 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors"
                >
                  Post Comment
                </button>
              </form>
              {/* Comments List */}
              <div className="space-y-6 w-full max-w-xl">
                {comments.map((comment) => (
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
                ))}
              </div>
            </div>
            {/* Right: Ads Section */}
            <div className="flex flex-col gap-8">
              {/* AdComponent 1 */}
              <AdComponent
                dataAdFormat="auto"
                dataFullWidthResponsive={true}
                className="mb-6"
              />
              {/* AdComponent 2 */}
              <AdComponent
                dataAdFormat="auto"
                dataFullWidthResponsive={true}
                className="mb-6 h-60 "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
