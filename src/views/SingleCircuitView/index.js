import React from 'react';

import { Routes } from "../../utils/constants";

import {
  Container,
  Scroll,
  Cover,
  Gradient,
  Title,
  Divider,
  Content,
  CircuitInfo,
  InfoContainer,
  Bold,
  DividerVertical,
  Icon,
  Info,
  About, 
  Description,
  Footer,
  HorizontalScroll,
  FooterContent,
  FooterDivider,
  FooterCard,
  FooterTitle,
  FooterAbout,
  FooterCover,
  Button,
} from './styles';

const SingleCircuitView = ({ navigation }) => {
  let circuit = navigation.getParam('circuit');
  let { attractions } = circuit;

  const handleStartCircuit = () => {
    navigation.navigate(Routes.Home, { attractions });
  };

  return (
    <Container>
      <Scroll>
        <Cover source={{ uri: circuit.attractions[0].urlImg }}>
          <Gradient>
            <Title>{circuit.circuitName}</Title>
            <Divider />
          </Gradient>
        </Cover>
        <Content>
          <CircuitInfo>
            <InfoContainer>
              <Icon name="place" />
              <Info><Bold>{`${circuit.attractions.length}`}</Bold> paradas</Info>
            </InfoContainer>

            <DividerVertical />

            <InfoContainer>
              <Icon name="emoji-events" />
              <Info><Bold>{`${circuit.ammountExp}`}</Bold> experiência</Info>
            </InfoContainer>
          </CircuitInfo>

          <About>Sobre o circuito</About>
          <Description>{circuit.circuitDesc}</Description>
        </Content>

        <Footer>
          <FooterAbout>Pontos turísticos</FooterAbout>

          <HorizontalScroll>
            {
              circuit.attractions.map((attraction, i) => (
                <FooterCard key={i}>
                  <FooterCover source={{ uri: attraction.urlImg }} />
                  <FooterContent>
                    <FooterDivider />
                    <FooterTitle>{attraction.name}</FooterTitle>
                  </FooterContent>
                </FooterCard>
              ))
            }
          </HorizontalScroll>
        </Footer>

        <Button
          mode="contained" 
          icon="navigation"
          onPress={handleStartCircuit}>
          Iniciar circuito
        </Button>
      </Scroll>
    </Container>
  );
}

SingleCircuitView.navigationOptions = ({ navigation }) => ({
  title: "Detalhes",
});

export default SingleCircuitView;