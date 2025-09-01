import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #333;
  padding: 10px 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

const NavItem = styled(NavLink)`
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }

  &.active {
    background-color: #007bff;
    font-weight: bold;
  }
`;

const HamburgerMenu = styled.div`
  display: none; /* Hidden by default */
  cursor: pointer;
  color: white;
  font-size: 24px;

  @media (max-width: 768px) {
    display: block;
  }
`;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Nav>
      <HamburgerMenu onClick={toggleMenu}>
        {isMenuOpen ? (
          <FontAwesomeIcon icon={faTimes} />
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
      </HamburgerMenu>
      <NavItem to="/" onClick={toggleMenu}>Home</NavItem>
      <NavItem to="/about" onClick={toggleMenu}>About</NavItem>
      <NavItem to="/services" onClick={toggleMenu}>Services</NavItem>
      <NavItem to="/contact" onClick={toggleMenu}>Contact</NavItem>
      <NavItem to="/location" onClick={toggleMenu}>Location</NavItem>
      <NavItem to="/llm" onClick={toggleMenu}>LLM Chat</NavItem>
    </Nav>
  );
}

export default Header;
