'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const InputForm = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="relative min-h-screen bg-[url('https://plus.unsplash.com/premium_photo-1685055940344-26d89db70a0f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center flex items-center justify-center px-4">
        
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      <div className="relative z-10 max-w-md w-full p-8 bg-white/90 rounded-2xl shadow-lg text-center font-sans">

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
     
          Create AI-Powered Sports History Reel
        </h2>

        <p className="text-gray-700 text-sm mb-6">
          Enter the name of your favorite sports celebrity, and we will generate a
          short AI-powered video combining their career history, realistic voice-over,
          and visuals — all built with cutting-edge tech.
        </p>

        <Link href='/videos'>
        <p className="text-blue-700 text-sm mb-6" > See created Videos </p> 
        </Link>

       

        <input
          type="text"
          value={input}
          placeholder="Enter a celebrity name"
          onChange={(e) => setInput(e.target.value)}
          className="text-black w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
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
