import React from 'react';
import { RecoilRoot} from "recoil";
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider>
  <BrowserRouter>
  <RecoilRoot>
    <App />
  </RecoilRoot>
  </BrowserRouter>
  </GoogleOAuthProvider>
)
