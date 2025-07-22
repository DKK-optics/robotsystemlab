import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Backdrop = styled(motion.div)`
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
  z-index: 3000;
`;

const Container = styled(motion.div)`
  background: var(--background-dark2);
  border-radius: 12px;
  padding: 40px;
  width: 90%;
  max-width: 800px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h2`
  color: var(--primary-color);
  margin-bottom: 20px;
`;

const Description = styled.p`
  line-height: 1.8;
  color: var(--text-color);
  white-space: pre-line;
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
  exit: { opacity: 0, y: 50 },
};

function GalleryModal({ item, onClose }) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <Backdrop
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <Container
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <Title>{item.title}</Title>
          <Description>{item.description}</Description>
        </Container>
      </Backdrop>
    </AnimatePresence>
  );
}

export default GalleryModal; 