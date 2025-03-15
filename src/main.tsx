// main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from './App';         // <-- The single root component
import './styles.css';          // <-- Global CSS (or './index.css', whichever you use)

// Replace with your actual Stripe publishable key, or load from .env
const stripePromise = loadStripe('pk_test_your_stripe_publishable_key');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>
);
