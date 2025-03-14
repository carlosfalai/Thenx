import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Post, Reply } from '~/types';

// Get the directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../../data');
const postsFile = path.join(dataDir, 'posts.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize posts file if it doesn't exist
if (!fs.existsSync(postsFile)) {
  fs.writeFileSync(postsFile, JSON.stringify([], null, 2));
}

export function getAllPosts(): Post[] {
  try {
    const data = fs.readFileSync(postsFile, 'utf-8');
    const posts = JSON.parse(data) as Post[];
    return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

export function getPostById(id: string): Post | null {
  const posts = getAllPosts();
  const post = posts.find(p => p.id === id);
  
  if (post) {
    // Increment view count
    updatePost({
      ...post,
      views: post.views + 1
    });
    
    // Return the updated post
    return {
      ...post,
      views: post.views + 1
    };
  }
  
  return null;
}

export function createPost(post: Omit<Post, 'id' | 'createdAt' | 'upvotes' | 'downvotes' | 'views' | 'replies'>): Post {
  const posts = getAllPosts();
  
  const newPost: Post = {
    ...post,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    upvotes: 0,
    downvotes: 0,
    views: 0,
    replies: []
  };
  
  posts.push(newPost);
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
  
  return newPost;
}

export function updatePost(updatedPost: Post): Post {
  const posts = getAllPosts();
  const index = posts.findIndex(p => p.id === updatedPost.id);
  
  if (index !== -1) {
    posts[index] = updatedPost;
    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
    return updatedPost;
  }
  
  throw new Error(`Post with ID ${updatedPost.id} not found`);
}

export function addReply(postId: string, replyContent: { content: string; author: string }): Reply {
  const posts = getAllPosts();
  const postIndex = posts.findIndex(p => p.id === postId);
  
  if (postIndex === -1) {
    throw new Error(`Post with ID ${postId} not found`);
  }
  
  const newReply: Reply = {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    postId,
    content: replyContent.content,
    author: replyContent.author,
    createdAt: new Date().toISOString(),
    upvotes: 0,
    downvotes: 0
  };
  
  posts[postIndex].replies.push(newReply);
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
  
  return newReply;
}

export function upvotePost(postId: string): Post {
  const post = getPostById(postId);
  
  if (!post) {
    throw new Error(`Post with ID ${postId} not found`);
  }
  
  const updatedPost = {
    ...post,
    upvotes: post.upvotes + 1
  };
  
  return updatePost(updatedPost);
}

export function downvotePost(postId: string): Post {
  const post = getPostById(postId);
  
  if (!post) {
    throw new Error(`Post with ID ${postId} not found`);
  }
  
  const updatedPost = {
    ...post,
    downvotes: post.downvotes + 1
  };
  
  return updatePost(updatedPost);
}

export function upvoteReply(postId: string, replyId: string): Reply {
  const post = getPostById(postId);
  
  if (!post) {
    throw new Error(`Post with ID ${postId} not found`);
  }
  
  const replyIndex = post.replies.findIndex(r => r.id === replyId);
  
  if (replyIndex === -1) {
    throw new Error(`Reply with ID ${replyId} not found`);
  }
  
  const updatedReply = {
    ...post.replies[replyIndex],
    upvotes: post.replies[replyIndex].upvotes + 1
  };
  
  post.replies[replyIndex] = updatedReply;
  updatePost(post);
  
  return updatedReply;
}

export function downvoteReply(postId: string, replyId: string): Reply {
  const post = getPostById(postId);
  
  if (!post) {
    throw new Error(`Post with ID ${postId} not found`);
  }
  
  const replyIndex = post.replies.findIndex(r => r.id === replyId);
  
  if (replyIndex === -1) {
    throw new Error(`Reply with ID ${replyId} not found`);
  }
  
  const updatedReply = {
    ...post.replies[replyIndex],
    downvotes: post.replies[replyIndex].downvotes + 1
  };
  
  post.replies[replyIndex] = updatedReply;
  updatePost(post);
  
  return updatedReply;
}

// RSS Feed functionality
export async function fetchRSSFeed() {
  try {
    // In a real implementation, you would fetch the RSS feed from THENX YouTube channel
    // For now, we'll just create some sample posts if none exist
    const posts = getAllPosts();
    
    if (posts.length === 0) {
      // Create some sample posts from "RSS feed"
      createPost({
        title: "Advanced Calisthenics Workout Routine",
        content: "In this video, we demonstrate an advanced calisthenics routine that will help you build strength and muscle. The workout includes muscle-ups, handstand push-ups, and front lever progressions.",
        author: "THENX",
        imageUrl: "https://i.ytimg.com/vi/example1/maxresdefault.jpg",
        isFromRSS: true,
        originalLink: "https://youtube.com/watch?v=example1"
      });
      
      createPost({
        title: "5 Minute Ab Workout - No Equipment Needed",
        content: "This quick 5-minute ab workout can be done anywhere with no equipment. Perfect for beginners and advanced athletes looking to strengthen their core.",
        author: "THENX",
        imageUrl: "https://i.ytimg.com/vi/example2/maxresdefault.jpg",
        isFromRSS: true,
        originalLink: "https://youtube.com/watch?v=example2"
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return false;
  }
}
