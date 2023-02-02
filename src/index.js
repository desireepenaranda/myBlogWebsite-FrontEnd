import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCt67QhsgIVod7nZCdn4s9vJzcfv52IRnQ",
  authDomain: "myblogwebsite-24e91.firebaseapp.com",
  projectId: "myblogwebsite-24e91",
  storageBucket: "myblogwebsite-24e91.appspot.com",
  messagingSenderId: "1037636077469",
  appId: "1:1037636077469:web:939f90d135f0d6f3a19174"
};

const app = initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
