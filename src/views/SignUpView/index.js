import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import {
  StyleSheet,
  Alert,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import * as Yup from 'yup';

import { cadastrar } from "../../utils/api";

import {
  Wrapper,
  Container,
  Form,
  Input,
  PhoneNumberInput,
  Helper,
  // Picker
} from './styles';

import Button from "../../components/Button";
import { 
  EmailField, 
  PasswordField, 
  CustomInput, 
  CustomPicker 
} from "../../components/Fields";

const SignUpView = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // gender: '',
  });

  const schemaValidation = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório."),
    email: Yup.string()
      .email("Email inválido.")
      .required("Campo obrigatório."),
    gender: Yup.string()
      .required("Campo obrigatório!")
      .max(1, "Apenas 2 letras."),
    phone: Yup.string()
      .required("Campo obrigatório.")
      .min(14, ({ min }) => `Deve conter pelo menos 10 digitos.`), 
    confirmEmail: Yup.string()
      .required("Campo obrigatório.")
      .oneOf([Yup.ref('email')], "Os emails não conferem."),
    password: Yup.string()
      .required("Campo obrigatório!")
      .min(8, ({ min }) => `A senha deve ter pelo menos ${min} caracteres.`),
    confirmPassword: Yup.string()
      .required("Campo obrigatório!")
      .oneOf([Yup.ref('password')], "As senhas não conferem."),
    state: Yup.string()
      .required("Campo obrigatório!")
      .max(2, "Apenas 2 letras."),
    country: Yup.string()
      .required("Campo obrigatório!"),
  });

  const handleSubmitForm = ({
    name,
    gender,
    phone,
    email,
    password,
    state,
    country
  }) => {

      cadastrar(name, gender, phone, email, password, state, country)
        .then(res => {
          Alert.alert(res.msg);

          if(res.status == '200')
            history.push("/home");

      }).catch(err => {
        Alert.alert('Erro!', "Contate a equipe do CanganGO");
        console.error(err);
      });
  }

  const handleGoTo = path =>
    history.push(path);

  return (
    <>
      <Appbar.Header style={{backgroundColor: "#F5F5F5"}}>
        <Appbar.BackAction onPress={() => handleGoTo("/")} />
        <Appbar.Content title="Cadastro" />
      </Appbar.Header>
      <Wrapper>
        <Container>
          <Form
            validationSchema={schemaValidation}
            initialValues={{ 
              name: '',
              gender: '',
              phone: '',
              email: '', 
              confirmEmail: '', 
              password: '', 
              confirmPassword: '',
              state: '',
              country: '',
            }}
            onSubmit={values => handleSubmitForm(values)}
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
                  name="name"
                  label="Nome" 
                  value={values.name} 
                  placeholder="Escreva seu nome" 
                  onChange={handleChange('name')} 
                />
                <Helper style={styles.erro} type="error" visible={errors.name && touched.name}>
                  {errors.name}
                </Helper>
                <Input 
                  name="gender"
                  label="Gênero" 
                  value={values.gender} 
                  placeholder="Escreva seu gênero" 
                  onChange={handleChange('gender')} 
                />
                <Helper style={styles.erro} type="error" visible={errors.gender && touched.gender}>
                  {errors.gender}
                </Helper>
                <PhoneNumberInput 
                  name="phone"
                  label="Telefone"
                  value={values.phone}
                  placeholder="(XX) X XXXX-XXXX" 
                  onChange={handleChange('phone')} 
                />
                <Helper style={styles.erro} type="error" visible={errors.phone && touched.phone}>
                  {errors.phone}
                </Helper>
                <Input 
                  name="email"
                  label="Email"
                  value={values.email} 
                  type="email-address"
                  placeholder="Escreva seu email" 
                  onChange={handleChange('email')} 
                />
                <Helper style={styles.erro} type="error" visible={errors.email && touched.email}>
                  {errors.email}
                </Helper>
                <Input 
                  name="confirmEmail"
                  label="Confirmar email"
                  value={values.confirmEmail} 
                  type="email-address"
                  placeholder="Escreva seu email" 
                  onChange={handleChange('confirmEmail')} 
                />
                <Helper style={styles.erro} type="error" visible={errors.confirmEmail && touched.confirmEmail}>
                  {errors.confirmEmail}
                </Helper>
                <Input 
                  name="password"
                  label="Senha"
                  value={values.password} 
                  placeholder="Escreva sua senha"
                  secureTextEntry={true}
                  onChange={handleChange('password')} 
                />
                <Helper style={styles.erro} type="error" visible={errors.password && touched.password}>
                  {errors.password}
                </Helper>
                <Input 
                  name="confirmPassword"
                  label="Confirmar senha"
                  value={values.confirmPassword} 
                  placeholder="Escreva sua senha novamente"
                  secureTextEntry={true}
                  onChange={handleChange('confirmPassword')} 
                />
                <Helper style={styles.erro} type="error" visible={errors.confirmPassword && touched.confirmPassword}>
                  {errors.confirmPassword}
                </Helper>
                <CustomInput 
                  name="country"
                  label="País" 
                  value={values.country} 
                  placeholder="Escreva seu país" 
                  onChange={handleChange('country')} 
                />
                <Helper style={styles.erro} type="error" visible={errors.country && touched.country}>
                  {errors.country}
                </Helper>
                <CustomInput 
                  name="state"
                  label="Estado" 
                  value={values.state} 
                  placeholder="Escreva seu estado" 
                  onChange={handleChange('state')} 
                />
                <Helper style={styles.erro} type="error" visible={errors.state && touched.state}>
                  {errors.state}
                </Helper>
                {/* <CustomPicker 
                  value={values.gender}
                  items={{
                    "M": "Masculino",
                    "F": "Feminino"
                  }}
                  onChange={handleChange('gender')}
                /> */}
                <Button
                  onPress={handleSubmit}
                  variant="flat"
                  label="Cadastrar"
                  fullWidth
                />
              </>
              )}
          </Form>
        </Container>
      </Wrapper>
    </>
  )
};

const styles = StyleSheet.create({
  logoView: {
    height: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  erro: {
    textAlign: 'right',
    width: 300,
  }
});

export default SignUpView;