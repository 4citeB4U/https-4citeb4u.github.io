import React, { useState, useRef, useEffect } from 'react';
import { Volume2, ChevronLeft, ChevronRight, Gift, Settings, X, Book, List } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './components/ui/card/Card';
import BookCover from './components/BookCover';
import LeolaBackground from './components/LeolaBackground';
import PaymentOverlay from './components/PaymentOverlay';
import PageFlipAnimation from './components/PageFlipAnimation';
import InspiringMessages from './components/InspiringMessages';

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

// Book collection data
const books: BookType[] = [
  {
    id: 'needle-and-yarn',
    title: "Needle & Yarn: A Love Stitched in Time",
    author: "Leola (Sister) Lee",
    description: "A heartwarming tale of love between crafting tools. Follow Needle and Yarn as they navigate challenges, form deep bonds, and create beautiful projects together.",
    pages: [
      {
        title: "Thank you & Dedication",
        content: "Thank you for the love, lessons, and laughter that you all have gifted me. With all my love and gratitude,\n\nTo Freddie, Micky, Timothy, Leonard, Jermaine, and Laron: my six remarkable children, each of you a brilliant and unique thread woven into the fabric of our family's story. Freddie, your strength and leadership have always shone bright. Micky, your compassion and empathy are the heart of our home. Timothy, your curiosity and intelligence have no bounds. Leonard, your creativity and artistic spirit bring color to our lives. Jermaine, your resilience and determination inspire us all. Laron, your humor and joy light up every room. \n\nEach of you has brought immeasurable joy, endless inspiration, and a richness to my life that words can barely capture. It's in the laughter we shared, the challenges we overcame, and the endless nights of storytelling where I found the essence of who I am - a mother, a teacher, and a storyteller.\n\nTo the vibrant, resilient community of Milwaukee, Wisconsin: my home. In its bustling streets and quiet neighborhoods, I've found a spirit of perseverance and community that echoes the warmth of the South. Milwaukee, with its diverse tapestry of cultures and stories, has added new chapters to my life, enriching my craft with its unique blend of history, strength, and communal spirit.\n\nThis book is a heartfelt homage to each of you - my beloved children, who have been the pillars of my life, and to Milwaukee, a city that has welcomed me with open arms and enriched my narrative. May these pages reflect my love for crocheting. \nLeola Lee"
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
    author: "Leola (Sister) Lee",
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
        content: "The Chain Stitch (ch):\nThis is the foundation of most crochet projects. Think of it as creating a string of pearls, each loop connecting to the next.\n\nSingle Crochet (sc):\nThe most basic of all crochet stitches, creating a tight, sturdy fabric. Perfect for small figures and items that need structure.\n\nDouble Crochet (dc):\nA taller stitch that works up quickly and creates a more open, flexible fabric. Ideal for blankets and garments.\n\nPractice Tip: Work these stitches in rows until they become muscle memory. Remember, consistency comes with time and patience."
      }
    ]
  }
];

const App: React.FC = () => {
  // State management
  const [view, setView<'library' | 'reader'>('library');
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

  const speechSynthesis = useRef<SpeechSynthesis | null>(null);
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      speechSynthesis.current = window.speechSynthesis;
      
      // Check if speechSynthesis is actually available and functioning
      try {
        // Test the speechSynthesis with a simple utterance
        new SpeechSynthesisUtterance('');
        speechSynthesis.current.cancel(); // Clear any previous speech
        setSpeechError(null);
      } catch (error) {
        console.error('Speech synthesis initialization error:', error);
        setSpeechError('Speech synthesis is not available in your browser.');
      }
      
      return () => {
        if (currentUtterance.current && speechSynthesis.current) {
          speechSynthesis.current.cancel();
        }
      };
    } else {
      setSpeechError('Speech synthesis is not supported in this browser.');
    }
  }, []);

  // Speech synthesis functions
  const speak = (text: string): void => {
    // If there was a previous error, don't try to speak
    if (speechError) {
      return;
    }
    
    if (speechSynthesis.current) {
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
        speechSynthesis.current.speak(utterance);
      } catch (error) {
        console.error('Speech synthesis error:', error);
        setSpeechError('Failed to start text-to-speech. Please try again.');
      }
    }
  };

  const stopSpeaking = (): void => {
    if (speechSynthesis.current) {
      try {
        speechSynthesis.current.cancel();
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
  const openBook = (bookId: string): void => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      setSelectedBook(book);
      setCurrentPage(0);
      setView('reader');
    }
  };

  // Close reader and return to library
  const returnToLibrary = (): void => {
    stopSpeaking();
    setView('library');
    setSelectedBook(null);
    setCurrentPage(0);
  };

  // Read current page
  const readCurrentPage = (): void => {
    if (selectedBook && selectedBook.pages[currentPage]) {
      if (isSpeaking) {
        stopSpeaking();
      } else {
        speak(selectedBook.pages[currentPage].content);
      }
    }
  };

  // Start page turn animation
  const startPageTurn = (direction: 'next' | 'prev', targetPage: number): void => {
    if (isAnimating) return;

    stopSpeaking();
    setIsAnimating(true);
    setAnimationDirection(direction);
    setNextPageNum(targetPage);
  };

  // Change page with animation
  const changePage = (newPage: number): void => {
    if (isAnimating || !selectedBook || newPage === currentPage) return;

    if (newPage >= 0 && newPage < selectedBook.pages.length) {
      const direction = newPage > currentPage ? 'next' : 'prev';
      startPageTurn(direction, newPage);
    }
  };

  // Handle animation completion
  const handleAnimationComplete = (): void => {
    setCurrentPage(nextPageNum);
    setIsAnimating(false);
  };

  // Get current and next page content for animation
  const getCurrentPageContent = (): BookPage => {
    return selectedBook && selectedBook.pages[currentPage] 
      ? selectedBook.pages[currentPage] 
      : { title: '', content: '' };
  };

  const getNextPageContent = (): BookPage => {
    return selectedBook && selectedBook.pages[nextPageNum]
      ? selectedBook.pages[nextPageNum]
      : { title: '', content: '' };
  };

  // Render library view
  const LibraryView = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Leola Lee's Library
          </h1>
          <p className="text-xl text-gray-200">
            A collection of heartwarming stories and guides by Leola "Sister" Lee
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
          {books.map(book => (
            <Card key={book.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/40 transition-all transform-gpu hover:scale-[1.02]">
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

  // Render reader view
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

        <div className="flex-1 p-8">
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
                {currentPageData.content.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} style={{ fontSize: `${fontSize}px` }} className="text-blue-200 mb-4">
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
              onClick={() => isSpeaking ? stopSpeaking() : readCurrentPage()}
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

  // Render settings modal
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

  // Render table of contents modal
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
            {selectedBook.pages.map((page: BookPage, index: number) => (
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
      <LeolaBackground particleCount={particleCount} />
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
