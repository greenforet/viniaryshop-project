import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import TagImage from '../images/Tag.png'

const TipsPage = () => {
  return (
    <>
      <ImageContainer>
        <OverlayImage src={TagImage} alt="tagimage" />
        <OverlayText>Tips</OverlayText>
      </ImageContainer>
      <Header/>
    </>
  );
};

export default TipsPage;

const ImageContainer = styled.div`
  position: fixed;  
  top: 0;      
  right: 400px;    
  z-index: 2;     
  width: 450px;   
  height: auto;
  display: flex;   
  justify-content: center;
  align-items: center;
`;

const OverlayImage = styled.img`
  width: 100%;    
  height: auto;
  opacity: 0.8;
`;

const OverlayText = styled.div`
  position: absolute;
  top: 53%; 
  left: 55%;  
  transform: translate(-10%, -60%);
  transform: rotate(30deg);
  font-size: 5.5rem;
  text-align: center;
  z-index: 3;
  font-family: 'JacksonAmor', serif;
`;