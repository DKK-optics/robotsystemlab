import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import MemberDetailModal from './MemberDetailModal';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MembersSection = styled.section`
  /* 배경을 제거하여 GlobalStyle의 body 배경(검은색)이 보이도록 함 */
  @media (max-width: 768px) {
    padding: 60px 0; // 모바일 패딩 조정
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-wrap: wrap; // 탭이 다음 줄로 넘어가도록
    justify-content: center; // 중앙 정렬
    margin-bottom: 20px; // 모바일 여백 조정
  }
`;

const TabButton = styled.button`
  background: none;
  border: none;
  color: ${({ $active }) => ($active ? 'var(--primary-color)' : 'var(--text-color-muted)')};
  font-weight: 600;
  margin: 0 20px;
  padding-bottom: 10px;
  border-bottom: 3px solid ${({ $active }) => ($active ? 'var(--primary-color)' : 'transparent')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: var(--primary-color);
  }

  @media (max-width: 768px) {
    margin: 0 10px 10px; // 모바일 여백 조정
    padding-bottom: 5px;
  }
`;

const TabPanel = styled(motion.div)`
  padding: 40px;
  border-radius: 8px; /* 탭 버튼 아래부터 둥글게 처리 */
  background: var(--background-dark2); /* 이 부분만 회색 블록으로 */
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (max-width: 768px) {
    padding: 20px; // 모바일 패딩 조정
  }
`;

const MembersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // 모바일에서 한 열로
    gap: 20px; // 모바일 간격 조정
  }
`;

const MemberCard = styled.div`
  background: var(--background-dark1); /* 카드 배경은 더 어둡게 */
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
    border: 3px solid var(--primary-color);
  }

  h4 {
    color: var(--primary-color);
    margin: 15px 0 5px;

    @media (max-width: 768px) {
      margin: 10px 0 5px;
    }
  }

  p {
    color: var(--text-color-muted);

    @media (max-width: 768px) {
    }
  }
`;

const membersData = {
  bachelors: [
    { 
      name: '김대근', 
      role: 'Optics, Automotive AI',
      isClickable: true,
      details: {
        image: '/images/dkkim.JPG',
        title: 'Robotics Engineering, 21',
        history: [
          'GPT Study Group (Yeungnam Univ.)',
          'Phocus Camera Team (Robotics)',
          'Phocus Vision Team (Robotics)',
          'KAAE Competition Participant',
        ]
      }
    },
    { 
      name: '정효영', 
      role: 'FEM, Defense Industry',
      isClickable: true,
      details: {
        image: '/images/jeonghyoyoung.jpg',
        title: 'Robotics Engineering, 21',
        history: [
          'CAE study team (Yeungnam Univ.)',
        ]
      }
    },
  ],
  alumniMS: [
    { name: '이영현', role: "Nano Mechanism Design" },
    { name: '황하영', role: "Mechanical Engineer" },
    { name: '배재현', role: "Mechanical Engineer" },
  ],
  alumniBS: [
    { name: '박은주', role: 'hanhwa' },
    { name: '김도형', role: 'samick THK' },
    { name: '양밍', role: 'Koryo F&D' },
    { name: '강대순', role: "Mechanical Engineer" },
    { name: '김현석', role: "Mechanical Engineer" },
    { name: '허동주', role: "Mechanical Engineer" },
    { name: '양창호', role: "Mechanical Engineer" },
    { name: '리밍한', role: "Mechanical Engineer" },
    { name: '민경빈', role: "Mechanical Engineer" },
    { name: '최윤희', role: "Mechanical Engineer" },
  ],
};

// --- Animation Variants ---
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // 카드 수가 많으므로 간격을 더 짧게 설정
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// --- Component ---
function Members() {
  const [activeTab, setActiveTab] = useState('bachelors');
  const [selectedMember, setSelectedMember] = useState(null);

  const handleCardClick = (member) => {
    if (member.isClickable) {
      setSelectedMember(member);
    }
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  return (
    <>
      <MembersSection id="members">
        <div className="container">
          <SectionTitle>MEMBERS</SectionTitle>
          <TabContainer>
            <TabButton $active={activeTab === 'bachelors'} onClick={() => setActiveTab('bachelors')}>
              Bachelor's Course
            </TabButton>
            <TabButton $active={activeTab === 'alumniMS'} onClick={() => setActiveTab('alumniMS')}>
              Alumni (M.S)
            </TabButton>
            <TabButton $active={activeTab === 'alumniBS'} onClick={() => setActiveTab('alumniBS')}>
              Alumni (B.S)
            </TabButton>
          </TabContainer>
          <TabPanel
            key={activeTab} // 탭이 변경될 때마다 애니메이션이 다시 실행되도록 key 추가
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <MembersGrid>
              {membersData[activeTab].map((member, index) => (
                <motion.div key={index} variants={itemVariants} onClick={() => handleCardClick(member)}>
                  <MemberCard $isClickable={member.isClickable}>
                    <h4>{member.name}</h4>
                    <p>{member.role}</p>
                  </MemberCard>
                </motion.div>
              ))}
            </MembersGrid>
          </TabPanel>
        </div>
      </MembersSection>
      <MemberDetailModal member={selectedMember} closeModal={closeModal} />
    </>
  );
}

export default Members; 