import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const Home = () => {
  return (
    <Container>
      <Header/>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  min-width: 1200px;
  width: 100vw;
  min-height: 100vh;
  position: relative;
  overflow: hidden; 
`;