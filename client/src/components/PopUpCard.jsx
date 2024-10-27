import { useState } from 'react';
import { BlogEditor } from '../../Exports.js';

export default function PopUpCard({ onClose }) {
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
          <label className='text-black'>Upload Image</label>
          <input 
            placeholder="Image description" 
            type='file'
            className="w-full md:w-auto p-1 border border-gray-300 rounded-md" 
          />
        </div>
        <div className="flex flex-col md:flex-row items-center px-6 mb-4 space-y-2 md:space-y-0 md:space-x-2">
          <input 
            placeholder="Blog Heading" 
            className="w-full md:w-auto p-2 border border-gray-300 rounded-md" 
          />
          <button className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Generate using AI
          </button>
        </div>

        <div className="px-6 pb-6">
          <BlogEditor />
        </div>
      </div>
    </div>
  );
}
