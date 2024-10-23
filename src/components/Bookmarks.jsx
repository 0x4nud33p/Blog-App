import React from 'react';

function Bookmarks() {
  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-lg hover:bg-opacity-20 transition duration-300">
      <h3 className="text-xl font-semibold mb-2">Bookmarks</h3>
      <ul className="space-y-2">
        <li className="text-gray-300">Blog Post 1</li>
        <li className="text-gray-300">Blog Post 2</li>
        <li className="text-gray-300">Blog Post 3</li>
      </ul>
    </div>
  );
}

export default Bookmarks;
