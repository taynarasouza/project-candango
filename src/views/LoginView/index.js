import React, { useState, useRef } from 'react';
import * as Yup from 'yup';
import {
  Background,
  Container,
  KeyboardView,
  DismissKeyboardView,
  LogoContainer,
  Logo,
  Form,
  FormBox,
  FormContainer,
  Input,
  Helper,
  ForgotPasswordButton,
  ForgotPasswordText,
  Button,
} from './styles';
import { Alert } from "react-native";
import {useDispatch, useSelector} from 'react-redux';

import logo from "../../../assets/images/logo.png";
import background3 from "../../../assets/images/brasilia-16.jpg";

import api from '../../services/api';

import {signInRequest, signInSuccess} from '../../store/modules/auth/actions';

import { Routes } from "../../utils/constants";

const LoginView = ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const passwordRef = useRef();

  const schemaValidation = Yup.object().shape({
    email: Yup.string()
      .email("Email inválido.")
      .required("Preencha este campo."),
    password: Yup.string()
      .required("Preencha este campo."),
  });

  const handleLogin = ({ email, password }) => {
    dispatch(signInRequest(email, password));
  };

  return (
    <Background source={background3}>
      <KeyboardView>
        <Logo source={logo}/>
        <FormBox>
          <Form
            validationSchema={schemaValidation}
            initialValues={{ 
              // email: 'teste@example.com',
              // password: '12345678', 
              email: '', 
              password: '', 
            }}
            onSubmit={values => handleLogin(values)}
          >
          {({ 
            handleChange, handleBlur, handleSubmit, values, errors, touched,
          }) => (
            <FormContainer>
              <Input
                label="Email"
                type="email-address"
                placeholder="Digite seu email"
                value={values.email}
                onChange={handleChange('email')}
                touched={touched.email}
                onBlur={handleBlur('email')}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current.focus()}
              />
              <Helper visible={Boolean(errors.email && touched.email)}>
                {errors.email}
              </Helper>
              <Input
                label="Senha"
                secureTextEntry={true}
                placeholder="Digite sua senha"
                ref={passwordRef}
                value={values.password}
                onChange={handleChange('password')}
                touched={touched.password}
                onBlur={handleBlur('password')}
                returnKeyType="send"
                onSubmitEditing={() => handleSubmit()}
              />
              <Helper visible={Boolean(errors.password && touched.password)}>
                {errors.password}
              </Helper>
              <ForgotPasswordButton onPress={() => navigation.navigate(Routes.Password)}>
                <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
              </ForgotPasswordButton>
              
              <Button
                mode="contained"
                onPress={handleSubmit}
                loading={loading}
                disabled={Object.keys(errors).length > 0 || loading}
              > 
                Entrar 
              </Button>
              <Button
                onPress={() => navigation.navigate(Routes.SignUp)} 
              >
                Cadastrar
              </Button>
            </FormContainer>
          )}
          </Form>
        </FormBox>
      </KeyboardView>
    </Background>
  )
};

LoginView.navigationOptions = ({navigation}) => ({
  title: 'Login',
  headerShown: false,
});

export default LoginView;