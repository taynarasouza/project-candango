import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import normalize from 'react-native-normalize';
import { MaterialIcons } from '@expo/vector-icons';
import { Button as ButtonPaper } from 'react-native-paper';

export const Container = styled.View`
    flex: 1;
`;

export const Scroll = styled.ScrollView``;

export const Cover = styled.ImageBackground`
    height: ${ `${normalize(150, "height")}px` };
    justify-content: flex-end;
`;

export const Gradient = styled(LinearGradient).attrs({
    colors: ['transparent', 'rgba(0, 0, 0, 0.8)']
})`
    height: 100%;
    justify-content: flex-end;
`;

export const Title = styled.Text`
    color: #fff;
    font-size: ${ `${normalize(24)}px` };
    font-weight: bold;
    padding-left: 16px;
`;

export const Divider = styled.View`
    width: 50px;
    height: 3px;
    margin:  ${ `${normalize(12)}px` } 16px;
    background: #000099;
`;

export const Content = styled.View`
    background: #fff;
    padding: 16px;
    elevation: 5;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const CircuitInfo = styled.View`
    flex-direction: row;
    margin-bottom: 8px;
`;

export const About = styled.Text`
    font-weight: bold;
    margin-bottom: 6px;
`;

export const Description = styled.Text`
    color: #000;
`;

export const InfoContainer = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 8px;
`;

export const DividerVertical = styled.View`
    height: 90%;
    width: 2px;
    margin: 0 5px;
    background: rgba(0, 0, 0, 0.2);
    align-self: center;
`;

export const Icon = styled(MaterialIcons).attrs({
    size: 25,
    color: "#000099",
})`
    margin-right: 5px;
`;

export const Info = styled.Text`
    flex-wrap: wrap;
    color: rgba(0, 0, 0, 0.5);
`;

export const Bold = styled.Text`
    font-weight: bold;
    font-size: 18px;
    color: #000;
`;

export const Footer = styled.View`
    /* padding: 16px; */
`;

export const FooterAbout = styled.Text`
    font-weight: bold;
    margin-top: 16px;
    padding-left: 16px;
`;

export const HorizontalScroll = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: {
        flexDirection: "row",
        padding: 16,
    }
})``;

export const FooterCard = styled.View`
    background: #fff;
    height: 175px;
    width: 175px;
    margin-right: 15px;
    border-radius: 16px;
    elevation: 5;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.5);
`;

export const FooterCover = styled.Image`
    width: 100%;
    height: 60%;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
`;

export const FooterContent = styled.View`
    padding: 8px 16px;
`;

export const FooterDivider = styled.View`
    width: 60px;
    margin: 8px 0px;
    height: 2px;
    background: #009;
`;

export const FooterTitle = styled.Text.attrs({
    numberOfLines: 2,
})`
    font-size: 12px;
`;

export const Button = styled(ButtonPaper).attrs({
    contentStyle: {
        height: 40,
    }
})`
    height: 40px;
    margin: 15px;
    border-radius: 32px;
    justify-content: center;
`;
