import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 40px;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
  background: ${({ scrolled }) => (scrolled ? 'rgba(0, 0, 0, 0.5)' : 'transparent')};
  backdrop-filter: ${({ scrolled }) => (scrolled ? 'blur(10px)' : 'none')};

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100%; /* 헤더에서는 좌우 여백 없이 화면 전체를 사용 */
    padding: 0 40px; /* 좌우 패딩만 유지 */

    @media (max-width: 768px) {
      padding: 0 20px; // 모바일에서 컨테이너 좌우 패딩 조정
    }
  }

  @media (max-width: 768px) {
    padding: 15px 0; // 모바일 헤더 상하 패딩 조정
  }
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;

  img {
    height: 40px; /* 로고 이미지 높이 조절 */
    filter: invert(1); /* 색상 반전 */
  }
`;

const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;

    @media (max-width: 768px) {
      display: none; // 모바일에서 기본 내비게이션 숨김
    }
  }

  li {
    margin-left: 30px;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: var(--text-color-muted);
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none; // 기본적으로 숨김

  @media (max-width: 768px) {
    display: block; // 모바일에서 보임
    background: none;
    border: none;
    color: var(--primary-color);
    font-size: 1.8rem;
    cursor: pointer;
    z-index: 1001; // 메뉴 위에 오도록
  }
`;

const MobileMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')}; // 상태에 따라 보임/숨김
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95); // 어두운 반투명 배경
  backdrop-filter: blur(10px);
  z-index: 1000;
  justify-content: center;
  align-items: center;

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
  }

  li {
    margin: 20px 0;
  }

  a {
    color: var(--primary-color);
    font-size: 2rem; // 모바일 메뉴 글씨 크게
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: var(--text-color-muted);
    }
  }
`;

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // 모바일 메뉴 상태

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <HeaderContainer scrolled={scrolled}>
      <div className="container">
        <Logo href="#hero" onClick={closeMobileMenu}> {/* 메뉴 닫기 추가 */}
          <img src={process.env.PUBLIC_URL + '/images/logoxx.png'} alt="AMOGUN Lab Logo" />
        </Logo>
        <Nav>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#professor">Professor</a></li>
            <li><a href="#members">Members</a></li>
            <li><a href="#research">Research</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#location">Location</a></li>
          </ul>
        </Nav>
        <MobileMenuButton onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
        </MobileMenuButton>
      </div>
      <MobileMenu isOpen={mobileMenuOpen}>
        <ul>
          <li><a href="#about" onClick={closeMobileMenu}>About</a></li>
          <li><a href="#professor" onClick={closeMobileMenu}>Professor</a></li>
          <li><a href="#members" onClick={closeMobileMenu}>Members</a></li>
          <li><a href="#research" onClick={closeMobileMenu}>Research</a></li>
          <li><a href="#gallery" onClick={closeMobileMenu}>Gallery</a></li>
          <li><a href="#location" onClick={closeMobileMenu}>Location</a></li>
        </ul>
      </MobileMenu>
    </HeaderContainer>
  );
}

export default Header; 