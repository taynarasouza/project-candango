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

const SignUpView = () => {
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
        <Appbar.Content title="Cadastro" />
      </Appbar.Header>
      {/*<ScrollView>*/}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <>
            <View style={{marginBottom: 25}}>
              <Avatar.Image size={200} source={require('../../assets/avatar_female.png')} />
            </View>
            <View>
              <EmailField onChange={handleChangeEmail} />
              <EmailField onChange={handleChangeEmail} />
              <EmailField onChange={handleChangeEmail} />
              <EmailField onChange={handleChangeEmail} />
              <PasswordField onChange={handleChangeSenha} />
            </View>
            <View>
              <Button
                variant="flat"
                label="Cadastrar"
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

export default SignUpView;