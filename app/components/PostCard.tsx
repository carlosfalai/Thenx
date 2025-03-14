import { Link } from '@remix-run/react';
import { formatDistanceToNow } from 'date-fns';
import { FaArrowUp, FaArrowDown, FaEye, FaComment, FaShare } from 'react-icons/fa';
import type { Post } from '~/types';

interface PostCardProps {
  post: Post;
  isDetailView?: boolean;
}

export default function PostCard({ post, isDetailView = false }: PostCardProps) {
  const formattedDate = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${isDetailView ? '' : 'hover:shadow-lg transition-shadow'}`}>
      <div className="p-4">
        {!isDetailView ? (
          <Link to={`/posts/${post.id}`} className="block">
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              {post.isFromRSS ? '📺 ' : ''}{post.title}
            </h2>
          </Link>
        ) : (
          <h1 className="text-2xl font-bold mb-2 text-gray-800">
            {post.isFromRSS ? '📺 ' : ''}{post.title}
          </h1>
        )}
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <span className="font-semibold">{post.author}</span>
          <span className="mx-2">•</span>
          <span>{formattedDate}</span>
          {post.isFromRSS && (
            <>
              <span className="mx-2">•</span>
              <span className="text-blue-600">YouTube Video</span>
            </>
          )}
        </div>
        
        {post.imageUrl && (
          <div className="mb-4">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-auto rounded-md object-cover"
              style={{ maxHeight: '300px' }}
            />
          </div>
        )}
        
        <div className={`text-gray-700 ${isDetailView ? '' : 'line-clamp-3'}`}>
          {post.content}
        </div>
        
        {post.isFromRSS && post.originalLink && (
          <div className="mt-3">
            <a 
              href={post.originalLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Watch on YouTube →
            </a>
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between text-sm border-t">
        <div className="flex items-center space-x-6">
          <form method="post" action={`/posts/${post.id}/upvote`} className="inline">
            <button type="submit" className="flex items-center text-gray-600 hover:text-green-600">
              <FaArrowUp className="mr-1" />
              <span>{post.upvotes}</span>
            </button>
          </form>
          
          <form method="post" action={`/posts/${post.id}/downvote`} className="inline">
            <button type="submit" className="flex items-center text-gray-600 hover:text-red-600">
              <FaArrowDown className="mr-1" />
              <span>{post.downvotes}</span>
            </button>
          </form>
          
          <div className="flex items-center text-gray-600">
            <FaEye className="mr-1" />
            <span>{post.views}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <FaComment className="mr-1" />
            <span>{post.replies.length}</span>
          </div>
        </div>
        
        <div>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(
                typeof window !== 'undefined' 
                  ? `${window.location.origin}/posts/${post.id}`
                  : `/posts/${post.id}`
              );
              alert('Link copied to clipboard!');
            }}
            className="flex items-center text-gray-600 hover:text-blue-600"
          >
            <FaShare className="mr-1" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
