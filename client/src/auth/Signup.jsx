import { useState, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  

  const validateForm = useCallback(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError("Please enter a valid email address");
      return false;
    }
    setFormError(null);
    return true;
  }, [formData.email]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      const loadingToast = toast.loading("Saving data...");
      setIsLoading(true);

      try {
        const imageData = new FormData();
        imageData.append("file", profileImage);
        imageData.append("upload_preset", "blogmediaupload");

        const imageUploadResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/dbghbvuhb/image/upload`,
          imageData
        );

        const imageUrl = imageUploadResponse.data.secure_url;
        console.log(imageUrl);
        
        const response = await axios.post(`${import.meta.env.VITE_PRODUCTION_URL}/api/auth/signup`, {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            profileImage: imageUrl,
          });
        if (response.status === 201) {
          toast.success("Signup successful! Please Login");
          setFormError(null);
          navigate("/auth/login");
        }
      } catch (error) {
        console.error("Signup error:", error);
        setFormError("An error occurred during signup. Please try again.");
        toast.error("Signup failed. Please try again.");
      } finally {
        toast.dismiss(loadingToast);
        setIsLoading(false);
      }
    },
    [formData, validateForm, navigate, profileImage]
  );

  const buttonClasses = useMemo(
    () =>
      `w-full py-2 px-4 font-medium text-white rounded ${
        isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600"
      }`,
    [isLoading]
  );

  return (
    <div className="bg-gradient-to-b from-[#2F2B68] via-[#312B65] to-[#5f1831] mt-[80px] min-h-[670px]">
      <Toaster />
      <div className="mx-auto max-w-[350px] space-y-6 p-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl text-white font-bold">Sign Up</h1>
          <p className="text-white">
            Already a User?{" "}
            <Link to="/auth/login" className="text-white underline">
              Log In
            </Link>
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="space-y-4 text-white">
            <div className="space-y-2">
              <label htmlFor="username" className="block font-medium">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter Username"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border text-black border-gray-300 rounded"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block font-medium">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border text-black border-gray-300 rounded"
              />
              {formError && <p className="text-red-500 text-sm">{formError}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block font-medium">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-black border border-gray-300 rounded"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-2 text-sm text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="profileImage" className="block font-medium">Profile Picture</label>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border text-black border-gray-300 rounded"
                required
              />
            </div>
            <button
              className={buttonClasses}
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin mr-2 h-4 w-4 text-white inline"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


