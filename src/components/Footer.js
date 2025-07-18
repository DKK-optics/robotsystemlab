import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const FooterSection = styled.footer`
  background: var(--background-dark1);
  padding: 80px 0;
  border-top: 1px solid #222;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ContactInfo = styled.div`
  h3 {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
  p {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    color: var(--text-color-muted);
  }
  svg {
    margin-right: 15px;
    color: var(--primary-color);
  }

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const Copyright = styled.div`
  text-align: right;
  color: var(--text-color-muted);

  @media (max-width: 768px) {
    text-align: center;
  }
`;

function Footer() {
  return (
    <FooterSection id="contact">
      <div className="container">
        <FooterContainer>
          <ContactInfo>
            <h3>CONTACT US</h3>
            <p><FontAwesomeIcon icon={faEnvelope} /> dylee@ynu.ac.kr</p>
          </ContactInfo>
          <Copyright>
            <p>&copy; {new Date().getFullYear()} Robot Systems Laboratory.</p>
            <p>All rights reserved. Daekeun Kim 21st</p>
          </Copyright>
        </FooterContainer>
      </div>
    </FooterSection>
  );
}

export default Footer; 