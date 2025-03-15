// InspiringMessages.tsx
import React, { useEffect, useState } from 'react';

/**
 * A simple component that displays a rotating set of inspiring messages,
 * no props required.
 */
const InspiringMessages: React.FC = () => {
  // You can edit or expand these messages as you like
  const messages = [
    "Keep stitching your dreams together!",
    "A single thread of hope is still a strong thread.",
    "Stay warm with cozy yarn and warm words.",
    "Every stitch is a story waiting to unfold."
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Move to the next index, wrapping around when needed
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000); // Change message every 5 seconds

    return () => clearInterval(intervalId);
  }, [messages.length]);

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-md shadow-md backdrop-blur-sm">
      {messages[currentIndex]}
    </div>
  );
};

export default InspiringMessages;
