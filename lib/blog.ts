import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  tags: string[];
  published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
  author: {
    name: string;
    avatar_url?: string;
  };
}

export async function getBlogPosts(options?: {
  search?: string;
  tag?: string;
  limit?: number;
  offset?: number;
}): Promise<BlogPost[]> {
  let query = supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      content,
      featured_image,
      tags,
      published_at,
      created_at,
      updated_at,
      author:profiles(name, avatar_url)
    `)
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (options?.search) {
    query = query.or(`title.ilike.%${options.search}%, content.ilike.%${options.search}%`);
  }

  if (options?.tag) {
    query = query.contains('tags', [options.tag]);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }

  const { data: posts, error } = await query;

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return posts || [];
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const { data: post, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      content,
      featured_image,
      tags,
      published_at,
      created_at,
      updated_at,
      author:profiles(name, avatar_url)
    `)
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }

  return post;
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const { data: post, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      content,
      featured_image,
      tags,
      published,
      published_at,
      created_at,
      updated_at,
      author:profiles(name, avatar_url)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }

  return post;
}

export async function getRelatedPosts(currentPostId: string, tags: string[], limit = 3): Promise<BlogPost[]> {
  if (tags.length === 0) return [];

  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      content,
      featured_image,
      tags,
      published_at,
      created_at,
      updated_at,
      author:profiles(name, avatar_url)
    `)
    .eq('published', true)
    .neq('id', currentPostId)
    .overlaps('tags', tags)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }

  return posts || [];
}