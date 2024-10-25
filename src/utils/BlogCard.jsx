import React from 'react';

function BlogCard({ title, excerpt, date }) {
  return (
    <div className="bg-white/30 backdrop-blur-lg relative block overflow-hidden rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 shadow-lg">
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800 sm:text-xl">{title}</h3>
          <p className="mt-1 text-xs font-medium text-gray-300">By John Doe</p>
        </div>

        <div className="hidden sm:block sm:shrink-0">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
            className="size-16 rounded-lg object-cover shadow-sm"
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-200 text-sm">
          {excerpt}
        </p>
      </div>

      <dl className="mt-6 flex gap-4 sm:gap-6">
        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-300">Published</dt>
          <dd className="text-xs text-gray-200">{date}</dd>
        </div>

        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-300">Reading time</dt>
          <dd className="text-xs text-gray-200">3 minutes</dd>
        </div>
      </dl>
    </div>
  );
}

export default BlogCard;
