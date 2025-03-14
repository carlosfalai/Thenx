import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import PostCard from "~/components/PostCard";
import { getAllPosts, fetchRSSFeed } from "~/utils/posts.server";
import type { Post } from "~/types";

export const meta = () => {
  return [
    { title: "THENX Community Forum" },
    { name: "description", content: "A community forum for THENX Callisthenics enthusiasts" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  // Fetch RSS feed and convert to posts
  await fetchRSSFeed();
  
  // Get all posts
  const posts = getAllPosts();
  
  return json({ posts });
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  // Refresh RSS feed every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/api/refresh-rss', { method: 'POST' });
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">THENX Callisthenics Community</h1>
        <p className="text-gray-600">
          Join the discussion about calisthenics, workouts, nutrition, and more.
        </p>
      </div>
      
      <div className="space-y-6">
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
        
        {posts.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600">No posts yet. Be the first to create a post!</p>
          </div>
        )}
      </div>
    </div>
  );
}
