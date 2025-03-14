import React from 'react'

interface PageContent {
  title: string;
  content: string;
}

interface PageFlipAnimationProps {
  isAnimating: boolean;
  direction: 'next' | 'prev';
  onAnimationComplete: () => void;
  currentContent: PageContent;
  nextContent: PageContent;
  fontSize: number;
}

const PageFlipAnimation: React.FC<PageFlipAnimationProps> = ({
  isAnimating,
  direction,
  onAnimationComplete,
  currentContent,
  nextContent,
  fontSize
}) => {
  return (
    <div className="relative w-full h-full overflow-hidden page-turn-animation">
      {/* Current page */}
      <div
        className={`absolute inset-0 p-8 page-content bg-black/40 backdrop-blur origin-left
          ${isAnimating ? (direction === 'next' ? 'animate-page-out' : 'animate-page-in') : ''}`}
        style={{ fontSize: `${fontSize}px` }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-blue-300">
            {currentContent.title}
          </h2>
          {currentContent.content.split('\n\n').map((paragraph, index) => (
            <p
              key={index}
              className="mb-4 leading-relaxed whitespace-pre-wrap text-gray-100"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Next page */}
      <div
        className={`absolute inset-0 p-8 page-content bg-black/40 backdrop-blur origin-left
          ${isAnimating ? (direction === 'next' ? 'animate-page-in' : 'animate-page-out') : ''}`}
        style={{ fontSize: `${fontSize}px` }}
        onAnimationEnd={onAnimationComplete}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-blue-300">
            {nextContent.title}
          </h2>
          {nextContent.content.split('\n\n').map((paragraph, index) => (
            <p
              key={index}
              className="mb-4 leading-relaxed whitespace-pre-wrap text-gray-100"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageFlipAnimation;
