import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';

import {
  gendersOptions,
  gendersMap,
  contriesOptions,
  contriesMap, 
  statesOptions,
  statesMap,
} from '../../utils/pickerList';

import {signUpRequest} from '../../store/modules/auth/actions';

import {
  Wrapper,
  Container,
  Form,
  Input,
  PhoneNumberInput,
  Helper,
  Button,
  ProfileContainer,
  ProfileAvatarXp,
  ProfileInfo,
  ProfileName,
  ProfileXpContainer,
  ProfileLevel,
  ProfileXpProgress,
} from './styles';

import { 
  Picker, 
} from "../../components/Fields";
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';

const ProfileView = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.profile);
  
  console.log(user);

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
    dispatch(signUpRequest(name, gender, phone, email, password, state, country));
  }

  return (
      <Wrapper>
        <Container>
          <ProfileContainer>
            <ProfileAvatarXp
              size={50}
              percent={30}
              imageUrl={'https://randomuser.me/api/portraits/lego/0.jpg'}
            />
            <ProfileInfo>
              <ProfileName>{user.nome}</ProfileName>
              <ProfileXpContainer>
                <ProfileLevel>Level {user.level}</ProfileLevel>
                <ProfileXpProgress>{'30' || user.quantidadeExpAtual}/100</ProfileXpProgress>
              </ProfileXpContainer>
            </ProfileInfo>
          </ProfileContainer>
          <Form
            validationSchema={schemaValidation}
            initialValues={{ 
              name: user.nome,
              gender: user.genero,
              phone: user.telefone,
              email: user.email, 
              country: user.pais,
              state: user.estado,
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
  )
};

ProfileView.navigationOptions = ({navigation}) => ({
  title: 'Perfil',
});

export default ProfileView;