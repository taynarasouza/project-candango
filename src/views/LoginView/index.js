import React, { useState, useRef } from 'react';
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
import {useDispatch, useSelector} from 'react-redux';

import logo from "../../assets/logo.png";
import background3 from "../../assets/brasilia-16.jpg";

import api from '../../services/api';

import {signInRequest} from '../../store/modules/auth/actions';

const LoginView = ({onLoad}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef();

  const schemaValidation = Yup.object().shape({
    email: Yup.string()
      .email("Email inválido.")
      .required("Preencha este campo."),
    password: Yup.string()
      .required("Preencha este campo."),
  });

  const handleLogin = ({ email, password }) => {
    // setLoading(true);
    // setTimeout(() => setLoading(false), 1000);
    // setTimeout(() => history.push("/home"), 1100);
    dispatch(signInRequest(email, password));
    history.push("/home");
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
              email: 'teste@example.com',
              password: '12345678', 
              // email: '', 
              // password: '', 
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
              <ForgotPasswordButton onPress={() => history.push("/password")}>
                <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
              </ForgotPasswordButton>
              
              <Button
                mode="contained"
                onPress={handleSubmit}
                loading={loading}
                // disabled={Object.keys(errors).length > 0 }
              > 
                Entrar 
              </Button>
              <Button
                mode="text"
                onPress={() => history.push("/signup")} 
              >
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