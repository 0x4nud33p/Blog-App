import React from 'react';
import BlogCard from '../utils/BlogCard.jsx';

const blogPosts = [
  { id: 1, title: "Getting Started with React", excerpt: "Learn the basics of React and start building your first component.", date: "2023-05-15" },
  { id: 2, title: "Mastering Tailwind CSS", excerpt: "Dive deep into Tailwind CSS and create beautiful, responsive designs.", date: "2023-05-20" },
  { id: 3, title: "Mastering Tailwind CSS", excerpt: "Dive deep into Tailwind CSS and create beautiful, responsive designs.", date: "2023-05-20" },
  { id: 4, title: "Mastering Tailwind CSS", excerpt: "Dive deep into Tailwind CSS and create beautiful, responsive designs.", date: "2023-05-20" },
  { id: 5, title: "Mastering Tailwind CSS", excerpt: "Dive deep into Tailwind CSS and create beautiful, responsive designs.", date: "2023-05-20" },
  { id: 6, title: "Mastering Tailwind CSS", excerpt: "Dive deep into Tailwind CSS and create beautiful, responsive designs.", date: "2023-05-20" },
  
];

function BlogContent() {
  return (
    <div>
      <div className="w-full lg:h-[calc(100vh-5rem)] overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`
          ::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogContent;
