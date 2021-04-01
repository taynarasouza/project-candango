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
  Alert
} from 'react-native';
import { Appbar, Avatar, HelperText } from 'react-native-paper';
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

  const schema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório."),
    email: Yup.string()
      .email("Email inválido.")
      .required("Campo obrigatório."),
    confirmEmail: Yup.string().when('email', (email, field) =>
      email ? field.required().oneOf([Yup.ref('email')]) : field
    ),
    password: Yup.string()
      .required("Campo obrigatório!")
      .min(8, ({ min }) => `A senha deve ter pelo menos ${min} caracteres.`),
    confirmPassword: Yup.string().when('password', (password, field) =>
      password ? field.required().oneOf([Yup.ref('password')]) : field
    ),
  });

  // const [name, setName] = React.useState("");
  // const [email, setEmail] = React.useState("");
  // const [phone, setPhone] = React.useState("");
  // const [senha, setSenha] = React.useState("");

  const handleChange = e => {
    const { name, value } = e.currentTarget
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async() => {
    if (!(await schema.isValid(values))) {
      Alert.alert("Erro");
    } else {
      return 0;
    }
  }

  // const handleChangeEmail = email =>
  //   setEmail(email);

  // const handleChangeSenha = senha =>
  //   setSenha(senha);

  // const handleChangeName = name => 
  //   setName(name);

  // const handleChangePhone = phone => 
  //   setPhone(phone);

  const handleGoTo = path =>
    history.push(path);

  return (
    <>
      <Appbar.Header style={{backgroundColor: "#F5F5F5"}}>
        <Appbar.BackAction onPress={() => handleGoTo("/")} />
        <Appbar.Content title="Cadastro" />
      </Appbar.Header>
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <>
            <Avatar.Image size={200} source={require('../../assets/avatar_female.png')} />
            <View>
              <CustomInput 
                name="name"
                label="Nome" 
                placeholder="Escreva seu nome" 
                onChange={handleChange} 
              />
              <EmailField 
                name="email"
                valeu={values.email} 
                placeholder="Escreva seu email" 
                onChange={handleChange} 
              />
              <EmailField 
                name="confirmEmail"
                label="Confirmar email"
                valeu={values.email} 
                placeholder="Escreva seu email" 
                onChange={handleChange} 
              />
              {/*<HelperText type="error"> 
               visible={emailHasErrors()}>
                Email inválido.
              </HelperText> */}
              <PhoneInput 
                value={values.phone}
                placeholder="(XX) X XXXX-XXXX" 
                onChange={handleChange} 
              />
              <PasswordField 
                value={values.password} 
                onChange={handleChange} 
              />
              <PasswordField 
                label="Confirmar senha"
                value={values.confirmPassword} 
                onChange={handleChange} 
              />
            </View>
            <View>
              <Button
                onPress={handleSubmit}
                variant="flat"
                label="Cadastrar"
                fullWidth
              />
            </View>
          </>
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
  logoView: {
    height: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default SignUpView;