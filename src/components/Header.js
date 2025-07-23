import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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

function Header() {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <HeaderContainer scrolled={scrolled}>
      <div className="container">
        <Logo href="#hero">
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
      </div>
    </HeaderContainer>
  );
}

export default Header; 