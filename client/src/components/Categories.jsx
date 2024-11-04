import React, { useState } from 'react';
import Tags from './Tags';
import BlogContent from './BlogContent.jsx';

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectTag = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-gradient-to-b from-[#2F2B68] via-[#312B65] to-[#5f1831] min-h-screen text-white font-sans flex flex-col items-center">
      <div><Tags onSelectTag={handleSelectTag} /></div>
      <div className="flex justify-center w-full mt-8">
        <div className="lg:w-3/4 w-full">
          <BlogContent methodtype="retrieveLatestBlogs" selectedCategory={selectedCategory} />
        </div>
      </div>
    </div>
  );
}

export default Categories;
