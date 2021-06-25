import React, { useState } from "react";
import { Modal } from "react-native";
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
  ButtonRescued
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

function hasExpired(expDate, now = new Date()) {
  if (!expDate)
    return;
  
  return expDate.getTime() < now.getTime();
}

function GetMedalView({open, marker = defaults.marker, onGetMedal, onClose, onOpenMarkerView, onNavigate}) {
  const { name, exp, urlImg, hasMedal, expirationDate } = marker;
  const showVisitButton = hasExpired(new Date(expirationDate.default));
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
              style={{marginBottom: 40}}
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