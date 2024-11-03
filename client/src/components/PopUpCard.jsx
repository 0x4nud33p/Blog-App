import { useState, useCallback } from "react";
import { BlogEditor } from "../../Exports.js";
import axios from "axios";
import toast from "react-hot-toast";

export default function PopUpCard({ onClose }) {
  const [blogImage, setBlogImage] = useState(null);
  const [blogHeading, setBlogHeading] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogImage(file);
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const handleContentChange = (content) => setBlogContent(content);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!blogHeading || !blogContent || !blogImage) {
      toast.error("All fields are required.");
      return;
    }

    const loadingToast = toast.loading("Saving data...");
    setIsLoading(true);

    try {
      // Upload image to Cloudinary
      const imageData = new FormData();
      imageData.append("file", blogImage);
      imageData.append("upload_preset", "blogmediaupload");

      const imageUploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dbghbvuhb/image/upload",
        imageData
      );
      const imageUrl = imageUploadResponse?.data?.secure_url;

      if (!imageUrl) {
        throw new Error("Image upload failed.");
      }

      // Retrieve token and user details
      const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
      const token = localStorage.getItem("token");

      if (!userDetails._id || !token) {
        throw new Error("User not authenticated.");
      }

      // Send blog data to server
      const response = await axios.post(
        `http://localhost:3000/user/blog/add?userid=${userDetails._id}`,
        {
          heading: blogHeading,
          content: blogContent,
          image: imageUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response?.status === 201) {
        toast.success("Blog saved successfully!");
        toast.dismiss(loadingToast); // Dismiss loading toast upon success
        onClose();
      } else {
        throw new Error("Failed to save blog.");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("Failed to save blog. Please try again.");
    } finally {
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  }, [blogHeading, blogContent, blogImage, onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
      <div className="bg-white w-full max-w-[900px] max-h-[80vh] rounded-lg shadow-lg relative overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-black text-center">Write A Blog</h2>
          <button
            className="absolute right-4 top-4 p-2 rounded-full text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          <form onSubmit={onSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Blog Heading"
              value={blogHeading}
              onChange={(e) => setBlogHeading(e.target.value)}
              className="w-full p-2 border rounded-md text-black"
              required
            />

            <BlogEditor onContentChange={handleContentChange} />  {/* Corrected prop */}

            <input
              type="file"
              onChange={handleImageChange}
              className="w-full border p-2 rounded-md"
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white font-semibold p-2 rounded-md"
            >
              {isLoading ? "Saving..." : "Save Blog"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
