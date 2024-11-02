import React, { useEffect, useState } from 'react';
import BlogCard from '../utils/BlogCard.jsx';

// const blogPosts = [
//   { id: 1, title: "Getting Started with React", excerpt: "Learn the basics of React and start building your first component.", date: "2023-05-15" },
//   { id: 2, title: "Mastering Tailwind CSS", excerpt: "Dive deep into Tailwind CSS and create beautiful, responsive designs.", date: "2023-05-20" },
//   { id: 3, title: "Understanding JavaScript Closures", excerpt: "Learn about closures in JavaScript and how to use them effectively.", date: "2023-05-21" },
//   { id: 4, title: "A Guide to Redux", excerpt: "Explore Redux for state management in your React applications.", date: "2023-05-22" },
//   { id: 5, title: "CSS Grid Layouts", excerpt: "Master CSS Grid to create complex layouts easily.", date: "2023-05-23" },
//   { id: 6, title: "Improving Performance in React", excerpt: "Tips to enhance performance in your React applications.", date: "2023-05-24" },
//   // Add more blog posts...
// ];

// const [blogPosts,setBlogPost] = useState([]);

//     useEffect(() => {
//       const blogs = axios.post("http://localhost:3000/user/blog/bookmarks",{

//       })
//     },[]);

const blogPosts = [{}];
function Bookmarks() {
  return (
    <div className="mt-[60px] flex justify-center items-center min-h-screen p-4 bg-gradient-to-b from-[#2F2B68] via-[#312B65] to-[#5f1831]">
      <div className="bg-gradient-to-b from-[#2F2B68] via-[#312B65] to-[#5f1831] rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        <h2 className="text-2xl font-semibold mb-6 text-white text-center p-4">Bookmark Posts</h2>
        <div className="h-96 p-4 overflow-y-auto hide-scrollbar">
          <div className="space-y-8">
            {blogPosts?.map((post) => (
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
    </div>
  );
}

export default Bookmarks;
