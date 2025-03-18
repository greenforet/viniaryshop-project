import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; 

const GridContainer = ({ items, currentPage, setCurrentPage, itemsPerPage, totalItems, onItemClick, currentCategory }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (e, itemId) => {
    e.stopPropagation();
    setWishlist(prev => {
      const wishlistItem = `${currentCategory}-${itemId}`;  // 카테고리와 ID를 조합
      if (prev.includes(wishlistItem)) {
        return prev.filter(id => id !== wishlistItem);
      } else {
        return [...prev, wishlistItem];
      }
    });
  };

  const isItemWished = (itemId) => {
    const wishlistItem = `${currentCategory}-${itemId}`;  // 카테고리와 ID를 조합
    return wishlist.includes(wishlistItem);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = items.slice(startIndex, startIndex + itemsPerPage);

  const pageGroupSize = 5;
  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  const handlePrevGroup = () => {
    if (startPage > 1) {
      setCurrentPage(startPage - pageGroupSize);
    }
  };

  const handleNextGroup = () => {
    if (endPage < totalPages) {
      setCurrentPage(startPage + pageGroupSize);
    }
  };

  return (
    <Container>
      <Grid>
        {displayedItems.map((item) => (
          <GridItem key={item.id}>
            <ImageContainer>
              <ItemImage 
                src={item.image || 'default-wine-image.jpg'} 
                onClick={() => onItemClick(item.id)} 
              />
            </ImageContainer>
            <ItemInfoContainer>
              <ItemName>{item.name}</ItemName>
              <HeartIcon 
                onClick={(e) => toggleWishlist(e, item.id)}
                isWished={isItemWished(item.id)}
              >
                {isItemWished(item.id) ? <FaHeart /> : <FaRegHeart />}
              </HeartIcon>
            </ItemInfoContainer>
          </GridItem>
        ))}
      </Grid>
      {totalPages > 1 && (
        <Pagination>
          <PageButton 
            onClick={handlePrevGroup} 
            disabled={startPage === 1}
          >
            &lt;
          </PageButton>
          {Array.from(
            { length: endPage - startPage + 1 }, 
            (_, i) => startPage + i
          ).map((page) => (
            <PageButton
              key={page}
              onClick={() => setCurrentPage(page)}
              isActive={currentPage === page}
            >
              {page}
            </PageButton>
          ))}
          <PageButton 
            onClick={handleNextGroup}
            disabled={endPage >= totalPages}
          >
            &gt;
          </PageButton>
        </Pagination>
      )}
    </Container>
  );
};

export default GridContainer;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  grid-template-rows: repeat(10, 1fr); 
  gap: 40px 0px; 
  margin-bottom: 40px;
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  height: 100%;
`;

const ImageContainer = styled.div`
  width: 240px; 
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ItemInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 220px;
  gap: 10px;
`;

const ItemName = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
  flex: 1;
  min-height: 40px;
  font-family: 'SSShinb7Regular', serif;
  word-wrap: break-word;
  line-height: 1.5;
`;

const HeartIcon = styled.div`
  cursor: pointer;
  font-size: 1.2rem;
  color: ${props => props.isWished ? '#ff6b6b' : '#666'};
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 100px;
  margin-bottom: 100px;
`;

const PageButton = styled.button`
  padding: 8px 16px;
  border: none;
  background-color: ${props => props.isActive ? '#93C6E7' : 'transparent'};
  color: ${props => props.disabled ? '#ccc' : props.isActive ? 'white' : 'black'};
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => 
      props.disabled ? 'transparent' : 
      props.isActive ? '#93C6E7' : '#e0e0e0'
    };
  }
`;