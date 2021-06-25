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
    expired: {
      default: "",
      formatted: ""
    }
  }
}

function hasExpired(expirationDate, now = new Date()) {
  return expirationDate.getTime() < now.getTime();
}

function GetMedalView({open, marker = defaults.marker, onGetMedal, onClose, onOpenMarkerView, onNavigate}) {
  const { name, exp, urlImg, hasMedal, expired } = marker;
  const showVisitButton = hasExpired(new Date(expired.default));
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