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
    confirmEmail: Yup.string()
      .required("Campo obrigatório.")
      .oneOf([Yup.ref('email')], "Os emails não conferem."),
    phone: Yup.string()
      .required("Campo obrigatório.")
      .min(14, ({ min }) => `Deve conter pelo menos 10 digitos.`), //Verificar se a mask conta como caracter
    password: Yup.string()
      .required("Campo obrigatório!")
      .min(8, ({ min }) => `A senha deve ter pelo menos ${min} caracteres.`),
    confirmPassword: Yup.string()
      .required("Campo obrigatório!")
      .oneOf([Yup.ref('password')], "As senhas não conferem."),
      // gender: Yup.string().required("Campo obrigatório!"),
  });

  const handleSubmitForm = values => {
    Alert.alert(JSON.stringify(values));

    console.log(values);

    cadastrar(values.name, values.email, values.password)
      .then(res => {
      history.push("/home");
    })
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
              email: '', 
              confirmEmail: '', 
              phone: '',
              password: '', 
              confirmPassword: '',
              // gender: '',
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
                    onChange={handleChange('phone')} 
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