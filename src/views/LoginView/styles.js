import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { Formik } from 'formik';
import { TextInput, HelperText, Button as ButtonPaper } from 'react-native-paper';
import { CustomInput } from "../../components/Fields";

export const Wrapper = styled.ImageBackground.attrs({
    blurRadius: 10,
})`
    flex: 1;
`;

export const Container = styled.View`
    flex: 1;
    align-items: center;
`;

export const KeyboardView = styled.KeyboardAvoidingView.attrs({
    behavior: Platform.OS === "ios" ? "padding" : "height",
})`
    width: 100%;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0px;
`;
export const LogoContainer = styled.View`
    width: 80%;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Logo = styled.Image.attrs({
    resizeMode: 'contain',
})`
    width: 100%;
`;

export const Form = styled(Formik)``;

export const FormContainer = styled.View`
    flex: 1;
    width: 100%;
    min-height: 250px;
    max-height: 450px;
    background: rgba(255, 255, 255, 0.9);
    justify-content: center;
    align-items: center;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    box-shadow: 0px -5px 5px #000;
`;

export const Input = styled(CustomInput).attrs({
    autoCapitalize: "none",
})`
    width: 90%;
    max-width: 325px;
    height: 64px;
    font-size: 16px;
`;

export const Helper = styled(HelperText).attrs({
    type: "error"
})`
    text-align: right;
    width: 310px;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
    margin: 16px 0;
`;

export const ForgotPasswordText = styled.Text`
    font-size: 16px;
    color: rgba(0, 9, 153, 0.9);
`;

export const Button = styled(ButtonPaper)`
    width: 90%;
    max-width: 325px;
    height: 50px;
    margin: 8px 0px;
    border-radius: 32px;
    justify-content: center;
`;