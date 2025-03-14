import React from 'react'

interface BookCoverProps {
  bookId: string;
}

const BookCover: React.FC<BookCoverProps> = ({ bookId }) => {
  const getBookCoverStyle = (id: string) => {
    switch (id) {
      case 'needle-and-yarn':
        return {
          bgGradient: 'from-blue-500 to-purple-500',
          icon: '🧶',
          iconBackground: 'bg-white/10'
        };
      case 'crochet-mastery':
        return {
          bgGradient: 'from-pink-500 to-rose-500',
          icon: '🧵',
          iconBackground: 'bg-white/10'
        };
      default:
        return {
          bgGradient: 'from-gray-500 to-gray-600',
          icon: '📚',
          iconBackground: 'bg-white/10'
        };
    }
  };

  const coverStyle = getBookCoverStyle(bookId);

  return (
    <div className={`w-full aspect-[2/3] rounded-lg bg-gradient-to-br ${coverStyle.bgGradient} p-4 flex items-center justify-center relative overflow-hidden group`}>
      <div className={`absolute inset-0 opacity-30 bg-grid-white/10 transition-opacity duration-300 group-hover:opacity-40`} />
      <div className={`text-6xl ${coverStyle.iconBackground} p-4 rounded-full backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}>
        {coverStyle.icon}
      </div>
    </div>
  );
};

export default BookCover;
