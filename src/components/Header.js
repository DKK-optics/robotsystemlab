import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  transition: background-color 0.4s ease, backdrop-filter 0.4s ease;

  &.scrolled {
    background-color: rgba(10, 10, 10, 0.7);
    backdrop-filter: blur(10px);
  }
`;

const Logo = styled.a`
  img {
    height: 40px;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const Nav = styled.nav`
  a {
    color: var(--text-color);
    font-weight: 500;
    margin: 0 20px;
    transition: color 0.3s ease;
    position: relative;
    padding-bottom: 5px;

    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      background-color: var(--primary-color);
      transition: width 0.3s ease;
    }

    &:hover {
      color: var(--primary-color);
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <HeaderContainer className={scrolled ? 'scrolled' : ''}>
      <Logo href="#home">
        <img src="/images/image6.png" alt="Logo" />
      </Logo>
      <Nav>
        <a href="#about">About</a>
        <a href="#research">Research</a>
        <a href="#professor">Professor</a>
        <a href="#members">Members</a>
        <a href="#location">Location</a>
        <a href="#contact">Contact</a>
      </Nav>
    </HeaderContainer>
  );
}

export default Header; 