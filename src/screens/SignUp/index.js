import React, {useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
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
import PerfilIcon from '../../assets/perfil.svg';

export default () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();


  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleSingClick = async() => {
   if(nameField != '' && emailField != '' && passwordField != ''){
    let res = await Api.signUp(nameField, emailField, passwordField);
        
    if(res.token) {
         await AsyncStorage.setItem('token', res.token);

      userDispatch({
        type: 'setAvatar',
        payload:{
          avatar: res.data.avatar
        }
      });
      
      navigation.reset({
      routes:[{name:'MainTab'}]
      });

    } else {
      alert("Erro: "+res.erro);
    }
   } else {
    alert("Preencha os campos!");
   }
   
  }

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{name: 'SignIn'}],
    });
  };

  return (
    <Container>
      <Logo width="100%" height="160" />

      <InputArea>
        <SignInput
          IconSvg={PerfilIcon}
          placeholder="Digite seu nome"
          value={nameField}
          onChangeText={t => setNameField(t)}
        />

        <SignInput
          IconSvg={EmailIcon}
          placeholder="Digite seu email"
          value={emailField}
          onChangeText={t => setEmailField(t)}
        />

        <SignInput
          IconSvg={LockIcon}
          placeholder="Digite sua senha"
          value={passwordField}
          onChangeText={t => setPasswordField(t)}
          password={true}
        />

        <CustomButton onPress={handleSingClick}>
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>J?? possui uma conta?</SignMessageButtonText>
        <SignMessageButtonBold>Fa??a Login</SignMessageButtonBold>
      </SignMessageButton>
    </Container>
  );
};
