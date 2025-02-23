import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import WineDrowingImage from "../images/WineDrowingImage.png"
import WineGlassImage from "../images/WineGlassImage.png"
// import RedsFoodImage from "../images/RedsFood.png"
// import WhitesFoodImage from "../images/WhitesFood.png"
// import SparklingFoodImage from "../images/SparklingFood.png"
// import RoseFoodImage from "../images/RoseFood.png"
// import DessertFoodImage from "../images/DessertFood.png"
// import PortFoodImage from "../images/PortFood.png"
import { Wheel } from 'react-custom-roulette'; 

const SecondHomeSection = () => {
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

// const wineImages = [
//   { 
//     src: RedsFoodImage, 
//     name: "Red Wine Pairing",
//     description: "Perfect with red meat, pasta with rich sauces, and aged cheeses" 
//   },
//   { 
//     src: WhitesFoodImage, 
//     name: "White Wine Pairing",
//     description: "Ideal for seafood, light pasta dishes, and fresh cheeses" 
//   },
//   { 
//     src: SparklingFoodImage, 
//     name: "Sparkling Wine Pairing",
//     description: "Great with appetizers, light seafood, and celebrations" 
//   },
//   { 
//     src: RoseFoodImage, 
//     name: "Rosé Wine Pairing",
//     description: "Pairs well with Mediterranean cuisine and light summer dishes" 
//   },
//   { 
//     src: DessertFoodImage, 
//     name: "Dessert Wine Pairing",
//     description: "Perfect complement to desserts, fruits, and blue cheeses" 
//   },
//   { 
//     src: PortFoodImage, 
//     name: "Port Wine Pairing",
//     description: "Excellent with chocolate, aged cheeses, and nuts" 
//   },
// ];

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <MainSectionContainer>
      <FirstMainSection>
      <LeftSection> 
          <ImageContainer>
            {/* <ImageGrid>
            {wineImages.map((wine, index) => (
              <ImageItem key={index} isEven={index % 2 === 0}>
                <ImageWrapper>
                  <WineImage src={wine.src} alt={wine.name} />
                  <Tooltip>{wine.description}</Tooltip>
                </ImageWrapper>
                <WineName>{wine.name}</WineName>
              </ImageItem>
            ))}
            </ImageGrid> */}
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
};

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
  transform: translateX(-15%) translateY(-90%) rotate(5deg);
  width: 250px;       
  height: auto;
  z-index: 1;      
`;

const ImageContainer = styled.div`
  position: relative;
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
  transform: translateX(-100%) translateY(30%) rotate(-35deg);
  width: 150px;
  height: auto;
  z-index: 999;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(-100%) translateY(30%) rotate(-45deg) scale(1.5);
  }
  animation: ${props => props.isSpinning ? pinWiggle : 'none'} 0.3s ease infinite;
`;

const pinWiggle = keyframes`
  0% { transform: translateX(-100%) translateY(30%) rotate(-45deg); }
  50% { transform: translateX(-100%) translateY(30%) rotate(5deg); }
  100% { transform: translateX(-100%) translateY(30%) rotate(-45deg); }
`;

const Description = styled.p`
  font-size: 1.5rem;
  color: black;
  margin: 20px 0;
  line-height: 1.6;
  text-align: center;
  font-family: 'JacksonAmor', serif;
`;

// const ImageGrid = styled.div`
//   display: flex;
//   flex-direction: column;
//   max-width: 450px;
//   gap: 5px;
// `;

// const ImageItem = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-left: ${props => props.isEven ? '0' : '540px'};
//   margin-bottom: -120px;
//   transition: transform 0.3s ease;
//   position: relative; 
//   top: ${props => props.isEven ? '-30px' : '-110px'}; 

//   &:hover {
//     transform: scale(1.2);
//   &:hover {
//     transform: scale(1.2);
//     z-index: 8888;  // hover 시 다른 요소들보다 위에 오도록
//   }
//     cursor: pointer;
//   }
// `;

// const WineName = styled.p`
//   margin-top: 7px;
//   color: black;
//   font-size: 1.2rem;  
//   font-family: 'JacksonAmor', serif;
//   text-align: center;
//   font-weight: bold;
//   white-space: nowrap; 
// `;

// const Tooltip = styled.div`
//   position: absolute;
//   top: 10%;  // 위쪽으로 이동
//   left: 95%;  // 오른쪽으로 이동
//   transform: translateY(-20%);  // 약간 위로 조정
//   background-color: rgba(147, 198, 231, 0.95);
//   color: white;
//   padding: 15px 20px;
//   border-radius: 20px;  // 더 동그랗게
//   font-size: 0.9rem;
//   opacity: 0;
//   visibility: hidden;
//   transition: all 0.3s ease;
//   box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//   z-index: 9999;
//   width: max-content;
//   max-width: 200px;
//   text-align: center;
//   font-family: 'JacksonAmor', serif;

//   &::after {
//     content: '';
//     position: absolute;
//     top: 20px;  // 화살표 위치 조정
//     left: -10px;  // 왼쪽으로 이동
//     border-width: 5px;
//     border-style: solid;
//     border-color: transparent rgba(147, 198, 231, 0.95) transparent transparent;  // 화살표 방향 변경
//   }
// `;

// const ImageWrapper = styled.div`
//   position: relative;
//   cursor: pointer;

//   &:hover ${Tooltip} {
//     opacity: 1;
//     visibility: visible;
//     transform: translateY(-20%) translateX(10px);
//   }
// `;

// const WineImage = styled.img`
//   width: 200px;
//   height: 200px;
//   object-fit: cover;
//   transition: transform 0.3s ease;

//   ${ImageWrapper}:hover & {
//     transform: scale(1.05);
//   }
// `;