import React, { useEffect, useState } from 'react';
import BlogCard from '../utils/BlogCard';
import axios from 'axios';
import PencilAnimation from '../utils/PencilAnimation';

function BlogContent({ methodtype, selectedCategory }) {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const getBlogs = async () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const userId = userDetails ? userDetails._id : '';

    const urlMap = {
      retrieveAllBlogs: `${import.meta.env.VITE_PRODUCTION_URL}/user/blog/all`,
      retrieveLatestBlogs: `${import.meta.env.VITE_PRODUCTION_URL}/user/blog/latest`,
      retrieveBlogs: `${import.meta.env.VITE_PRODUCTION_URL}/user/blog/user/${userId}`
    };
    
    const url = urlMap[methodtype];

    try {
      const response = await axios.get(url, {
        headers: methodtype === 'retrieveBlogs' ? {
          Authorization: `Bearer ${token}`
        } : {}
      });
      setBlogPosts(response.data.blogs);
    } catch (error) {
      console.error("Error retrieving blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [methodtype]);

  const filteredPosts = selectedCategory
    ? blogPosts.filter(post => post.category === selectedCategory) 
    : blogPosts;

  return (
    <div>
      <div className="w-full lg:h-[calc(100vh-5rem)] overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`::-webkit-scrollbar { display: none; }`}</style>
        <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>
        {loading ? (
          <div className="flex justify-center items-center h-48"> 
            <PencilAnimation />
          </div>
        ) : (
          <div className="space-y-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <BlogCard
                  key={post._id}
                  title={post.title}
                  imageUrl={post.image}
                  excerpt={post.content}
                  date={new Date(post.createdAt).toLocaleDateString()}
                  author={post.owner.username}
                />
              ))
            ) : (
              <p>No blogs available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogContent;
