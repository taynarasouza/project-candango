import React from 'react';
import * as Yup from "yup";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
// import { Appbar, HelperText } from 'react-native-paper';

// import Button from "../../components/Button";
// import { CustomInput } from "../../components/Fields";
import { Button, Form, FormContainer, Input, Helper } from "./styles";

// import { changePassword } from "../../utils/api";
import api from "../../services/api";

import { Routes } from '../../utils/constants';

const NewPasswordView = ({ navigation }) => {
  const { email } = navigation.state.params;
  const [loading, setLoading] = React.useState(false);

  //Seta as referencias
  const newpasswordRef = React.useRef();
  const confirmPasswordRef = React.useRef();
  
  const schemaValidation = Yup.object().shape({
    recoverycode: Yup.string().required("Campo obrigatório."),
    email: Yup.string()
      .email("Email inválido.")
      .required("Campo obrigatório."),
    newpassword: Yup.string()
      .required("Campo obrigatório!")
      .min(8, ({ min }) => `A senha deve ter pelo menos ${min} caracteres.`),
    confirmPassword: Yup.string()
      .required("Campo obrigatório!")
      .oneOf([Yup.ref('password')], "As senhas não conferem.")
  });
    
  const handlePress = ({email, recoverycode, newpassword}) => {
    setLoading(true);

    api.put("/user/forgotPassword", { email, recoverycode, newpassword })
      .then(res => {
        if (res == null) {
          Alert.alert("Erro ao criar nova senha");
          return;
        }
        setLoading(false);
        Alert.alert("Senha nova criada com sucesso");
        navigation.navigate(Routes.Login);
      })
      .catch(err => {
        console.error(err);
        Alert.alert("Erro ao criar nova senha");
        setLoading(false);
      })
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Form
          validationSchema={schemaValidation}
          initialValues={{ 
            recoverycode: '',
            email: email || '',
            newpassword: '',
            confirmPassword: ''
          }}
          onSubmit={values => handlePress(values)}
        >
          {({ 
            handleChange, handleBlur, handleSubmit, values, errors, touched,
          }) => (
            <FormContainer>
              <View>
                <View>
                  <Input
                    label="Código de segurança"
                    placeholder="Digite seu código"
                    // ref={passwordRef}
                    value={values.recoverycode}
                    onChange={handleChange('recoverycode')}
                    touched={touched.recoverycode}
                    onBlur={handleBlur('recoverycode')}
                    returnKeyType="next"
                    onSubmitEditing={() => newpasswordRef.current.focus()}
                  />
                  <Helper visible={Boolean(errors.recoverycode && touched.recoverycode)}>
                    {errors.recoverycode}
                  </Helper>
                </View>
                <View>
                  <Input
                    label="Nova senha"
                    placeholder="Digite sua nova senha"
                    secureTextEntry={true}
                    ref={newpasswordRef}
                    value={values.newpassword}
                    onChange={handleChange('newpassword')}
                    touched={touched.newpassword}
                    onBlur={handleBlur('newpassword')}
                    returnKeyType="next"
                    onSubmitEditing={() => confirmPasswordRef.current.focus()}
                  />
                </View>
                <View>
                  <Input
                    label="Confirme a senha"
                    placeholder="Digite sua senha"
                    secureTextEntry={true}
                    ref={confirmPasswordRef}
                    value={values.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    touched={touched.confirmPassword}
                    onBlur={handleBlur('confirmPassword')}
                    returnKeyType="send"
                    onSubmitEditing={() => handleSubmit()}
                  />
                </View>
              </View>
              <View style={{marginTop: 15}}>
                <Button
                  loading={loading}
                  mode="contained"
                  disabled={loading}
                  onPress={() => handlePress(values)}
                >
                  Mudar a senha
                </Button>
              </View>
            </FormContainer>
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

NewPasswordView.navigationOptions = ({ navigation }) => ({
  title: 'Criar nova senha',
});

export default NewPasswordView;