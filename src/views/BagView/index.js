import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";

import {
  Container,
  MedalContainer,
  Medal,
  MedalCover,
  Scroll,
  MedalModal,
  ModalMedalImage,
  ModalMedalDescription,
  CloseModal,
} from './styles';

import api from '../../services/api';


const BagView = ({ navigation }) => {
  const [medals, setMedals ] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMedal, setSelectedMedal] = useState({});

  useEffect(() => {
    async function getMedals() {
      const response = await api.get(`/medals/user`);
      
      setMedals(response.data.medals);
    }
    
    getMedals();
  }, []);

  const handleMedalPress = (medal) => {
    setModalVisible(!isModalVisible);
    setSelectedMedal(medal);
  };

  console.log(medals);

  return (
    <Container>
      <Scroll>
          {medals && medals.map((medal, i) => (
            <MedalContainer key={medal.id} onPress={() => handleMedalPress(medal)}>
              <Medal source={{ uri: medal.img }}>
                <MedalCover hasMedal={medal.hasMedal} />
              </Medal>
            </MedalContainer>
          ))}
      </Scroll>
      <MedalModal isVisible={isModalVisible}>
          <ModalMedalImage source={{ uri: selectedMedal.img }}/>
          <ModalMedalDescription>
            {selectedMedal.name}
          </ModalMedalDescription>
          <CloseModal
            mode="contained" 
            onPress={() => 
            setModalVisible(false)}>
            Fechar
          </CloseModal>
      </MedalModal>
    </Container>
  );
}

BagView.navigationOptions = ({ navigation }) => ({
  title: 'Medalhas',
});

export default BagView;