import React from 'react';
import styled from 'styled-components';
import GrayscaleImage from "../images/GrayscaleImage.jpeg";

const ParallaxSection = () => {
  return (
    <SectionContainer>
      <BackgroundWrapper>
        <BackgroundImage src={GrayscaleImage} alt="background" />
      </BackgroundWrapper>
      <BackgroundOverlay />
      <Content>
        <Text>
        Good Vibes, Great Wines, Golden Moments 
        </Text>
      </Content>
    </SectionContainer>
  );
};


export default ParallaxSection;

const SectionContainer = styled.div`
  height: 500px;
  position: relative;
  overflow: hidden;
`;

const BackgroundWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-image: url(${GrayscaleImage});
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;  
`;


const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;  
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(242, 240, 234, 0.3); 
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  color: #333;
  font-size: 5rem;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  font-family: 'ReciaSerifDisplay', serif;
  font-weight: bold;
  border-top: 3px solid black;
  border-bottom: 3px solid black;
`;