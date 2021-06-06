import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { Formik } from 'formik';
import { HelperText } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { MaterialIcons } from '@expo/vector-icons';
import { Button as ButtonPaper } from 'react-native-paper';
import ProgressCircle from 'react-native-progress-circle';

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
    contentContainerStyle: { alignItems: 'center' },
    showsVerticalScrollIndicator: false,
})`
    padding-top: 20px;
    /* margin-bottom: 60px; */
`;

export const XpCircle = styled(ProgressCircle).attrs({
    radius: 50,
    borderWidth: 8,
    color: "#3399FF",
    shadowColor: "#999",
    bgColor: "#fff"
})`
    margin: 10px;
`;

export const Image = styled.Image`
    flex:1;
    height: 100%;
    width: 100%;
    border-radius: 30px;
`;

export const Form = styled(Formik)`
`;

export const Input = styled(CustomInput)`
`;

export const PhoneNumberInput = styled(PhoneInput)``;

export const Picker = styled.TouchableOpacity`
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 15px;
    width: 280px;
    height: 50px;
    margin-top: 5px;
    align-self: center;
    border: 1px solid rgba(0, 0, 0, 0.55);
    border-radius: 3px;
`;

export const PickerText = styled.Text`
    font-size: 15px;
`;

export const PickerIcon = styled(MaterialIcons).attrs({
    name: "keyboard-arrow-down",
    size: 26,
    color: "rgba(0, 0, 0, 0.7)",
})``;

export const PickerClose = styled(MaterialIcons).attrs({
    name: "close",
    size: 35,
    color: "#000",
})``;

export const Helper = styled(HelperText)`
    text-align: right;
    width: 300px;
`;

export const Button = styled(ButtonPaper).attrs({
    contentStyle: {
        height: 50,
    }
})`
    width: 90%;
    max-width: 325px;
    height: 50px;
    /* margin: 16px 0px; */
    margin-bottom: 48px;
    border-radius: 32px;
    justify-content: center;
`;