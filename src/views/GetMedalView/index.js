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
  MedalExp
} from './styles';
import { MaterialCommunityIcons } from "@expo/vector-icons";

function GetMedalView({open, marker, onGetMedal, onClose, onOpenMarkerView}) {
  const { name = "", exp = 0, urlImg = "" } = marker;
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
            <MedalContainer>
              <Medal source={{ uri: urlImg }}>
                <MedalCover />
              </Medal>
            </MedalContainer>
            <MedalExp>
              Exp: {exp}
            </MedalExp>
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

            <Button 
              icon="medal" 
              mode="contained" 
              onPress={() => onGetMedal()}
            >
              Pegar medalha
            </Button>
          </BottomContainer>
        </ModalContent>
      </ModalContainer>
    </Modal>
  )
}

export default GetMedalView;