import React from 'react'
import { X } from 'lucide-react'

interface PaymentOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  bookTitle?: string;
}

const PaymentOverlay: React.FC<PaymentOverlayProps> = ({
  isOpen,
  onClose,
  bookTitle
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-blue-900 rounded-lg max-w-md w-full p-6 border border-blue-500/30">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Support the Author</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-blue-800 rounded-full text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-300">
            {bookTitle 
              ? `Thank you for reading "${bookTitle}". If you've enjoyed this book, please consider supporting the author.`
              : "Thank you for reading. If you've enjoyed this book, please consider supporting the author."
            }
          </p>
          
          <p className="text-gray-300">
            Your support helps Leola continue creating and sharing her stories and guides with the world.
          </p>
          
          <div className="space-y-3 pt-4">
            <button 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md transition-colors"
              onClick={() => window.open('https://buymeacoffee.com', '_blank')}
            >
              Buy Me a Coffee ☕
            </button>
            
            <button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition-colors"
              onClick={() => window.open('https://patreon.com', '_blank')}
            >
              Support on Patreon 💝
            </button>
            
            <button 
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md transition-colors"
              onClick={() => window.open('https://ko-fi.com', '_blank')}
            >
              Support on Ko-fi 🎨
            </button>
          </div>
          
          <p className="text-sm text-gray-400 text-center pt-4">
            Every contribution, no matter how small, makes a difference.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentOverlay;
