import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import * as Yup from 'yup';
import {
  Wrapper,
  Container,
  LogoContainer,
  Logo,
  Form,
  FormContainer,
  Input,
  Helper,
  ForgotPasswordButton,
  ForgotPasswordText,
  Button,
} from './styles';

import logo from "../../assets/logo.png";
import background from "../../assets/brasilia-6.jpg";
import background2 from "../../assets/brasilia-1.jpg";
import background3 from "../../assets/brasilia-16.jpg";
import { login } from "../../utils/api";

const LoginView = () => {
  const history = useHistory();

  const schemaValidation = Yup.object().shape({
    email: Yup.string()
      .email("Email inválido.")
      .required("Preencha este campo."),
    password: Yup.string()
      .required("Preencha este campo."),
  });

  const handleLogin = (values) => {
    login(values.email, values.senha)
      .then(res => {
        history.push("/home");
    });
  };

  return (
    <Wrapper source={background3}>
      <Container>
        <LogoContainer>
          <Logo source={logo}/>
        </LogoContainer>
        <FormContainer>
          <Form
            validationSchema={schemaValidation}
            initialValues={{ 
              email: '', 
              password: '', 
            }}
            onSubmit={values => handleLogin(values)}
          >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <>
              <Input
                label="Email"
                keyboardType="email-address"
                placeholder="Digite seu email"
                value={values.email}
                onChangeText={handleChange('email')}
              />
              <Helper visible={errors.email && touched.email}>
                {errors.email}
              </Helper>
              <Input
                label="Senha"
                keyboardType="email"
                secureTextEntry={true}
                placeholder="Digite sua senha"
                value={values.password}
                onChange={handleChange('password')}
              />
              <Helper visible={errors.password && touched.password}>
                {errors.password}
              </Helper>
              <ForgotPasswordButton onPress={() => history.push("/password")}>
                <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
              </ForgotPasswordButton>
              
              <Button mode="contained" onPress={handleSubmit}> Entrar </Button>
              <Button mode="text" onPress={() => history.push("/signup")} >
                Cadastrar
              </Button>
            </>
          )}
          </Form>
        </FormContainer>
      </Container>
    </Wrapper>
  )
};

export default LoginView;