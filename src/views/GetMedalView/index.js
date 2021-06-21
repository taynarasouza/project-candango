import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions } from "react-native";
import {
  Medal,
  MedalContainer,
  MedalCover,
} from './styles';

function GetMedalView({open, marker, onGetMedal, onClose}) {
  const { name, exp, urlImg } = marker;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{height: 100, width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <Text style={styles.modalText}>{name}</Text>
            <Pressable
              style={{position: "absolute", top: -12, right: -12, borderColor: "white", borderWidth: 1, borderRadius: 20, width: 25, height: 25, justifyContent: "center", alignItems: "center"}}
              onPress={() => onClose()}
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
          </View>
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <MedalContainer>
              <Medal source={{ uri: urlImg }}>
                <MedalCover />
              </Medal>
            </MedalContainer>
            <Text style={{color: "white"}}>Exp: {exp}</Text>
          </View>
          <View style={{height: 50, width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <Pressable
              style={styles.button}
              onPress={() => onGetMedal()}
            >
              <Text style={styles.textStyle}>Pegar medalha</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: "100%",
    height: Dimensions.get("window").height,
    backgroundColor: "rgba(0,0,0,.85)",
    padding: 35,
    alignItems: "center",
  },
  button: {
    width: "100%",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#000099"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    // marginBottom: 15,
    textAlign: "center",
    color: "white",
    fontSize: 20
  }
});

export default GetMedalView;