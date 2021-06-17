import styled from 'styled-components/native';
import { FAB } from 'react-native-paper';
import { TouchableHighlight } from 'react-native';

export const FabPosition = styled(FAB).attrs(props => ({
  small: true,
  icon: "crosshairs-gps",
  ...props
}))`
  background-color: #F5F5F5;
  margin: 16px;

  position: absolute;
  bottom: 8px;
  right: 85px;
`;

export const FabCancel = styled(FAB).attrs(props => ({
  icon: "close",
  label: "Cancelar circuito",
  ...props
}))`
  background-color: #B71C1C;
  margin: 16px;
  border-radius: 50px;

  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 0;
`;