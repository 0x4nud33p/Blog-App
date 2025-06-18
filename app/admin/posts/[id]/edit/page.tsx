import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { PostEditor } from '@/components/post-editor';
import { AuthGuard } from '@/components/auth-guard';
import { getBlogPostById } from '@/lib/blog';

interface EditPostPageProps {
  params: {
    id: string;
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const post = await getBlogPostById(params.id);

  if (!post) {
    notFound();
  }

  return (
    <AuthGuard requiredRole="admin">
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
              <p className="text-muted-foreground mt-2">
                Update your blog post
              </p>
            </div>
            <Suspense fallback={<div className="animate-pulse">Loading editor...</div>}>
              <PostEditor post={post} />
            </Suspense>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}