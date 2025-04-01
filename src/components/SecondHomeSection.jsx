import React, { useState, forwardRef } from 'react';
import styled, { keyframes } from 'styled-components';
import WineDrowingImage from "../images/WineDrowingImage.png"
import WineGlassImage from "../images/WineGlassImage.png"
// import WImage from "../images/W.png"
// import IImage from "../images/I.png"
// import NImage from "../images/N.png"
// import EImage from "../images/E.png"
import SecondHomeDrowingImage from "../images/SecondHomeDrowing.png"
import SecondHomeImage from "../images/SecondHomeImage.jpeg"
import WineGlassHandImage from "../images/WineGlassHandImage.png"
import { Wheel } from 'react-custom-roulette'; 
import { useNavigate } from 'react-router-dom';

const SecondHomeSection = forwardRef((props, ref) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [recommendedWines, setRecommendedWines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 와인 데이터 가져오기
  const fetchRecommendedWines = async (category) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.sampleapis.com/wines/${category}`);
      if (!response.ok) throw new Error('Failed to fetch wines');
      
      const data = await response.json();
      // 랜덤하게 3개 선택
      const shuffled = data.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      setRecommendedWines(selected);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const data = [
    { option: 'port', style: { backgroundColor: '#FFF0F5', textColor: '#C1121F' } },
    { option: 'dessert', style: { backgroundColor: '#FFE4E1', textColor: '#C1121F' } },
    { option: 'reds', style: { backgroundColor: '#FFF0F5', textColor: '#C1121F' } },
    { option: 'rose', style: { backgroundColor: '#FFE4E1', textColor: '#C1121F' } },
    { option: 'sparkling', style: { backgroundColor: '#FFF0F5', textColor: '#C1121F' } },
    { option: 'whites', style: { backgroundColor: '#FFE4E1', textColor: '#C1121F' } },
  ];

  const handleSpinClick = () => {
    if (!mustSpin) {
      const randomNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(randomNumber);
      setMustSpin(true);
    }
  };
  
  const handleStopSpinning = () => {
    setMustSpin(false);
  
    const selectedIndex = (prizeNumber + 6) % data.length;
    const selectedCategory = data[selectedIndex].option;
    console.log('Final selected category:', selectedCategory);
    
    fetchRecommendedWines(selectedCategory);
    setShowPopup(true);
  };

  const handleWineClick = (wine) => {
    navigate(`/wineinfopage/${wine.id}`, { 
      state: { 
        wineData: wine,
        category: data[prizeNumber].option
      }
    });
    setShowPopup(false);
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
                onStopSpinning={handleStopSpinning}
                pointerProps={{
                  style: { 
                    display: 'none',
                    opacity: 0,
                    pointerEvents: 'none'
                  }
                }}
                backgroundColors={['#FFE4E1', '#FFF0F5']}
                textColors={['#C1121F']}
                outerBorderColor="none"
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
                spinDirection="clockwise"
              />
              </RouletteWrapper>
            <SpinButton onClick={handleSpinClick} disabled={mustSpin}>
              {mustSpin ? 'Spinning . . . . . ' : 'SPIN!'}
            </SpinButton>
          </RouletteContainer>
        </MainSlogan>
        </RightSection>
      </FirstMainSection>
      {showPopup && (
        <PopupOverlay>
        <PopupContent>
          <CloseButton onClick={() => setShowPopup(false)}>×</CloseButton>
          <PopupTitle>{data[prizeNumber].option} wine is recommended !!!</PopupTitle>
            
            {loading ? (
              <LoadingText>와인 추천을 불러오는 중...</LoadingText>
            ) : error ? (
              <ErrorText>와인 정보를 불러오는데 실패했습니다.</ErrorText>
            ) : (
              <WineList>
                {recommendedWines.map((wine, index) => (
                  <WineItem 
                    key={index}
                    onClick={() => handleWineClick(wine)}
                  >
                    <WineImage 
                      src={wine.image} 
                      alt={wine.wine} 
                    />
                    <WineInfo>
                      <WineName>{wine.wine}</WineName>
                    </WineInfo>
                  </WineItem>
                ))}
              </WineList>
            )}
          </PopupContent>
        </PopupOverlay>
      )}
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
  position: relative;
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


const PopupOverlay = styled.div`
  position: absolute;  // fixed에서 absolute로 변경
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  position: relative;
  width: 90%;
  max-width: 700px;
  margin: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #C1121F;
  padding: 5px 10px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const PopupTitle = styled.h2`
  color: #C1121F;
  text-align: center;
  margin-bottom: 30px;
  font-family: 'JacksonAmor', serif;
  font-size: 2.5rem;
`;

const WineList = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
`;

const WineItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const WineImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-top: 20px;
  padding-top: 10px;
`;

const WineInfo = styled.div`
  text-align: center;
`;

const WineName = styled.h3`
  margin-top: 20px;
  font-size: 1.1rem;
  color: #333;
  font-family: 'SSShinb7Regular', serif;
`;

const LoadingText = styled.div`
  text-align: center;
  color: #C1121F;
  font-size: 1.2rem;
  padding: 20px;
  font-family: 'SSShinb7Regular', serif;
`;

const ErrorText = styled.div`
  text-align: center;
  color: #C1121F;
  font-size: 1.2rem;
  padding: 20px;
  font-family: 'SSShinb7Regular', serif;
`;