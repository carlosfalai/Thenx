import { Form } from '@remix-run/react';

export default function ReplyForm({ postId }: { postId: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-6">
      <h3 className="text-lg font-semibold mb-4">Add a Reply</h3>
      
      <Form method="post" action={`/posts/${postId}/reply`}>
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
          <label htmlFor="content" className="block text-gray-700 mb-2">Your Reply</label>
          <textarea
            id="content"
            name="content"
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your reply here..."
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Reply
        </button>
      </Form>
    </div>
  );
}
