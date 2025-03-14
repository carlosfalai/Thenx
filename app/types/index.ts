export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  views: number;
  replies: Reply[];
  imageUrl?: string;
  isFromRSS?: boolean;
  originalLink?: string;
}

export interface Reply {
  id: string;
  postId: string;
  content: string;
  author: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
}
