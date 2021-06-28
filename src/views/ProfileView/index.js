import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import { showMessage, hideMessage } from "react-native-flash-message";

import {
  gendersOptions,
  gendersMap,
  contriesOptions,
  contriesMap, 
  statesOptions,
  statesMap,
} from '../../utils/pickerList';

import { updateProfileRequest } from '../../store/modules/user/actions';
import { signOutRequest } from '../../store/modules/auth/actions'

import {
  Wrapper,
  Container,
  ProfileContainer,
  ProfileXpContainer,
  ProfileAvatarXp,
  ProfileInfo,
  ProfileName,
  ProfileLevel,
  ProfileXpProgress,
  FormContainer,
  Form,
  Input,
  PhoneNumberInput,
  Helper,
  Button,
  ExpProgress,
} from './styles';

import { 
  Picker, 
} from "../../components/Fields";

import profile from '../../../assets/images/profile.png';

const ProfileView = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.user.loading);
  
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
    gender: Yup.string()
      .required("Campo obrigatório!")
      .max(1, "Apenas 2 letras."),
    phone: Yup.string()
      .required("Campo obrigatório.")
      .test("len", "Deve conter pelo menos 10 digitos.", (val) => {
        const numLenOnlyDigits = val.replace(/[^\d]/g, '').length;
        return numLenOnlyDigits >= 10;
      }),
    oldPassword: Yup.string(),
    newPassword: Yup.string().when('oldPassword', {
      is: (oldPassword) => oldPassword && oldPassword.length > 0,
      then: Yup.string()
        .min(8, ({ min }) => `A senha deve ter pelo menos ${min} caracteres.`)
        .required('Campo obrigatório'),
      otherwise: Yup.string(),
    }),
    confirmNewPassword: Yup.string()
      .when('oldPassword', {
        is: (oldPassword) => oldPassword && oldPassword.length > 0,
        then: Yup.string().required('Campo obrigatório'),
        otherwise: Yup.string(),
      })  
      .oneOf([Yup.ref('newPassword'), null], 'As senhas não conferem.'),
    state: Yup.string()
      .required("Campo obrigatório!")
      .max(2, "Apenas 2 letras."),
    country: Yup.string()
      .required("Campo obrigatório!"),
  });
  
  const handleUpdateUser = (data) => {
    dispatch(updateProfileRequest(data));
  };

  const handlePressSubmit = (handleSubmit, errors) => {
    let noErrors = 
      errors && 
      Object.keys(errors).length === 0 && 
      errors.constructor === Object;

    if (!noErrors)
      showMessage({
        message: "Existem erros no formulário",
        type: "danger",
      });

    handleSubmit();
  };

  return (
      <Wrapper>
        <Container>
          <ProfileContainer>
            <ProfileAvatarXp
              size={50}
              percent={user.exp}
              image={profile}
            />
            <ProfileInfo>
              <ProfileName>{user.name}</ProfileName>
              <ProfileXpContainer>
                <ProfileLevel>Level {user.level}</ProfileLevel>
                <ProfileXpProgress>{user.exp}/{user.levelInfo.totalExp}</ProfileXpProgress>
              </ProfileXpContainer>
              <ExpProgress progress={user.exp/100} />
            </ProfileInfo>
          </ProfileContainer>
          <Form
            validationSchema={schemaValidation}
            initialValues={{ 
              name: user.name,
              gender: user.gender,
              phone: user.phone,
              email: user.email, 
              country: user.country,
              state: user.state,
              oldPassword: "",
              newPassword: "",
              confirmNewPassword: "",
            }}
            onSubmit={values => handleUpdateUser(values)}
          >
            {({ 
              handleChange, handleSubmit, values, errors, touched, setFieldValue
            }) => (
              <FormContainer>
                <Input label="Nome" 
                  value={values.name} 
                  placeholder="Escreva seu nome" 
                  onChange={handleChange('name')}
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
                  disabled
                />
                <Helper type="error" visible={Boolean(errors.email && touched.email)}>
                  {errors.email}
                </Helper>
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
                  onPress={() => handlePressSubmit(handleSubmit, errors)}
                  mode="contained"
                  loading={loading}
                  disabled={loading || (
                      values.name == user.name &&
                      values.gender == user.gender &&
                      values.phone == user.phone &&
                      values.email == user.email &&
                      values.country == user.country &&
                      values.state == user.state &&
                      !values.oldPassword
                  )}
                >
                  Salvar
                </Button>
                <Button
                  onPress={() => dispatch(signOutRequest())}
                  color={"rgb(255, 0, 0)"}
                >
                  Sair
                </Button>
              </FormContainer>
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