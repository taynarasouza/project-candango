import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import api from '../../services/api';

import { Routes } from "../../utils/constants";

import {
  Container,
  Scroll,
  Card,
  Cover,
  Row,
  InfoContainer,
  Title,
  Divider,
  Arrow,
  SubTitle,
  Loading,
} from './styles';

const CircuitsView = ({ navigation }) => {
  const [circuits, setCircuits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCircuits() {
      try {
        const response = await api.get(`circuit`);

        setCircuits(response.data.circuits);
        setLoading(false);
      } catch (error) {
        Alert.alert('Erro');
        setLoading(false);
      }
    }
    
    
      getCircuits();
  }, []);

  const handlePress = (circuit) => {
    navigation.navigate(Routes.SingleCircuit, { circuit });
  };

  return (
    <Container>
      {
        loading ? 
        <Loading />
      : (
      <Scroll>
        {circuits && circuits.map((circuit, i) => (
            <Card
              key={circuit.circuitId}
              onPress={() => handlePress(circuit)}
            >
              <Cover source={{ uri : circuit.attractions[0].urlImg }} />
              <Row>
                <InfoContainer>
                  <Title>{circuit.circuitName}</Title>
                  <Divider />
                  <SubTitle>{`${circuit.attractions.length} pontos turísticos`}</SubTitle>
                </InfoContainer>
                <Arrow />
              </Row>
            </Card>
        ))}
      </Scroll>
      )}
    </Container>
  );
}

CircuitsView.navigationOptions = ({ navigation }) => ({
  title: 'Circuitos',
});

export default CircuitsView;