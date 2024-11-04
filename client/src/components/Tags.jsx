import React from 'react';
import '../styles/categories.css';
import {hashtags} from '../utils/hashtags.js';



export default function Tags() {
  return (
    <div className="card mt-20">
      <div className="card__tags">
        <ul className="tag">
          {hashtags.map((tag, index) => (
            <li key={tag} className="tag__name">{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
