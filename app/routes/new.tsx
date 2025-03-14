import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createPost } from "~/utils/posts.server";

export const meta = () => {
  return [
    { title: "Create New Post - THENX Community Forum" },
    { name: "description", content: "Create a new post in the THENX Community Forum" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const author = formData.get("author") as string;
  const imageUrl = formData.get("imageUrl") as string;
  
  if (!title || !content || !author) {
    return { error: "Title, content, and author are required" };
  }
  
  const post = createPost({
    title,
    content,
    author,
    imageUrl: imageUrl || undefined,
  });
  
  return redirect(`/posts/${post.id}`);
}

export default function NewPost() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create a New Post</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <Form method="post">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post title"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              id="author"
              name="author"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-gray-700 mb-2">Image URL (optional)</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 mb-2">Content</label>
            <textarea
              id="content"
              name="content"
              required
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your post content here..."
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Post
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
