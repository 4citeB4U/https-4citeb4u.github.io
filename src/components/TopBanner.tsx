import React from 'react';

// This component creates the fixed top banner with the title and scrolling text effect
const TopBanner = ({ title = "Leola's Digital Library", subtitle = "A collection of heartwarming stories and guides by Leola \"Sista\" Lee" }) => {
  return (
    <>
      {/* Fixed Banner Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-black/90 backdrop-blur-md border-b border-yellow-500/30 shadow-lg shadow-yellow-500/10 pt-6 pb-4">
        <h1 className="text-5xl font-bold text-center text-yellow-500 animate-glow [text-shadow:_0_0_20px_rgba(234,179,8,0.7)]">
          {title}
        </h1>
        <p className="text-xl text-gray-300 text-center mt-2">
          {subtitle}
        </p>
      </div>
      
      {/* Add these CSS animations to your main CSS or use a style tag */}
      <style>{`
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px rgba(234,179,8,0.7); }
          50% { text-shadow: 0 0 20px rgba(234,179,8,0.9), 0 0 30px rgba(234,179,8,0.3); }
        }
        
        .animate-glow {
          animation: glow 2s infinite;
        }
      `}</style>
    </>
  );
};

// Scrolling Words Component to add alongside the TopBanner
export const ScrollingWords = () => {
  const inspirationalWords = [
    "Creativity",
    "Love",
    "Connection",
    "Harmony",
    "Embrace",
    "Passion",
    "Stitch",
    "Weave",
    "Create",
    "Dream",
    "Craft",
    "Inspire",
    "Imagine",
    "Bloom",
    "Journey",
    "Heart",
    "Soul",
    "Spirit",
    "Warmth",
    "Family",
    "Tradition",
    "Legacy",
    "Beauty",
    "Wonder",
    "Magic"
  ];
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
      <div className="absolute bottom-0 right-10 w-40 h-full">
        <div className="scrolling-words-container">
          {inspirationalWords.map((word, index) => (
            <div 
              key={index} 
              className="scrolling-word text-right"
              style={{ 
                animationDelay: `${index * 3}s`,
                opacity: Math.random() * 0.5 + 0.3 
              }}
            >
              {word}
            </div>
          ))}
        </div>
      </div>
      
      {/* CSS for scrolling words animation */}
      <style>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(100vh);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px);
            opacity: 0;
          }
        }
        
        .scrolling-words-container {
          position: relative;
          height: 100%;
          width: 100%;
        }
        
        .scrolling-word {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100%;
          font-family: 'serif', Times, serif;
          font-size: 24px;
          font-weight: bold;
          color: gold;
          text-shadow: 0 0 15px rgba(234,179,8,0.7);
          animation: scrollUp 45s linear infinite;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

export default TopBanner;
