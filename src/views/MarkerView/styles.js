import styled from 'styled-components/native';
import normalize from 'react-native-normalize';
import { LinearGradient } from 'expo-linear-gradient';
import { Button as ButtonPaper, Text } from 'react-native-paper';

export const Button = styled(ButtonPaper).attrs(props => ({
  ...props
}))`
  width: 100%;
  height: 50px;
  margin: 10px 0px;
  border-radius: 30px;
  justify-content: center;
  font-size: 16px;

  border-color: ${props => props.icon === "close" ? "rgb(255,0,0)" : "transparent"};
  border-width: ${props => props.icon === "close" ? "1px" : "0"};
`;

export const Gradient = styled(LinearGradient).attrs({
  colors: ['transparent', 'rgba(0, 0, 0, 0.8)']
})`
  height: 100%;
  justify-content: flex-end;
`;

export const Bold = styled(Text)`
  color: white; 
  font-weight: bold;
  padding: 10px 15px;
  font-size: 16px;
`;

export const Title = styled(Text)`
  font-size: 20px;
  color: white;
  font-weight: bold;
  padding-left: 15px;
`;

export const TitleDivider = styled.View`
  width: 50px;
  height: 3px;
  margin:  ${ `${normalize(12)}px` } 15px;
  background: #000099;
`;

export const Experience = styled.View`
  padding: 5px;
  padding-right: 15px;
`;

export const ExpLabel = styled(Text)`
  font-weight: bold;
  color: white;
`;

export const ExpValue = styled(Text)`
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  color: white;
`;

export const Content = styled.View`
  elevation: 5;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
  
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #FFFFFF;
  padding: 0 15px;
`;