'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx'; // 🛑 Make sure to install clsx => npm install clsx

export default function HeroSection() {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showFirstVideo, setShowFirstVideo] = useState(true); // toggle between two videos

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch('https://api.pexels.com/videos/search?query=sports&per_page=15', {
        headers: {
          Authorization: 'RhhQlLLNtTCHFRDnLREDOnI7ZHHlTrw29l57rwSXHeszWyTmxiznR2PM', // 🔥 Your Pexels API Key
        },
      });
      const data = await res.json();
      setVideos(data.videos);
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    if (videos.length === 0) return;

    const interval = setInterval(() => {
      setShowFirstVideo((prev) => !prev); // swap the video showing
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, [videos]);

  const currentVideo = videos[currentVideoIndex];
  const nextVideo = videos[(currentVideoIndex + 1) % videos.length];

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      
      {/* Two Videos Layered */}
      {currentVideo && (
        <video
          key={currentVideo.id}
          src={currentVideo.video_files[0]?.link}
          autoPlay
          muted
          loop
          playsInline
          className={clsx(
            'absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 z-0',
            showFirstVideo ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}

      {nextVideo && (
        <video
          key={nextVideo.id}
          src={nextVideo.video_files[0]?.link}
          autoPlay
          muted
          loop
          playsInline
          className={clsx(
            'absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 z-0',
            showFirstVideo ? 'opacity-0' : 'opacity-100'
          )}
        />
      )}

      {/* Overlay to darken the video slightly */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

      {/* Main Content */}
      <div className="font-sans p-8 bg-none relative rounded-lg z-20">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl text-white">AI-Generated Sports Videos</h1>
          <p className="text-lg mt-4 text-white">
            <b>Create Personalized Sports Videos in Seconds!</b> Turn your favorite sports moments into dynamic 30-second videos with the power of AI! Simply enter the name of a sports personality, and watch as our platform crafts a visually stunning video celebrating their achievements, highlights, and iconic moments. Whether you're a fan, a sports analyst, or a brand, our platform provides a quick, easy, and innovative way to create shareable sports content. Dive into the world of sports like never before and let your creativity shine—start generating your personalized sports videos today!
          </p>
        </section>

        {/* Navigation Divs */}
        <div className="flex justify-center gap-8">
          <Link href="/create">
            <button className="px-8 py-4 bg-black text-white rounded-lg text-lg text-center transition duration-300 hover:border-2 hover:bg-white hover:cursor-pointer hover:text-black hover:border-white">
              🎥 Create Video
            </button>
          </Link>
          <Link href="/videos">
            <button className="px-8 py-4 bg-gray border-1 border-white text-white rounded-lg text-lg text-center transition duration-300 shadow-lg  hover:bg-white hover:text-black hover:curser-pointer">
              📺 View Videos
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
