import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { downvoteReply } from "~/utils/posts.server";

export async function action({ params }: ActionFunctionArgs) {
  const postId = params.id;
  const replyId = params.replyId;
  
  if (!postId || !replyId) {
    throw new Response("Post ID and Reply ID are required", { status: 400 });
  }
  
  try {
    downvoteReply(postId, replyId);
    return redirect(`/posts/${postId}`);
  } catch (error) {
    throw new Response("Failed to downvote reply", { status: 500 });
  }
}
