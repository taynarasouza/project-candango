import styled from 'styled-components/native';
import { FAB } from 'react-native-paper';
import { TouchableHighlight } from 'react-native';

export const Footer = styled.View`
  position: absolute; 
  bottom: 5px;
  left: 15px;
  right: 75px;

  flex-direction: column;
  align-items: flex-end;

  border-width: 1px;
  border-color: black;
`;

export const FabPosition = styled(FAB).attrs(props => ({
  small: true,
  icon: "crosshairs-gps",
  ...props
}))`
  background-color: #F5F5F5;
  margin: 16px;

  position: absolute;
  bottom: 8px;
  right: ${props => {
    if (props.isCircuiting)
      return "195px";
    if (props.isDirecting)
      return "155px";
    return "75px";
  }};
`;

export const FabCancel = styled(FAB).attrs(props => ({
  icon: props.icon ? props.icons : "close",
  label: "Cancelar circuito",
  ...props
}))`
  background-color: #B71C1C;
  margin: 16px;
  border-radius: 50px;

  position: absolute;
  bottom: 4px;
  right: 0;
  z-index: 0;
`;

export const HorizontalScroll = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
      flexDirection: "row",
      padding: 16,
  }
})`
  position: absolute;
  bottom: 70px;
`;

export const FooterCard = styled.TouchableOpacity`
    background: #fff;
    height: 155px;
    width: 155px;
    margin-right: 15px;
    border-radius: 16px;
    elevation: 5;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.5);
`;

export const FooterCover = styled.Image`
    width: 100%;
    height: 50%;
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