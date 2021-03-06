import React, { useState } from "react";
import { Modal, View } from "react-native";
import {
  Medal,
  MedalContainer,
  MedalCover,
  Button,
  TopContainer,
  MiddleContainer,
  BottomContainer,
  ModalContainer,
  ModalContent,
  ModalCloseButton,
  ModalTitle,
  MedalExp,
  ButtonRescued,
  Warning
} from './styles';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const defaults = {
  marker: {
    name: "",
    exp: 0,
    urlImg: "",
    hasMedal: false,
    expirationDate: {
      default: "",
      formatted: ""
    }
  }
}

function hasExpired(lastVisit, now = new Date()) {
  if (!lastVisit || isNaN(lastVisit))
    return;

  const expDate = _setExpirationDate(lastVisit);
  return expDate <= now.getTime();
}

function _setExpirationDate(lastVisit) {
  // Adiciona 1 dia na data
  // e retorna em milisegundos
  return lastVisit.setDate( lastVisit.getDate() + 1 );
}

// marker.expirationDate: representa a data da ultima visita
function GetMedalView({open, marker = defaults.marker, onGetMedal, onClose, onOpenMarkerView, onNavigate}) {
  const { name, exp, urlImg, hasMedal, expirationDate } = marker;
  const boExpired = hasExpired(new Date(expirationDate.default));
  const showVisitButton = boExpired || boExpired == null;
  
  const expDate = expirationDate.formatted.replace(",", " às");

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      statusBarTranslucent
    >
      <ModalContainer>
        <ModalContent>

          <TopContainer>
            <ModalCloseButton onPress={() => onClose()}>
              <MaterialCommunityIcons name="close" size={18} color="white" />
            </ModalCloseButton>
            <ModalTitle>
              {name}
            </ModalTitle>
          </TopContainer>

          <MiddleContainer>
            <Medal source={{ uri: urlImg }} hasMedal={hasMedal}>
              <MedalCover />
            </Medal>
            <MedalExp>
              Exp: {exp} pontos
            </MedalExp>
          </MiddleContainer>

          <BottomContainer>
            {!showVisitButton && (
              <Warning expDate={expDate} />
            )}
            
            {hasMedal && (
              <ButtonRescued icon="medal">
                Medalha conquistada
              </ButtonRescued>
            )}
            
            <Button 
              icon="information-outline" 
              mode="outlined"
              color="white"
              onPress={() => onOpenMarkerView()}
              style={{marginBottom: 10}}
            >
              Informações
            </Button>

            {showVisitButton && (
              <Button 
                icon="map-marker-radius" 
                mode="contained" 
                onPress={() => onGetMedal()}
              >
                Visitar ponto turístico
              </Button>
            )}
          </BottomContainer>
        </ModalContent>
      </ModalContainer>
    </Modal>
  )
}

export default GetMedalView;