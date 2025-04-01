import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from "../components/Footer"

const ShopPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownChange = (isOpen) => {
    setIsDropdownOpen(isOpen);
  };
  return (
    <>
      <WineDetailedPageContainer isDropdownOpen={isDropdownOpen}>
      <Header 
          onDropdownChange={handleDropdownChange} 
        />
      <ContentWrapper>
        <CategoryTitle 
          isDropdownOpen={isDropdownOpen}>
          Shop
        </CategoryTitle>
      </ContentWrapper>
      </WineDetailedPageContainer>
      <MainContent>
        <MapContent/>
        <InfoContent>
          <NameContent>
            <div>로고</div>
            <div>주소</div>
          </NameContent>
          <NumberContent>
            <div>번호</div>
            <div>쉬는날</div>
          </NumberContent>
        </InfoContent>
      </MainContent>
      <Footer/>
    </>
  );
};

export default ShopPage;

const WineDetailedPageContainer = styled.div`
  min-width: 1200px; 
  width: 100%;
  position: relative;
  top: 0;
  z-index: 3;
  background-color: #F2F0EA;
`;

const ContentWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 40px;
`;

const CategoryTitle = styled.div`
  font-size: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  padding-top: ${props => props.isDropdownOpen ? '50px' : '30px'};
  font-family: 'JacksonAmor', serif;
  margin-top: ${props => props.isDropdownOpen ? '400px' : '130px'};
  transition: all 0.5s ease;
  position: relative;
  background: #93C6E7;
  z-index: 1; 

  // 하단 웨이브 라인
  &::after {
    content: '';
    position: absolute;
    bottom: -36px;
    left: 0;
    width: 100%;
    height: 75px;
    opacity: 1;
    background: #93C6E7;
    --s: 50px;
    --b: 50px;
    --m: 2.5;
    --R: calc(var(--s)*sqrt(var(--m)*var(--m) + 1) + var(--b)/2);
    --_g: #0000 calc(99% - var(--b)), #F2F0EA calc(101% - var(--b)) 99%, #0000 101%;
    mask: 
      radial-gradient(var(--R) at left 50% bottom calc(-1*var(--m)*var(--s)), var(--_g)) 
        calc(50% - 2*var(--s)) calc(50% - var(--s)/2 - var(--b)/2)/calc(4*var(--s)) calc(var(--s) + var(--b)) repeat-x,
      radial-gradient(var(--R) at left 50% top calc(-1*var(--m)*var(--s)), var(--_g)) 
        50% calc(50% + var(--s)/2 + var(--b)/2)/calc(4*var(--s)) calc(var(--s) + var(--b)) repeat-x;
  }
  `;


  const MainContent = styled.div`
  width: 100%;
  min-height: calc(100vh - 350px);
  margin-top: 100px;
  font-family: 'SSShinb7Regular', serif;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;  
`;

const MapContent = styled.div`
  height: 600px;
  width: 700px;
  background-color: white;
  margin-top: 80px; 
`;

const InfoContent = styled.div`
  margin-top: 80px;
  margin-bottom: 150px;
`;

const NameContent = styled.div`
  display: flex;
  margin-bottom: 50px;
  gap: 100px;
`;

const NumberContent = styled.div`
  display: flex;
  gap: 100px;
`;