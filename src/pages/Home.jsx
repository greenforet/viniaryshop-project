import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FirstHomeSection from '../components/FirstHomeSection';
import SecondHomeSection from '../components/SecondHomeSection';
import CarouselSection from '../components/CarouselSection';
import ParallaxSection from '../components/ParallaxSection';

const Home = () => {
  return (
    <HomeContainer>
      <Header/>
      <CarouselSection/>
      <FirstHomeSection/>
      <ParallaxSection/>
      <SecondHomeSection/>
      <Footer/>
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