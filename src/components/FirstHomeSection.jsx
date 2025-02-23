import React from 'react';
import styled from 'styled-components';
import MiddleImage from "../images/SloganMiddleImage.png";
import RightImage from "../images/SloganRightImage.jpeg";
import MaskingImage from "../images/MaskingImage.png";

const MainSection = () => {
  return (
    <MainSectionContainer>
      <FirstMainSection>
        <MainSlogan>
          <div>Sip the Chill:</div>
          <div>Relax, unwind, and </div>
          <div>savor the moment</div>
        </MainSlogan>
        <SloganMiddleImage src={MiddleImage} alt="middle-image" />
        <ImageContainer>
          <CornerImageTop src={MaskingImage} alt="corner-top" />
          <FirstMainSectionImage src={RightImage} alt="slogan" />
          <CornerImageBottom src={MaskingImage} alt="corner-bottom" />
        </ImageContainer>
      </FirstMainSection>
    </MainSectionContainer>
  );
};

export default MainSection;

const MainSectionContainer = styled.div`
  width: 100vw;
  height: 600px;
  background-color: #F2F0EA;
  font-family: 'JacksonAmor', serif;
  font-weight: bold;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const FirstMainSection = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const MainSlogan = styled.div`
  color: #C1121F;
  font-size: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;  
  align-items: center;      
  flex: 1;                  
  z-index: 1; 

  div {
    text-align: center; 
    margin: 10px 0; 
  }

`;

const SloganMiddleImage = styled.img`
  position: absolute;  
  left: 33%;         
  transform: translateY(67%);  
  width: 450px;      
  height: auto;
  z-index: 2;     
`;

const ImageContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1; 
`;

const FirstMainSectionImage = styled.img`
  width: calc(500px - 100px);  
  height: calc(600px - 100px); 
  margin: 50px; 
  background-color: lightgray;
  display: flex;
  justify-content: center;  
  align-items: center;      
  flex: 1;                 
  object-fit: cover;  
  border-radius: 50% 20% / 10% 40%;
`;

const CornerImageTop = styled.img`
  position: absolute;
  width: 200px;  
  height: 200px;  
  top: -20px;   
  left: -20px;  
  transform: rotate(-45deg); 
`;

const CornerImageBottom = styled.img`
  position: absolute;
  width: 200px;  
  height: 200px; 
  bottom: -15px; 
  right: -20px; 
  transform: rotate(-45deg); 
`;