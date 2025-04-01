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
  const [showReservationPopup, setShowReservationPopup] = useState(false);
  const [reservationForm, setReservationForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    phone: '',
    email: ''
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

  const handleOrderSelected = () => {
    if (selectedWines.size === 0) {
      alert('주문할 상품을 선택해주세요.');
      return;
    }
    setShowReservationPopup(true);
  };

  const handleRemoveSelectedWine = (wineKey) => {
    setSelectedWines(prev => {
      const newSelected = new Set(prev);
      newSelected.delete(wineKey);
      return newSelected;
    });
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationForm(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'phone') {
      if (!validatePhone(value)) {
        setErrors(prev => ({
          ...prev,
          phone: '올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          phone: ''
        }));
      }
    }

    if (name === 'email') {
      if (!validateEmail(value)) {
        setErrors(prev => ({
          ...prev,
          email: '올바른 이메일 형식이 아닙니다'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          email: ''
        }));
      }
    }

    if (name === 'date') {
      if (!validateDate(value)) {
        setErrors(prev => ({
          ...prev,
          date: '평일만 예약 가능합니다 (토,일 제외)'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          date: ''
        }));
      }
    }

    if (name === 'time') {
      if (!validateTime(value)) {
        setErrors(prev => ({
          ...prev,
          time: '영업시간 (09:30 - 18:00) 내에만 예약 가능합니다'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          time: ''
        }));
      }
    }
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    
    if (!validatePhone(reservationForm.phone)) {
      setErrors(prev => ({
        ...prev,
        phone: '올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)'
      }));
      return;
    }

    if (!validateEmail(reservationForm.email)) {
      setErrors(prev => ({
        ...prev,
        email: '올바른 이메일 형식이 아닙니다'
      }));
      return;
    }
    setShowSuccessMessage(true);
    
    setTimeout(() => {
      setShowReservationPopup(false);
      setShowSuccessMessage(false);
      setReservationForm({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        message: ''
      });
      setErrors({ phone: '', email: '' });
    }, 2000);
  };

  const getSelectedWineDetails = () => {
    return wineDetails.filter(wine => selectedWines.has(wine.key));
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const isWeekday = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDay();
    return day !== 0 && day !== 6; 
  };

  const validateDate = (date) => {
    if (!date) return false;
    return isWeekday(date) && date >= getTodayDate();
  };


  const validateTime = (time) => {
    if (!time) return false;
    const [hours, minutes] = time.split(':').map(Number);
    const timeValue = hours + minutes / 60;
    return timeValue >= 9.5 && timeValue <= 18;
  };

  const timeOptions = [];
  for (let hour = 9; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 10) {
      if (hour === 9 && minute < 30) continue;
      if (hour === 18 && minute > 0) continue;
      
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeOptions.push(timeString);
    }
  }

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

      {showReservationPopup && (
        <PopupOverlay>
          <ReservationPopup>
            <CloseButton onClick={() => setShowReservationPopup(false)}>×</CloseButton>
            <PopupTitle>Reservation</PopupTitle>
            <PopupContent>
            {showSuccessMessage ? (
              <SuccessMessage>
                <SuccessIcon>✓</SuccessIcon>
                <SuccessText>예약이 완료되었습니다</SuccessText>
              </SuccessMessage>
            ) : (
              <>
            <SelectedWinesSection>
              <SelectedWinesTitle>선택된 상품</SelectedWinesTitle>
              <SelectedWinesList>
                {getSelectedWineDetails().map(wine => (
                  <SelectedWineItem key={wine.key}>
                    <SelectedWineImage 
                      src={wine.image || 'default-wine-image.jpg'} 
                      alt={wine.wine}
                    />
                    <SelectedWineInfo>
                      <SelectedWineName>{wine.wine}</SelectedWineName>
                      <SelectedWineWinery>{wine.winery}</SelectedWineWinery>
                    </SelectedWineInfo>
                    <DeleteButton onClick={() => handleRemoveSelectedWine(wine.key)}>
                      <FaTimes />
                    </DeleteButton>
                  </SelectedWineItem>
                ))}
              </SelectedWinesList>
            </SelectedWinesSection>
            <ReservationForm onSubmit={handleReservationSubmit}>
              <FormGroup>
                <Label>이름</Label>
                <Input
                  type="text"
                  name="name"
                  value={reservationForm.name}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>전화번호</Label>
                <Input
                  type="tel"
                  name="phone"
                  value={reservationForm.phone}
                  onChange={handleInputChange}
                  required
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <Label>이메일</Label>
                <Input
                  type="email"
                  name="email"
                  value={reservationForm.email}
                  onChange={handleInputChange}
                  required
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <Label>예약 날짜</Label>
                <Input
                  type="date"
                  name="date"
                  value={reservationForm.date}
                  onChange={handleInputChange}
                  min={getTodayDate()}
                  required
                  className={errors.date ? 'error' : ''}
                />
                {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <Label>예약 시간</Label>
                <Select
                  name="time"
                  value={reservationForm.time}
                  onChange={handleInputChange}
                  required
                  className={errors.time ? 'error' : ''}
                >
                  <option value="">시간 선택</option>
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </Select>
                {errors.time && <ErrorMessage>{errors.time}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <Label>메세지</Label>
                <TextArea
                  name="message"
                  value={reservationForm.message}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <SubmitButton type="submit">예약하기</SubmitButton>
            </ReservationForm>
            </>
            )}
            </PopupContent>
          </ReservationPopup>
        </PopupOverlay>
      )}
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
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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

const PopupOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ReservationPopup = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  position: relative;
  width: 90%;
  max-width: 500px;
  height: 600px; 
  margin: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

const ReservationForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #333;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background-color: #C1121F;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #A00F1A;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #C1121F;
  padding: 5px 10px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const PopupTitle = styled.h2`
  color: #C1121F;
  text-align: center;
  margin-bottom: 30px;
  font-family: 'JacksonAmor', serif;
  font-size: 2.5rem;
`;

const SelectedWinesSection = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f8f8;
  border-radius: 8px;
`;

const SelectedWinesTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.1rem;
`;

const SelectedWinesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SelectedWineItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative; // 삭제 버튼 위치 조정을 위해 추가
`;

const SelectedWineImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 4px;
`;

const SelectedWineInfo = styled.div`
  flex: 1;
`;

const SelectedWineName = styled.div`
  font-weight: 500;
  color: #333;
`;

const SelectedWineWinery = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const PopupContent = styled.div`
  flex: 1;
  overflow-y: auto; 
  padding-right: 10px; 

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 0.8rem;
  margin-top: 4px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ff0000;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: #cc0000;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const SuccessMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 20px;
`;

const SuccessIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: #4CAF50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  margin-bottom: 20px;
`;

const SuccessText = styled.div`
  font-size: 24px;
  color: #333;
  font-weight: 500;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
  
  &.error {
    border-color: #ff0000;
  }
`;