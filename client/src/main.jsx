import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import appStore, { persistor } from './app/store';
import { Toaster } from './components/ui/sonner';
import { useLoadUserQuery } from './slices/api/AuthApi';
import Loader from './pages/Loader';
import { Elements } from '@stripe/react-stripe-js'; // Stripe Elements
import { loadStripe } from '@stripe/stripe-js';    // Stripe Initialization

// Load Stripe with your publishable key
const stripePromise = loadStripe('your-publishable-key');

// Custom component for loading
// const Custom = ({ children }) => {
//   const { isLoading } = useLoadUserQuery();
//   return <>{isLoading ? <Loader /> : <>{children}</>}</>;
// };

// Render application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <Custom> */}
          <Elements stripe={stripePromise}> {/* Wrap App with Elements */}
            <App />
          </Elements>
          <Toaster />
        {/* </Custom> */}
      </PersistGate>
    </Provider>
  </StrictMode>,
);
