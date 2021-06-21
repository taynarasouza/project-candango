import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import { Button as ButtonPaper } from 'react-native-paper';

import normalize from 'react-native-normalize';

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

export const MedalCover = styled.View`
    flex: 1;
    border-radius: 100px;
    background: rgba(200, 200, 200, 0.95);
`;