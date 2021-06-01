import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { Formik } from 'formik';
import { TextInput, HelperText, Button as ButtonPaper } from 'react-native-paper';
import { CustomInput } from "../../components/Fields";

export const Background = styled.ImageBackground.attrs({
    blurRadius: 10,
})`
    flex: 1;
`;

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
`;

export const KeyboardView = styled.KeyboardAvoidingView.attrs({
    behavior: Platform.OS === "ios" ? "padding" : "",
})`
    flex: 1;
`;
export const LogoContainer = styled.View`
`;

export const Logo = styled.Image.attrs({
    resizeMode: 'contain',
})`
    flex: 1;
    width: 90%;
    align-self: center;
`;

export const Form = styled(Formik)``;

export const FormContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding-top: 25px;
`;

export const FormBox = styled.View`
    flex: 1;
    min-height: 250px;
    max-height: 450px;
    background: rgba(255, 255, 255, 0.9);
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

export const Button = styled(ButtonPaper).attrs({
    contentStyle: {
        height: 50,
    }
})`
    width: 90%;
    max-width: 325px;
    height: 50px;
    margin: 8px 0px;
    border-radius: 32px;
    justify-content: center;
`;