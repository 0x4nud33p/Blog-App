import React from 'react';
import Tags from './Tags';
import BlogContent from './BlogContent.jsx';

function Categories() {
  return (
    <div className='bg-gradient-to-b from-[#2F2B68] via-[#312B65] to-[#5f1831] min-h-screen text-white font-sans flex flex-col items-center'>
      <div>
        <Tags />
      </div>
      <div className="flex justify-center w-full mt-8">
        <div className="lg:w-3/4 w-full">
          <BlogContent />
        </div>
      </div>
    </div>
  );
}

export default Categories;
