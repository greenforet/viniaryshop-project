import React, { useState, forwardRef } from 'react';
import styled from 'styled-components';
import DownArrowIcon from '../icons/DownArrowIcon.svg'

const Footer = forwardRef((props, ref) => {
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  return (
    <FooterContainer ref={ref}>
    <FooterInfoContainer>
      <FooterList>
        <InfoList>개인정보보호정책</InfoList>
        <InfoList>이용약관</InfoList>
        <InfoList>오시는 길</InfoList>
      </FooterList>
      <FooterContent>
        <Content>대표이사 : 윤주연</Content>
        <Content>주소 : 서울특별시 성동구 뚝섬로 273</Content>
        <Content>사업자등록번호 : 111-11-11111</Content>
        <Content>TEL : 02-1234-5678</Content>
        <Content>평일 09:30 – 18:00 / 주말 및 공휴일 휴무</Content>
        <FooterCopyRight>Copyright 2025 ⓒ On The Rocks All right reserved.</FooterCopyRight>
      </FooterContent>
    </FooterInfoContainer>
    <FooterContentConatiner>
      <FooterCommuity>
        <CommuityLogoIcon 
          src={DownArrowIcon} 
          onClick={() => setIsCommunityOpen(!isCommunityOpen)}
          isOpen={isCommunityOpen}
        />
        <FooterDropdownMenu isOpen={isCommunityOpen}>
          <CommuityList>Instagram</CommuityList>
          <CommuityList>Facebook</CommuityList>
          <CommuityList>Youtube</CommuityList>
        </FooterDropdownMenu>
        <CommuityLogo>Our Commuity</CommuityLogo>
      </FooterCommuity>
    </FooterContentConatiner>
  </FooterContainer>
  );
});

export default Footer;

const FooterContainer = styled.div`
  min-width: 1200px; 
  width: 100%;
  height: 400px;
  display: flex;
  position: relative;  
  margin-top: auto; 
  background-color: #93C6E7;
  justify-content: space-between;
  font-family: 'SSShinb7Regular', serif;
`;

const FooterInfoContainer = styled.div`
  align-items: center;
  padding-left: 100px;
  height: 200px;
  font-size: 1.3rem;
`;

const FooterList = styled.div`
  display: flex;
  padding-top: 70px;
  padding-bottom: 10px;
`;

const InfoList = styled.div`
  padding-left: 30px;
  cursor: pointer;
`;

const FooterContentConatiner = styled.div`
  align-items: center;
  padding-right: 120px;
  padding-top: 50px;
`;

const FooterCommuity = styled.div`
  position: relative; 
  font-size: 2rem;
  display: flex;
`;

const FooterContent = styled.div`
  padding-left: 30px;
  padding-top: 30px;
`;

const Content = styled.div`
  padding-bottom: 3px;
`;

const FooterCopyRight = styled.div`
  padding-top: 20px;
`;

const CommuityLogoIcon = styled.img`
  width: 20px;
  padding-right: 20px;
  padding-top: 5px;
  cursor: pointer;
  transform-origin: 30% 55%; 
  transform: rotate(${props => props.isOpen ? '180deg' : '0deg'});
  transition: transform 0.3s ease;
`;

const FooterDropdownMenu = styled.ul`
  list-style: none;
  position: absolute;
  top: 20px;
  left: 0;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: translateY(${props => props.isOpen ? '0' : '-10px'});
  transition: all 0.5s ease;
  z-index: 1;
`;

const CommuityLogo = styled.div`
  cursor: pointer;
`;

const CommuityList = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    color: lightgray;
  }
`;