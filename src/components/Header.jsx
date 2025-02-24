import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoImage from "../images/ViniaryLogo.png";
import CircleImage from "../images/Circle.png";

const Header = ({ onDropdownChange }) => {
  const [isWinesOpen, setIsWinesOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (onDropdownChange) {
      onDropdownChange(isWinesOpen || isWishlistOpen);
    }
  }, [isWinesOpen, isWishlistOpen, onDropdownChange]);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleAboutUsClick = () => {
    navigate('/aboutuspage');
  };

  const handleWineClick = (wineType) => {
    navigate('/winepage', { state: { type: wineType } });
    setIsWinesOpen(false);
  };

  const handleShopClick = () => {
    navigate('/shoppage');
  };

  const handleTipsClick = () => {
    navigate('/tipspage')
  };

  return (
    <HeaderContainer>
      <HeaderImage 
        src={LogoImage} 
        alt="logoimage" 
        onClick={handleLogoClick}
      />
      <HeaderList>
        <List onClick={handleAboutUsClick}>About us</List>
        <WinesList 
          onMouseEnter={() => setIsWinesOpen(true)}
          onMouseLeave={() => setIsWinesOpen(false)}
        >
          <List>Wines</List>
          <DropdownMenu isOpen={isWinesOpen}>
            <li onClick={() => handleWineClick('reds')}>reds</li>
            <li onClick={() => handleWineClick('whites')}>whites</li>
            <li onClick={() => handleWineClick('sparkling')}>sparkling</li>
            <li onClick={() => handleWineClick('rose')}>rose</li>
            <li onClick={() => handleWineClick('dessert')}>dessert</li>
            <li onClick={() => handleWineClick('port')}>port</li>
          </DropdownMenu>
        </WinesList>
        <WishList>
          <List>Wish list</List>
        </WishList>
        <List onClick={handleShopClick}>Shop</List>
      </HeaderList>
      <HeaderLogin>
        <TipList onClick={handleTipsClick}>★ Tips! ★</TipList>
      </HeaderLogin>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  position: absolute; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  padding-top: 10px;
  padding-bottom: 10px;
  z-index: 2;
  font-family: 'SSShinb7Regular', serif;
  font-weight: bold;
`;

const HeaderImage = styled.img`
  width: 300px;
  cursor: pointer;
  padding-left: 20px;
  padding-top: 50px;
`;

const HeaderList = styled.ul`
  list-style: none;
  display: flex;
  gap: 100px; 
  padding-top: 50px;
`;

const List = styled.li`
  display: inline-block;
  position: relative;
  cursor: pointer;
  padding: 20px 0;
  &::before {
    content: '';
    position: absolute;
    top: -97px;
    left: 90%;
    transform: translateX(-55%);
    width: 200px;
    height: 300px;
    background-image: url(${CircleImage});
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 0;
    transition: opacity 0.5s ease; 
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const WinesList = styled.div`
  position: relative;
  cursor: pointer;
  &:hover ${List}::before {
    opacity: 1;
  }
`;

const WishList = styled.div`
  position: relative;
  cursor: pointer;
  &:hover ${List}::before { 
    opacity: 1;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #93C6E7;
  padding: 15px 25px;
  border-radius: 50% 20% / 10% 40%;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: translateY(${props => props.isOpen ? '0' : '-10px'});
  transition: all 0.5s ease;
  z-index: 1;
  
  li {
    list-style: none;
    padding: 8px 0;
    font-size: 1.2rem;
    white-space: nowrap;
    cursor: pointer;
    
    &:hover {
      color: lightgray;
    }
    &.active {
      color: #4A4A4A;
      font-weight: bold;
    }
  }
`;

const TipList = styled.li`
  display: inline-block;
  position: relative;
  cursor: pointer;
  padding-top: 50px;
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 0;
    height: 3px;
    background-color: black;
    transition: width 0.5s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const HeaderLogin = styled.ul`
  list-style: none;
  display: flex;
  padding-right: 100px;
`;