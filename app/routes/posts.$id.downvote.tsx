import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { downvotePost } from "~/utils/posts.server";

export async function action({ params }: ActionFunctionArgs) {
  const postId = params.id;
  
  if (!postId) {
    throw new Response("Post ID is required", { status: 400 });
  }
  
  try {
    downvotePost(postId);
    return redirect(`/posts/${postId}`);
  } catch (error) {
    throw new Response("Failed to downvote post", { status: 500 });
  }
}
