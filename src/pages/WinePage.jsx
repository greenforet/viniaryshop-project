import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header, { HeaderContainer } from "../components/Header"
import styled from 'styled-components';
import WineSidebar from '../components/WineSidebar'
import GridContainer from '../components/GridContainer';
import RhombusPatternImage from '../images/RhombusPattern.jpeg'

const WinePage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [wines, setWines] = useState([]);
  const [barPosition, setBarPosition] = useState(400);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentCategory, setCurrentCategory] = useState('reds'); 
  const [isFixedHeaderVisible, setIsFixedHeaderVisible] = useState(false);

  const handleDropdownChange = (isOpen) => {
    setIsDropdownOpen(isOpen);
  };

  const itemsPerPage = 30;

  useEffect(() => {
    const categoryFromState = location.state?.type;
    if (categoryFromState) {
      setCurrentCategory(categoryFromState);
    }
  }, [location.state]);

useEffect(() => {
  let isMounted = true;

  const fetchWines = async () => {
    if (!currentCategory) return;
    
    try {
      setLoading(true);
      const response = await fetch(`https://api.sampleapis.com/wines/${currentCategory}`);
      if (!response.ok) throw new Error('Failed to fetch wines');
      
      const data = await response.json();
      if (isMounted) {
        const formattedData = data.map(wine => ({
          id: wine.id,
          name: wine.wine,
          image: wine.image || 'https://via.placeholder.com/300x400?text=No+Image',
          winery: wine.winery,
          rating: wine.rating,
          location: wine.location,
        }));
        
        setWines(formattedData);
        setCurrentPage(1);
        setLoading(false);
      }
    } catch (err) {
      if (isMounted) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  fetchWines();
  return () => { isMounted = false; };
}, [currentCategory]);

  const handleWineClick = (id) => {
    navigate(`/wineinfopage/${id}`, { state: { category: currentCategory } });
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const startPosition = 400; 
    const windowHeight = window.innerHeight;
    const sidebarHeight = 780; 
    
    const maxScroll = Math.max(0, windowHeight - sidebarHeight);
    
    let newPosition = startPosition;
    
    if (scrollTop > 0) {
      const scrollOffset = Math.min(scrollTop * 0.2, maxScroll);
      newPosition = startPosition + scrollOffset;
    }

    newPosition = Math.min(
      startPosition + maxScroll, 
      Math.max(startPosition, newPosition)
    );
    console.log('new barPosition:', newPosition); 
    setBarPosition(newPosition);
  };

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const mainHeaderHeight = 130;
  
        if (scrollTop > mainHeaderHeight) {
          setIsFixedHeaderVisible(true);
        } else {
          setIsFixedHeaderVisible(false);
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);


  return (
    <Container ref={containerRef}>
      <WineDetailedPageContainer isDropdownOpen={isDropdownOpen}>
        <Header 
          onDropdownChange={handleDropdownChange}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
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
            setCurrentCategory={setCurrentCategory}
            isFixed={true}
          />
        </FixedHeader>
      )}
      <MainContent>
        <SideBarWrapper style={{ top: `${barPosition}px` }}>
          <WineSidebar 
          isDropdownOpen={isDropdownOpen}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          />
        </SideBarWrapper>
        <GridSection >
          <GridContainer
            items={wines}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={30}
            totalItems={wines.length}
            onItemClick={handleWineClick}
            currentCategory={currentCategory}
          />
        </GridSection>
      </MainContent>
    </Container>
  );
};

export default WinePage;

const Container = styled.div`
  width: 100%;        
  height: 100%;
  margin-bottom: 200px;
  background-color: #F2F0EA;
  margin: 0;
  padding: 0;
  position: relative;
  display: flex;     
  flex-direction: column; 
  overflow-y: visible;
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
  margin-top: 35px;
`;

const CategoryTitle = styled.div`
  font-size: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
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
    background-size: 300px 500px;
    background-repeat: repeat;  
    background-position: center;
    opacity: 0.6;
    z-index: -1;
    transition: none; 
    will-change: transform; 
  }
`;

const MainContent = styled.div`
  display: flex;
  position: relative;
  min-height: calc(100vh - 350px);
  margin-top: 0;
  padding-bottom: 50px;
  width: 100%;
`;

const GridSection = styled.div`
  flex: 1;
  margin-left: 300px;  
  margin-top: 70px;  
`;

const SideBarWrapper = styled.div`
  position: fixed;
  left: 50px;
  z-index: 1;
  transform: translateY(-31%);
  transition: top 0.3s ease-out;
  height: fit-content;
`;