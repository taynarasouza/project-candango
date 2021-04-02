import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView
} from 'react-native';
import { Appbar, Avatar, HelperText } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Button from "../../components/Button";
import { EmailField, PasswordField, PhoneInput, CustomInput } from "../../components/Fields";

const SignUpView = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const schemaValidation = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório."),
    email: Yup.string()
      .email("Email inválido.")
      .required("Campo obrigatório."),
    confirmEmail: Yup.string()
      .required("Campo obrigatório.")
      .oneOf([Yup.ref('email')], "Os emails não conferem."),
    phone: Yup.string()
      .required("Campo obrigatório."),
      // .min(10, ({ min }) => `Deve conter pelo menos ${min} digitos.`), //Verificar se a mask conta como caracter
    password: Yup.string()
      .required("Campo obrigatório!")
      .min(8, ({ min }) => `A senha deve ter pelo menos ${min} caracteres.`),
    confirmPassword: Yup.string().when('password', (password, field) =>
      password ? field.required().oneOf([Yup.ref('password')]) : field
    ),
  });

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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Formik
            validationSchema={schemaValidation}
            initialValues={{ 
              name: '',
              email: '', 
              confirmEmail: '', 
              phone: '',
              password: '', 
              confirmPassword: '' 
            }}
            onSubmit={values => console.log(values)}
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
              <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
              >
                <View>
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
                  <PhoneInput 
                    name="phone"
                    label="Telefone"
                    value={values.phone}
                    placeholder="(XX) X XXXX-XXXX" 
                    onChange={handleChange('confirmEmail')} 
                  />
                  <HelperText style={styles.erro} type="error" visible={errors.phone && touched.phone}>
                    {errors.phone}
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
                    placeholder="Escreva sua senha"
                    onChange={handleChange('confirmPassword')} 
                  />
                  <HelperText style={styles.erro} type="error" visible={errors.confirmPassword && touched.confirmPassword}>
                    {errors.confirmPassword}
                  </HelperText>
                  <Button
                    onPress={handleSubmit}
                    variant="flat"
                    label="Cadastrar"
                    fullWidth
                  />
                  </View>
                </ScrollView>
              )}
          </Formik>
        </KeyboardAvoidingView>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
  },
  avatar: { alignSelf: 'center' },
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