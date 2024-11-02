import { useState, useCallback } from 'react';
import { BlogEditor } from '../../Exports.js';
import axios from 'axios';
import toast from "react-hot-toast";

export default function PopUpCard({ onClose }) {
  const [blogImage, setBlogImage] = useState(null);
  const [blogHeading, setBlogHeading] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    setBlogImage(e.target.files[0]);
  };

  const handleContentChange = (content) => {
    setBlogContent(content);
  };

  const onSubmit = useCallback(
  async (e) => {
    e.preventDefault();
    if (!blogHeading || !blogContent || !blogImage) {
      toast.error("All fields are required.");
      return;
    }

    const loadingToast = toast.loading("Saving data...");
    setIsLoading(true);

    try {
      const imageData = new FormData();
      imageData.append("file", blogImage);
      imageData.append("upload_preset", "blogmediaupload");

      const imageUploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dbghbvuhb/image/upload`,
        imageData
      );

      const imageUrl = imageUploadResponse?.data?.secure_url;

    
      const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
      const token = localStorage.getItem("token");
      console.log(token);
      console.log(userDetails._id);


      const userId = userDetails?._id;

      if (!userId || !token) {
        throw new Error("User not authenticated.");
      }

      const response = await axios.post(
        `http://localhost:3000/user/blog/addblog?userid=${userId}`,
        {
          heading: blogHeading,
          content: blogContent,
          image: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.status === 201) {
        toast.success("Blog saved successfully!");
        onClose();
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("Failed to save blog. Please try again.");
    } finally {
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  },
  [blogHeading, blogContent, blogImage, onClose]
);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
      <div className="bg-white w-full max-w-[900px] max-h-[80vh] rounded-lg shadow-lg relative overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-black text-center">Write A Blog</h2>
          <button 
            className="absolute right-4 top-4 p-2 rounded-full text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center px-4 mb-2 space-y-2 md:space-y-0 md:space-x-2">
          <label className='text-black'>Blog Cover Image :</label>
          <input
            id="blog-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-1/3 border text-black border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row items-center px-6 mb-4 space-y-2 md:space-y-0 md:space-x-2">
          <label className='text-black'>Blog Title :</label>
          <input 
            placeholder="Blog Heading" 
            value={blogHeading}
            onChange={(e) => setBlogHeading(e.target.value)}
            className="w-1/2 text-black md:w-auto p-2 border border-gray-300 rounded-md" 
          />
        </div>
        <div className="px-6 pb-6">
          <BlogEditor onContentChange={handleContentChange} />
        </div>
        <button 
          onClick={onSubmit} 
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 m-6"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Blog'}
        </button>
      </div>
    </div>
  );
}
