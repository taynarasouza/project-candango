import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import { View, Text, StyleSheet, Dimensions, Modal, ScrollView, Alert, Image, TouchableHighlight, ImageBackground } from 'react-native';
import { FAB, Portal, Provider, Button } from 'react-native-paper';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

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

const HomeView = () => {
  const history = useHistory();
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenu = ({open}) =>
    setOpenMenu(open);

  const handlePressMarker = (coordinates, title, text) => {
    setModal({
      open: true,
      title,
      text
    });
  };

  const actions = [
    { icon: 'exit-to-app',
      label: 'Sair',
      onPress: () => history.push(Routes.Login),
      small: false,
      style: {
        backgroundColor: "#000099"
      }
    },
    {
      icon: 'bag-personal',
      label: 'Mochila',
      onPress: () => history.push(Routes.Bag),
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
      onPress: () => history.push(Routes.Profile),
      small: false,
      style: {
        backgroundColor: "#000099"
      }
    },
  ];

  const position = {
    latitude: -15.814358099371333, 
    longitude: -47.98246049051098
  };

  const initialRegion = {
    ...position,
    latitudeDelta: 0.155,
    longitudeDelta: 0.255
  }

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
        // provider={PROVIDER_GOOGLE}
        // mapType={Platform.OS === "android" ? "none" : "standard"}
        initialRegion={initialRegion}
        loadingEnabled={true}
        toolbarEnabled={true}
        minZoomLevel={11}
        maxZoomLevel={20}
        showsUserLocation={true}
        followsUserLocation={false}
        showsMyLocationButton={true}
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
    </View>
  )
};

export default HomeView;