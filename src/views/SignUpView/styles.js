import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { Formik } from 'formik';
import { Avatar, HelperText } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { 
  EmailField, 
  PasswordField, 
  PhoneInput, 
  CustomInput, 
  CustomPicker,
} from "../../components/Fields";


export const Wrapper = styled.SafeAreaView`
    height: 100%;
    width: 100%;
    flex-grow: 1;
    background: #fff;
`;

export const Container = styled(KeyboardAwareScrollView).attrs({
    behavior: Platform.OS === "ios" ? "padding" : "height",
    contentContainerStyle: { alignItems: 'center' },
    showsVerticalScrollIndicator: false,
})`
    padding-top: 20px;
    margin-bottom: 60px;
`;

export const Form = styled(Formik)`
`;

export const Input = styled(CustomInput)``;

export const PhoneNumberInput = styled(PhoneInput)``;

// export const Picker = styled(CustomPicker)``;

export const Helper = styled(HelperText)`
    text-align: right;
    width: 300px;
`;