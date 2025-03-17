# Leola's Digital Library

A beautiful digital library application for Leola "Sista" Lee's literary works and guides. This React application showcases an interactive reading experience with animations, audio features, and payment integration.

## Features

- **Digital Book Collection:** Browse and read Leola's collection of stories and guides
- **Interactive Reading Experience:** Page flip animations, customizable font size, and more
- **Text-to-Speech:** Listen to stories with adjustable speech rate
- **Dynamic Background:** Interactive particle background with adjustable settings
- **Payment Integration:** Multiple options to support the author, including Stripe payments
- **Responsive Design:** Works on both desktop and mobile devices

## Technical Overview

This application is built with:

- React with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Stripe for payment processing

## Setup and Installation

1. Clone the repository
2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file with your Stripe publishable key:

   ```sh
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

## Project Structure

- `/components` - React components
  - `LeolasDigitalLibrary.tsx` - Main application component
  - `BookCover.tsx` - Book cover display
  - `LeolasBackground.tsx` - Animated background
  - `PageFlipAnimation.tsx` - Page turning animations
  - `PaymentOverlay.tsx` - Payment modal
  - `CheckoutForm.tsx` - Stripe payment form
  - `ui/card` - Card UI components
- `/styles.css` - Global styles and animations
- `/lib/utils.ts` - Utility functions

## Configuration

You can customize the application by modifying:

- `tailwind.config.js` - Tailwind CSS configuration
- Book data in `LeolasDigitalLibrary.tsx` - Add or modify books

## Payment Processing

The payment system is integrated with Stripe. To process real payments:

1. Create a Stripe account
2. Replace the test publishable key in the application
3. Set up your Stripe webhook endpoint
4. Configure your product and pricing in the Stripe dashboard

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Credits

- Developed for Leola "Sista" Lee
- UI/UX design inspired by modern digital reading experiences

## Acknowledgments

This project is a heartfelt tribute to Leola "Sista" Lee, whose creativity and passion for storytelling and crochet have inspired many. Her works are a testament to the power of love, family, and community. We extend our deepest gratitude to her family and friends for their unwavering support and encouragement. This digital library is a celebration of Leola's legacy and the joy she brings to the world through her art.
# LeolasBooks
# LeolasBooks
