import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';

function Profile() {
  // State for managing edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('A short bio about John Doe.');
  const [image, setImage] = useState(null);

  // Function to handle the file input change
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

  // Function to toggle edit mode
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="bg-gradient-to-b from-[#2F2B68] via-[#312B65] to-[#5f1831] mt-[80px] flex justify-center p-4">
      <div className="rounded-lg bg-white bg-opacity-10 shadow-lg p-6 w-full max-w-md hover:bg-opacity-20 transition duration-300">
        <div className="flex items-center mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={`absolute -z-10 opacity-0`} // Hide file input
            id="profileImageInput"
          />
          <label htmlFor="profileImageInput" className={`cursor-pointer ${isEditing ? 'block' : 'hidden'}`}>
            <FaUpload className="w-6 h-6 text-white hover:text-blue-500 transition duration-300" />
          </label>
          <img
            src={image || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
          <div className="ml-4">
            <h3 className="text-2xl font-semibold text-white">John Doe</h3>
            <p className="text-gray-300">john.doe@example.com</p>
          </div>
        </div>
        {isEditing ? (
          <div>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full h-24 p-2 text-gray-300 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Edit your bio here..."
            />
          </div>
        ) : (
          <p className="text-gray-300 mb-4">Bio: {bio}</p>
        )}
        <div className='flex align-center justify-center space-x-6'>
          <button
            onClick={toggleEdit}
            className="styled-button text-black bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition duration-300"
          >
            {isEditing ? 'Save' : 'Edit Profile'}
          </button>
          <button className="styled-button text-black bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition duration-300">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
