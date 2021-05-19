import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import {
  StyleSheet,
  Alert,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { ModalSelectList } from 'react-native-modal-select-list';
import * as Yup from 'yup';

import { cadastrar } from "../../utils/api";

import {
  Wrapper,
  Container,
  Form,
  Input,
  PhoneNumberInput,
  Helper,
} from './styles';

import Button from "../../components/Button";
import { 
  EmailField, 
  PasswordField, 
  CustomInput, 
  Picker, 
} from "../../components/Fields";

const SignUpView = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const genderMap = {
    "M": "Masculino",
    "F": "Feminino",
    "O": "Outro",
  }

  const contriesMap = {
    "BR": "Brasil",
  }

  const statesMap = {
    "AC": "Acre",
    "AL": "Alagoas",
    "AP": "Amapá",
    "AM": "Amazonas",
    "BA": "Bahia",
    "CE": "Ceará",
    "DF": "Distrito Federal",
    "ES": "Espírito Santo",
    "GO": "Goiás",
    "MA": "Maranhão",
    "MT": "Mato Grosso",
    "MS": "Mato Grosso do Sul",
    "MG": "Minas Gerais",
    "PA": "Pará",
    "PB": "Paraíba",
    "PR": "Paraná",
    "PE": "Pernambuco",
    "PI": "Piauí",
    "RJ": "Rio de Janeiro",
    "RN": "Rio Grande do Norte",
    "RS": "Rio Grande do Sul",
    "RO": "Rondônia",
    "RR": "Roraima",
    "SC": "Santa Catarina",
    "SP": "São Paulo",
    "SE": "Sergipe",
    "TO": "Tocantins"
  }

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

      cadastrar(name, gender, phone, email, password, state, country)
        .then(res => {
          Alert.alert(res.msg);

          if(res.status == '200')
            history.push("/home");

      }).catch(err => {
        Alert.alert('Erro!', "Contate a equipe do CanganGO");
        console.error(err);
      });
  }

  const handleGoTo = path =>
    history.push(path);

  return (
    <>
      <Appbar.Header style={{backgroundColor: "#F5F5F5"}}>
        <Appbar.BackAction onPress={() => handleGoTo("/")} />
        <Appbar.Content title="Cadastro" />
      </Appbar.Header>
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
              state: '',
              country: '',
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
            }) => (
              <>
                <Input 
                  label="Nome" 
                  value={values.name} 
                  placeholder="Escreva seu nome" 
                  onChange={handleChange('name')} 
                />
                <Helper type="error" visible={errors.name && touched.name}>
                  {errors.name}
                </Helper>
                <Picker 
                  ref={selectGenderRef}
                  openModal={openGenderModal}
                  label={genderMap[values.gender] || "Gênero"}
                  options={[
                    { label: 'Masculino', value: 'M' },
                    { label: 'Feminino', value: 'F' },
                    { label: 'Outro', value: 'O' }
                  ]}
                  onSelectedOption={value => setFieldValue('gender', value)}
                  errors={errors.gender}
                  touched={touched.gender}
                />
                <PhoneNumberInput 
                  label="Telefone"
                  value={values.phone}
                  placeholder="(XX) X XXXX-XXXX" 
                  onChange={handleChange('phone')} 
                />
                <Helper type="error" visible={errors.phone && touched.phone}>
                  {errors.phone}
                </Helper>
                <Input 
                  label="Email"
                  value={values.email} 
                  type="email-address"
                  placeholder="Escreva seu email" 
                  onChange={handleChange('email')} 
                />
                <Helper type="error" visible={errors.email && touched.email}>
                  {errors.email}
                </Helper>
                <Input 
                  label="Confirmar email"
                  value={values.confirmEmail} 
                  type="email-address"
                  placeholder="Escreva seu email" 
                  onChange={handleChange('confirmEmail')} 
                />
                <Helper type="error" visible={errors.confirmEmail && touched.confirmEmail}>
                  {errors.confirmEmail}
                </Helper>
                <Input 
                  label="Senha"
                  value={values.password} 
                  placeholder="Escreva sua senha"
                  secureTextEntry={true}
                  onChange={handleChange('password')} 
                />
                <Helper type="error" visible={errors.password && touched.password}>
                  {errors.password}
                </Helper>
                <Input 
                  label="Confirmar senha"
                  value={values.confirmPassword} 
                  placeholder="Escreva sua senha novamente"
                  secureTextEntry={true}
                  onChange={handleChange('confirmPassword')} 
                />
                <Helper type="error" visible={errors.confirmPassword && touched.confirmPassword}>
                  {errors.confirmPassword}
                </Helper>
                <Picker 
                  ref={selectContryRef}
                  openModal={openContryModal}
                  label={contriesMap[values.country] || "País"}
                  options={[
                    { label: 'Brasil', value: 'BR' },
                  ]}
                  onSelectedOption={value => setFieldValue('country', value)}
                  errors={errors.country}
                  touched={touched.country}
                />
                <Picker 
                  ref={selectStateRef}
                  openModal={openStateModal}
                  label={statesMap[values.state] || "Estado"}
                  options={[
                    { label: "Acre", value: "AC" },
                    { label: "Alagoas", value: "AL" },
                    { label: "Amapá", value: "AP" },
                    { label: "Amazonas", value: "AM" },
                    { label: "Bahia", value: "BA" },
                    { label: "Ceará", value: "CE" },
                    { label: "Distrito Federal", value: "DF" },
                    { label: "Espírito Santo", value: "ES" },
                    { label: "Goiás", value: "GO" },
                    { label: "Maranhão", value: "MA" },
                    { label: "Mato Grosso", value: "MT" },
                    { label: "Mato Grosso do Sul", value: "MS" },
                    { label: "Minas Gerais", value: "MG" },
                    { label: "Pará", value: "PA" },
                    { label: "Paraíba", value: "PB" },
                    { label: "Paraná", value: "PR" },
                    { label: "Pernambuco", value: "PE" },
                    { label: "Piauí", value: "PI" },
                    { label: "Rio de Janeiro", value: "RJ" },
                    { label: "Rio Grande do Norte", value: "RN" },
                    { label: "Rio Grande do Sul", value: "RS" },
                    { label: "Rondônia", value: "RO" },
                    { label: "Roraima", value: "RR" },
                    { label: "Santa Catarina", value: "SC" },
                    { label: "São Paulo", value: "SP" },
                    { label: "Sergipe", value: "SE" },
                    { label: "Tocantins", value: "TO" }
                ]}
                  onSelectedOption={value => setFieldValue('state', value)}
                  errors={errors.state}
                  touched={touched.state}
                />
                <Button
                  onPress={handleSubmit}
                  variant="flat"
                  label="Cadastrar"
                  fullWidth
                />
              </>
              )}
          </Form>
        </Container>
      </Wrapper>
    </>
  )
};

export default SignUpView;