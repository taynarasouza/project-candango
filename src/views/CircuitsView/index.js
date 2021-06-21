import React, { useState, useEffect } from 'react';
import api from '../../services/api';
// import { View } from 'react-native';

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

const CircuitsView = () => {
  const [circuits, setCircuits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCircuits() {
      const response = await api.get(`circuit`);

      setCircuits(response.data.circuits);
      setLoading(false);
    }
    
    getCircuits();
  }, []);

  return (
    <Container>
      {
        loading ? 
        <Loading />
      : (
      <Scroll>
        {circuits && circuits.map((circuit, i) => (
            <Card key={circuit.id}>
              <Cover source={{ uri : 'https://cultivatedculture.com/wp-content/uploads/2020/06/LinkedIn-Banner-Image-Example-of-Someone-Hiking-In-The-Mountains.png'}} />
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