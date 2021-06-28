import styled from 'styled-components/native';

import normalize from 'react-native-normalize';

export const Container = styled.View`
    /* flex: 1; */
`;

export const Avatar = styled.Image.attrs({
    // resizeMode: "contain",
    // borderRadius: "50%",
})`
    width: ${ `${normalize(100)}px` };
    height: ${ `${normalize(100)}px` };
    border-width: 5px;
    border-color: rgba(0, 0, 153, 0.8);
    border-radius: ${ `${normalize(50)}px` };
`;
