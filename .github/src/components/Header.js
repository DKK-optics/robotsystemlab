import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => (props.scrolled ? 'var(--header-bg-scrolled)' : 'var(--header-bg-top)')};
  backdrop-filter: ${props => (props.scrolled ? 'blur(10px)' : 'none')};
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
  z-index: 1000;
  box-shadow: ${props => (props.scrolled ? '0 2px 10px rgba(0, 0, 0, 0.5)' : 'none')};

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const Logo = styled.div`
  color: var(--accent-color);
  font-size: 2em;
  font-weight: bold;
  text-decoration: none;
  z-index: 1001;

  a {
    color: inherit;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
    width: 70%;
    height: 100vh;
    background-color: var(--mobile-menu-bg);
    padding-top: 80px;
    transform: ${props => (props.isOpen ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 0.3s ease-in-out;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    z-index: 999;
  }
`;

const NavItem = styled(NavLink)`
  color: var(--text-color);
  font-size: 1.1em;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-color);
  }

  &.active {
    color: var(--accent-color);
    font-weight: bold;
  }

  @media (max-width: 768px) {
    font-size: 1.4em;
    margin: 10px 0;
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  color: var(--text-color);
  font-size: 1.8em;
  cursor: pointer;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderWrapper scrolled={scrolled}>
      <Logo><NavLink to="/">ROBOT SYSTEM LAB</NavLink></Logo>
      <HamburgerMenu onClick={toggleMenu}>
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </HamburgerMenu>
      <Nav isOpen={isMenuOpen}>
        <NavItem to="/" onClick={toggleMenu} end>Home</NavItem>
        <NavItem to="/about" onClick={toggleMenu}>About</NavItem>
        <NavItem to="/research" onClick={toggleMenu}>Research</NavItem>
        <NavItem to="/gallery" onClick={toggleMenu}>Gallery</NavItem>
        <NavItem to="/professor" onClick={toggleMenu}>Professor</NavItem>
        <NavItem to="/members" onClick={toggleMenu}>Members</NavItem>
        <NavItem to="/location" onClick={toggleMenu}>Location</NavItem>
        <NavItem to="/llm" onClick={toggleMenu}>LLM Chat</NavItem>
      </Nav>
    </HeaderWrapper>
  );
}

export default Header;
