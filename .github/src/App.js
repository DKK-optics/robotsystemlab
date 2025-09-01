import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeContent from './components/HomeContent';
import ChatBot from './components/ChatBot';
import AnimatedSection from './components/AnimatedSection';
import LlmChat from './components/LlmChat';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/llm" element={<LlmChat />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
