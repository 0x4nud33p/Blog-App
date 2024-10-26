import React from 'react';

function Profile() {
  return (
    <div className="bg-gradient-to-b from-[#2F2B68] via-[#312B65] to-[#5f1831] mt-[80px] flex justify-center p-4">
      <div className="rounded-lg bg-white bg-opacity-10 shadow-lg p-6 w-full max-w-md hover:bg-opacity-20 transition duration-300">
        <div className="flex items-center mb-4">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
          <div className="ml-4">
            <h3 className="text-2xl font-semibold text-white">John Doe</h3>
            <p className="text-gray-300">john.doe@example.com</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">Bio: A short bio about John Doe.</p>
        <div className='flex align-center justify-center space-x-6'>
          <button className="styled-button text-black bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition duration-300">
          Edit Profile
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
