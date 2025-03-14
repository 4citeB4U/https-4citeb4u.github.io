import React, { useState, useRef, useEffect } from 'react'
import { Volume2, ChevronLeft, ChevronRight, Gift, Settings, Home, X, Book, List } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'
import BookCover from './BookCover'
import LeolasBackground from './LeolasBackground'
import PaymentOverlay from './PaymentOverlay'
import PageFlipAnimation from './PageFlipAnimation'

// Book collection data
const books = [
  {
    id: 'needle-and-yarn',
    title: "Needle & Yarn: A Love Stitched in Time",
    author: "Leola (Sista) Lee",
    description: "A heartwarming tale of love between crafting tools. Follow Needle and Yarn as they navigate challenges, form deep bonds, and create beautiful projects together.",
    pages: [
      {
        title: "Dedication",
        content: "To all who have ever felt the magic in a simple stitch...\n\nAnd to those who understand that the greatest masterpieces are woven not just with thread, but with love."
      },
      {
        title: "Chapter 1: A Tangled Beginning",
        content: "In the cozy confines of Leola's sewing basket, where crafting dreams came to life, lived two unlikely friends: a silver needle named Sterling and a ball of soft blue yarn called Azure.\n\nSterling was known for their precision and grace, always standing tall and proud. Azure, on the other hand, was free-spirited and flowing, ready to unravel into any shape or pattern that called to them.\n\n'You know,' Azure said one day, wrapping a gentle loop around Sterling, 'we make quite the team when we work together.'\n\nSterling couldn't help but smile, their metallic surface catching the warm light of the afternoon sun. 'Indeed we do, though I must admit, I was quite nervous about working with you at first.'"
      },
      {
        title: "Chapter 2: Weaving Trust",
        content: "As days turned into weeks, Sterling and Azure found themselves collaborating on increasingly complex projects. From simple scarves to intricate doilies, each creation strengthened their bond.\n\n'Do you remember our first project together?' Azure chuckled, reminiscing about the slightly crooked potholder they had made.\n\nSterling nodded, their eye gleaming. 'How could I forget? You were so excited, you nearly tangled yourself into knots!'\n\n'But you were patient with me,' Azure replied softly. 'You helped me find my way, stitch by stitch.'"
      }
    ]
  },
  {
    id: 'crochet-mastery',
    title: "Crochet Mastery: A Complete Guide",
    author: "Leola (Sista) Lee",
    description: "A comprehensive guide to mastering the art of crochet. From basic stitches to complex techniques, this guide has everything you need to become a crochet master.",
    pages: [
      {
        title: "Introduction",
        content: "Welcome to the wonderful world of crochet!\n\nIn these pages, you'll discover not just techniques and patterns, but a craft that has brought joy and comfort to generations of creators. Whether you're picking up a hook for the first time or looking to expand your skills, this guide will help you unlock the full potential of your creativity."
      },
      {
        title: "Chapter 1: Getting Started",
        content: "Your journey begins with selecting the right tools. A good crochet hook is like a trusted friend – it should feel comfortable in your hand and work smoothly with your chosen yarn.\n\nFor beginners, I recommend starting with a medium-sized hook (5.5mm or I-9) and a light-colored, worsted weight yarn. This combination allows you to see your stitches clearly and work at a comfortable tension.\n\nHolding Your Hook:\n1. Pencil Grip: Hold the hook like you would a pencil\n2. Knife Grip: Hold the hook like you would a knife\n\nBoth methods are correct – choose the one that feels most natural to you."
      },
      {
        title: "Chapter 2: Basic Stitches",
        content: "The Chain Stitch (ch):\nThis is the foundation of most crochet projects. Think of it as creating a string of pearls, each loop connecting to the next.\n\nSingle Crochet (sc):\nThe most basic of all crochet stitches, creating a tight, sturdy fabric. Perfect for amigurumi and items that need structure.\n\nDouble Crochet (dc):\nA taller stitch that works up quickly and creates a more open, flexible fabric. Ideal for blankets and garments.\n\nPractice Tip: Work these stitches in rows until they become muscle memory. Remember, consistency comes with time and patience."
      }
    ]
  }
];

const LeolasDigitalLibrary: React.FC = () => {
  // State management
  const [view, setView] = useState<'library' | 'reader'>('library');
  const [selectedBook, setSelectedBook] = useState<typeof books[0] | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [particleCount, setParticleCount] = useState(50);
  const [speechRate, setSpeechRate] = useState(1);
  
  // Page flip animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev'>('next');
  const [nextPageNum, setNextPageNum] = useState(0);
  
  const speechSynthesis = useRef<SpeechSynthesis | null>(null);
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Initialize speech synthesis
  useEffect(() => {
    if (window.speechSynthesis) {
      speechSynthesis.current = window.speechSynthesis;
      return () => {
        if (currentUtterance.current) {
          speechSynthesis.current?.cancel();
        }
      };
    }
  }, []);
  
  // Speech synthesis functions
  const speak = (text: string) => {
    if (speechSynthesis.current) {
      stopSpeaking();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = speechRate;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      currentUtterance.current = utterance;
      speechSynthesis.current.speak(utterance);
    }
  };
  
  const stopSpeaking = () => {
    if (speechSynthesis.current && currentUtterance.current) {
      speechSynthesis.current.cancel();
      currentUtterance.current = null;
      setIsSpeaking(false);
    }
  };
  
  // Open book
  const openBook = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      setSelectedBook(book);
      setCurrentPage(0);
      setView('reader');
    }
  };
  
  // Close reader and return to library
  const returnToLibrary = () => {
    stopSpeaking();
    setView('library');
    setSelectedBook(null);
    setCurrentPage(0);
  };
  
  // Read current page
  const readCurrentPage = () => {
    if (selectedBook?.pages[currentPage]) {
      speak(selectedBook.pages[currentPage].content);
    }
  };
  
  // Start page turn animation
  const startPageTurn = (direction: 'next' | 'prev', targetPage: number) => {
    if (isAnimating) return;
    
    stopSpeaking();
    setIsAnimating(true);
    setAnimationDirection(direction);
    setNextPageNum(targetPage);
  };
  
  // Change page with animation
  const changePage = (newPage: number) => {
    if (isAnimating || !selectedBook || newPage === currentPage) return;
    
    if (newPage >= 0 && newPage < selectedBook.pages.length) {
      const direction = newPage > currentPage ? 'next' : 'prev';
      startPageTurn(direction, newPage);
    }
  };
  
  // Handle animation completion
  const handleAnimationComplete = () => {
    setCurrentPage(nextPageNum);
    setIsAnimating(false);
  };
  
  // Get current and next page content for animation
  const getCurrentPageContent = () => {
    return selectedBook?.pages[currentPage] || { title: '', content: '' };
  };
  
  const getNextPageContent = () => {
    return selectedBook?.pages[nextPageNum] || { title: '', content: '' };
  };

  // Render library view
  const LibraryView = () => (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-blue-500/20 py-6">
        <h1 className="text-4xl font-bold text-center text-white [text-shadow:_0_0_10px_rgba(6,182,212,0.5)]">
          Leola Lee's Library
        </h1>
        <p className="text-xl text-gray-300 text-center mt-2">
          A collection of heartwarming stories and guides by Leola "Sista" Lee
        </p>
      </header>

      <main className="container mx-auto px-4 pt-40 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {books.map(book => (
            <Card key={book.id} className="bg-transparent backdrop-blur-md border-blue-500/20 hover:shadow-blue-500/20 hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="text-blue-300">{book.title}</CardTitle>
                <p className="text-gray-400">by {book.author}</p>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <BookCover bookId={book.id} />
                </div>
                <p className="text-gray-300 mb-4">{book.description}</p>
              </CardContent>
              <CardFooter>
                <button 
                  onClick={() => openBook(book.id)}
                  className="w-full bg-blue-600/80 hover:bg-blue-700/80 text-white py-2 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Book className="h-4 w-4" />
                  Read Now
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
  
  // Render reader view
  const ReaderView = () => {
    if (!selectedBook) return null;
    
    const totalPages = selectedBook.pages.length;
    const currentPageData = selectedBook.pages[currentPage];
    
    return (
      <div className="container mx-auto px-4 py-4 flex flex-col min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <button
              onClick={returnToLibrary}
              className="p-2 rounded-md bg-blue-900/80 hover:bg-blue-800 text-white transition-colors"
              title="Return to Library"
            >
              <Home className="h-5 w-5" />
            </button>
            <button
              onClick={readCurrentPage}
              disabled={isSpeaking}
              className="p-2 rounded-md bg-blue-900/80 hover:bg-blue-800 text-white transition-colors"
              title="Read Page"
            >
              <Volume2 className={`h-5 w-5 ${isSpeaking ? 'animate-pulse' : ''}`} />
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-md bg-blue-900/80 hover:bg-blue-800 text-white transition-colors"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowTableOfContents(true)}
              className="p-2 rounded-md bg-blue-900/80 hover:bg-blue-800 text-white transition-colors"
              title="Table of Contents"
            >
              <List className="h-5 w-5" />
            </button>
          </div>

          <div className="text-center">
            <h1 className="text-xl font-semibold text-white">{selectedBook.title}</h1>
            <p className="text-sm text-gray-300">Page {currentPage + 1} of {totalPages}</p>
          </div>

          <button
            onClick={() => setShowPayment(true)}
            className="px-3 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-md transition-colors flex items-center gap-2"
          >
            <Gift className="w-4 h-4" />
            Support the Author
          </button>
        </div>

        <div className="flex-grow relative rounded-lg overflow-hidden border border-blue-500/20 bg-black/40 backdrop-blur">
          {isAnimating ? (
            <PageFlipAnimation
              isAnimating={isAnimating}
              direction={animationDirection}
              onAnimationComplete={handleAnimationComplete}
              currentContent={getCurrentPageContent()}
              nextContent={getNextPageContent()}
              fontSize={fontSize}
            />
          ) : (
            <div
              className="h-full overflow-y-auto p-8"
              style={{ fontSize: `${fontSize}px` }}
            >
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-blue-300">
                  {currentPageData.title}
                </h2>
                {currentPageData.content.split('\n\n').map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-4 leading-relaxed whitespace-pre-wrap text-gray-100"
                    onClick={() => speak(paragraph)}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 0 || isAnimating}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              currentPage === 0 || isAnimating
                ? 'bg-blue-900/50 text-blue-300/50 cursor-not-allowed'
                : 'bg-blue-700 hover:bg-blue-600 text-white'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            Previous
          </button>

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages - 1 || isAnimating}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              currentPage === totalPages - 1 || isAnimating
                ? 'bg-blue-900/50 text-blue-300/50 cursor-not-allowed'
                : 'bg-blue-700 hover:bg-blue-600 text-white'
            }`}
          >
            Next
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  };
  
  // Render settings modal
  const SettingsModal = () => {
    if (!showSettings) return null;
    
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-blue-900 rounded-lg max-w-md w-full p-6 border border-blue-500/30">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Reading Settings</h2>
            <button 
              onClick={() => setShowSettings(false)}
              className="p-2 hover:bg-blue-800 rounded-full text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="fontSize" className="block mb-2 text-sm font-medium text-white">
                Font Size: {fontSize}px
              </label>
              <input 
                type="range" 
                id="fontSize" 
                min="12" 
                max="24" 
                value={fontSize} 
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="particleCount" className="block mb-2 text-sm font-medium text-white">
                Background Particles: {particleCount}
              </label>
              <input 
                type="range" 
                id="particleCount" 
                min="0" 
                max="100" 
                step="10"
                value={particleCount} 
                onChange={(e) => setParticleCount(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="speechRate" className="block mb-2 text-sm font-medium text-white">
                Speech Rate: {speechRate.toFixed(1)}x
              </label>
              <input 
                type="range" 
                id="speechRate" 
                min="0.5" 
                max="2" 
                step="0.1"
                value={speechRate} 
                onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render table of contents modal
  const TableOfContentsModal = () => {
    if (!showTableOfContents || !selectedBook) return null;
    
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-blue-900 rounded-lg max-w-md w-full p-6 border border-blue-500/30">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Table of Contents</h2>
            <button 
              onClick={() => setShowTableOfContents(false)}
              className="p-2 hover:bg-blue-800 rounded-full text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="max-h-[60vh] overflow-y-auto">
            {selectedBook.pages.map((page, index) => (
              <button
                key={index}
                onClick={() => {
                  changePage(index);
                  setShowTableOfContents(false);
                }}
                className={`w-full text-left py-2 px-3 rounded-md mb-2 ${
                  currentPage === index
                    ? 'bg-blue-700 text-white'
                    : 'hover:bg-blue-800/50 text-blue-100'
                }`}
              >
                {page.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  // Main render
  return (
    <div className="min-h-screen bg-black text-white relative">
      <LeolasBackground particleCount={particleCount} />
      
      {view === 'library' ? <LibraryView /> : <ReaderView />}
      
      <PaymentOverlay
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        bookTitle={selectedBook?.title}
      />
      
      <SettingsModal />
      <TableOfContentsModal />
    </div>
  );
};

export default LeolasDigitalLibrary;
