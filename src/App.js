import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Research from './components/Research';
import Professor from './components/Professor';
import Members from './components/Members';
import Location from './components/Location';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <Hero />
        <About />
        <Research />
        <Professor />
        <Members />
        <Location />
      </main>
      <Footer />
    </>
  );
}

export default App; 