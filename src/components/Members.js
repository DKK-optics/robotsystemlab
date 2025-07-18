import React, { useState } from 'react';
import styled from 'styled-components';

const MembersSection = styled.section`
  background: var(--background-dark2);
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 60px;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const TabButton = styled.button`
  background: none;
  border: none;
  color: ${({ active }) => (active ? 'var(--primary-color)' : 'var(--text-color-muted)')};
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 20px;
  padding-bottom: 10px;
  border-bottom: 3px solid ${({ active }) => (active ? 'var(--primary-color)' : 'transparent')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: var(--primary-color);
  }
`;

const MembersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
`;

const MemberCard = styled.div`
  background: var(--background-dark1);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h4 {
    color: var(--primary-color);
    margin: 15px 0 5px;
  }

  p {
    color: var(--text-color-muted);
    font-size: 0.9rem;
  }
`;

const membersData = {
  current: [
    { name: '김대근', role: '21st, Optics, Automotive AI' },
    { name: '정효영', role: '21st, FEM, Defense Industry' },
  ],
  alumni: [
    { name: '김영희', role: 'Samsung Electronics' },
    { name: '이철수', role: 'LG Electronics' },
    { name: '박지영', role: 'Hyundai Motors' },
    { name: '최현우', role: 'Naver Labs' },
  ],
};

function Members() {
  const [activeTab, setActiveTab] = useState('current');

  return (
    <MembersSection id="members">
      <div className="container">
        <SectionTitle>MEMBERS</SectionTitle>
        <TabContainer>
          <TabButton active={activeTab === 'current'} onClick={() => setActiveTab('current')}>
            Current Members
          </TabButton>
          <TabButton active={activeTab === 'alumni'} onClick={() => setActiveTab('alumni')}>
            Alumni
          </TabButton>
        </TabContainer>
        <MembersGrid>
          {membersData[activeTab].map((member, index) => (
            <MemberCard key={index}>
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </MemberCard>
          ))}
        </MembersGrid>
      </div>
    </MembersSection>
  );
}

export default Members; 