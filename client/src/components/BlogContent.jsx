import React, { useEffect, useState } from 'react';
import BlogCard from '../utils/BlogCard.jsx';
import axios from 'axios';
import PencilAnimation from '../utils/PencilAnimation.jsx';

function BlogContent({ methodtype }) {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const getBlogs = async () => {
    const urlMap = {
      retrieveAllBlogs: 'http://localhost:3000/user/blog/all',
      retrieveLatestBlogs: 'http://localhost:3000/user/blog/latest',
      retrieveBlogs: `http://localhost:3000/user/blog/user/${JSON.parse(localStorage.getItem("userDetails"))?._id}`
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
  }, []);

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
            {blogPosts.length > 0 ? (
              blogPosts.map((post) => (
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
