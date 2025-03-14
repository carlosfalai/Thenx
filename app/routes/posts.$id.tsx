import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PostCard from "~/components/PostCard";
import ReplyCard from "~/components/ReplyCard";
import ReplyForm from "~/components/ReplyForm";
import { getPostById } from "~/utils/posts.server";

export const meta = ({ data }: { data: any }) => {
  return [
    { title: data?.post ? `${data.post.title} - THENX Community Forum` : "Post Not Found" },
    { name: "description", content: data?.post ? `${data.post.title} - THENX Community Forum` : "Post not found" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const postId = params.id;
  
  if (!postId) {
    throw new Response("Post ID is required", { status: 400 });
  }
  
  const post = getPostById(postId);
  
  if (!post) {
    throw new Response("Post not found", { status: 404 });
  }
  
  return json({ post });
}

export default function PostDetail() {
  const { post } = useLoaderData<typeof loader>();
  
  return (
    <div className="max-w-4xl mx-auto">
      <PostCard post={post} isDetailView={true} />
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Replies ({post.replies.length})</h2>
        
        {post.replies.length > 0 ? (
          <div className="space-y-4">
            {post.replies.map((reply, index) => (
              <ReplyCard 
                key={reply.id} 
                reply={reply} 
                postId={post.id} 
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
            <p className="text-gray-600">No replies yet. Be the first to reply!</p>
          </div>
        )}
        
        <ReplyForm postId={post.id} />
      </div>
    </div>
  );
}
