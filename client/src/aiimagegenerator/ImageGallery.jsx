import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("nature");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: { query, per_page: 10 },
            headers: {
              Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
            }
          }
        );
        setImages(response.data.results);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [query]);

  return (
    <div>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search images" 
        className="border p-2 rounded mb-4"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="bg-gray-200 rounded overflow-hidden shadow-lg">
            <img src={image.urls.small} alt={image.alt_description} className="w-full h-48 object-cover" />
            <p className="p-2 text-sm text-gray-700">{image.alt_description || "Untitled"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
