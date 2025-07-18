import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faRobot, faMicrochip } from '@fortawesome/free-solid-svg-icons';

// --- Styled Components ---
const ResearchSection = styled.section`
  background: var(--background-dark1);
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

// Card-related styled components
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
`;

const Card = styled.div`
  background: var(--background-dark2);
  padding: 40px;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const CardText = styled.p`
  color: var(--text-color-muted);
  line-height: 1.7;
`;


// Table-related styled components
const TableWrapper = styled.div`
  overflow-x: auto;
`;

const PubsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  th, td { padding: 15px 20px; border-bottom: 1px solid var(--background-dark2); }
  th { color: var(--text-color-muted); font-weight: 600; text-transform: uppercase; }
  td { color: var(--text-color); }
  tbody tr:hover { background-color: var(--background-dark2); }
`;

const ShowMoreButton = styled.button`
  background: var(--background-dark2);
  border: 1px solid var(--text-color-muted);
  color: var(--text-color);
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 20px auto 0;
  transition: all 0.3s ease;
  &:hover {
    background: var(--primary-color);
    color: var(--background-dark1);
    border-color: var(--primary-color);
  }
`;


// --- Data ---
const researchData = [
    { icon: faCube, title: 'Finite Element Method', text: 'Ansys를 활용한 정밀 유한요소해석(FEM)을 통해 복잡한 공학 문제의 구조적, 열적 거동을 분석하고 예측합니다.' },
    { icon: faRobot, title: 'Robotics', text: '차세대 로봇 플랫폼을 설계하고, 인간과 상호작용하는 로봇을 위한 제어 알고리즘을 연구합니다.' },
    { icon: faMicrochip, title: 'Nanotechnology', text: '나노 스케일에서의 재료 특성을 연구하고, 이를 응용한 초소형 정밀 부품 및 센서 기술을 개발합니다.' }
];

const publicationsData = [
    { title: "Mechanically induced flexible two-dimensional PdSe2 sensors based on piezotronic effect", authors: 8, journal: "JOURNAL OF ALLOYS AND COMPOUNDS", volume: "1017, 179014", publisher: "ELSEVIER SCIENCE SA", date: "2025.02.25." },
    { title: "Temperature dependence electron conduction in horizontally aligned trapezoidal‑shaped AlGaN/ GaN nanowire wrap‑gate transistor", authors: 8, journal: "JOURNAL OF MATERIALS SCIENCE-MATERIALS IN ELECTRONICS", volume: "35, 1813", publisher: "SPRINGER", date: "2024.09.27." },
    { title: "Strain-Modulated Flexible Bio-Organic/Graphene/PET Sensors Based on DNA-Curcumin Biopolymer", authors: 4, journal: "Biomolecules", volume: "14(6), 698", publisher: "MDPI", date: "2024.06.14." },
    { title: "Barrier Height, Ideality Factor and Role of Inhomogeneities at the AlGaN/GaN Interface in GaN Nanowire Wrap-Gate Transistor", authors: 7, journal: "NANOMATERIALS", volume: "13(24), 3159", publisher: "MDPI AG", date: "2023.12.17." },
    { title: "Effect of yttrium doping on the crystal structure, optical, and photocatalytic properties of hydrothermally synthesized ZnO nanorods", authors: 9, journal: "MATERIALS SCIENCE AND ENGINEERING B-ADVANCED FUNCTIONAL SOLID-STATE MATERIALS", volume: "296, 116664", publisher: "ELSEVIER SCIENCE BV", date: "2023.10.01." },
    { title: "A review on hydrogels classification and recent developments in biomedical applications", authors: 7, journal: "INTERNATIONAL JOURNAL OF POLYMERIC MATERIALS AND POLYMERIC BIOMATERIALS", volume: "72(13)", publisher: "TAYLOR & FRANCIS AS", date: "2023.09.02." },
    { title: "Hydrogen evolution properties of Cr doped and (Cr, Er) co-doped ZnS nanoparticles", authors: 8, journal: "JOURNAL OF MATERIALS SCIENCE-MATERIALS IN ELECTRONICS", volume: "34(22)", publisher: "SPRINGER", date: "2023.08.02." }
];

const ipData = [
    { title: "비틀림 시험기", inventors: 5, appNo: "10-2014-0064793", regNo: "10-1679472", date: "2016.11.18." },
    { title: "변위 증폭기", inventors: 1, appNo: "10-2012-0156109", regNo: "10-1306993", date: "2013.09.03." },
    { title: "주사탐침현미경용 스캐너", inventors: 3, appNo: "10-2009-0081561", regNo: "10-1151136", date: "2012.05.22." },
    { title: "스테이지장치", inventors: 3, appNo: "10-2009-0081561", regNo: "10-1103174", date: "2011.12.29." },
    { title: "원자간력 현미경용 Z축 스캐너", inventors: 3, appNo: "10-2009-0081563", regNo: "10-1038360", date: "2011.05.25." },
    { title: "원통형 자기부상 스테이지", inventors: 8, appNo: "10-2008-0065102", regNo: "10-0977466-00-00", date: "2010.08.17." },
    { title: "유도성 결합 플라즈마의 내장형 ＲＦ 안테나 및 이를장착한 플라즈마 챔버", inventors: 6, appNo: "10-2007-0117818", regNo: "10-0931846-00-00", date: "2009.12.07." },
    { title: "원통금형 기판의 고분해능 이송과 능동 자세 제어가 가능한 나노 노광기 및 노광 방법", inventors: 5, appNo: "2007-0117535", regNo: "10-0929883-00-00", date: "2009.11.26." },
    { title: "원통형 기판용 스핀 코터 및 이를 이용한 코팅방법", inventors: 6, appNo: "10-2007-0117809", regNo: "10-0924656-00-00", date: "2009.10.27." }
];


// --- Component ---
function Research() {
  const [activeTab, setActiveTab] = useState('fields');
  const [showAllPubs, setShowAllPubs] = useState(false);
  const [showAllIps, setShowAllIps] = useState(false);

  const visiblePubs = showAllPubs ? publicationsData : publicationsData.slice(0, 5);
  const visibleIps = showAllIps ? ipData : ipData.slice(0, 5);

  return (
    <ResearchSection id="research">
      <div className="container">
        <SectionTitle>RESEARCH</SectionTitle>
        <TabContainer>
          <TabButton active={activeTab === 'fields'} onClick={() => setActiveTab('fields')}>
            Research Fields
          </TabButton>
          <TabButton active={activeTab === 'publications'} onClick={() => setActiveTab('publications')}>
            Publications
          </TabButton>
          <TabButton active={activeTab === 'ip'} onClick={() => setActiveTab('ip')}>
            IP & Tech Transfer
          </TabButton>
        </TabContainer>

        {activeTab === 'fields' && (
          <CardsContainer>
            {researchData.map((item, index) => (
              <Card key={index}>
                <IconWrapper><FontAwesomeIcon icon={item.icon} /></IconWrapper>
                <CardTitle>{item.title}</CardTitle>
                <CardText>{item.text}</CardText>
              </Card>
            ))}
          </CardsContainer>
        )}

        {activeTab === 'publications' && (
          <TableWrapper>
            <PubsTable>
              <thead><tr><th>Title</th><th>Co-authors</th><th>Journal</th><th>Volume</th><th>Publisher</th><th>Date</th></tr></thead>
              <tbody>
                {visiblePubs.map((pub, index) => (
                  <tr key={index}><td>{pub.title}</td><td>{pub.authors}</td><td>{pub.journal}</td><td>{pub.volume}</td><td>{pub.publisher}</td><td>{pub.date}</td></tr>
                ))}
              </tbody>
            </PubsTable>
            {!showAllPubs && publicationsData.length > 5 && (
              <ShowMoreButton onClick={() => setShowAllPubs(true)}>Show More</ShowMoreButton>
            )}
          </TableWrapper>
        )}

        {activeTab === 'ip' && (
          <TableWrapper>
            <PubsTable>
              <thead><tr><th>Title</th><th>Inventors</th><th>Application No.</th><th>Registration No.</th><th>Date</th></tr></thead>
              <tbody>
                {visibleIps.map((ip, index) => (
                  <tr key={index}><td>{ip.title}</td><td>{ip.inventors}</td><td>{ip.appNo}</td><td>{ip.regNo}</td><td>{ip.date}</td></tr>
                ))}
              </tbody>
            </PubsTable>
            {!showAllIps && ipData.length > 5 && (
              <ShowMoreButton onClick={() => setShowAllIps(true)}>Show More</ShowMoreButton>
            )}
          </TableWrapper>
        )}
      </div>
    </ResearchSection>
  );
}

export default Research; 