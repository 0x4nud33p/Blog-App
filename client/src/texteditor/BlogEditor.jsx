import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function BlogEditor() {
  const [content, setContent] = useState('');

  const handleContentChange = (value) => {
    setContent(value);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link'],
      ['clean'],
    ],
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <ReactQuill 
        value={content}
        onChange={handleContentChange}
        theme="snow"
        modules={modules}
        className="bg-white text-black"
      />
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => console.log(content)}
      >
        Save Blog
      </button>
    </div>
  );
}
