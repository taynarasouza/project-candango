import React from 'react';
import * as Yup from 'yup';

import {
  View,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import { Appbar, HelperText } from 'react-native-paper';

// import Button from "../../components/Button";
import { EmailField, PasswordField } from "../../components/Fields";

import { Routes } from '../../utils/constants';

import { validadeEmail } from "../../utils";
// import { recoverPassword } from "../../utils/api";
import { Button, Form } from "./styles";
import api from "../../services/api";

const PasswordView = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState({
    show: false,
    text: ""
  });

  const schemaValidation = Yup.object().shape({
    email: Yup.string()
      .email("Email inválido.")
      .required("Preencha este campo.")
  });

  const handleChangeEmail = email =>
    setEmail(email);

  const handleGoTo = path =>
    history.push(path);

  const handlePress = email => {
    setLoading(true);
    api.post("/user/forgotPassword", { email })
      .then(res => {
        if (res == null) {
          Alert.alert("Problema ao tentar recuperar a senha");
          return;
        }

        setLoading(false);
        navigation.navigate(Routes.NewPassword, {email});
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {/*<ScrollView>*/}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Form
          validationSchema={schemaValidation}
          initialValues={{ email: '' }}
          onSubmit={({email}) => handlePress(email)}
        >
          {({ 
            handleChange, handleSubmit, values, errors, touched,
          }) => (
            <>
              <View>
                <EmailField onChange={handleChange("email")} />
                <HelperText visible={Boolean(errors.email && touched.email)}>
                  {errors.email}
                </HelperText>
              </View>
              <View>
                <Button
                  loading={loading}
                  mode="contained"
                  disabled={loading}
                  onPress={() => handleSubmit()}
                >
                  Recuperar senha
                </Button>
              </View>
            </>
          )}
        </Form>
      </KeyboardAvoidingView>
      {/*</ScrollView>*/}
    </TouchableWithoutFeedback>
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

PasswordView.navigationOptions = ({ navigation }) => ({
  title: 'Esqueci minha senha',
});

export default PasswordView;