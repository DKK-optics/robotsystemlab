import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import GalleryModal from './GalleryModal';

const GallerySection = styled.section`
  padding: 100px 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 60px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
`;

const ImageWrapper = styled(motion.div)`
  overflow: hidden;
  border-radius: 8px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  &:hover img {
    transform: scale(1.1);
  }
`;

const items = [
  {
    src: '/images/image1.jpg',
    title: 'Pure Rotation Scanner',
    description: `정밀한 순수 회전 스캐너 시스템\n\n본 스캐너는 회전 중심의 이동 없이 정확한 순수 회전만을 수행하도록 설계된 장치입니다.\n\n• 회전 주파수: 최대 312Hz\n• 최대 회전 변위: 497.2 µrad\n\nAFM(원자력 현미경), 리소그래피 등 고정밀 공정에 적용 가능\n\n실험적으로 순수 회전 특성을 검증하였으며, 고주파에서도 안정적인 작동을 유지합니다.`
  },
  {
    src: '/images/image2.jpg',
    title: 'Active Vibration Isolator',
    description: `능동형 진동 차단 시스템\n\n• Gimac 사와의 협업 프로젝트\n• Matlab 기반 제어 해석 수행\n• Recurdyn을 이용한 구조 해석\n• Massed 기반의 액추에이터 시뮬레이션 포함\n\n정밀 계측 장비 및 진동 민감 공정에 효과적인 솔루션을 제공합니다.`
  },
  {
    src: '/images/image3.jpg',
    title: 'Passive Vibration Isolator',
    description: `수동형 진동 차단 테이블\n\n기본적인 수동 감쇠 시스템이 내장된 테이블형 진동 아이솔레이터로, 연구실 또는 산업 환경에서 정밀 장비의 진동 방지에 사용됩니다.\n\n• 유압 감쇠기(Hydraulic Damper) 적용\n• 정밀 이송 시스템에 최적화된 구조\n• Matlab, Recurdyn 등 다양한 공학 해석 도구를 활용한 성능 분석 수행\n\n간단하면서도 효과적인 진동 차단 성능을 제공합니다.`
  },
  {
    src: '/images/image4.jpg',
    title: 'Adjustable Planar Flexure',
    description: `순수 회전 스캐너용 조절형 플렉셔(유연 구조체)\n\n이 장치는 순수 회전 스캐너의 성능을 극대화하기 위해 개발된 고정밀 플렉셔 메커니즘입니다.\n\n• µm 단위 수준의 미세 변형 조절 가능\n• 비대칭 플렉셔를 통한 구조 최적화\n• 다양한 조건 하에서 FEM 해석 결과와 실험 결과의 ±3% 이내 오차 검증 완료\n\n회전 정밀도를 향상시키며, 기존 시스템과 호환되도록 설계되었습니다.`
  },
];

function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <GallerySection id="gallery">
      <div className="container">
        <SectionTitle>GALLERY</SectionTitle>
        <Grid>
          {items.map((item, idx) => (
            <ImageWrapper
              key={idx}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelected(item)}
              style={{ cursor: 'pointer' }}
            >
              <img src={item.src} alt={item.title} />
            </ImageWrapper>
          ))}
        </Grid>
      </div>
      <GalleryModal item={selected} onClose={() => setSelected(null)} />
    </GallerySection>
  );
}

export default Gallery; 