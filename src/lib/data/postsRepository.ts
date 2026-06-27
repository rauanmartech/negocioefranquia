import { Post } from "@/types/post";

const STORAGE_KEY = "nef_posts";

const getStoredPosts = (): Post[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const setStoredPosts = (posts: Post[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }
};

export const postsRepository = {
  getPosts: (): Post[] => {
    return getStoredPosts().sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  getPostById: (id: string): Post | undefined => {
    return getStoredPosts().find((p) => p.id === id);
  },

  createPost: (postData: Omit<Post, "id" | "createdAt" | "updatedAt">): Post => {
    const posts = getStoredPosts();
    const newPost: Post = {
      ...postData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setStoredPosts([...posts, newPost]);
    return newPost;
  },

  updatePost: (id: string, postData: Partial<Omit<Post, "id" | "createdAt">>): Post | null => {
    const posts = getStoredPosts();
    const index = posts.findIndex((p) => p.id === id);
    
    if (index === -1) return null;

    const updatedPost: Post = {
      ...posts[index],
      ...postData,
      updatedAt: new Date().toISOString(),
    };

    posts[index] = updatedPost;
    setStoredPosts(posts);
    
    return updatedPost;
  },

  deletePost: (id: string): boolean => {
    const posts = getStoredPosts();
    const newPosts = posts.filter((p) => p.id !== id);
    
    if (newPosts.length === posts.length) return false;
    
    setStoredPosts(newPosts);
    return true;
  }
};
