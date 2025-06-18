import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BlogPost } from '@/components/blog-post';
import { RelatedPosts } from '@/components/related-posts';
import { BlogPostLoading } from '@/components/blog-post-loading';
import { getBlogPost, getBlogPosts } from '@/lib/blog';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | DevBlog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <Suspense fallback={<BlogPostLoading />}>
          <BlogPost post={post} />
        </Suspense>
        <Suspense fallback={<div className="h-64" />}>
          <RelatedPosts currentPost={post} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}