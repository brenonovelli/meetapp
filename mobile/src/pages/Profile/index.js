import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Background from '~/components/Background';
import Header from '~/components/Header';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import {
  Container,
  Form,
  Separator,
  FormInput,
  SubmitButton,
  LogoutButton,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const nameRef = useRef();
  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const schema = Yup.object().shape({
    name: Yup.string().min(3),
    email: Yup.string().email(),
    oldPassword: Yup.string(),
    password: Yup.string().when('oldPassword', (oldPasswordItem, field) =>
      oldPasswordItem ? field.required().min(6) : field
    ),
    confirmPassword: Yup.string().when('password', (passwordItem, field) =>
      passwordItem ? field.required().oneOf([Yup.ref('password')]) : field
    ),
  });

  useEffect(() => {
    setPassword('');
    setOldPassword('');
    setConfirmPassword('');
  }, [profile]);

  async function handleSubmit() {
    try {
      await schema.validate({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      });
      dispatch(
        updateProfileRequest({
          name,
          email,
          oldPassword,
          password,
          confirmPassword,
        })
      );
    } catch ({ path, message }) {
      switch (path) {
        case 'name':
          Alert.alert('Erro!', 'O nome não pode ter menos de 3 caracteres');
          nameRef.current.focus();
          break;
        case 'email':
          Alert.alert('Erro!', 'Preencha com um e-mail válido');
          emailRef.current.focus();
          break;
        case 'password':
          Alert.alert('Erro!', 'Revise sua senha nova.');
          passwordRef.current.focus();
          break;
        case 'confirmPassword':
          Alert.alert('Erro!', 'As senhas precisam ser iguais.');
          confirmPasswordRef.current.focus();
          break;

        default:
          Alert.alert('Erro!', 'Ocorreu um erro. Tente novamente.');
          break;
      }
    }
  }
  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Header />
      <Container>
        <Form>
          <FormInput
            icon="person"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu nome completo"
            ref={nameRef}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />
          <FormInput
            icon="mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <Separator />

          <FormInput
            icon="lock"
            secureTextEntry
            placeholder="Sua senha atual"
            ref={oldPasswordRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <FormInput
            icon="lock"
            secureTextEntry
            placeholder="Sua nova senha (mínimo 6 caracteres)"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            value={password}
            onChangeText={setPassword}
          />
          <FormInput
            icon="lock"
            secureTextEntry
            placeholder="Confirme sua senha"
            ref={confirmPasswordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <SubmitButton onPress={handleSubmit}>Salvar perfil</SubmitButton>
          <LogoutButton onPress={handleLogout}>Sair do MeetApp</LogoutButton>
        </Form>
      </Container>
    </Background>
  );
}
const tabBarIcon = ({ tintColor }) => (
  <Icon name="account" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon,
};
