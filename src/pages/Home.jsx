import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Header, { HeaderContainer } from '../components/Header';
import Footer from '../components/Footer';
import FirstHomeSection from '../components/FirstHomeSection';
import SecondHomeSection from '../components/SecondHomeSection';
import CarouselSection from '../components/CarouselSection';
import ParallaxSection from '../components/ParallaxSection';

const Home = () => {
  const [isFixedHeaderVisible, setIsFixedHeaderVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const secondHomeSectionRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const mainHeaderHeight = 130;
      
      const secondHomeSection = secondHomeSectionRef.current;
      const footer = footerRef.current;

      if (secondHomeSection && footer) {
        const secondHomeSectionRect = secondHomeSection.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();
        
        // Footer가 화면에 보이기 시작하는지 체크
        const isFooterVisible = footerRect.top < window.innerHeight;
        
        // SecondHomeSection이 화면에 보이는지 체크
        const isSecondHomeSectionVisible = 
          secondHomeSectionRect.top < window.innerHeight && 
          secondHomeSectionRect.bottom > 0;

        if (scrollTop > mainHeaderHeight) {
          if (isSecondHomeSectionVisible && !isFooterVisible) {
            // SecondHomeSection이 보이고 Footer가 안 보일 때는 헤더 숨김
            setIsFixedHeaderVisible(false);
          } else {
            // 그 외의 경우(이전 섹션들이나 Footer가 보일 때)는 헤더 보임
            setIsFixedHeaderVisible(true);
          }
        } else {
          setIsFixedHeaderVisible(false);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HomeContainer>
      <Header/>
      {isFixedHeaderVisible && (
        <FixedHeader>
          <Header 
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
            isFixed={true}
          />
        </FixedHeader>
      )}
      <CarouselSection/>
      <FirstHomeSection/>
      <ParallaxSection/>
      <SecondHomeSection ref={secondHomeSectionRef}/>
      <Footer ref={footerRef}/> 
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  min-width: 1200px;
  width: 100vw;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;         
  flex-direction: column; 
`;

const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 1200px;
  background-color: rgba(242, 240, 234, 0.8);
  padding-bottom: 170px;
  z-index: 1000;
  animation: slideDown 0.3s ease-in-out;

  ${HeaderContainer} {
    background-color: rgba(242, 240, 234, 0.1);
  }

  @keyframes slideDown {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;