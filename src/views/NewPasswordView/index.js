import React from 'react';
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
import { CustomInput } from "../../components/Fields";

import { changePassword } from "../../utils/api";

import Routes from '../../utils/constants';

const NewPasswordView = ({ navigation }) => {
  const email = history.location.state && Object.keys(history.location.state).length > 0 && history.location.state.email;

  const [codigo, setCodigo] = React.useState({
    value: "",
    error: false,
    helper: ""
  });
  const [senha, setSenha] = React.useState({
    value: "",
    error: false,
    helper: ""
  });
  const [confirm, setConfirm] = React.useState({
    value: "",
    error: false,
    helper: ""
  });

  const handleChangeCodigo = c =>
    setCodigo({
      value: c,
      error: false,
      helper: ""
    });

  const handleChangeSenha = s =>
    setSenha({
      value: s,
      error: false,
      helper: ""
    });

  const handleChangeConfirm = co =>
    setConfirm({
      value: co,
      error: false,
      helper: ""
    });
    
  const handlePress = () => {
    if (!codigo.value.length) {
      setCodigo(prev => ({
        value: prev.value,
        error: true,
        helper: "Não pode ficar vazio"
      }));
      return;
    }

    if (!senha.value.length) {
      setSenha(prev => ({
        value: prev.value,
        error: true,
        helper: "Não pode ficar vazio"
      }));
      return;
    }

    if (!confirm.value.length) {
      setConfirm(prev => ({
        value: prev.value,
        error: true,
        helper: "Não pode ficar vazio"
      }));
      return;
    }

    if (senha.value !== confirm.value) {
      setConfirm(prev => ({
        value: prev.value,
        error: true,
        helper: "As senhas não são iguais"
      }));
      return;
    }



    changePassword(email, codigo, senha)
      .then(res => {
        console.log(res);
        if (res == null) {
          Alert.alert("Erro ao criar nova senha");
          return;
        }
        navigation.navigate(Routes.Login);
      });
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <>
          <View>
            <View>
              <CustomInput
                label="Código de segurança"
                placeholder="Digite o código de segurança"
                onChange={handleChangeCodigo}
              />
              <HelperText
                type="error"
                visible={codigo.error}
                style={{textAlign: "right"}}
              >
                {codigo.helper}
              </HelperText>
            </View>
            <CustomInput
              label="Nova Senha"
              placeholder="Digite uma nova senha"
              onChange={handleChangeSenha}
            />
            <CustomInput
              label="Confirmar senha"
              placeholder="Confirme a senha"
              onChange={handleChangeConfirm}
            />
          </View>
          <View>
            <Button
              variant="flat"
              label="Mudar senha"
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

NewPasswordView.navigationOptions = ({ navigation }) => ({
  title: 'Criar nova senha',
});

export default NewPasswordView;