import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { Formik } from 'formik';
import { Avatar, HelperText } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { MaterialIcons } from '@expo/vector-icons';

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