"use client";

import { useEffect, useState } from 'react';
import { BlogPostCard } from './blog-post-card';

interface RelatedPostsProps {
  currentPost: {
    id: string;
    tags: string[];
  };
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image?: string;
  tags: string[];
  published_at: string;
  author: {
    name: string;
    avatar_url?: string;
  };
}

export function RelatedPosts({ currentPost }: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        // Fetch posts with similar tags
        const commonTag = currentPost.tags[0]; // Use first tag for simplicity
        const response = await fetch(`/api/posts?tag=${commonTag}&limit=3`);
        const data = await response.json();
        
        // Filter out current post
        const filtered = data.posts.filter((post: BlogPost) => post.id !== currentPost.id);
        setRelatedPosts(filtered.slice(0, 3));
      } catch (error) {
        console.error('Error fetching related posts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentPost.tags.length > 0) {
      fetchRelatedPosts();
    } else {
      setLoading(false);
    }
  }, [currentPost.id, currentPost.tags]);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-muted h-48 rounded-lg mb-4" />
              <div className="h-4 bg-muted rounded mb-2" />
              <div className="h-4 bg-muted rounded w-3/4" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 border-t">
      <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {relatedPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}