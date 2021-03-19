import React from 'react';
import { useHistory } from 'react-router-native';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';
import Button from "../../components/Button";
import { EmailField, PasswordField } from "../../components/Fields";
import logo from "../../assets/logo.png"
import {Keyboard} from 'react-native-web';

const Logo = () =>
  <Image source={logo}/>
;

const LoginView = () => {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");

  const handleChangeEmail = email =>
    setEmail(email);

  const handleChangeSenha = senha =>
    setSenha(senha);

  const handleGoTo = path => {
    history.push(path);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.logoView}>
        <Logo/>
      </View>
      <View>
        <EmailField onChange={handleChangeEmail} />
        <PasswordField onChange={handleChangeSenha} />
      </View>
      <View>
        <Button
          variant="flat"
          label="Entrar"
          fullWidth
          pathTo="/home"
          onPress={handleGoTo}
        />
        <Button
          variant="link"
          label="Não possui conta?"
          spaceTop
          pathTo="/signup"
          onPress={handleGoTo}
        />
        <Button
          variant="link"
          label="Esqueceu a senha?"
          pathTo="/password"
          onPress={handleGoTo}
        />
      </View>
    </KeyboardAvoidingView>
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

export default LoginView;