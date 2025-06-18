"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code2, BookOpen, Users } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-20 sm:py-32">
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Ideas worth{" "}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                sharing.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Discover the latest insights, tutorials, and thoughts on modern
              web development. From React and Next.js to cutting-edge
              technologies shaping the future of the web.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Button size="lg" className="group">
              Start Reading
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg">
              About Us
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-20 max-w-4xl"
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="flex flex-col items-center p-6 bg-card rounded-xl border shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10">
                  <Code2 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Latest Tech</h3>
                <p className="mt-2 text-sm text-muted-foreground text-center">
                  Stay updated with the newest frameworks, tools, and best
                  practices
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-card rounded-xl border shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600/10">
                  <BookOpen className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">
                  In-Depth Tutorials
                </h3>
                <p className="mt-2 text-sm text-muted-foreground text-center">
                  Learn through comprehensive guides and hands-on examples
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-card rounded-xl border shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600/10">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Community Driven</h3>
                <p className="mt-2 text-sm text-muted-foreground text-center">
                  Join a community of developers sharing knowledge and insights
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}