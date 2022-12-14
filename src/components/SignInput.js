import React from 'react';
import styled from 'styled-components/native';

const InputArea = styled.View`
  width: 100%;
  height: 60px;
  background-color: #de7759;
  flex-direction: row;
  border-radius: 30px;
  padding-left: 15px;
  align-items: center;
  margin-bottom: 15px;
`;
const Input = styled.TextInput`
flex: 1;
font-size: 16px;
color: #9C381A;
margin-left: 10px;
`;

export default ({IconSvg, placeholder, value, onChangeText, password}) => {
  return (
    <InputArea>
      <IconSvg width="24" height="26" fill="#9C381A" />
      <Input 
      placeholder={placeholder}
      placeholterTextColor="#9C381A"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={password}
      />
    </InputArea>
  );
};
