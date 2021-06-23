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

function GetMedalView({open, marker, onGetMedal, onClose, onOpenMarkerView, onNavigate}) {
  const { name = "", exp = 0, urlImg = "", hasVisited } = marker;
  // console.log(marker);
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
            <Medal source={{ uri: urlImg }} hasVisited={hasVisited}>
              <MedalCover />
            </Medal>
            {!hasVisited && (
              <MedalExp>
                Exp: {exp}
              </MedalExp>
            )}
          </MiddleContainer>

          <BottomContainer>
            <Button 
              icon="information-outline" 
              mode="outlined"
              color="white"
              onPress={() => onOpenMarkerView()}
            >
              Informações
            </Button>
            {!hasVisited ? (
              <Button 
                icon="medal" 
                mode="contained" 
                onPress={() => onGetMedal()}
              >
                Pegar medalha
              </Button>
            ) : (
              <ButtonRescued icon="medal">
                Medalha resgatada
              </ButtonRescued>
              
            )}
          </BottomContainer>
        </ModalContent>
      </ModalContainer>
    </Modal>
  )
}

export default GetMedalView;