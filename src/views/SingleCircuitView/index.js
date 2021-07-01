import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { startCircuit, continueCircuit } from '../../store/modules/circuits/actions';
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
  const dispatch = useDispatch();
  let circuits = useSelector(state => state.circuits.circuits);
  let circuit = navigation.getParam('circuit');
  let { attractions } = circuit;

  const a = circuits.filter(c => c.circuitId === circuit.circuitId);

  /**
   * Situacoes para verificar o circuito:
   * 1: Nao tem circuitos
   * 2: Tem circuitos mas nao tem esse circuito na memoria
   * 3: Tem circuits e tem esse circuito na memoria
   */
  const handleStartCircuit = () => {
    // let c = circuits;
    let r = [];
    let k = circuit;
    console.log("\n---------");
    if (circuits.length && circuits.filter(cc => cc.circuitId === circuit.circuitId).length) {
      console.log("Já comecei esse circuito");
      const circuitIndex = circuits.findIndex(cc => cc.circuitId === circuit.circuitId);
      dispatch(continueCircuit(circuitIndex));
    } else if (circuits.length) {
      console.log("Ja comecei um circuito mas nao foi esse");
      k.status = "start";
      k.attractions = circuit.attractions.map(attraction => ({ ...attraction, isVisited: false }));
      dispatch(startCircuit(k));
    } else {
      console.log("Sem circuito");
      k.status = "start";
      k.attractions = k.attractions.map(attraction => ({ ...attraction, isVisited: false }));
      dispatch(startCircuit(k));
    }
    // console.log(r);
    console.log("----------\n");
    // dispatch(
    //   startCircuit(r)
    // );
    navigation.navigate(Routes.Home);
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
          onPress={handleStartCircuit}
          disabled={a.length > 0 && (a[0].attractions.filter(attraction => attraction.hasVisited).length === attractions.length)}
        >
          {a.length > 0 ? "Continuar circuito" : "Iniciar circuito"}
        </Button>
      </Scroll>
    </Container>
  );
}

SingleCircuitView.navigationOptions = ({ navigation }) => ({
  title: "Detalhes",
});

export default SingleCircuitView;