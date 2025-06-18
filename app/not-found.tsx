import Link from 'next/link';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex items-center justify-center py-16 px-4">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
            <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
            <p className="text-muted-foreground mt-2 max-w-md">
              Sorry, we couldn't find the page you're looking for. 
              It might have been moved or deleted.
            </p>
          </div>
          <Button asChild>
            <Link href="/">
              Return Home
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}