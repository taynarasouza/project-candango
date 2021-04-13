import React from 'react';
import { useHistory } from 'react-router-native';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { Appbar, HelperText } from 'react-native-paper';

import Button from "../../components/Button";
import { EmailField, PasswordField } from "../../components/Fields";

import { validadeEmail } from "../../utils";
import { recoverPassword } from "../../utils/api";

const PasswordView = () => {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState({
    show: false,
    text: ""
  });

  const handleChangeEmail = email =>
    setEmail(email);

  const handleGoTo = path =>
    history.push(path);

  const handlePress = () => {
    if (!email.length) {
      setError({
        show: true,
        text: "Não pode ficar vazio"
      });
      return;
    }

    if(!validadeEmail(email)) {
      setError({
        show: true,
        text: "Email inválido"
      });
      return;
    }

    if (error.show)
      setError({show: false, message: ""});

    recoverPassword(email)
      .then(res => {
        if (res == null) {
          Alert.alert("Problema ao tentar recuperar a senha");
          return;
        }

        history.push("/password/generate", {email});
      })
      .catch(err => console.error(err));
  };

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
            {error.show && (
              <HelperText type="error" style={{textAlign: "right"}}>
                {error.text}
              </HelperText>
            )}
          </View>
          <View>
            <Button
              variant="flat"
              label="Recuperar senha"
              fullWidth
              onPress={handlePress}
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