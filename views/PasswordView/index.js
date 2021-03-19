import React from 'react';
import { useHistory } from 'react-router-native';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';

import Button from "../../components/Button";
import { EmailField, PasswordField } from "../../components/Fields";

const PasswordView = () => {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");

  const handleChangeEmail = email =>
    setEmail(email);

  const handleChangeSenha = senha =>
    setSenha(senha);

  const handleGoTo = path =>
    history.push(path);

  return (
    <>
      <Appbar.Header style={{backgroundColor: "#F5F5F5"}}>
        <Appbar.BackAction onPress={() => handleGoTo("/")} />
        <Appbar.Content title="Esqueci minha senha" />
      </Appbar.Header>
      {/*<ScrollView>*/}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <>
          <View>
            <EmailField onChange={handleChangeEmail} />
          </View>
          <View>
            <Button
              variant="flat"
              label="Recuperar senha"
              fullWidth
            />
          </View>
        </>
      </KeyboardAvoidingView>
      {/*</ScrollView>*/}
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

export default PasswordView;