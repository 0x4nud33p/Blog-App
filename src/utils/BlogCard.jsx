import React from 'react';

function BlogCard({ title, excerpt, date }) {
  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-lg hover:bg-opacity-20 transition duration-300">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{excerpt}</p>
      <div className="flex justify-between items-center">
        <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition duration-300">
          Read More
        </button>
        <span className="text-sm text-gray-400">{date}</span>
      </div>
    </div>
  );
}

export default BlogCard;
