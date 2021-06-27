import styled from 'styled-components/native';
import { Text, Pressable, Modal } from "react-native";
import { Button as ButtonPaper } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import normalize from 'react-native-normalize';

export const TransitionView = styled(Modal).attrs({
    animationType: "slide",
    transparent: true,
    statusBarTranslucent: true
});

export const MedalContainer = styled.TouchableOpacity``;

export const Medal = styled.ImageBackground.attrs({
        imageStyle: { borderRadius: 1000 }
})`
    width: ${ `${normalize(150)}px` };
    height: ${ `${normalize(150)}px` };
    margin-bottom: 15px;
    border-width: 3px;
    border-color: white;
    border-radius: 100px;
`;

export const MedalExp = styled(Text)`
    color: white;
`;

export const MedalCover = styled.View`
    flex: 1;
    border-radius: 100px;
`;

export const TopContainer = styled.View`
    height: 100px; 
    width: 100%; 
    flex-direction: row;
    align-items: center;
    justify-content: center
`;

export const MiddleContainer = styled.View`
    flex: 1; 
    justify-content: center;
    align-items: center;
`;

export const BottomContainer = styled.View`
    width: 100%;
`;

export const Button = styled(ButtonPaper)`
    width: 100%;
    height: 40px;
    border-radius: 30px;
    justify-content: center;

    border-color: ${props => props.mode === "outlined" ? "white" : "#000099"};
`;

export const ButtonRescued = styled(Button).attrs({
    color: "rgba(255, 215, 0, 1)"
})`
    background-color: rgba(255, 215, 0, .45);
    border-width: 1px;
    border-color: rgba(255, 215, 0, 1);
    width: 100%;
    height: 40px;
    border-radius: 30px;
    justify-content: center;
    margin-bottom: 10px;
`;

export const ModalCloseButton = styled(Pressable)`
    position: absolute;
    top: -12px;
    right: -12px;
    border-color: white;
    border-width: 1px;
    border-radius: 20px;
    width: 25px;
    height: 25px;
    justify-content: center;
    align-items: center;
`;

export const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 22px;
`;

export const ModalContent = styled.View`
    flex: 1;
    width: 100%;
    background-color: rgba(0,0,0,.85);
    padding: 35px;
    align-items: center;
`;

export const ModalTitle = styled(Text)`
    text-align: center;
    color: white;
    font-size: 20px;
`;

export const Warning = styled(Text).attrs(props => ({
    children: `Ponto turístico já visitado nas últimas 24 horas! Será liberado somente ${props.expDate || "00/00/0000"}`
}))`
    width: 100%;
    padding: 10px 10px;
    font-size: 12px;
    text-align: center;
    color: #ffffff;
    background-color: rgba(0, 0, 153, .55);
    
    border-width: 1px;
    border-color: #000099;
    border-radius: 5px;

    margin-bottom: 20px;
    line-height: 17px;
`;

// width: "100%",
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//     backgroundColor: "#000099"