import React, { useState, useEffect, useRef } from 'react';
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
  const heroRef = useRef(null); // aboutRef 대신 heroRef 사용
  const [isHeroInView, setIsHeroInView] = useState(true); // 초기값 true로 설정

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const { bottom } = heroRef.current.getBoundingClientRect();
        // Hero 섹션의 바닥이 뷰포트 상단에 도달하면 false (Hero 벗어남)
        const inView = bottom > 0;
        setIsHeroInView(inView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 로드 시 한 번 실행

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // isHeroInView 상태에 따라 body 배경 변경
    if (isHeroInView) {
      document.body.style.backgroundImage = `url(${process.env.PUBLIC_URL + '/images/space.jpg'})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';
      document.body.style.transition = 'background-image 1s ease-in-out, background-color 1s ease-in-out';
      document.body.style.backgroundColor = 'transparent'; // 우주 배경이 투명하게 보일 수 있도록
    } else {
      document.body.style.backgroundImage = 'none';
      document.body.style.backgroundColor = 'var(--background-dark1)'; // 검은색으로 전환
      document.body.style.transition = 'background-image 1s ease-in-out, background-color 1s ease-in-out';
    }
  }, [isHeroInView]);

  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <Hero ref={heroRef} /> {/* heroRef 전달 */}
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