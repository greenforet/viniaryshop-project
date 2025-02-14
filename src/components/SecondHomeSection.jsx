import React from 'react';
import styled from 'styled-components';
import MaskingImage from "../images/MaskingImage.png";
import BeerImage from "../images/SloganRightImage.jpeg"
import SecondBeerMan from "../images/SecondBeerMan.png"

const SecondHomeSection = () => {
  return (
    <MainSectionContainer>
      <FirstMainSection>
        <ImageContainer>
          <CornerImageTop src={MaskingImage} alt="corner-top" />
          <FirstMainSectionImage src={BeerImage} alt="Beer" />
          <CornerImageBottom src={MaskingImage} alt="corner-bottom" />
        </ImageContainer>
        <BeerSecondMiddleImage src={SecondBeerMan} alt="middle-image" />
        <MainSlogan>
          <TitleText>Today's Recommendation</TitleText>
          <ProductsContainer>
          </ProductsContainer>
        </MainSlogan>
      </FirstMainSection>
    </MainSectionContainer>
  );
};

export default SecondHomeSection;

const MainSectionContainer = styled.div`
  width: 100vw;
  height: 600px;
  background-color: #F2F0EA;
  font-family: 'JacksonAmor', serif;
  font-weight: bold;
  padding-top: 50px;
  padding-bottom: 30px;
`;

const FirstMainSection = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const MainSlogan = styled.div`
  color: #C1121F;
  flex: 1;               
  z-index: 1;
  text-align: center; 
  margin: 20px 0; 
  padding-right: 60px; 
`;

const BeerSecondMiddleImage = styled.img`
  position: absolute; 
  left: 81%;          
  transform: translateY(-10%) rotate(10deg);
  width: 130px;       
  height: auto;
  z-index: 1;      
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

const TitleText = styled.div`
  font-size: 4.5rem;
  padding-right: 230px;
`;

const ProductsContainer = styled.div`
  display: flex;
  width: 80%;
  padding-left: 90px;
`;
