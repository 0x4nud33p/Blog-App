'use client'

import { useState } from 'react';
import { BlogEditor } from '../../Exports.js'

export default function PopUpCard({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
      <div className="bg-white w-[1000px] h-[500px] rounded-lg shadow-lg relative">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-black">Write A Blog</h2>
          <button 
            className="absolute right-2 top-2 p-2 rounded-3xl text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>
        <p className="text-gray-600 p-4">AI Image Genaration component goes here</p>
        <div className="px-6 pb-6">
          <BlogEditor />
        </div>
      </div>
    </div>
  );
}
