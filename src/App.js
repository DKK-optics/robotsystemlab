import React from 'react';
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

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <Hero />
        <AnimatedSection>
          <About />
        </AnimatedSection>
        <Research />
        <Gallery />
        <Professor />
        <Members /> {/* AnimatedSection 제거 */}
        <AnimatedSection>
          <Location />
        </AnimatedSection>
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}

export default App; 