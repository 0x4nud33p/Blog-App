import React, { useState } from 'react';
import Tags from './Tags';
import BlogContent from './BlogContent.jsx';

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectTag = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-[#0b0c14] min-h-screen text-white font-sans flex flex-col items-center p-4 sm:p-8">
      <div className="w-full  sm:w-4/5 lg:w-3/5 xl:w-2/3 mb-6 ">
        <Tags onSelectTag={handleSelectTag} />
      </div>
      <div className="flex justify-center w-full mt-8 sm:mt-12">
        <div className="w-full sm:w-4/5 lg:w-3/4 xl:w-2/3">
          <BlogContent methodtype="retrieveLatestBlogs" selectedCategory={selectedCategory} />
        </div>
      </div>
    </div>
  );
}

export default Categories;
