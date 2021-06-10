import React, { useEffect, useState } from "react";
import { View, StyleSheet, } from "react-native";
import {
  Text,
  Paragraph,
  Title,
  Surface
 } from "react-native-paper";

const InfoView = () =>  {
 
    return (
        <View style={styles.container}>
            <Surface style={styles.surface}>
                <Title style={styles.titleVersion}>Versão </Title>
                <Paragraph style={styles.descVersion}>1.0</Paragraph>

                <Title style={styles.titleVersion}>Email </Title>
                <Paragraph style={styles.descVersion}>candangoapp@gmail.com </Paragraph>
            </Surface>
        </View>
    );
  };
  
  /*------------------------------------STYLES ----------------------------------------*/
const styles =StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        justifyContent:"center" , 
        padding:10
    },
    titleVersion: {
        fontSize:15, 
        textAlign:'center', 
        fontStyle:'italic', 
        color:'#808080'
    },
    descVersion:{
        fontSize:20 , 
        textAlign:'center', 
        color:'#4F4F4F'
    },
    surface: {  
        height: 200,
        width: '80%',
        justifyContent: 'center',
        elevation: 5,
        borderRadius: 20
    },
});

InfoView.navigationOptions = ({ navigation }) => ({
  title: 'Informações',
});

export default InfoView;