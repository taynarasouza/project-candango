import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView
} from 'react-native';

import Button from "../../components/Button";

import logo from "../../assets/logo.png"

const LoginView = () => {
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");

  const handleChangeEmail = email =>
    setEmail(email);

  const handleChangeSenha = senha =>
    setSenha(senha);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
    >
      <View style={{height: 400, display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Image source={logo}/>
      </View>
      <View>
        <TextInput
          keyboardType="email-address"
          placeholder="Email"
          style={styles.input}
          autocomplete="off"
          autoCapitalize="none"
          onChangeText={text => handleChangeEmail(text)}
        />
        <TextInput
          keyboardType="default"
          placeholder="Senha"
          style={styles.input}
          autocomplete="off"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={text => handleChangeSenha(text)}
        />
      </View>
      <View>
        <Button
          variant="flat"
          label="Login"
          fullWidth
        />
        <Button
          variant="link"
          label="Não possui conta?"
          spaceTop
        />
        <Button
          variant="link"
          label="Esqueceu a senha?"
        />
      </View>
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    marginBottom: 35,
    borderWidth: 1,
    borderColor: "#000099",
    backgroundColor: "rgba(0,0,0,.025)",
    borderRadius: 10,
    width: 300,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16
  },
});

export default LoginView;