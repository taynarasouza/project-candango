import styled from 'styled-components/native';
import { Button as ButtonPaper } from 'react-native-paper';

export const Button = styled(ButtonPaper).attrs(props => ({
  ...props
}))`
  width: 100%;
  height: 50px;
  margin: 10px 0px;
  border-radius: 30px;
  justify-content: center;
  font-size: 16px;
`;