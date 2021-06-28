import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { Formik } from 'formik';
import { HelperText, ProgressBar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Button as ButtonPaper } from 'react-native-paper';
import { ProfileXp } from '../../components/ProfileXp';

import { 
  PhoneInput, 
  CustomInput, 
} from "../../components/Fields";


export const Wrapper = styled.SafeAreaView`
    flex: 1;
    background: #fff;
`;

export const Container = styled(KeyboardAwareScrollView).attrs({
    behavior: Platform.OS === "ios" ? "padding" : "height",
    showsVerticalScrollIndicator: false,
})`
    padding-top: 20px;
`;

export const FormContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding-top: 12px;
`;

export const Form = styled(Formik)`
`;

export const Input = styled(CustomInput)`
`;

export const Helper = styled(HelperText)`
    text-align: right;
    width: 300px;
`;

export const Button = styled(ButtonPaper).attrs({
    contentStyle: {
        height: 50,
    },
})`
    width: 90%;
    max-width: 325px;
    height: 50px;
    margin-top: 32px;
    margin-bottom: 24px;
    border-radius: 32px;
    justify-content: center;
`;