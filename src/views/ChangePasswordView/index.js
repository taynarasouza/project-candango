import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import { showMessage } from "react-native-flash-message";

import api from "../../services/api";

import {
  Wrapper,
  Container,
  FormContainer,
  Form,
  Input,
  Helper,
  Button,
} from './styles';

const ProfileView = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.profile);
  const [loading, setLoading] = useState(false);

  const schemaValidation = Yup.object().shape({
    oldPassword: Yup.string()
      .min(8, ({ min }) => `A senha deve ter pelo menos ${min} caracteres.`)
      .required('Campo obrigatório'),
    newPassword: Yup.string()
      .min(8, ({ min }) => `A senha deve ter pelo menos ${min} caracteres.`)
      .required('Campo obrigatório'),
    confirmNewPassword: Yup.string()
      .required('Campo obrigatório')
      .oneOf([Yup.ref('newPassword'), null], 'As senhas não conferem.'),
  });
  
  const handlePressSubmit = async (values) => {
    setLoading(true);

    api.put('user', values)
      .then(res => {
        if (res == null) {
          showMessage({
            message: "Erro ao alterar senha!",
            type: "danger",
          });
          return;
        }

        showMessage({
          message: "Senha atualizada com sucesso!",
          type: "success",
        });
        navigation.goBack();
      })
      .catch(error => {
        showMessage({
          message: "Erro ao alterar senha!",
          description: error.response.data.error,
          type: "danger",
        });
      }).finally(function() {
        setLoading(false);
     });
  };

  return (
      <Wrapper>
        <Container>
          <Form
            validationSchema={schemaValidation}
            initialValues={{ 
              oldPassword: "",
              newPassword: "",
              confirmNewPassword: "",
            }}
            onSubmit={values => handlePressSubmit(values)}
          >
            {({ 
              handleChange, handleSubmit, values, errors, touched, setFieldValue
            }) => (
              <FormContainer>
                <Input 
                  label="Senha antiga"
                  value={values.oldPassword}
                  placeholder="Escreva sua senha antiga" 
                  secureTextEntry
                  onChange={handleChange('oldPassword')} 
                  touched={touched.oldPassword}
                />
                <Helper type="error" visible={Boolean(errors.oldPassword && touched.oldPassword)}>
                  {errors.oldPassword}
                </Helper>
                <Input 
                  label="Nova senha"
                  value={values.newPassword}
                  placeholder="Escreva sua nova senha" 
                  secureTextEntry
                  onChange={handleChange('newPassword')}  
                  touched={touched.newPassword}
                />
                <Helper type="error" visible={Boolean(errors.newPassword && touched.newPassword)}>
                  {errors.newPassword}
                </Helper>
                <Input 
                  label="Confirmar nova senha"
                  value={values.confirmNewPassword}
                  placeholder="Digite a nova senha novamente" 
                  secureTextEntry
                  onChange={handleChange('confirmNewPassword')} 
                  touched={touched.confirmNewPassword}
                />
                <Helper type="error" visible={Boolean(errors.confirmNewPassword && touched.confirmNewPassword)}>
                  {errors.confirmNewPassword}
                </Helper>
                <Button
                  onPress={handleSubmit}
                  mode="contained"
                  loading={loading}
                  disabled={loading}
                >
                  Salvar
                </Button>
              </FormContainer>
              )}
          </Form>
        </Container>
      </Wrapper>
  )
};

ProfileView.navigationOptions = ({navigation}) => ({
  title: 'Alterar senha',
});

export default ProfileView;