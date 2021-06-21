import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons'

export const Container = styled.View`
    background: rgba(0, 0, 0, 0.06);
    flex: 1;
`;

export const Scroll = styled.ScrollView``;

export const Loading = styled.ActivityIndicator.attrs({
    size: 'small',
    color: '#999'
})`
    margin: 30px 0;
`;

export const Card = styled.TouchableOpacity`
    height: 220px;
    margin: 16px;
    border-radius: 16px;
    background: white;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5);
    elevation: 8;
`;

export const Cover = styled.Image`
    width: 100%;
    height: 130px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
`;

export const Row = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    padding: 0 16px;
`;

export const Arrow = styled(MaterialIcons).attrs({
    name: "arrow-forward",
    size: 22,
    color: "rgba(0, 0, 0, 0.6)"
})``;

export const InfoContainer = styled.View`
    flex: 1;
`;

export const Title = styled.Text`
    color: #000;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: .5px;
`;

export const SubTitle = styled.Text`
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
`;

export const Divider = styled.View`
    margin: 8px 0px;
    width: 50px;
    height: 2px;
    background: #000099;
`;
