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
import { Alert } from "react-native";
import logo from "../../assets/logo.png";
import background3 from "../../assets/brasilia-16.jpg";
import api from '../../services/api';

const LoginView = ({onLoad}) => {
  const history = useHistory();

  const schemaValidation = Yup.object().shape({
    email: Yup.string()
      .email("Email inválido.")
      .required("Preencha este campo."),
    password: Yup.string()
      .required("Preencha este campo."),
  });

  const handleLogin = ({ email, password }) => {
    // onLoad(true);
    // setTimeout(() => onLoad(false), 1000);
    // setTimeout(() => history.push("/home"), 1100);

    api.post(`/signin`, {
        eml_usuario: email,
        pwd_usuario: password,
    }).then(res => {
        history.push("/home")

      }).catch(function (error) {
      if (error.response) {
        Alert.alert("Falha no login", error.response.data.error);
      }
    });

    // login(values.email, values.senha)
    //   .then(res => {
    //     if (res == null) {
    //       Alert.alert("Erro ao efetuar login");
    //       return;
    //     }
    //     onLoad(false);
    //     history.push("/home");
    //   })
    //   .catch(err => {
    //     onLoad(false);
    //     Alert.alert("Erro ao efetuar login");
    //     console.error(err);
    //   });
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
              email: 'admin@gmail.com', 
              password: 'adminroot', 
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
                type="email-address"
                placeholder="Digite seu email"
                value={values.email}
                onChange={handleChange('email')}
              />
              <Helper visible={errors.email && touched.email}>
                {errors.email}
              </Helper>
              <Input
                label="Senha"
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