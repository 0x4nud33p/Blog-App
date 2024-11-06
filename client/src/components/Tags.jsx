import React from 'react';
import '../styles/categories.css';
import { hashtags } from '../utils/hashtags.js';

export default function Tags({ onSelectTag }) {
  return (
    <div className="card mt-8 sm:mt-12 bg-[#0b0c14]">
      <div className="card__tags">
        <ul className="flex flex-wrap justify-center gap-3">
          {hashtags.map((category) => (
            <li key={category.category} className="tag__name font-Cabin bg-[#0b0c14]">
              <span
                onClick={() => onSelectTag(category.category)}
                className="cursor-pointer font-Cabin text-sm sm:text-base px-4 py-2 rounded-full"
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
