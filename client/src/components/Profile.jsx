import React, { useState, useEffect } from 'react';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast'; // Assuming you are using react-hot-toast for notifications

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);
  const token = localStorage.getItem('token');

  // Load user details from localStorage when component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUser) {
      setBio(storedUser.bio || '');
      setImage(storedUser.profileImage || '');
      setEmail(storedUser.email);
      setUsername(storedUser.username);
    }
    
    if (token && !storedUser) {
      axios
        .get(`${import.meta.env.VITE_PRODUCTION_URL}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const userData = res.data.user;
          setBio(userData.bio || '');
          setImage(userData.profileImage || '');
          setEmail(userData.email);
          setUsername(userData.username);
          
          localStorage.setItem('userDetails', JSON.stringify(userData));
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [token]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = async () => {
    if (isEditing && token) {
      try {
        const updatedUser = { bio, profileImage: image };
        await axios.put(
          `${import.meta.env.VITE_PRODUCTION_URL}/api/user/update`,
          updatedUser,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        // Update localStorage with new user details
        localStorage.setItem('userDetails', JSON.stringify({
          ...updatedUser,
          email,
          username,
        }));

        toast.success("Profile updated successfully!"); // Feedback on success
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error("Failed to update profile. Please try again."); // Feedback on failure
      }
    }
    setIsEditing((prev) => !prev);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails'); // Remove user details on sign-out
  };

  return (
    <div className="bg-gradient-to-b from-[#2F2B68] via-[#312B65] to-[#5f1831] mt-[80px] flex justify-center p-4">
      <div className="rounded-lg bg-white bg-opacity-10 shadow-lg p-6 w-full max-w-md hover:bg-opacity-20 transition duration-300">
        <div className="flex items-center mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute -z-10 opacity-0"
            id="profileImageInput"
          />
          <label htmlFor="profileImageInput" className={`cursor-pointer ${isEditing ? 'block' : 'hidden'}`}>
            <FaUpload className="w-6 h-6 text-white hover:text-blue-500 transition duration-300" />
          </label>
          <img
            src={image || 'https://via.placeholder.com/100'}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
          <div className="ml-4">
            <h3 className="text-2xl font-semibold text-white">{username}</h3>
            <p className="text-gray-300">{email}</p>
          </div>
        </div>
        {isEditing ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full h-24 p-2 text-gray-300 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Edit your bio here..."
          />
        ) : (
          <p className="text-gray-300 mb-4">Bio: {bio}</p>
        )}
        <div className="flex align-center justify-center space-x-6">
          <button
            onClick={toggleEdit}
            className="styled-button text-black bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition duration-300"
          >
            {isEditing ? 'Save' : 'Edit Profile'}
          </button>
          <button
            onClick={handleSignOut}
            className="styled-button text-black bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition duration-300"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
