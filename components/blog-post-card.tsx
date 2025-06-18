"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface BlogPostCardProps {
  post: {
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
  };
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-card">
        <div className="relative">
          {post.featured_image ? (
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-blue-500/10 to-emerald-500/10 flex items-center justify-center">
              <div className="text-muted-foreground text-4xl font-light">
                {post.title.charAt(0)}
              </div>
            </div>
          )}
        </div>

        <CardHeader className="pb-3">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="font-semibold text-lg line-clamp-2 leading-tight">
            <Link 
              href={`/blog/${post.slug}`}
              className="hover:text-primary transition-colors"
            >
              {post.title}
            </Link>
          </h3>
        </CardHeader>

        <CardContent className="pb-4">
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </CardContent>

        <CardFooter className="pt-0 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatar_url} alt={post.author.name} />
              <AvatarFallback className="text-xs">
                {post.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{post.author.name}</span>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="w-3 h-3 mr-1" />
                {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
              </div>
            </div>
          </div>
          
          <Link 
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium group"
          >
            Read more
            <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}