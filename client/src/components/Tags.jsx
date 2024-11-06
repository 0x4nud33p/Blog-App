import React from 'react';
import '../styles/categories.css';
import { hashtags } from '../utils/hashtags.js';

export default function Tags({ onSelectTag }) {
  return (
    <div className="card mt-8 sm:mt-12">
      <div className="card__tags">
        <ul className="flex flex-wrap justify-center gap-3">
          {hashtags.map((category) => (
            <li key={category.category} className="tag__name">
              <span
                onClick={() => onSelectTag(category.category)}
                className="cursor-pointer hover:underline text-sm sm:text-base px-4 py-2 bg-[#3b3b68] rounded-full"
              >
                {category.category}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
