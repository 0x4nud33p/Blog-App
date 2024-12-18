import axios from "axios";
import toast from "react-hot-toast";
import { useState, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  // Validate form data
  const validateForm = useCallback(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      setFormError("Email is required");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      setFormError("Please enter a valid email address");
      return false;
    }

    if (!formData.password.trim()) {
      setFormError("Password is required");
      return false;
    }

    if (formData.password.length < 8) {
      setFormError("Password must be at least 8 characters long");
      return false;
    }

    setFormError(null);
    return true;
  }, [formData]);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      const loadingToast = toast.loading("Signing up...");
      setIsLoading(true);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_PRODUCTION_URL}/api/auth/signup`,
          formData
        );

        if (response.status === 200) {
          toast.dismiss(loadingToast);
          toast.success("Sign up successful! Please log in.");
          navigate("/auth/login");
        }
      } catch (error) {
        console.error("Signup error:", error);
        toast.dismiss(loadingToast);
        const errorMessage =
          error.response?.data?.message ||
          "An error occurred during signup. Please try again.";
        toast.error(errorMessage);
        setFormError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [formData, validateForm, navigate]
  );

  // Dynamic button classes
  const buttonClasses = useMemo(
    () =>
      `w-full py-2 px-4 font-medium text-white rounded ${
        isLoading
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`,
    [isLoading]
  );

  return (
    <div className="bg-[#0b0c14] mt-[80px] min-h-[670px] flex items-center justify-center">
      <div className="max-w-[350px] space-y-6 p-4 bg-gray-800 rounded shadow-md">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl text-white font-bold">Sign Up</h1>
          <p className="text-white">
            Already a User?{" "}
            <Link to="/auth/login" className="text-blue-400 underline">
              Sign In
            </Link>
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-white block font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-white block font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-black border border-gray-300 rounded"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((prev) => !prev);
                  }}
                  className="absolute right-3 top-2 text-sm text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {formError && <p className="text-red-500 text-sm">{formError}</p>}

            <button
              className={buttonClasses}
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? "Processing..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
