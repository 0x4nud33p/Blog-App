import { Header } from '@/components/header';
import { PostEditor } from '@/components/post-editor';

export default function NewPostPage() {
  return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
              <p className="text-muted-foreground mt-2">
                Write and publish a new blog post
              </p>
            </div>
            <PostEditor />
          </div>
        </main>
      </div>
  );
}