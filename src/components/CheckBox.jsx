import React from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';

const CheckBox = ({ checked, onChange, children, className }) => (
  <CheckboxLabel className={className}>
    <HiddenCheckbox 
      type="checkbox" 
      checked={checked} 
      onChange={onChange}
    />
    <StyledCheckbox checked={checked}>
      {checked && <FaCheck className="check-icon" />}
    </StyledCheckbox>
    {children}
  </CheckboxLabel>
);

export default CheckBox;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  margin-left: 5px;
  margin-top: 5px;
  user-select: none;
  font-family: 'SSShinb7Regular', serif;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const StyledCheckbox = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #93C6E7;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.checked ? '#93C6E7' : 'white'};
  transition: all 0.2s;

  .check-icon {
    color: white;
    font-size: 12px;
  }

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px rgba(147, 198, 231, 0.3);
  }
`;