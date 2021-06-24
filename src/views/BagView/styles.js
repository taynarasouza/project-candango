import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import { Button as ButtonPaper } from 'react-native-paper';

import normalize from 'react-native-normalize';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Scroll = styled.ScrollView.attrs({
    contentContainerStyle:{
        marginTop : 20,
        width:'100%',
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
    }
})``;

export const Loading = styled.ActivityIndicator.attrs({
    size: 'small',
    color: '#999'
})`
    margin: 30px 0;
`;

export const MedalContainer = styled.TouchableOpacity``;

export const Medal = styled.ImageBackground.attrs({
        imageStyle: { borderRadius: 1000 }
})`
    width: ${ `${normalize(90)}px` };
    height: ${ `${normalize(90)}px` };
    margin: ${ `${normalize(15)}px` };
`;

export const MedalCover = styled.View`
    flex: 1;
    border-radius: 100px;
    background: ${props => props.hasMedal ? "rgba(0, 0, 0, 0)" : "rgba(200, 200, 200, 0.7)"} ;
`;

export const MedalModal = styled(Modal)`
    flex: 1;
    width: ${ `${normalize(350)}px` };
    align-items: center;
    background: white;
    border-radius: 15px;
    position: absolute;
    top: ${ `${normalize(25, "height")}%` };
    right: -7px;
    padding: 12px;
`;

export const ModalImage = styled.Image`
    width: ${ `${normalize(90)}px` };
    height: ${ `${normalize(90)}px` };
    margin: ${ `${normalize(15)}px` };
    border-radius: 100px;
`;

export const ModalTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
`;

export const ModalDescription = styled.Text`
    font-size: 16px;
    text-align: center;
`;

export const ModalDate = styled.Text`
    font-size: 16px;
    margin: 12px 0px;
    text-align: center;
`;

export const ModalDivider = styled.View`
    width: 120px;
    height: 2px;
    margin: 8px 0px;
    background: #000099;
`;

export const CloseModal = styled(ButtonPaper).attrs({
    contentStyle: {
        height: 40,
    }
})`
    width: 150px;
    height: 40px;
    margin: 12px 0px;
    border-radius: 32px;
    justify-content: center;
`;
