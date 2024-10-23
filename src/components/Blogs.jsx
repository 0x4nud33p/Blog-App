import React from 'react'
import { TrendingTags } from '../../Exports.js';

const blogPosts = [
  { id: 1, title: "Getting Started with React", excerpt: "Learn the basics of React and start building your first component.", date: "2023-05-15" },
  { id: 2, title: "Mastering Tailwind CSS", excerpt: "Dive deep into Tailwind CSS and create beautiful, responsive designs.", date: "2023-05-20" },
  { id: 3, title: "The Power of Next.js", excerpt: "Explore the features that make Next.js a powerful framework for React applications.", date: "2023-05-25" },
  { id: 4, title: "The Power of Next.js", excerpt: "Explore the features that make Next.js a powerful framework for React applications.", date: "2023-05-25" },
  { id: 5, title: "The Power of Next.js", excerpt: "Explore the features that make Next.js a powerful framework for React applications.", date: "2023-05-25" },
  { id: 6, title: "The Power of Next.js", excerpt: "Explore the features that make Next.js a powerful framework for React applications.", date: "2023-05-25" },
]

export default function Blogs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2F2B68] via-[#312B65] to-[#5f1831] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="mt-20 text-4xl font-bold mb-8 text-center">For You</h1>
        <div className="flex gap-8">
          
          {/* Left side - Fixed Trending Tags */}
          <div className="ml-10 sticky top-20 h-screen">
              <TrendingTags />
              <button
      className="group inline-block mt-10  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] rounded-xl 
                 hover:text-white focus:outline-none focus:ring active:text-opacity-75 
                 transition-all duration-300 ease-out transform hover:scale-105 
                 text-black bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent"
                >
                  Write a New Blog
                </button>
            </div>
          {/* Right side - Scrollable Blog posts with hidden scrollbar */}
          <div className="w-3/4 h-[calc(100vh-5rem)] overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style jsx>{`
              ::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-white bg-opacity-10 p-6 rounded-lg hover:bg-opacity-20 transition duration-300">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-300 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition duration-300">
                      Read More
                    </button>
                    <span className="text-sm text-gray-400">{post.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
