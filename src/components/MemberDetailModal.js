import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalContainer = styled(motion.div)`
  background: var(--background-dark2);
  border-radius: 12px;
  padding: 40px;
  width: 90%;
  max-width: 800px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  gap: 40px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary-color);
`;

const ProfileDetails = styled.div`
  h2 {
    color: var(--primary-color);
    margin-bottom: 10px;
    font-size: 2rem;
  }
  
  h3 {
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--text-color-muted);
    margin-bottom: 30px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 15px;
    font-size: 1rem;
    position: relative;
    padding-left: 25px;

    &::before {
      content: '▶';
      position: absolute;
      left: 0;
      color: var(--primary-color);
      font-size: 0.8rem;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
`;

const modalVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 }
};

function MemberDetailModal({ member, closeModal }) {
  if (!member) return null;

  return (
    <AnimatePresence>
      <ModalBackdrop
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
      >
        <ModalContainer
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton onClick={closeModal}>&times;</CloseButton>
          <ProfileImage src={member.details.image} alt={member.name} />
          <ProfileDetails>
            <h2>{member.name}</h2>
            <h3>{member.details.title}</h3>
            <ul>
              {member.details.history.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </ProfileDetails>
        </ModalContainer>
      </ModalBackdrop>
    </AnimatePresence>
  );
}

export default MemberDetailModal; 