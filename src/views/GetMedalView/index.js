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
  return lastVisit.setDate( lastVisit.getDate() + 1 );
}

function formatExpirationDate(d) {
  const 
    ed = new Date(_setExpirationDate(d)),
    _d = ed.getDate() < 10 ? ("0" + ed.getDate()) : ed.getDate(),
    _m = ed.getMonth() + 1 < 10 ? ("0" + (ed.getMonth() + 1)) : ed.getMonth() + 1,
    _y = ed.getFullYear(),
    _h = ed.getHours() < 10 ? ("0" + ed.getHours()) : ed.getHours(),
    _mi = ed.getMinutes() < 10 ? ("0" + ed.getMinutes()) : ed.getMinutes(),
    _s = ed.getSeconds() < 10 ? ("0" + ed.getSeconds()): ed.getSeconds();
  
  return `${_d}/${_m}/${_y} ${_h}:${_mi}:${_s}`;
}

// marker.expirationDate: representa a data da ultima visita
function GetMedalView({open, marker = defaults.marker, onGetMedal, onClose, onOpenMarkerView, onNavigate}) {
  console.log(marker);
  const { name, exp, urlImg, hasMedal, expirationDate } = marker;
  const boExpired = hasExpired(new Date(expirationDate.default));
  const showVisitButton = boExpired || boExpired == null;
  
  const expDate = (formatExpirationDate(new Date(expirationDate.default)));

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