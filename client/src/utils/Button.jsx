import React from 'react';

const Button = ({ 
  onClick, 
  text, 
  icon, 
  className, 
  disabled = false 
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white shadow hover:bg-black/90 h-9 px-4 py-2 max-w-52 whitespace-pre md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-black hover:ring-offset-2 ${className}`}
      disabled={disabled}
    >
      <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
      <div className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        <span className="ml-1 text-white">{text}</span>
      </div>
      <div className="ml-2 flex items-center gap-1 text-sm md:flex">
      </div>
    </button>
  );
};

export default Button;
