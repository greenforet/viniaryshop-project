import React, { useState, forwardRef } from 'react';
import styled, { keyframes } from 'styled-components';
import WineDrowingImage from "../images/WineDrowingImage.png"
import WineGlassImage from "../images/WineGlassImage.png"
import WImage from "../images/W.png"
import IImage from "../images/I.png"
import NImage from "../images/N.png"
import EImage from "../images/E.png"
import SecondHomeDrowingImage from "../images/SecondHomeDrowing.png"
import SecondHomeImage from "../images/SecondHomeImage.jpeg"
import WineGlassHandImage from "../images/WineGlassHandImage.png"
import { Wheel } from 'react-custom-roulette'; 

const SecondHomeSection = forwardRef((props, ref) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const data = [
    { option: 'reds', style: { backgroundColor: '#FFE4E1', textColor: '#C1121F' } },
    { option: 'whites', style: { backgroundColor: '#FFF0F5', textColor: '#C1121F' } },
    { option: 'sparkling', style: { backgroundColor: '#FFE4E1', textColor: '#C1121F' } },
    { option: 'rose', style: { backgroundColor: '#FFF0F5', textColor: '#C1121F' } },
    { option: 'dessert', style: { backgroundColor: '#FFE4E1', textColor: '#C1121F' } },
    { option: 'port', style: { backgroundColor: '#FFF0F5', textColor: '#C1121F' } },
  ];

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <MainSectionContainer ref={ref}>
      <FirstMainSection>
      <LeftSection>
        <ImageContainer>
          <FirstImage src={SecondHomeImage} alt="second-home-drowing" />
          <SecondImage src={WineGlassHandImage} alt="wines-image" />
          <ThirdImage src={SecondHomeDrowingImage}/>
          {/* <LetterContainer>
            <LetterWImage src={WImage} alt="w-image" />
            <LetterIImage src={IImage} alt="i-image" />
            <LetterNImage src={NImage} alt="n-image" />
            <LetterEImage src={EImage} alt="e-image" />
          </LetterContainer> */}
        </ImageContainer>
      </LeftSection>
      <RightSection>
        <MainSlogan>
          <TitleText>Let's spin the roulette!</TitleText>
          <Description>
              Can't decide which wine to try? <br/>
              Let the wheel of fortune choose for you!
            </Description>
          <DrowingImage src={WineDrowingImage} alt="wine-drowing-image" />
          <RouletteContainer>
            <RouletteWrapper>
              <ImagePin 
                src={WineGlassImage} 
                alt="wine-glass-pin" 
                isSpinning={mustSpin}
              /> 
              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                onStopSpinning={() => setMustSpin(false)}
                pointerProps={{
                  style: { display: 'none' }
                }}
                backgroundColors={['#FFE4E1', '#FFF0F5']}
                textColors={['#C1121F']}
                outerBorderColor= "none"
                outerBorderWidth={3}
                innerBorderColor="none"
                innerBorderWidth={2}
                innerRadius={0}
                radiusLineColor="none"
                radiusLineWidth={1}
                fontSize={30}
                textDistance={60}
                spinDuration={0.8}
                fontFamily={'SSShinb7Regular'}
              />
              </RouletteWrapper>
            <SpinButton onClick={handleSpinClick} disabled={mustSpin}>
              {mustSpin ? 'Spinning . . . . . ' : 'SPIN!'}
            </SpinButton>
          </RouletteContainer>
        </MainSlogan>
        </RightSection>
      </FirstMainSection>
    </MainSectionContainer>
  );
});

export default SecondHomeSection;

const MainSectionContainer = styled.div`
  width: 100vw;
  height: 820px;
  background-color: #F2F0EA;
  font-family: 'JacksonAmor', serif;
  font-weight: bold;
  padding-top: 50px;
  padding-bottom: 30px;
  overflow: hidden;
`;

const FirstMainSection = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const MainSlogan = styled.div`
  color: #C1121F;
  flex: 1;               
  z-index: 2;
  text-align: center; 
  margin: 20px 0; 
  padding-right: 60px; 
`;

const DrowingImage = styled.img`
  position: absolute; 
  left: 85%;          
  transform: translateX(-10%) translateY(-100%) rotate(5deg);
  width: 180px;       
  height: auto;
  z-index: 1;      
`;

const TitleText = styled.div`
  font-size: 4.5rem;
  padding-right: 130px;
`;

const RouletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
    z-index: 3;
`;

const SpinButton = styled.div`
  padding: 30px 30px;
  font-size: 3rem;
  color: black;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'JacksonAmor', serif;

  &:hover {
    transform: scale(1.2);
  }
`;


const LeftSection = styled.div`
  flex: 1;
  position: relative;
  justify-content: center; 
  align-items: flex-start;  
  padding-top: 20px;  
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1; 
`;

const RouletteWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

const ImagePin = styled.img`
  position: absolute;
  top: -60px;
  left: 30%;
  transform: translateX(-130%) translateY(20%) rotate(-30deg);
  width: 100px;
  height: auto;
  z-index: 999;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(-130%) translateY(20%) rotate(-40deg) scale(1.5);
  }
  animation: ${props => props.isSpinning ? pinWiggle : 'none'} 0.3s ease infinite;
`;

const pinWiggle = keyframes`
  0% { transform: translateX(-130%) translateY(20%) rotate(-45deg); }
  50% { transform: translateX(-130%) translateY(20%) rotate(5deg); }
  100% { transform: translateX(-130%) translateY(20%) rotate(-45deg); }
`;

const Description = styled.p`
  font-size: 1.5rem;
  color: black;
  margin: 20px 0;
  line-height: 1.6;
  text-align: center;
  font-family: 'JacksonAmor', serif;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 100px;
  padding-top: 50px;
`;

const FirstImage = styled.img`
  width: 300px;
  height: auto;
  object-fit: contain;
  border-radius: 50% 20% / 10% 40%;
  transform: translateX(100%) translateY(-10%);
`;

const SecondImage = styled.img`
  width: 300px;
  height: auto;
  object-fit: contain;
  transform: translateX(5%) translateY(-90%) rotate(-8deg);
`;

const ThirdImage = styled.img`
  width: 450px;
  height: auto;
  object-fit: contain;
  transform: translateX(5%) translateY(-50%) rotate(-5deg);
`;

// const LetterContainer = styled.div`
//   display: flex;
// `;
// const LetterWImage = styled.img`
//   width: 200px;
//   height: auto;
//   object-fit: contain;
//   transform: translateX(70%) translateY(-120%);
// `;

// const LetterIImage = styled.img`
//   width: 150px;
//   height: auto;
//   object-fit: contain;
//   transform: translateX(60%) translateY(-160%) rotate(-10deg); 
// `;

// const LetterNImage = styled.img`
//   width: 150px;
//   height: auto;
//   object-fit: contain;
//   transform: translateX(40%) translateY(-160%) rotate(-10deg);
// `;

// const LetterEImage = styled.img`
//   width: 150px;
//   height: auto;
//   object-fit: contain;
//   transform: translateX(20%) translateY(-200%);  // 60%로 감소
// `;