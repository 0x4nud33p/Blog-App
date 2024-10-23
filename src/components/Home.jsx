import React from 'react';
import Lottie from 'lottie-react';
import '../styles/loginbtn.css';
import animationData from '../utils/bloganimatio.json';
import { ArrowRight, BookOpen, Edit, Settings, TrendingUp } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-[#2F2B68] via-[#312B65] to-[#5f1831] min-h-screen text-white font-sans">
      <main className="flex flex-col lg:flex-row items-center justify-center lg:justify-between mt-16 pt-10 lg:space-x-16 space-y-8 lg:space-y-0 px-4 lg:px-16">
        <div className="lg:w-1/2 text-center lg:text-left space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Your Ideas, Your Voice, Your Blog
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Create, share, and grow your audience with our powerful and intuitive blogging platform.
          </p>
            <button className='p-2 rounded'>Get Started!</button>
        </div>
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          {/* <Lottie animationData={animationData} loop={true} className="max-w-full h-auto" /> */}
        </div>
      </main>
      <footer className="mt-16 py-8 text-center">
  <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
        Start Your Blogging Journey Today
      </h2>
      <p className="max-w-[900px] text-gray-500 md:text-xl lg:text-base xl:text-xl dark:text-gray-400">
        Join thousands of content creators who have found their voice with BlogApp. Sign up now and get your first month free!
      </p>
    </div>
  </div>
</footer>

    </div>
  );
};

export default Home;
