import React, { useState } from 'react';
import {
  Alert,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import * as Yup from 'yup';

import {
  gendersOptions,
  gendersMap,
  contriesOptions,
  contriesMap, 
  statesOptions,
  statesMap,
} from '../../utils/pickerList';
import api from '../../services/api';

import {
  Wrapper,
  Container,
  Form,
  Input,
  PhoneNumberInput,
  Helper,
  Button,
} from './styles';

import { 
  Picker, 
} from "../../components/Fields";

const SignUpView = ({ navigation }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  let selectGender;
  const openGenderModal = () => selectGender.show();
  const selectGenderRef = ref => selectGender = ref;

  let selectContry;
  const openContryModal = () => selectContry.show();
  const selectContryRef = ref => selectContry = ref;

  let selectState;
  const openStateModal = () => selectState.show();
  const selectStateRef = ref => selectState = ref;

  const schemaValidation = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório."),
    email: Yup.string()
      .email("Email inválido.")
      .required("Campo obrigatório."),
    gender: Yup.string()
      .required("Campo obrigatório!")
      .max(1, "Apenas 2 letras."),
    phone: Yup.string()
      .required("Campo obrigatório.")
      .min(14, ({ min }) => `Deve conter pelo menos 10 digitos.`), 
    confirmEmail: Yup.string()
      .required("Campo obrigatório.")
      .oneOf([Yup.ref('email')], "Os emails não conferem."),
    password: Yup.string()
      .required("Campo obrigatório!")
      .min(8, ({ min }) => `A senha deve ter pelo menos ${min} caracteres.`),
    confirmPassword: Yup.string()
      .required("Campo obrigatório!")
      .oneOf([Yup.ref('password')], "As senhas não conferem."),
    state: Yup.string()
      .required("Campo obrigatório!")
      .max(2, "Apenas 2 letras."),
    country: Yup.string()
      .required("Campo obrigatório!"),
  });

  const handleSubmitForm = ({
    name,
    gender,
    phone,
    email,
    password,
    state,
    country
  }) => {
    api.post(`/signup`, {
        nme_usuario: name,
        gen_usuario: gender,
        tlf_usuario: phone,
        eml_usuario: email,
        pwd_usuario: password,
        pais_usuario: country,
        est_usuario: state,
    }).then(res => {
        Alert.alert("Sucesso!", res.data.msg, [
          {
            text: "OK",
            onPress: () => history.push("/home")
          },
        ],);

      }).catch(function (error) {
      if (error.response) {
        Alert.alert("Falha no cadastro", error.response.data.error);
      }
    });
  }

  const handleGoTo = path =>
    history.push(path);

  return (
    <>
      <Wrapper>
        <Container>
          <Form
            validationSchema={schemaValidation}
            initialValues={{ 
              name: '',
              gender: '',
              phone: '',
              email: '', 
              confirmEmail: '', 
              password: '', 
              confirmPassword: '',
              country: '',
              state: '',
            }}
            onSubmit={values => handleSubmitForm(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
              setFieldValue,
              setFieldTouched,
            }) => (
              <>
                <Input label="Nome" 
                  value={values.name} 
                  placeholder="Escreva seu nome" 
                  onChange={handleChange('name')}
                  onBlur={handleBlur('name')}
                  touched={touched.name}
                />
                {/* Tive que adicionar o Boolean() pois não tava pegando o touched undefined como false */}
                <Helper type="error" visible={Boolean(errors.name && touched.name)}>
                  {errors.name}
                </Helper>
                <Picker 
                  ref={selectGenderRef}
                  openModal={openGenderModal}
                  label={gendersMap[values.gender] || "Gênero"}
                  options={gendersOptions}
                  onSelectedOption={value => setFieldValue('gender', value)}
                  errors={errors.gender}
                  touched={touched.gender}
                />
                <PhoneNumberInput 
                  label="Telefone"
                  value={values.phone}
                  placeholder="(XX) XXXXX-XXXX" 
                  onChange={handleChange('phone')} 
                />
                <Helper type="error" visible={Boolean(errors.phone && touched.phone)}>
                  {errors.phone}
                </Helper>
                <Input 
                  label="Email"
                  value={values.email} 
                  type="email-address"
                  placeholder="Escreva seu email" 
                  onChange={handleChange('email')} 
                />
                <Helper type="error" visible={Boolean(errors.email && touched.email)}>
                  {errors.email}
                </Helper>
                <Input 
                  label="Confirmar email"
                  value={values.confirmEmail} 
                  type="email-address"
                  placeholder="Escreva seu email" 
                  onChange={handleChange('confirmEmail')} 
                />
                <Helper type="error" visible={Boolean(errors.confirmEmail && touched.confirmEmail)}>
                  {errors.confirmEmail}
                </Helper>
                <Input 
                  label="Senha"
                  value={values.password} 
                  placeholder="Escreva sua senha"
                  secureTextEntry={true}
                  onChange={handleChange('password')} 
                />
                <Helper type="error" visible={Boolean(errors.password && touched.password)}>
                  {errors.password}
                </Helper>
                <Input 
                  label="Confirmar senha"
                  value={values.confirmPassword} 
                  placeholder="Escreva sua senha novamente"
                  secureTextEntry={true}
                  onChange={handleChange('confirmPassword')} 
                />
                <Helper type="error" visible={Boolean(errors.confirmPassword && touched.confirmPassword)}>
                  {errors.confirmPassword}
                </Helper>
                <Picker 
                  ref={selectContryRef}
                  openModal={openContryModal}
                  label={contriesMap[values.country] || "País"}
                  options={contriesOptions}
                  onSelectedOption={value => setFieldValue('country', value)}
                  errors={errors.country}
                  touched={touched.country}
                />
                <Picker 
                  ref={selectStateRef}
                  openModal={openStateModal}
                  label={statesMap[values.state] || "Estado"}
                  options={statesOptions}
                  onSelectedOption={value => setFieldValue('state', value)}
                  errors={errors.state}
                  touched={touched.state}
                />
                <Button
                  onPress={handleSubmit}
                  mode="contained"
                >
                  Cadastrar
                </Button>
              </>
              )}
          </Form>
        </Container>
      </Wrapper>
    </>
  )
};

SignUpView.navigationOptions = ({navigation}) => ({
  title: 'Cadastro',
});

export default SignUpView;