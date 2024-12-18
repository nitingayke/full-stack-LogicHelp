import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import AppComponent from './AppComponent';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppComponent />
    </BrowserRouter>
  </StrictMode>,
)
