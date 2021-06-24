import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { formatRelative, addHours } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import {
  Container,
  MedalContainer,
  Medal,
  MedalCover,
  Scroll,
  MedalModal,
  ModalImage,
  ModalTitle,
  ModalDescription,
  ModalDivider,
  ModalDate,
  CloseModal,
  Loading,
} from './styles';

import api from '../../services/api';


const BagView = ({ navigation }) => {
  const [medals, setMedals ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMedal, setSelectedMedal] = useState({});

  useEffect(() => {
    async function getMedals() {
      try {
        const response = await api.get(`/medals/user`);
      
        setMedals(response.data.medals);
        setLoading(false);
      } catch (error) {
        Alert.alert('Erro');
        setLoading(false);
      }
    }
    
    getMedals();
  }, []);

  const handleMedalPress = (medal) => {
    setModalVisible(!isModalVisible);
    setSelectedMedal(medal);
  };

  const formatDate = (date) => {
    let newDate = new Date(date);
    let dateFormatted = formatRelative(addHours(newDate, 3), new Date(), { locale: ptBR });
    return `Conquistada ${dateFormatted}.`;
  }

  return (
    <Container>
      {
      loading ? 
      <Loading />
    : (
      <Scroll>
          {medals && medals.map((medal, i) => (
            <MedalContainer key={medal.id} onPress={() => handleMedalPress(medal)}>
              <Medal source={{ uri: medal.img }}>
                <MedalCover hasMedal={medal.hasMedal} />
              </Medal>
            </MedalContainer>
          ))}
      </Scroll>
      )}
      <MedalModal isVisible={isModalVisible}>
          <ModalImage source={{ uri: selectedMedal.img }}/>
          <ModalTitle> {selectedMedal.name} </ModalTitle>
          <ModalDivider />
          {
              selectedMedal.hasMedal 
                ? 
                <>
                  <ModalDate> {formatDate(selectedMedal.unlockDate1)} </ModalDate>
                </>
                : 
                <ModalDescription>
                  Visite este ponto turístico para obter a medalha.
                </ModalDescription>
          }
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