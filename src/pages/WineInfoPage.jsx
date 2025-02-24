import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Header from "../components/Header"
import styled from 'styled-components';
import RhombusPatternImage from "../images/RhombusPattern.jpeg"

const WineInfoPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [wineInfo, setWineInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams();
  const location = useLocation();
  const currentCategory = location.state?.category 

  useEffect(() => {
    const fetchWineInfo = async () => {
      try {
        const response = await fetch(`https://api.sampleapis.com/wines/${currentCategory}`);
        if (!response.ok) throw new Error('Failed to fetch wines');

        const wines = await response.json();
        const wine = wines.find(w => Number(w.id) === Number(itemId));
        
        if (wine) {
          setWineInfo(wine);
          setLoading(false);
          return;
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchWineInfo();
  }, [itemId, currentCategory]);

  if (loading) return <LoadingMessage>Loading wine information...</LoadingMessage>;
  if (!wineInfo) return <ErrorMessage>Wine not found</ErrorMessage>;

  return (
    <Container>
      <WineDetailedPageContainer isDropdownOpen={isDropdownOpen}>
        <Header 
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        />
        <ContentWrapper>
          <CategoryTitle 
            src={RhombusPatternImage}
            isDropdownOpen={isDropdownOpen}>
            {currentCategory}
          </CategoryTitle>
        </ContentWrapper>
      </WineDetailedPageContainer>
      <WineInfoContainer>
        <WineImageSection>
          <WineImage 
            src={wineInfo.image || 'default-wine-image.jpg'} 
            alt={wineInfo.wine} 
          />
        </WineImageSection>
        <WineDetailsSection>
          <DetailItem><Label>Winery:</Label> {wineInfo.winery}</DetailItem>
          <DetailItem><Label>Wine:</Label> {wineInfo.wine}</DetailItem>
          <DetailItem><Label>Rating:</Label> {wineInfo.rating?.average}</DetailItem>
          <DetailItem><Label>Location:</Label> {wineInfo.location}</DetailItem>
        </WineDetailsSection>
      </WineInfoContainer>
    </Container>
  );
};

export default WineInfoPage;

const Container = styled.div`
  background-color: #F2F0EA;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow-y: auto;
`;

const WineDetailedPageContainer = styled.div`
  min-width: 1200px; 
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 3;
  background-color: #F2F0EA;

  &::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => props.isDropdownOpen ? '400px' : '130px'};
  background-color: #93C6E7;
  transition: all 0.5s ease;
  opacity: ${props => props.isDropdownOpen ? 1 : 0};
  z-index: -1;
}
`;

const ContentWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CategoryTitle = styled.div`
  font-size: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  padding-top: 20px;
  font-family: 'JacksonAmor', serif;
  margin-top: ${props => props.isDropdownOpen ? '400px' : '130px'};
  transition: margin-top 0.5s ease;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${props => props.src});
    background-position: center;
    background-size: 400px 600px;
    background-repeat: repeat;  
    opacity: 0.6;
    z-index: -1;
  }
`;

const WineInfoContainer = styled.div`
  display: flex;
  margin: 100px;
  margin-top: 350px; 
  gap: 100px;
`;

const WineImageSection = styled.div`
  flex: 1;
  width: 200px;
  height: 350px;
  border-radius: 8px;
  padding: 50px;
  margin: 30px;
`;

const WineImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
`;

const WineDetailsSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 30px;
  margin-top: 50px;
`;

const DetailItem = styled.div`
  padding: 15px;
  border-radius: 8px;
  font-family: 'SSShinb7Regular', serif;
  font-size: 1.8rem;
`;

const Label = styled.span`
  font-weight: bold;
  color: #4A4A4A;
  margin-right: 10px;
  font-size: 3rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: red;
  font-size: 1.2rem;
`;