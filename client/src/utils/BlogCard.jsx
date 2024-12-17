import React, { useState } from 'react';
import { CalendarDays, Clock, User, ChevronRight } from 'lucide-react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import axios from 'axios';

export default function BlogCard({
  title,
  excerpt,
  date,
  author,
  imageUrl,
  isBookmarked,
  bookmarkCount,
  blogid,
}) {
  const [showFullContent, setShowFullContent] = useState(false);

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const wordCount = text ? text.split(" ").length : 0;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min`;
  };

  const readingTime = calculateReadingTime(excerpt);

  const handleToggleBookmark = async () => {
  try {
    const userDetails = localStorage.getItem("userDetails");
    const token = localStorage.getItem("token");

    if (userDetails && token) {
      const { _id: userId } = JSON.parse(userDetails);

      const response = await axios.post(
        `${import.meta.env.VITE_PRODUCTION_URL}/user/blog/${userId}/togglebookmark`,
        { blogid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.message);

    } else {
      console.error("User details or token not found.");
    }
  } catch (error) {
    console.error("Error toggling bookmark:", error);
  }
};

  return (
    <div className="overflow-hidden rounded-lg text-white bg-card text-card-foreground shadow-md transition-all hover:shadow-lg bg-[#616a93] font-Cabin bg-opacity-10 p-4 hover:bg-opacity-20">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-1/3 flex-shrink-0">
          <img
            alt={title}
            className="h-48 w-full object-cover rounded-lg sm:h-40"
            src={imageUrl}
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">{title}</h3>
            <p
              className="text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: showFullContent ? excerpt : `${excerpt.substring(0, 100)}...` }}
            ></p>
          </div>
          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{author}</span>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <CalendarDays className="mr-1 h-4 w-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span>{readingTime} read</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span
                onClick={() => setShowFullContent(!showFullContent)}
                className="inline-flex items-center text-sm font-medium text-primary hover:underline cursor-pointer"
              >
                {showFullContent ? 'Show less' : 'Read more'}
                <ChevronRight className="ml-1 h-4 w-4" />
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleToggleBookmark}
                  className={`p-1 rounded-full hover:bg-opacity-75 transition-colors`}
                  aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                >
                <FaRegBookmark className="h-4 w-4" />
                </button>
                  {bookmarkCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
