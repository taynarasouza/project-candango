import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { Formik } from 'formik';
import { TextInput, HelperText, Button as ButtonPaper } from 'react-native-paper';

export const Wrapper = styled.ImageBackground.attrs({
    blurRadius: 10,
})`
    flex: 1;
`;

export const Container = styled.KeyboardAvoidingView.attrs({
    behavior: Platform.OS === "ios" ? "padding" : "height",
})`
    flex: 1;
    align-items: center;
    justify-content: space-between;
`;
export const LogoContainer = styled.View`
    width: 100%;
    min-height: 300px;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
`;

export const Logo = styled.Image``;

export const Form = styled(Formik)`
    flex: 1;
`;

export const FormContainer = styled.View`
    padding: 30px 0;
    width: 100%;
    background: rgba(255, 255, 255, .65);
    justify-content: center;
    align-items: center;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    box-shadow: 0px -5px 5px #000;
`;

export const Input = styled(TextInput).attrs({
    autoCapitalize: "none",
})`
    width: 325px;
    height: 60px;
    font-size: 16px;
`;

export const Helper = styled(HelperText).attrs({
    type: "error"
})`
    text-align: right;
    width: 350px;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
    margin: 10px 0;
`;

export const ForgotPasswordText = styled.Text`
    font-size: 15px;
    color: rgba(0, 9, 153, 0.9);
`;

export const Button = styled(ButtonPaper).attrs({
    contentStyle: {
        height: 50,
        width: 325,
    }
})`
    margin: 10px 0px;
    border-radius: 30px;
    justify-content: center;
`;