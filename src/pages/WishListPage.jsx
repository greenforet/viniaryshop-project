import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from "../components/Footer"
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import Checkbox from "../components/CheckBox";

const WishListPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [likedWines, setLikedWines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [wineDetails, setWineDetails] = useState([]);
  const navigate = useNavigate();
  const [selectedWines, setSelectedWines] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const itemsPerPage = 8;

  const adjustCurrentPage = (totalItems) => {
    const maxPage = Math.ceil(totalItems / itemsPerPage);
    if (currentPage > maxPage) {
      setCurrentPage(Math.max(1, maxPage));
    }
  };


  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedWines(new Set());
    } else {
      const allWineKeys = displayedWines.map(wine => wine.key);
      setSelectedWines(new Set(allWineKeys));
    }
    setSelectAll(!selectAll);
  };


  const handleRemoveWine = (wineKey) => {
    const updatedLikedWines = likedWines.filter(key => key !== wineKey);
    localStorage.setItem('likedWines', JSON.stringify(updatedLikedWines));
    setLikedWines(updatedLikedWines);
    
    const updatedWineDetails = wineDetails.filter(wine => wine.key !== wineKey);
    setWineDetails(updatedWineDetails);
    adjustCurrentPage(updatedWineDetails.length);
  };


  const handleDeleteSelected = () => {
    const updatedLikedWines = likedWines.filter(key => !selectedWines.has(key));
    localStorage.setItem('likedWines', JSON.stringify(updatedLikedWines));
    setLikedWines(updatedLikedWines);
    
    const updatedWineDetails = wineDetails.filter(wine => !selectedWines.has(wine.key));
    setWineDetails(updatedWineDetails);
    adjustCurrentPage(updatedWineDetails.length);
    
    setSelectedWines(new Set());
    setSelectAll(false);
  };


  const handleSelectWine = (wineKey) => {
    setSelectedWines(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(wineKey)) {
        newSelected.delete(wineKey);
      } else {
        newSelected.add(wineKey);
      }
      return newSelected;
    });
  };

  const handleDeselectAll = () => {
    setSelectedWines(new Set());
    setSelectAll(false);
  };


  const handleOrderSelected = () => {
    if (selectedWines.size === 0) {
      alert('주문할 상품을 선택해주세요.');
      return;
    }
    alert('선택한 상품 주문 처리');
  };

  const handleDropdownChange = (isOpen) => {
    setIsDropdownOpen(isOpen);
  };

  const handleWineClick = (wine) => {
    navigate(`/wineinfopage/${wine.id}`, {
      state: { category: wine.category }
    });
  };

  useEffect(() => {
    const fetchLikedWines = async () => {
      try {
        const savedWines = JSON.parse(localStorage.getItem('likedWines') || '[]');
        setLikedWines(savedWines);
  
        const wineDetailsArray = await Promise.all(
          savedWines.map(async (wineKey) => {
            if (typeof wineKey !== 'string') {
              console.error('Invalid wineKey format:', wineKey);
              return null;
            }
  
            try {
              const [category, id] = wineKey.split('-');
              if (!category || !id) {
                console.error('Invalid wineKey format:', wineKey);
                return null;
              }
  
              const response = await fetch(`https://api.sampleapis.com/wines/${category}`);
              if (!response.ok) {
                throw new Error(`Failed to fetch wine data for ${category}`);
              }
  
              const wines = await response.json();
              const wine = wines.find(w => w.id.toString() === id);
              return wine ? { ...wine, category, key: wineKey } : null;
            } catch (error) {
              console.error('Error processing wine:', wineKey, error);
              return null;
            }
          })
        );
  
        const validWineDetails = wineDetailsArray.filter(wine => wine !== null);
        setWineDetails(validWineDetails);
      } catch (error) {
        console.error('Error in fetchLikedWines:', error);
        setWineDetails([]);
      }
    };
  
    fetchLikedWines();
  }, []);

  const totalPages = Math.ceil(wineDetails.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedWines = wineDetails.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container>
      <WineDetailedPageContainer isDropdownOpen={isDropdownOpen}>
        <Header onDropdownChange={handleDropdownChange} />
        <ContentWrapper>
          <CategoryTitle isDropdownOpen={isDropdownOpen}>
            Wish list
          </CategoryTitle>
        </ContentWrapper>
      </WineDetailedPageContainer>
      <ActionBar>
        <SelectionControls>
          <Checkbox
            checked={displayedWines.length > 0 && 
              displayedWines.every(wine => selectedWines.has(wine.key))}
            onChange={handleSelectAll}
          >
            전체선택
          </Checkbox>
          <ActionButton 
            onClick={handleDeleteSelected}
            disabled={selectedWines.size === 0}
          >
            선택삭제
          </ActionButton>
          <ActionButton 
            onClick={handleDeselectAll}
            disabled={selectedWines.size === 0}
          >
            선택해제
          </ActionButton>
          <ActionButton 
            onClick={handleOrderSelected}
            disabled={selectedWines.size === 0}
          >
            선택예약
          </ActionButton>
        </SelectionControls>
        <SelectedCount>
          선택된 상품: {selectedWines.size}개
        </SelectedCount>
      </ActionBar>
      <WishListGrid>
        {displayedWines.map((wine) => (
          <WineCard key={wine.key}>
            <CardCheckbox
              checked={selectedWines.has(wine.key)}
              onChange={() => handleSelectWine(wine.key)}
            />
            <RemoveButton onClick={() => handleRemoveWine(wine.key)}>
              <FaTimes />
            </RemoveButton>
            <WineImage 
              src={wine.image || 'default-wine-image.jpg'} 
              alt={wine.wine}
              onClick={() => handleWineClick(wine)}
            />
            <WineInfo>
              <WineName>{wine.wine}</WineName>
              <WineWinery>{wine.winery}</WineWinery>
            </WineInfo>
          </WineCard>
        ))}
      </WishListGrid>
      {totalPages > 1 && (
        <Pagination>
          {[...Array(totalPages)].map((_, i) => (
            <PageButton
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              isActive={currentPage === i + 1}
            >
              {i + 1}
            </PageButton>
          ))}
        </Pagination>
      )}
      <Footer/>
    </Container>
  );
};

export default WishListPage;

const WineDetailedPageContainer = styled.div`
  min-width: 1200px; 
  width: 100%;
  position: relative;
  top: 0;
  z-index: 3;
  background-color: #F2F0EA;
`;

const ContentWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 40px;
`;

const CategoryTitle = styled.div`
  font-size: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  padding-top: ${props => props.isDropdownOpen ? '50px' : '30px'};
  font-family: 'JacksonAmor', serif;
  margin-top: ${props => props.isDropdownOpen ? '400px' : '130px'};
  transition: all 0.5s ease;
  position: relative;
  background: #93C6E7;
  z-index: 1; 

  // 하단 웨이브 라인
  &::after {
    content: '';
    position: absolute;
    bottom: -36px;
    left: 0;
    width: 100%;
    height: 75px;
    opacity: 1;
    background: #93C6E7;
    --s: 50px;
    --b: 50px;
    --m: 2.5;
    --R: calc(var(--s)*sqrt(var(--m)*var(--m) + 1) + var(--b)/2);
    --_g: #0000 calc(99% - var(--b)), #F2F0EA calc(101% - var(--b)) 99%, #0000 101%;
    mask: 
      radial-gradient(var(--R) at left 50% bottom calc(-1*var(--m)*var(--s)), var(--_g)) 
        calc(50% - 2*var(--s)) calc(50% - var(--s)/2 - var(--b)/2)/calc(4*var(--s)) calc(var(--s) + var(--b)) repeat-x,
      radial-gradient(var(--R) at left 50% top calc(-1*var(--m)*var(--s)), var(--_g)) 
        50% calc(50% + var(--s)/2 + var(--b)/2)/calc(4*var(--s)) calc(var(--s) + var(--b)) repeat-x;
  }
  `;

  const Container = styled.div`
  background-color: #F2F0EA;
  min-height: 100vh;
  
`;

const WishListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding: 50px;
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 100px;
`;

const WineCard = styled.div`
  position: relative;
  // background: white;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
  padding-top: 40px;

  &:hover {
    transform: translateY(-5px);
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #ff6b6b;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 5px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const WineImage = styled.img`
  width: 150px;
  height: 200px;
  object-fit: contain;
  cursor: pointer;
`;

const WineInfo = styled.div`
  text-align: center;
  margin-top: 15px;
`;

const WineName = styled.h3`
  font-size: 1.1rem;
  margin: 5px 0;
  font-family: 'SSShinb7Regular', serif;
`;

const WineWinery = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 5px 0;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 10px 0;
  padding-bottom: 100px;
`;

const PageButton = styled.button`
  padding: 8px 16px;
  border: none;
  background-color: ${props => props.isActive ? '#93C6E7' : 'transparent'};
  color: ${props => props.isActive ? 'white' : 'black'};
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.isActive ? '#93C6E7' : '#e0e0e0'};
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin-top: 100px;
  margin-bottom: 20px;
  padding: 0 59px;
  font-size: 1.5rem;
`;

const SelectionControls = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const ActionButton = styled.div`
  padding: 8px 16px;
  border: none;
  color: black;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: 'SSShinb7Regular', serif;
  padding-right: 10px;
  margin-left: 10px;
  font-size: 1.5rem;

  &:hover {
    color: #93C6E7;
    
  }
`;

const CardCheckbox = styled(Checkbox)`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const SelectedCount = styled.div`
  font-size: 1.1rem;
  color: #666;
  font-family: 'SSShinb7Regular', serif;
  font-size: 1.5rem;
`;
