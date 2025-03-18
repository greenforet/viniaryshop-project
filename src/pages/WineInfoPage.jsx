import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import Header, { HeaderContainer } from "../components/Header"
import styled from 'styled-components';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; 
import RhombusPatternImage from "../images/RhombusPattern.jpeg"

const WineInfoPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [wineInfo, setWineInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams();
  const location = useLocation();
  const currentCategory = location.state?.category 
  const [isFixedHeaderVisible, setIsFixedHeaderVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [recommendedWines, setRecommendedWines] = useState([]);

  useEffect(() => {
    const fetchRecommendedWines = async () => {
      try {
        const response = await fetch(`https://api.sampleapis.com/wines/${currentCategory}`);
        if (!response.ok) throw new Error('Failed to fetch wines');

        const allWines = await response.json();
        const otherWines = allWines.filter(wine => Number(wine.id) !== Number(itemId));
        const shuffled = otherWines.sort(() => 0.5 - Math.random());
        setRecommendedWines(shuffled.slice(0, 3));
      } catch (error) {
        console.error('Error fetching recommended wines:', error);
      }
    };

    if (currentCategory && itemId) {
      fetchRecommendedWines();
    }
  }, [currentCategory, itemId]);

  useEffect(() => {
    const likedWines = JSON.parse(localStorage.getItem('likedWines') || '[]');
    const wineKey = `${currentCategory}-${itemId}`;
    setIsLiked(likedWines.includes(wineKey));
  }, [itemId, currentCategory]);

  const handleLikeClick = () => {
    const likedWines = JSON.parse(localStorage.getItem('likedWines') || '[]');
    const wineKey = `${currentCategory}-${itemId}`;
    
    if (isLiked) {
      // 좋아요 취소
      const updatedLikes = likedWines.filter(item => item !== wineKey);
      localStorage.setItem('likedWines', JSON.stringify(updatedLikes));
    } else {
      // 좋아요 추가
      likedWines.push(wineKey);
      localStorage.setItem('likedWines', JSON.stringify(likedWines));
    }
    
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 170;
      setIsFixedHeaderVisible(scrollPosition > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownChange = (isOpen) => {
    setIsDropdownOpen(isOpen);
  };

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
          onDropdownChange={handleDropdownChange}
        />
        <ContentWrapper>
          <CategoryTitle 
            src={RhombusPatternImage}
            isDropdownOpen={isDropdownOpen}>
            {currentCategory}
          </CategoryTitle>
        </ContentWrapper>
      </WineDetailedPageContainer>
      {isFixedHeaderVisible && (
        <FixedHeader>
          <Header 
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
            currentCategory={currentCategory}
            isFixed={true}
          />
        </FixedHeader>
      )}
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
          <ActionButtonsContainer>
            <LikeButton onClick={handleLikeClick}>
              {isLiked ? <FaHeart color="#FF0000" /> : <FaRegHeart />}
              Liked!
            </LikeButton>
            <ReservationButton>Reservation</ReservationButton>
          </ActionButtonsContainer>
        </WineDetailsSection>
      </WineInfoContainer>
      <RecommendedSection>
        <RecommendedTitle>Another {currentCategory} Wine .   .   . </RecommendedTitle>
        <RecommendedWinesContainer>
          {recommendedWines.map((wine) => (
            <RecommendedWineCard 
              key={wine.id}
              onClick={() => {
                window.scrollTo(0, 0);
                Navigate(`/wine/${wine.id}`, { 
                  state: { category: currentCategory } 
                });
              }}
            >
              <RecommendedWineImage 
                src={wine.image || 'default-wine-image.jpg'} 
                alt={wine.wine}
              />
              <RecommendedWineName>{wine.wine}</RecommendedWineName>
            </RecommendedWineCard>
          ))}
        </RecommendedWinesContainer>
      </RecommendedSection>
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
  position: relative;
  top: 0;
  z-index: 2;
  background-color: #F2F0EA;

  &::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => props.isDropdownOpen ? '400px' : '130px'};
  background-color: ##F2F0EA;
  transition: all 0.5s ease;
  opacity: ${props => props.isDropdownOpen ? 1 : 0};
  z-index: -1;
}
`;

const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 1200px;
  background-color: rgba(242, 240, 234, 0.8);
  padding-bottom: 170px;
  z-index: 3;
  animation: slideDown 0.3s ease-in-out;

  ${HeaderContainer}
    background-color: rgba(242, 240, 234, 0.1);
  }

  @keyframes slideDown {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
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
  margin-top: ${props => props.isDropdownOpen ? '430px' : '170px'};
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
  margin-top: 100px; 
  gap: 100px;
  position: relative; 
  z-index: 1; 
`;

const WineImageSection = styled.div`
  flex: 1;
  width: 400px;
  height: 550px;
  border-radius: 8px;
  padding: 40px;
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

const ActionButtonsContainer = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 80px;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  gap: 10px; 

  &:hover {
    transform: scale(1.1);
  }
`;

const ReservationButton = styled.div`
  width: 160px;
  justify-content: center;
  border-radius: 8px;
  padding: 15px 25px;
  font-size: 2rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: lightgray;
  }
`;

const RecommendedSection = styled.div`
  margin: 150px auto;
  max-width: 1200px;
  gap: 90px;
  // border-top: 1px solid gray;
`;

const RecommendedTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 100px;
  margin-left: 50px;
  // text-align: center;
  font-family: 'JacksonAmor', serif;
  // border-bottom: 1px solid gray;
`;

const RecommendedWinesContainer = styled.div`
  display: flex;
  justify-content: center;
  // gap: 150px;
  margin-top: 30px;

`;

const RecommendedWineCard = styled.div`
  width: 350px;
  margin-left: 40px;
  // padding: 20px;
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:hover {
    transform: scale(1.05);
    background-color: lightgray;
    border-radius: 100%;
    width: 350px;
  }
`;

const RecommendedWineImage = styled.img`
  width: 200px;
  height: 300px;
  object-fit: contain;
  margin-bottom: 15px;
  border-radius: 8px;
`;

const RecommendedWineName = styled.div`
  font-size: 1.2rem;
  text-align: center;
  font-family: 'SSShinb7Regular', serif;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;