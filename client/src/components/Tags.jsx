import React from 'react';
import '../styles/categories.css';

const tags = [
  'JS', 'wordpress', 'uiverse', 'Css', 'html', 'go', 'java', 'ux/ui', 'figma',
  'wordpress', 'uiverse', 'Css', 'html', 'go', 'java', 'ux/ui', 'figma',
  'wordpress', 'uiverse', 'Css', 'html', 'go', 'java', 'ux/ui', 'figma',
  'wordpress', 'uiverse', 'Css', 'html', 'go', 'java', 'ux/ui', 'figma',
  'wordpress', 'uiverse', 'Css', 'html', 'go', 'java', 'ux/ui', 'figma',
];

export default function Tags() {
  return (
    <div className="card mt-20">
      <span className="title text-white">All tags</span>
      <div className="card__tags">
        <ul className="tag">
          {tags.map((tag, index) => (
            <li key={index} className="tag__name">{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
