import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, ScrollView, Alert, Image, TouchableHighlight } from 'react-native';
import { FAB, Portal, Provider, Button } from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import {signOut} from '../../store/modules/auth/actions';

import MarkerView from "../MarkerView";

import { Routes } from "../../utils/constants";

const GOOGLE_API_KEY = "AIzaSyCmM8BNpCSEhtCy9NdOMeDQlwWmBSMwAfU";

const Menu = ({open, actions, onClick}) => {
  return (
    <Provider>
      <Portal>
        <FAB.Group
          fabStyle={{backgroundColor: "#000099"}}
          open={open}
          icon={open ? 'close' : 'menu'}
          actions={actions}
          onStateChange={onClick}
        />
      </Portal>
    </Provider>
  )
}

const HomeView = ({navigation}) => {
  const dispatch = useDispatch();

  let position = navigation.getParam('position');

  console.tron.log(position);
  
  const [openMenu, setOpenMenu] = useState(false);
  const [modal, setModal] = useState({
    open: false,
    title: "",
    text: ""
  });

  const handleMenu = ({open}) =>
    setOpenMenu(open);

  const handlePressMarker = (coordinates, title, text) => {
    setModal({
      open: true,
      title,
      text
    });
  };

  const handleDirectUser = () => {
    Alert.alert("Sim!");
    setModal({
      open: false,
      title: "",
      text: ""
    });
  };

  const handleClose = () => {
    Alert.alert("Não!")
    setModal({
      open: false,
      title: "",
      text: ""
    });
  }

  const actions = [
    { icon: 'exit-to-app',
      label: 'Sair',
      onPress: () => dispatch(signOut()), //history.push(Routes.Login),
      small: false,
      style: {
        backgroundColor: "#000099"
      }
    },
    {
      icon: 'bag-personal',
      label: 'Mochila',
      onPress: () => navigation.navigate(Routes.Bag),
      small: false,
      style: {
        backgroundColor: "#000099"
      }
    },
    {
      icon: 'bell',
      label: 'Notificações',
      onPress: () => console.log('Notificações'),
      small: false,
      style: {
        backgroundColor: "#000099"
      }
    },
    {
      icon: 'account',
      label: 'Perfil',
      onPress: () => navigation.navigate(Routes.Profile),
      small: false,
      style: {
        backgroundColor: "#000099"
      }
    },
  ];

  // const position = {
  //   latitude: -15.814358099371333, 
  //   longitude: -47.98246049051098
  // };

  const initialRegion = {
    latitude: -15.814358099371333,
    longitude: -47.98246049051098,
    latitudeDelta: 0.155,
    longitudeDelta: 0.155
  }

  console.log(initialRegion);

  const markers = [
    {
      id_ponto_turistico: 1, 
      geo_lat_ponto_turistico: -15.798571528520338, 
      geo_long_ponto_turistico: -47.90770454351407, 
      nme_ponto_turistico: "Parque da Cidade Sarah Kubitschek", 
      dsc_ponto_turistico: "O Parque da Cidade é um parque multiuso localizado na Asa Sul, em Brasília, no Distrito Federal. Foi fundado em 11 de outubro de 1978 e possui 420 hectares (4 200 000 m²), sendo considerado o maior parque urbano da América Latina[carece de fontes]. Trata-se de um dos principais e mais extensos centros de lazer ao ar livre da cidade, concentrando quadras de esportes, lagos artificiais, parque de diversões, centro hípico e pistas de caminhada, patinação e ciclismo. O parque é considerado patrimônio de Brasília. Originalmente recebeu o nome de Rogério Pithon Farias, um jovem - filho do então governador - que morreu em um acidente de carro.[1] Foi renomeado para Parque Dona Sarah Kubitschek em 1997.[2] O parque ganhou fama nacional por meio da música Eduardo e Mônica do grupo brasiliense Legião Urbana.[3]",
      ft_ponto_turistico: "https://lh5.googleusercontent.com/p/AF1QipPzf4mMU6p9-ciyBK79dZkaJ8XKkfBc48CQrOvf=w426-h240-k-no"
    },
  ]

  return (
    <View style={{flex: 1, borderWidth: 1, borderColor: "black"}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        // mapType={Platform.OS === "android" ? "none" : "standard"}
        initialRegion={{
          ...position,
          latitudeDelta: 0.155,
          longitudeDelta: 0.155
        }}
        loadingEnabled={true}
        toolbarEnabled={true}
        minZoomLevel={11}
        maxZoomLevel={20}
        showsUserLocation={true}
        followsUserLocation={false}
        showsMyLocationButton={false}
        pitchEnabled={true}
        style={styles.mapStyle}
      >
        {markers.map(marker => {
          let color = "red";
          const latitude = parseFloat(marker.geo_lat_ponto_turistico);
          const longitude = parseFloat(marker.geo_long_ponto_turistico);

          return (
            <Marker
              key={marker.id_ponto_turistico}
              pinColor={color}
              coordinate={{
                latitude,
                longitude 
              }}
              onPress={e => {
                const coordinates = e.nativeEvent.coordinate;
                handlePressMarker(
                  coordinates,
                  marker.nme_ponto_turistico,
                  marker.dsc_ponto_turistico
                )
              }}
            />
          )
        })}
      </MapView>
      {/* Menu FAB */}
      <Menu 
        open={openMenu}
        actions={actions}
        onClick={handleMenu}
      />

      <MarkerView 
        open={modal.open}
        name={modal.title} 
        description={modal.text}
        image={markers[0].ft_ponto_turistico}
        onDirectUser={handleDirectUser}
        onClose={handleClose}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    backgroundColor: "white",
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  mapOptionsContainer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    width: 100,
    height: 100,
    borderColor: "red",
    zIndex: 1000
  },
  disabled: {
    backgroundColor: "rgba(0,0,0,.15)"
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
    shadowColor: "rgb(0,0,0)",
    shadowOffset: {
      width: 0,
      height: -3
    },
    shadowOpacity: .65,
    shadowRadius: 2,
  },
  titleContainer: {
    padding: 5,
    width: "100%",
    marginBottom: 5
  },
  title: {
    fontSize: 24
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

HomeView.navigationOptions = ({navigation}) => ({
  title: 'Login',
  headerShown: false,
});

export default HomeView;