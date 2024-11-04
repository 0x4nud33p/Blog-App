import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#601730] via-[#601730] to-[#601730] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#D3B0FF]">About Our Blog</h3>
          <p className="text-[#AEAEAE]">
            Discover insightful articles and stay updated with the latest trends in technology, lifestyle, and more.
          </p>
          <div className="flex space-x-4">
            <Link to="#" className="text-[#AEAEAE] hover:text-[#D3B0FF]">
              <span className="sr-only">Twitter</span>
            </Link>
            <Link to="#" className="text-[#AEAEAE] hover:text-[#D3B0FF]">
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#D3B0FF]">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-[#AEAEAE] hover:text-[#D3B0FF]">Home</Link>
            </li>
            <li>
              <Link to="/categories" className="text-[#AEAEAE] hover:text-[#D3B0FF]">Categories</Link>
            </li>
            <li>
              {/* <Link to="/bookmarks" className="text-[#AEAEAE] hover:text-[#D3B0FF]">Bookmarks</Link> */}
            </li>
            <li>
              <Link to="/profile" className="text-[#AEAEAE] hover:text-[#D3B0FF]">Profile</Link>
            </li>
          </ul>
        </div>

       
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#D3B0FF]">Contact Us</h3>
          <p className="text-[#AEAEAE]">
            Have questions? Reach out to us via email or follow us on social media for updates.
          </p>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-xs text-[#AEAEAE]">
        &copy; 2024 BlogApp. All rights reserved.
      </div>
    </footer>
  );
}
