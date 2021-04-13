import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  TouchableWithoutFeedback
} from 'react-native';
import { TextInput, HelperText, Button } from "react-native-paper";
// import Button from "../../components/Button";
import { EmailField, PasswordField } from "../../components/Fields";
import logo from "../../assets/logo.png"
import background from "../../assets/brasilia-6.jpg"
import {Keyboard} from 'react-native-web';
import { login } from "../../utils/api";
import { fade } from "../../utils";
import { Formik } from 'formik';
import * as Yup from 'yup';

const Logo = () =>
  <Image source={logo}/>
;

const LoginView = () => {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");



  const schemaValidation = Yup.object().shape({
    email: Yup.string()
      .email("Email inválido.")
      .required("Preencha este campo."),
    password: Yup.string()
      .required("Preencha este campo."),
  });

  const handleChangeEmail = email =>
    setEmail(email);

  const handleChangeSenha = senha =>
    setSenha(senha);

  const handleLogin = (values) => {
    login(values.email, values.senha)
      .then(res => {
      history.push("/home");
    });
  };

  return (
    <ImageBackground source={require("../../assets/brasilia-6.jpg")} style={{flex: 1, resizeMode: "cover", justifyContent: "center"}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.logoView}>
          <Logo/>
        </View>
        <View
          style={{
            backgroundColor: fade("#fff", .65),
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 90,
            paddingBottom: 15,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            shadowOffset: {
              width: 0,
              height: -5
            },
            shadowOpacity: 1,
            shadowRadius: 5,
            shadowColor: "#000"
          }}
        >
          <Formik
            validationSchema={schemaValidation}
            initialValues={{ 
              email: '', 
              password: '', 
            }}
            onSubmit={values => handleLogin(values)}
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
              <EmailField
                style={{ width: 350, height: 60, fontSize: 16 }}
                value={values.email}
                onChange={handleChange('email')}
              />
              <HelperText style={styles.erro} type="error" visible={errors.email && touched.email}>
                {errors.email}
              </HelperText>
              <PasswordField
                style={{ width: 350, height: 60, fontSize: 16 }}
                value={values.password}
                onChange={handleChange('password')}
              />
              <HelperText style={styles.erro} type="error" visible={errors.password && touched.password}>
                {errors.password}
              </HelperText>
              <HelperText
                onPress={() => history.push("/password")}
                style={{width: 350, textAlign: "right"}}>Esqueceu sua senha?</HelperText>
              <View style={{paddingTop: 15, paddingBottom: 15, width: 350 }}>
                <Button
                  mode="contained"
                  color="#000999"
                  contentStyle={{width: "100%", height: 50}}
                  style={{marginVertical: 15, borderRadius: 30}}
                  onPress={handleSubmit}
                >
                  Entrar
                </Button>
                <Button
                  mode="text"
                  color="#000999"
                  contentStyle={{width: "100%", height: 50}}
                  onPress={() => history.push("/signup")}
                >
                  Cadastrar
                </Button>
                {/*<Button
                  variant="flat"
                  label="Entrar"
                  fullWidth
                  onPress={handleLogin}
                />
                <Button
                  variant="link"
                  label="Não possui conta?"
                  spaceTop
                  pathTo="/signup"
                  onPress={handleGoTo}
                />*/}
              </View>
            </>
          )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flexGrow: 1,
    backgroundColor: fade("#000", 0.2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoView: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  erro: {
    textAlign: 'right',
    width: 350,
  }
});

export default LoginView;