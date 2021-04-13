import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import { Appbar, Avatar, HelperText } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { Formik } from 'formik';
import * as Yup from 'yup';

import { cadastrar } from "../../utils/api";

import Button from "../../components/Button";
import { 
  EmailField, 
  PasswordField, 
  PhoneInput, 
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
      console.log("Chegou aqui");

      cadastrar(name, gender, phone, email, password, state, country)
        .then(res => {
          console.log(".then");
          // history.push("/home");
      }).catch(err => {
        Alert.alert('Falha no cadastro', err.response.data.msg);
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
      <SafeAreaView
          style={styles.container}>
        <KeyboardAwareScrollView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          contentContainerStyle={{ alignItems: 'center' }}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          
        >
          <Formik
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
                <Avatar.Image style={styles.avatar} size={200} source={require('../../assets/avatar_female.png')} />
                  <CustomInput 
                    name="name"
                    label="Nome" 
                    value={values.name} 
                    placeholder="Escreva seu nome" 
                    onChange={handleChange('name')} 
                  />
                  <HelperText style={styles.erro} type="error" visible={errors.name && touched.name}>
                    {errors.name}
                  </HelperText>
                  <CustomInput 
                    name="gender"
                    label="Gênero" 
                    value={values.gender} 
                    placeholder="Escreva seu gênero" 
                    onChange={handleChange('gender')} 
                  />
                  <HelperText style={styles.erro} type="error" visible={errors.gender && touched.gender}>
                    {errors.gender}
                  </HelperText>
                  <PhoneInput 
                    name="phone"
                    label="Telefone"
                    value={values.phone}
                    placeholder="(XX) X XXXX-XXXX" 
                    onChange={handleChange('phone')} 
                  />
                  <HelperText style={styles.erro} type="error" visible={errors.phone && touched.phone}>
                    {errors.phone}
                  </HelperText>
                  <EmailField 
                    name="email"
                    label="Email"
                    value={values.email} 
                    placeholder="Escreva seu email" 
                    onChange={handleChange('email')} 
                  />
                  <HelperText style={styles.erro} type="error" visible={errors.email && touched.email}>
                    {errors.email}
                  </HelperText>
                  <EmailField 
                    name="confirmEmail"
                    label="Confirmar email"
                    value={values.confirmEmail} 
                    placeholder="Escreva seu email" 
                    onChange={handleChange('confirmEmail')} 
                  />
                  <HelperText style={styles.erro} type="error" visible={errors.confirmEmail && touched.confirmEmail}>
                    {errors.confirmEmail}
                  </HelperText>
                  <PasswordField 
                    name="password"
                    label="Senha"
                    value={values.password} 
                    placeholder="Escreva sua senha"
                    onChange={handleChange('password')} 
                  />
                  <HelperText style={styles.erro} type="error" visible={errors.password && touched.password}>
                    {errors.password}
                  </HelperText>
                  <PasswordField 
                    name="confirmPassword"
                    label="Confirmar senha"
                    value={values.confirmPassword} 
                    placeholder="Escreva sua senha novamente"
                    onChange={handleChange('confirmPassword')} 
                  />
                  <HelperText style={styles.erro} type="error" visible={errors.confirmPassword && touched.confirmPassword}>
                    {errors.confirmPassword}
                  </HelperText>
                  <CustomInput 
                    name="state"
                    label="Estado" 
                    value={values.state} 
                    placeholder="Escreva seu estado" 
                    onChange={handleChange('state')} 
                  />
                  <HelperText style={styles.erro} type="error" visible={errors.state && touched.state}>
                    {errors.state}
                  </HelperText>
                  <CustomInput 
                    name="country"
                    label="País" 
                    value={values.country} 
                    placeholder="Escreva seu país" 
                    onChange={handleChange('country')} 
                  />
                  <HelperText style={styles.erro} type="error" visible={errors.country && touched.country}>
                    {errors.country}
                  </HelperText>
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
          </Formik>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    marginBottom: 60,
  },
  avatar: { 
    alignSelf: 'center',
    marginVertical: 20,
  },
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