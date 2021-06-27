import React from "react";
import { StyleSheet, Modal, ScrollView, Image, View, Text, ImageBackground } from "react-native";
import { Appbar } from "react-native-paper";

import Description from "./description";
import { Button, Gradient, Bold, Experience, ExpLabel, ExpValue, Title, TitleDivider, Content, Medal, MedalIcon } from "./styles";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const StickyHeader = React.forwardRef((props, ref) => {
  const { onClose } = props;
  return (
    <Appbar.Header style={{backgroundColor: "rgba(255,255,255,.3)", position: "absolute", top: 15, zIndex: 1000}}>
      <Appbar.BackAction onPress={onClose} />
      {/* <Appbar.Content title="Perfil" /> */}
    </Appbar.Header>
  )
});

const Local = ({local}) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.label}>
        Local
      </Text>
      <Text style={styles.title}>
        {local}
      </Text>
    </View>
  )
}

const defaults = {
  marker: {
    name: "",
    description: "",
    urlImg: "",
    exp: 0,
    hasMedal: false,
    Local: {
      CEP: "",
      Endereco: ""
    }
  }
}

function MarkerView({open, marker = defaults.marker, isNear, isDirecting, onDirectUser, onClose}) {
  if (Object.keys(marker).length === 0)
    marker = defaults.marker;

  return (
    <Modal
      animationType="slide"
      // transparent={true}
      visible={open}
    >

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.centerView}>

          <ImageBackground source={{ uri: marker.urlImg }} style={{resizeMode: "cover", justifyContent: "center", height: 200, width: "100%", }}>
            <Gradient>
              {marker.hasMedal && (
                <MaterialCommunityIcons 
                  name="medal" 
                  size={24} 
                  color="gold"
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10
                  }} 
                />
              )}
              <Title>
                {marker.name}
              </Title>
              <TitleDivider />
            </Gradient>
          </ImageBackground>

          {/* <View style={styles.imageContainer}>
            <Image 
              source={{
                uri: urlImg
              }} 
              style={styles.image}
            />
          </View> */}
          
          <Content>

            <View style={styles.questionContainer}>
              <Text style={styles.label}>Endereço</Text>
              <View>
                <Text style={styles.scrollText}>
                  {marker.Local.CEP}
                </Text>
                <Text style={styles.scrollText}>
                  {marker.Local.Endereco}
                </Text>
              </View>
            </View>
            
            <Description description={marker.description} />
            
            <View style={styles.questionContainer}>
              <Text style={styles.label}>Experiência</Text>
              <View>
                <Text style={styles.scrollText}>
                  {marker.exp} pontos
                </Text>
              </View>
            </View>

            <View style={styles.questionContainer}>
              <Text style={styles.label}>O que quer fazer?</Text>
              
              <View style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                {!isNear && !isDirecting && (

                  <Button icon="directions" mode="contained" onPress={() => onDirectUser()}>
                    Quero ir
                  </Button>

                )}

                <Button icon="close" color="rgb(255,0,0)" onPress={() => onClose()}>
                  Fechar
                </Button>
              
              </View>
            
            </View>

          </Content>
        
        </View>
      
      </ScrollView>
    
    </Modal>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",  
    height: 200
  },
  image: {
    width: "100%", 
    height: "100%"
  },
  // Modal information about marker
  centerView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  modal: {
    // height: "53%",
    // flex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    // borderRadius: 10,
    padding: 10,
  },
  titleContainer: {
    padding: 5,
    width: "100%",
    marginBottom: 5
  },
  label: {
    fontSize: 20,
    color: "rgba(0,0,0,.5)",
    marginBottom: 5
  },
  title: {
    fontSize: 18,
    color: "rgba(0,0,0,.85)"
  },
  scrollView: {
    padding: 5,
    width: "100%",
    // minHeight: 300,
    // maxHeight: 400,
    borderWidth: 1,
    borderColor: "black"
  },
  scrollText: {
    fontSize: 16,
    textAlign: "justify"
  },
  questionContainer: {
    marginTop: 5,
    width: "100%",
    flex: 1
  },
  question: {
    fontSize: 18,
    paddingBottom: 10
  }
});

export default MarkerView;