import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { upvotePost } from "~/utils/posts.server";

export async function action({ params }: ActionFunctionArgs) {
  const postId = params.id;
  
  if (!postId) {
    throw new Response("Post ID is required", { status: 400 });
  }
  
  try {
    upvotePost(postId);
    return redirect(`/posts/${postId}`);
  } catch (error) {
    throw new Response("Failed to upvote post", { status: 500 });
  }
}
