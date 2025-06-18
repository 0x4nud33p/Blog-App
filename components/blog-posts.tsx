"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BlogPostCard } from './blog-post-card';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';

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

export function BlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const searchParams = useSearchParams();

  const fetchPosts = async (pageNum: number = 1, append: boolean = false) => {
    try {
      const params = new URLSearchParams();
      params.set('page', pageNum.toString());
      params.set('limit', '6');
      
      const search = searchParams.get('search');
      const tag = searchParams.get('tag');
      
      if (search) params.set('search', search);
      if (tag) params.set('tag', tag);

      const response = await fetch(`/api/posts?${params}`);
      const data = await response.json();

      if (append) {
        setPosts(prev => [...prev, ...data.posts]);
      } else {
        setPosts(data.posts);
      }

      setHasMore(data.posts.length === 6);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setPage(1);
    fetchPosts(1, false);
  }, [searchParams]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage, true);
  };

  if (loading) {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-muted h-48 rounded-lg mb-4" />
          <div className="h-4 bg-muted rounded mb-2" />
          <div className="h-4 bg-muted rounded w-3/4" />
        </div>
      ))}
    </div>;
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No posts found. Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div id="posts">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <BlogPostCard post={post} />
          </motion.div>
        ))}
      </motion.div>

      {hasMore && (
        <div className="flex justify-center mt-12">
          <Button onClick={loadMore} variant="outline" size="lg">
            Load More Posts
          </Button>
        </div>
      )}
    </div>
  );
}