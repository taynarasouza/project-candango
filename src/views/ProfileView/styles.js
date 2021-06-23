import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { Formik } from 'formik';
import { HelperText, ProgressBar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { MaterialIcons } from '@expo/vector-icons';
import { Button as ButtonPaper } from 'react-native-paper';
import { ProfileXp } from '../../components/ProfileXp';

import normalize from 'react-native-normalize';

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

export const ProfileContainer = styled.View`
    padding: 0 36px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
`;

export const ProfileXpContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
`;

export const ProfileAvatarXp = styled(ProfileXp)`
    max-width: 100px;
    margin-right: 15px;
    align-items: flex-end;
`;

export const ProfileInfo = styled.View`
    flex: 1;
`;

export const ProfileName = styled.Text`
    font-weight: bold;
    font-size: 22px;
    margin-bottom: 4px;
`;

export const ProfileLevel = styled.Text`
    font-size: 18px;
`;

export const ProfileXpProgress = styled.Text`
    font-size: 14px;
    margin-left: 4px;
    margin-bottom: 3px;
    align-self: flex-end;
`;

export const ExpProgress = styled(ProgressBar).attrs({
    color: "#000099"
})`
    margin-top: 4px;
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

export const PhoneNumberInput = styled(PhoneInput)``;

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
    margin-bottom: 24px;
    border-radius: 32px;
    justify-content: center;
`;