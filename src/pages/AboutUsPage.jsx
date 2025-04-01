import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import PartyPeopleImage from '../images/PartyPeople.png'
import WineWithHumanImage from "../images/WineWithHuman.png"

const AboutUsPage = () => {
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
            About Us
          </CategoryTitle>
        </ContentWrapper>
      </WineDetailedPageContainer>
      <MainContent>
        <p>Viniary에 오신 걸 환영해요! 🍷✨</p>
        <StyledParagraph indent="4rem">
          Viniary는 여러분의 와인 여정을 기록하고, 공유하는 귀여운 다이어리 같은 공간이에요! 😄
        </StyledParagraph>
        <StyledParagraph indent="1rem">
          이곳에서는 재미있는 룰렛 기능을 통해 오늘의 와인을 추천해 드립니다.
        </StyledParagraph>
        <StyledParagraph indent="3rem">
          와인을 마시며 그 순간들을 다이어리처럼 기록하고, 내가 좋아하는 와인을 찜하고, 나중에 다시 꺼내볼 수도 있답니다. 📖💕
        </StyledParagraph>
        <StyledParagraph indent="2rem">
          비슷한 와인 찾기, 리뷰 남기기, 와인 필터링 등 와인에 대한 모든 정보를 재미있고 귀엽게 기록하고, 나만의 와인 여정을 만들어 보세요.
        </StyledParagraph>
        <StyledParagraph indent="3rem">
          자, 그럼 오늘은 어떤 술을 선택할까요?
        </StyledParagraph>
      </MainContent>
      <LastContent>
        {/* <FirstBottomImage src = {PartyPeopleImage}></FirstBottomImage> */}
        <SecondBottomImage src = {WineWithHumanImage}></SecondBottomImage>
      </LastContent>
    </>
  );
};

export default AboutUsPage;

const WineDetailedPageContainer = styled.div`
  min-width: 1200px; 
  width: 100%;
  position: relative;
  top: 0;
  z-index: 3;
  background-color: #F2F0EA;

//   &::before {
//   content: '';
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: ${props => props.isDropdownOpen ? '480px' : '150px'};
//   background-color: #93C6E7;
//   transition: all 0.5s ease;
//   opacity: ${props => props.isDropdownOpen ? 1 : 0};
//   z-index: -1;
// }
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

  // // 상단 웨이브 라인
  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: -37px;
  //   left: 0;
  //   width: 100%;
  //   height: 75px;
  //   opacity: 1;
  //   transition: all 0.5s ease;
  //   background: #93C6E7;
  //   --s: 50px;
  //   --b: 50px;
  //   --m: 2.5;
  //   --R: calc(var(--s)*sqrt(var(--m)*var(--m) + 1) + var(--b)/2);
  //   --_g: #0000 calc(99% - var(--b)), #F2F0EA calc(101% - var(--b)) 99%, #0000 101%;
  //   mask: 
  //     radial-gradient(var(--R) at left 50% bottom calc(-1*var(--m)*var(--s)), var(--_g)) 
  //       calc(50% - 2*var(--s)) calc(50% - var(--s)/2 - var(--b)/2)/calc(4*var(--s)) calc(var(--s) + var(--b)) repeat-x,
  //     radial-gradient(var(--R) at left 50% top calc(-1*var(--m)*var(--s)), var(--_g)) 
  //       50% calc(50% + var(--s)/2 + var(--b)/2)/calc(4*var(--s)) calc(var(--s) + var(--b)) repeat-x;
  // }

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
  width: 700px;
  margin: 100px auto 0;
  font-family: 'SSShinb7Regular', serif;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  p:first-child {  
    font-size: 2rem;
    margin-left: 2rem;
    color: #555;
  }
`;

const StyledParagraph = styled.p`
  margin-left: ${props => props.indent || '0'};
  margin-bottom: 0rem;
  line-height: 1.5;
`;

const LastContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 300px;

`;

const FirstBottomImage = styled.img`
  bottom: 0;
  width: 450px; 
  height: auto;
  opacity: 0.8;
`;

const SecondBottomImage = styled.img`
  width: 450px; 
  height: 400px;
  opacity: 0.8;
`;