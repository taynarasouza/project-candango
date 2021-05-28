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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    api.post(`/signin`, {
        email,
        password,
      })
      .then(response => response.data.json)
      .then(res => {
        //TODO: receber payload: [], message: "", status: int 1 : sucesso || -1 : erro
        setLoading(false);
        setTimeout(() => history.push("/home"), 100);
      })
      .catch(error => {
        if (error.response)
          Alert.alert("Falha no login", error.response.data.error);
        
          setLoading(false);
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
              />
              <Helper visible={Boolean(errors.email && touched.email)}>
                {errors.email}
              </Helper>
              <Input
                label="Senha"
                secureTextEntry={true}
                placeholder="Digite sua senha"
                value={values.password}
                onChange={handleChange('password')}
                touched={touched.password}
                onBlur={handleBlur('password')}
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