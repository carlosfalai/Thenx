import { formatDistanceToNow } from 'date-fns';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import type { Reply } from '~/types';

interface ReplyCardProps {
  reply: Reply;
  postId: string;
  index: number;
}

export default function ReplyCard({ reply, postId, index }: ReplyCardProps) {
  const formattedDate = formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true });
  
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <span className="font-semibold text-gray-800">{reply.author}</span>
          <span className="mx-2 text-gray-500">•</span>
          <span className="text-gray-500 text-sm">{formattedDate}</span>
          <span className="ml-2 text-gray-400 text-sm">No.{index + 1}</span>
        </div>
      </div>
      
      <div className="text-gray-700 mb-3">
        {reply.content}
      </div>
      
      <div className="flex items-center space-x-4 text-sm">
        <form method="post" action={`/posts/${postId}/replies/${reply.id}/upvote`} className="inline">
          <button type="submit" className="flex items-center text-gray-600 hover:text-green-600">
            <FaArrowUp className="mr-1" />
            <span>{reply.upvotes}</span>
          </button>
        </form>
        
        <form method="post" action={`/posts/${postId}/replies/${reply.id}/downvote`} className="inline">
          <button type="submit" className="flex items-center text-gray-600 hover:text-red-600">
            <FaArrowDown className="mr-1" />
            <span>{reply.downvotes}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
