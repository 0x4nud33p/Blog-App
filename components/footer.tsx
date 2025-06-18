import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">DevBlog</h3>
            <p className="text-sm text-muted-foreground">
              A modern tech blog sharing insights on web development, programming, and technology trends.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#posts" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-muted-foreground hover:text-foreground">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/?tag=React" className="text-muted-foreground hover:text-foreground">
                  React
                </Link>
              </li>
              <li>
                <Link href="/?tag=Next.js" className="text-muted-foreground hover:text-foreground">
                  Next.js
                </Link>
              </li>
              <li>
                <Link href="/?tag=TypeScript" className="text-muted-foreground hover:text-foreground">
                  TypeScript
                </Link>
              </li>
              <li>
                <Link href="/?tag=Tutorial" className="text-muted-foreground hover:text-foreground">
                  Tutorials
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contact@devblog.com</li>
              <li>Follow us on social media</li>
              <li>Subscribe to our newsletter</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 DevBlog. All rights reserved. Built with Next.js and Supabase.</p>
        </div>
      </div>
    </footer>
  );
}