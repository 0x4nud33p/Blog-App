import { Suspense } from 'react';
import { Hero } from '@/components/hero';
import { BlogPosts } from '@/components/blog-posts';
import { SearchAndFilter } from '@/components/search-and-filter';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BlogPostsLoading } from '@/components/blog-posts-loading';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                Latest Posts
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover insights, tutorials, and thoughts on modern web development
              </p>
            </div>
            <SearchAndFilter />
            <Suspense fallback={<BlogPostsLoading />}>
              <BlogPosts />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}