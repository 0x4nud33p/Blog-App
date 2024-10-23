import React from 'react';

function Profile() {
  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-lg hover:bg-opacity-20 transition duration-300">
      <h3 className="text-xl font-semibold mb-2">Profile</h3>
      <div className="space-y-4">
        <p className="text-gray-300">Name: John Doe</p>
        <p className="text-gray-300">Email: john.doe@example.com</p>
        <p className="text-gray-300">Bio: A short bio about John Doe.</p>
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition duration-300 mt-4">
        Edit Profile
      </button>
    </div>
  );
}

export default Profile;
