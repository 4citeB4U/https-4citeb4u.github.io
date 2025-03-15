import React, { useState, useRef, useEffect } from 'react';
import { Volume2, ChevronLeft, ChevronRight, Gift, Settings, X, Book, List } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './components/ui/card/Card';
import BookCover from './components/BookCover';
import FloatingBackground from './components/FloatingBackground';
import PaymentOverlay from './components/PaymentOverlay';
import PageFlipAnimation from './components/PageFlipAnimation';
import InspiringMessages from './components/InspiringMessages';
import TopBanner, { ScrollingWords } from './components/TopBanner';

// Define TypeScript interfaces
interface BookPage {
  title: string;
  content: string;
}

interface BookType {
  id: string;
  title: string;
  author: string;
  description: string;
  pages: BookPage[];
}

// Book collection data (customize to your liking)
const books: BookType[] = [
  {
    id: 'needle-and-yarn',
    title: "Needle & Yarn: A Love Stitched in Time",
    author: "Leola (Sister) Lee",
    description: "A heartwarming tale of love between crafting tools...",
    pages: [
      {
        title: "Dedication",
        content: "To all who have ever felt the magic in a simple stitch...\n\n..."
      },
      {
        title: "Chapter 1: A Tangled Beginning",
        content: "In the cozy confines of Leola's sewing basket..."
      },
      {
        title: "Chapter 2: Weaving Trust",
        content: "As days turned into weeks, Sterling and Azure..."
      }
    ]
  },
  {
    id: 'crochet-mastery',
    title: "Crochet Mastery: A Complete Guide",
    author: "Leola (Sister) Lee",
    description: "A comprehensive guide to mastering the art of crochet...",
    pages: [
      {
        title: "Introduction",
        content: "Welcome to the wonderful world of crochet!\n\n..."
      },
      {
        title: "Chapter 1: Getting Started",
        content: "Your journey begins with selecting the right tools...\n\n..."
      },
      {
        title: "Chapter 2: Basic Stitches",
        content: "The Chain Stitch (ch):\n...\n\n..."
      }
    ]
  }
];

const App: React.FC = () => {
  // State management
  const [view, setView] = useState<'library' | 'reader'>('library');
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [particleCount, setParticleCount] = useState(50);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechError, setSpeechError] = useState<string | null>(null);

  // Page flip animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev'>('next');
  const [nextPageNum, setNextPageNum] = useState(0);

  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      speechSynthesisRef.current = window.speechSynthesis;
      try {
        // Test with a simple utterance
        new SpeechSynthesisUtterance('');
        speechSynthesisRef.current.cancel(); 
        setSpeechError(null);
      } catch (error) {
        console.error('Speech synthesis initialization error:', error);
        setSpeechError('Speech synthesis is not available in your browser.');
      }
      return () => {
        if (currentUtterance.current && speechSynthesisRef.current) {
          speechSynthesisRef.current.cancel();
        }
      };
    } else {
      setSpeechError('Speech synthesis is not supported in this browser.');
    }
  }, []);

  // Speech synthesis functions
  const speak = (text: string) => {
    if (speechError) return;
    
    if (speechSynthesisRef.current) {
      try {
        stopSpeaking();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = speechRate;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (event) => {
          console.error('Speech synthesis error:', event);
          setIsSpeaking(false);
          setSpeechError('An error occurred while speaking the text. Please try again.');
        };
        currentUtterance.current = utterance;
        speechSynthesisRef.current.speak(utterance);
      } catch (error) {
        console.error('Speech synthesis error:', error);
        setSpeechError('Failed to start text-to-speech. Please try again.');
      }
    }
  };

  const stopSpeaking = () => {
    if (speechSynthesisRef.current) {
      try {
        speechSynthesisRef.current.cancel();
        if (currentUtterance.current) {
          currentUtterance.current = null;
        }
        setIsSpeaking(false);
      } catch (error) {
        console.error('Error stopping speech:', error);
      }
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

  // Return to library
  const returnToLibrary = () => {
    stopSpeaking();
    setView('library');
    setSelectedBook(null);
    setCurrentPage(0);
  };

  // Read current page
  const readCurrentPage = () => {
    if (selectedBook?.pages[currentPage]) {
      isSpeaking ? stopSpeaking() : speak(selectedBook.pages[currentPage].content);
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

  // Handle animation complete
  const handleAnimationComplete = () => {
    setCurrentPage(nextPageNum);
    setIsAnimating(false);
  };

  // Current and next page content
  const getCurrentPageContent = (): BookPage => {
    return selectedBook?.pages[currentPage] || { title: '', content: '' };
  };
  const getNextPageContent = (): BookPage => {
    return selectedBook?.pages[nextPageNum] || { title: '', content: '' };
  };

  // Library view
  const LibraryView = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <TopBanner />
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-white">Leola Lee's Library</h1>
          <p className="text-xl text-gray-200">
            A collection of heartwarming stories and guides by Leola "Sister" Lee
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
          {books.map(book => (
            <Card
              key={book.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/40 transition-all transform-gpu hover:scale-[1.02]"
            >
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  {book.title}
                  <div className="text-lg text-gray-300 mt-2">by {book.author}</div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BookCover bookId={book.id} />
                <p className="mt-4 text-gray-200">{book.description}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-4">
                <button
                  onClick={() => openBook(book.id)}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all transform-gpu hover:scale-[1.02]"
                >
                  <Book className="h-5 w-5" />
                  Read Now
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  // Reader view
  const ReaderView = () => {
    if (!selectedBook) return null;
    const totalPages = selectedBook.pages.length;
    const currentPageData = selectedBook.pages[currentPage];

    return (
      <div className="min-h-screen flex flex-col">
        <nav className="bg-blue-900/50 p-4 flex items-center justify-between">
          <button
            onClick={returnToLibrary}
            className="flex items-center gap-2 text-blue-100 hover:text-blue-200 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            Back to Library
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSettings(true)}
              className="text-blue-100 hover:text-blue-200 transition-colors"
            >
              <Settings className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowPayment(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              <Gift className="h-5 w-5" />
              Support the Author
            </button>
          </div>
        </nav>

        <div className="flex-1 p-8 overflow-y-auto">
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
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg prose-invert">
                <h2 className="text-3xl font-bold mb-6 text-blue-100">
                  {currentPageData.title}
                </h2>
                {currentPageData.content.split('\n\n').map((paragraph, index) => (
                  <p
                    key={index}
                    style={{ fontSize: `${fontSize}px` }}
                    className="text-blue-200 mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-blue-900/50 p-4 flex items-center justify-between">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 0}
            className="flex items-center gap-2 text-blue-100 hover:text-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
            Previous
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => (isSpeaking ? stopSpeaking() : readCurrentPage())}
              className="text-blue-100 hover:text-blue-200 transition-colors"
            >
              <Volume2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowTableOfContents(true)}
              className="text-blue-100 hover:text-blue-200 transition-colors"
            >
              <List className="h-5 w-5" />
            </button>
            <span className="text-blue-200">
              Page {currentPage + 1} of {totalPages}
            </span>
          </div>

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="flex items-center gap-2 text-blue-100 hover:text-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  };

  // Settings modal
  const SettingsModal = () => {
    if (!showSettings) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg w-96 border border-white/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-white">Settings</h2>
            <button
              onClick={() => setShowSettings(false)}
              className="text-white hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-white block mb-2">Font Size</label>
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-white block mb-2">Speech Rate</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={speechRate}
                onChange={(e) => setSpeechRate(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-white block mb-2">Particle Count</label>
              <input
                type="range"
                min="20"
                max="100"
                value={particleCount}
                onChange={(e) => setParticleCount(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Table of contents modal
  const TableOfContentsModal = () => {
    if (!showTableOfContents || !selectedBook) return null;

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-blue-900/90 backdrop-blur-sm rounded-lg max-w-md w-full p-6 border border-blue-500/30 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Table of Contents</h2>
            <button 
              onClick={() => setShowTableOfContents(false)}
              className="p-2 hover:bg-blue-800/50 rounded-full text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-2">
            {selectedBook.pages.map((page, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentPage(index);
                  setShowTableOfContents(false);
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-blue-800/50 text-blue-100 transition-colors"
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
    <div className="relative min-h-screen">
      <FloatingBackground particleCount={particleCount} />
      {view === 'library' ? <LibraryView /> : <ReaderView />}
      <PaymentOverlay
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        bookTitle={selectedBook?.title}
      />
      <SettingsModal />
      <TableOfContentsModal />
      <InspiringMessages />
    </div>
  );
};

export default App;
