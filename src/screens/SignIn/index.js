import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {UserContext} from '../../contexts/UserContexts';

import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonBold,
} from './styles';

import Api from '../../Api';

import SignInput from '../../components/SignInput';

import Logo from '../../assets/logo.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/cadeado.svg';

export default () => {
const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation (); 

const [emailField, setEmailField] = useState('');
const [passwordField, setPasswordField] = useState('');

const handleSingClick = async() => {
  if (emailField != '' && passwordField != '' ) { 

  let json = await Api.signIn(emailField, passwordField);

  if(json.token) { 
    await AsyncStorage.setItem('token', json.token);

userDispatch({
  type: 'setAvatar',
  payload:{
    avatar: json.data.avatar
  }
});

navigation.reset({
routes:[{name:'MainTab'}]
});
  } else {
    alert("Email e/ou senha errados!");
  }

} else { 
  alert("Preencha os campos!");

}
}

const handleMessageButtonClick =() => {
  navigation.reset({
    routes: [{name: 'SignUp'}]

  })

}

  return (
    <Container>
      <Logo width="100%" height="160" />

      <InputArea>
        <SignInput 
        IconSvg={EmailIcon}
        placeholder="Digite seu email"
        value={emailField}
        onChangeText={t=>setEmailField(t)}
        />

        <SignInput IconSvg={LockIcon}
        placeholder="Digite sua senha"
        value={passwordField}
        onChangeText={t=>setPasswordField(t)}
        password={true}
        />

        <CustomButton onPress={handleSingClick}>
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
        <SignMessageButtonBold>Cadastre-se</SignMessageButtonBold>
      </SignMessageButton>

    </Container>
  );
};
