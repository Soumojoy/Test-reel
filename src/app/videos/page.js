"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const Reelpage = () => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const videoRefs = useRef([]);
    const scrollContainerRef = useRef(null);
    
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await fetch('https://gemini-polly-new.onrender.com/api/media');
                const data = await res.json();
                const reversedMedia = (data.videos|| []).reverse(); // 👈 reverse to get latest first
                setVideos(reversedMedia);
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchVideos();
    }, []);
    
    

    useEffect(() => {
        // Initialize refs array with the correct length
        videoRefs.current = videoRefs.current.slice(0, videos.length);
        
        const handleIntersection = (entries) => {
            entries.forEach(entry => {
                // Get the index from the data attribute
                const index = parseInt(entry.target.dataset.index, 10);
                
                if (entry.isIntersecting) {
                    setCurrentVideoIndex(index);
                    // Try to play the video that's in view
                    if (videoRefs.current[index]) {
                        videoRefs.current[index].currentTime = 0;
                        videoRefs.current[index].play().catch(e => 
                            console.log('Autoplay prevented:', e)
                        );
                    }
                } else {
                    // Pause videos that are not in view
                    if (videoRefs.current[index]) {
                        videoRefs.current[index].pause();
                    }
                }
            });
        };

        // Set up intersection observer
        const options = {
            root: scrollContainerRef.current,
            rootMargin: '0px',
            threshold: 0.7 // Video is considered in view when 70% visible
        };
        
        const observer = new IntersectionObserver(handleIntersection, options);
        
        // Observe all video containers
        const videoContainers = document.querySelectorAll('.video-container');
        videoContainers.forEach(container => {
            observer.observe(container);
        });

        return () => {
            if (videoContainers) {
                videoContainers.forEach(container => {
                    observer.unobserve(container);
                });
            }
        };
    }, [videos]);

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-xl">Loading videos...</div>
            </div>
        );
    }

    if (videos.length === 0) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-xl">No videos found</div>
            </div>
        );
    }

    return (

        <>
       
        <div className="fixed inset-0 bg-black text-white flex flex-col">
            {/* Fixed Header */}
            <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center mx-4">
                <h2 className="text-xl font-bold">AI Generated Videos</h2>
                <Link href='/create'>
                <button className="flex items-center gap-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          + create
        </button>
                </Link>
               
                
            </div>
            
            {/* Scrollable video container */}
            <div 
                ref={scrollContainerRef}
                className="absolute inset-0 overflow-y-scroll snap-y snap-mandatory"
            >
                {videos.map((videoUrl, index) => (
                    <div 
                        key={index}
                        className="video-container h-full w-full flex items-center justify-center snap-start snap-always"
                        data-index={index}
                    >
                        <video 
                            ref={el => videoRefs.current[index] = el}
                            src={videoUrl}
                            className="h-full w-full object-contain"
                            playsInline
                            loop
                            muted={false}
                            controls={false}
                            onClick={(e) => {
                                if (videoRefs.current[index].paused) {
                                    videoRefs.current[index].play();
                                } else {
                                    videoRefs.current[index].pause();
                                }
                                e.stopPropagation();
                            }}
                        />
                    </div>
                ))}
            </div>
            
            {/* Fixed Side Controls */}
            <div className="absolute right-4 bottom-24 z-10 flex flex-col space-y-6">
                <button className="w-12 h-12 bg-gray-800 bg-opacity-50 rounded-full flex items-center justify-center">
                    ❤️
                </button>
                <button className="w-12 h-12 bg-gray-800 bg-opacity-50 rounded-full flex items-center justify-center">
                    💬
                </button>
                <button className="w-12 h-12 bg-gray-800 bg-opacity-50 rounded-full flex items-center justify-center">
                    ↪️
                </button>
            </div>
            
            {/* Fixed Bottom Info */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black to-transparent">
                <div className="text-sm truncate max-w-xs">
                    {videos[currentVideoIndex]?.split('/').pop() || ''}
                </div>
            </div>
        </div>
        
        </>
    );
};

export default Reelpage;