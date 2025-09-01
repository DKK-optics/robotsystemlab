import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Research from './components/Research';
import Professor from './components/Professor';
import Members from './components/Members';
import Gallery from './components/Gallery';
import Location from './components/Location';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import AnimatedSection from './components/AnimatedSection';
import LlmChat from './components/LlmChat';

function HomeContent() {
  const heroRef = useRef(null);
  const [isHeroInView, setIsHeroInView] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isHeroInView ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isHeroInView]);

  return (
    <main>
      <Hero ref={heroRef} />
      <AnimatedSection><About /></AnimatedSection>
      <Research />
      <Gallery />
      <Professor />
      <Members />
      <AnimatedSection><Location /></AnimatedSection>
      <ChatBot />
    </main>
  );
}

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
