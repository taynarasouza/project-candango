import React from "react";
import { StyleSheet, Modal, ScrollView, Image, View, Text, TouchableHighlight } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { useHistory } from "react-router-native";

import Description from "./description";

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



function MarkerView({open, image, name, description, onDirectUser, onClose}) {
  const history = useHistory();
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

          <View style={styles.imageContainer}>
            <Image 
              source={{
                uri: image
              }} 
              style={styles.image}/>
          </View>
          
          <View style={styles.modal}>
            
            <Local local={name} />
            
            <Description description={description} />
            
            <View style={styles.questionContainer}>
              
              <Text style={styles.label}>O que quer fazer?</Text>
              
              <View style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                
                <Button style={{width: "100%", marginBottom: 10}} icon="directions" mode="contained" onPress={() => onDirectUser()}>
                  Quero ir
                </Button>

                <Button style={{width: "100%"}} icon="directions" mode="contained" onPress={() => onClose()}>
                  Não quero ir
                </Button>

              </View>
            
            </View>

          </View>
        
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
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: -10
    },
    shadowOpacity: .3,
    shadowRadius: 5,
  },
  titleContainer: {
    padding: 5,
    width: "100%",
    marginBottom: 5
  },
  label: {
    fontSize: 24,
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
    fontSize: 18,
    textAlign: "justify"
  },
  questionContainer: {
    padding: 5,
    width: "100%",
    flex: 1
  },
  question: {
    fontSize: 18,
    paddingBottom: 10
  }
});

export default MarkerView;