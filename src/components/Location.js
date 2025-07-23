import React from 'react';
import styled from 'styled-components';

const LocationSection = styled.section`
  background: var(--background-dark1); /* Changed to pure black for PC as well */
  padding: 100px 0;

  @media (max-width: 768px) {
    padding: 60px 0; // 모바일 패딩 조정
    // The background is already black, so no need for explicit override here if it's black by default
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem; // 모바일 폰트 크기 조정
    margin-bottom: 15px;
  }
`;

const Address = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-color-muted);
  margin-bottom: 60px;

  @media (max-width: 768px) {
    font-size: 1rem; // 모바일 폰트 크기 조정
    margin-bottom: 30px;
  }
`;

const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
    filter: grayscale(100%) invert(90%);
  }

  @media (max-width: 768px) {
    height: 300px; // 모바일 지도 높이 조정
  }
`;

function Location() {
  const labAddress = "경북 경산시 삼풍로 27, G13관 301호 (로봇시스템실험실)";
  const googleMapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(labAddress)}&output=embed`;

  return (
    <LocationSection id="location">
      <div className="container">
        <SectionTitle>LOCATION</SectionTitle>
        <Address>{labAddress}</Address>
        <MapWrapper>
          <iframe
            src={googleMapsEmbedUrl}
            title="연구실 위치"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </MapWrapper>
      </div>
    </LocationSection>
  );
}

export default Location; 