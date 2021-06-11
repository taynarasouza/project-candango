import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import {
  Container,
  Medal,
  MedalCover,

} from './styles';

import api from '../../services/api';


const BagView = ({ navigation }) => {
  const [medals, setMedals ] = useState([]);

  useEffect(() => {
    async function getMedals() {
      const response = await api.get(`/medals/user`);
      
      setMedals(response.data.medals);
    }
    
    getMedals();
  }, []);

  console.log(medals);

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.view}>
          {medals && medals.map((medal, i) => (
            <Medal source={{ uri: medal.img }} key={medal.id}>
              <MedalCover hasMedal={medal.hasMedal}>

              </MedalCover>
            </Medal>
          ))}
      </ScrollView>
    </Container>
  );
}

const styles =StyleSheet.create({
      title:{
        fontSize:25,
        color:'blue'
      },

      view : {
        marginTop : 20,
        marginLeft : 20,
        width:'100%',
        // height: '100%',
        display:'flex',
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent:'flex-start',
        alignItems: "center",
        // backgroundColor: 'red',
      },
      item: {
        marginRight : 20,
        marginTop: 20,
        shadowOpacity: .8,
        shadowColor: "#9e9e9e",
        shadowRadius: 3
      }
    });

BagView.navigationOptions = ({ navigation }) => ({
  title: 'Medalhas',
});

export default BagView;