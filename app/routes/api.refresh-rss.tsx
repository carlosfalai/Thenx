import { json, type ActionFunctionArgs } from "@remix-run/node";
import { fetchRSSFeed } from "~/utils/posts.server";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }
  
  try {
    await fetchRSSFeed();
    return json({ success: true });
  } catch (error) {
    console.error("Error refreshing RSS feed:", error);
    return json({ error: "Failed to refresh RSS feed" }, { status: 500 });
  }
}
