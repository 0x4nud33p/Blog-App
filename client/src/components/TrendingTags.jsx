import React from 'react'
import { Hash, TrendingUp } from 'lucide-react'

const trendingHashtags = ["#ReactJS", "#WebDev", "#CodingTips", "#FrontEnd", "#JavaScript"]

function TrendingTags() {
  return (
    <div className="md:w-1/4 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <TrendingUp className="mr-2" />
                Trending Hashtags
              </h2>
              <ul className="space-y-2">
                {trendingHashtags.map((hashtag, index) => (
                  <li key={index} className="flex items-center hover:text-gray-300 cursor-pointer">
                    <Hash className="mr-1" size={16} />
                    {hashtag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
  )
}

export default TrendingTags 