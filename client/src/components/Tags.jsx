import React from 'react';
import '../styles/categories.css';
import { hashtags } from '../utils/hashtags.js';

export default function Tags({ onSelectTag }) {
  return (
    <div className="card mt-20">
      <div className="card__tags">
        <ul className="tag">
          {hashtags.map((category) => (
            <li key={category.category} className="tag__name">
              <span
                onClick={() => onSelectTag(category.category)}
                className="cursor-pointer hover:underline"
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
