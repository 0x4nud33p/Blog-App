import React, { useEffect, useState } from 'react';
import BlogCard from '../utils/BlogCard.jsx';


const blogPosts = [{}];
function Bookmarks() {
  return (
    <div className="mt-[60px] flex justify-center items-center min-h-screen p-4 bg-[#0b0c14]">
      <div className="bg-[#0b0c14] rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        <h2 className="text-2xl font-semibold mb-6 text-white text-center p-4">Bookmark Posts</h2>
        <div className="h-96 p-4 overflow-y-auto hide-scrollbar">
          <div className="space-y-8">
            {/* {blogPosts?.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
              />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookmarks;
