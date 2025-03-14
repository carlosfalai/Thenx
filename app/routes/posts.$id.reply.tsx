import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { addReply } from "~/utils/posts.server";

export async function action({ request, params }: ActionFunctionArgs) {
  const postId = params.id;
  
  if (!postId) {
    throw new Response("Post ID is required", { status: 400 });
  }
  
  const formData = await request.formData();
  const content = formData.get("content") as string;
  const author = formData.get("author") as string;
  
  if (!content || !author) {
    throw new Response("Content and author are required", { status: 400 });
  }
  
  try {
    addReply(postId, { content, author });
    return redirect(`/posts/${postId}`);
  } catch (error) {
    throw new Response("Failed to add reply", { status: 500 });
  }
}
