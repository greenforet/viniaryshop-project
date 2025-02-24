import React from 'react';
import styled from 'styled-components';
import NotePaper from "../images/NotePaper.png"
import { useNavigate } from 'react-router-dom';

const WineSidebar = ({ currentCategory, setCurrentCategory }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    navigate('/winepage', { state: { type: category } });
  };

  const categories = [
    { id: 'reds', label: 'Reds' },
    { id: 'whites', label: 'Whites' },
    { id: 'sparkling', label: 'Sparkling' },
    { id: 'rose', label: 'Rose' },
    { id: 'dessert', label: 'Dessert' },
    { id: 'port', label: 'Port' }
  ];

  return (
    <SideBarContainer>
      <SideBarImage src={NotePaper}/>
      <WineList>
        <WineTitle>Wine List</WineTitle>
        {categories.map((category) => (
          <WineItem 
            key={category.id}
            isActive={currentCategory === category.id}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.label}
          </WineItem>
        ))}
      </WineList>
    </SideBarContainer>
  );
};

export default WineSidebar;

const SideBarContainer = styled.div`
  position: relative;
  width: 300px;
`;

const SideBarImage = styled.img`
  width: 300px;
  height: 600px;
  padding-bottom: 200px;
  margin-top: 130px;
`;

const WineList = styled.div`
  position: absolute;
  top: 100px;
  left: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 80%;
  padding: 20px;
`;

const WineTitle = styled.h2`
  font-size: 2rem;
  font-family: 'JacksonAmor', serif;
  color: #4A4A4A;
  margin-bottom: 8px;
  margin-top: 180px;
`;

const WineItem = styled.div`
  font-size: ${props => props.isActive ? '1.6rem;' : '1.2rem'};
  color: ${props => props.isActive ? '#C1121F;' : '#4A4A4A'};
  font-weight: ${props => props.isActive ? 'bold' : 'normal'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'SSShinb7Regular', serif;
  position: relative;

  &:hover {
    color: #C1121F;
    font-size: 1.6rem;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 2px;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;