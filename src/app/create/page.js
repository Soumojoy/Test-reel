'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx'; // 🛑 Make sure to install clsx => npm install clsx

const InputForm = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const [videos, setVideos] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [showFirstVideo, setShowFirstVideo] = useState(true); // toggle between two videos
  
    useEffect(() => {
      const fetchVideos = async () => {
        const res = await fetch('https://api.pexels.com/videos/search?query=sports&per_page=15', {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PEXELS_API_KEY}`, // 🔥 Your Pexels API Key
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

  const handleSubmit = async () => {
    if (!input.trim()) return; // prevent empty submissions

    setIsLoading(true);
    setResponse('');
    setVideoUrl('');

    try {
      const res = await fetch('https://gemini-polly-new.onrender.com/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      setResponse(data.message);
      setVideoUrl(data.videoUrl);
    } catch (err) {
      console.error('Error:', err);
      setResponse('Failed to send request.');
      setVideoUrl('');
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-4">
     
            
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
        
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      <div className="relative z-10 max-w-md w-full p-8 bg-black/50 backdrop-blur-md rounded-2xl shadow-lg text-center font-sans">

        <h2 className="text-2xl font-semibold text-white-800 mb-4">
     
          Create AI-Powered 30sec  Sports Journal
        </h2>

        <p className="text-white text-sm mb-6">
          Enter the name of your favorite sports celebrity, and we will generate a
          short AI-powered video combining their career history, realistic voice-over,
          and visuals — all built with cutting-edge tech.
        </p>

        <Link href='/videos'>
        <p className="text-[#836FFF] text-sm mb-6" > See created Videos </p> 
        </Link>

       

        <input
          type="text"
          value={input}
          placeholder="Enter a sports celebrity name"
          onChange={(e) => setInput(e.target.value)}
          className="text-[#836FFF]  w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#836FFF] mb-4 placeholder-gray-400"
        />

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#836FFF] hover:bg-white hover:text-black' 
          } text-white font-medium py-3 rounded-lg transition duration-300`}
        >
          {isLoading ? 'Generating...' : 'Submit'}
        </button>

        <div className="mt-6">
          {isLoading && (
            <p className="text-blue-500 font-medium animate-pulse">
              Please wait... Generating your reel.
            </p>
          )}

          {!isLoading && response && (
            <>
              <p className="text-green-600 font-semibold mb-2">{response}</p>
              {videoUrl && (
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline break-words"
                >
                  🎬 Watch Video
                </a>
              )}
            </>
          )}
        </div>
     
      </div>
    
    </div>
  );
};

export default InputForm;
