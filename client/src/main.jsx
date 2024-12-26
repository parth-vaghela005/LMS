import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import appStore, { persistor } from './app/store'
import { Toaster } from './components/ui/sonner'
import { useLoadUserQuery } from './slices/api/AuthApi'
import Loader from './pages/Loader'
// import { BrowserRouter } from "react-router-dom";
const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return <>{isLoading ? <Loader /> : <>{children}</>}</>;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        <Custom>
          <App />
          <Toaster />
        </Custom>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
