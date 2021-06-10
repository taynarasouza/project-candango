import React, { useState, useEffect, Fragment } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Modal, ScrollView, Alert, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FAB, Portal, Provider, Button } from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';

import {signOut} from '../../store/modules/auth/actions';

import MarkerView from "../MarkerView";

import { Routes } from "../../utils/constants";
import { setUserPosition } from '../../store/modules/user/actions';

const GOOGLE_API_KEY = "AIzaSyB90RnyJ2NDSeoXAuIEGfv8viCx_BrCo28";

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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
  const position = useSelector(state => state.user.position);

  // Effect para resgatar a posicao do usuario 
  // e disparar a acao para salvar a posicao na store
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
          dispatch(setUserPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
      },
      error => Alert.alert("Position", JSON.stringify(error)),
      { 
          enableHighAccuracy: true, 
          timeout: 2000, 
          maximumAge: 3600000 
      },
    );

    return () => {
      dispatch(setUserPosition({
        latitude: null,
        longitude: null
      }));
    }
  }, []);
  
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
      onPress: () => navigation.navigate(Routes.NotifyView),
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
    ...position,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{...StyleSheet.absoluteFillObject}}>
        {position.latitude != null && position.longitude != null && (
          <>
            <MapView
              provider={PROVIDER_GOOGLE}
              // mapType={Platform.OS === "android" ? "none" : "standard"}
              initialRegion={initialRegion}
              loadingEnabled={true}
              toolbarEnabled={false}
              minZoomLevel={5}
              maxZoomLevel={15}
              showsUserLocation={true}
              followsUserLocation={true}
              showsMyLocationButton={false}
              pitchEnabled={true}
              style={styles.mapStyle}
            >
              {markers.map(marker => {
                let color = "red";
                const latitude = parseFloat(marker.geo_lat_ponto_turistico);
                const longitude = parseFloat(marker.geo_long_ponto_turistico);

                return (
                  <Fragment key={marker.id_ponto_turistico}>
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
                    <Circle 
                      center={{
                        latitude,
                        longitude 
                      }}
                      fillColor="rgba(135,206,235, .5)"
                      strokeColor="rgba(135,206,235, .8)"
                      strokeWidth={1}
                      radius={250}
                      zIndex={99999999999999999999999999999999999}
                    />
                  </Fragment>
                )
              })}
            </MapView>
            {/* <View style={{position: "absolute", left: 0, right: 0, top: 80, display: "flex", alignItems: "center", justifyContent: "center"}}>
              <View style={{backgroundColor: "white", borderRadius: 30, width: width - 80, shadowColor: "rgba(0,0,0,.4)", shadowOpacity: .8, shadowRadius: 6, shadowOffset: { width: 0, height: 0}, height: 45, padding: 10, display: "flex", alignItems: "center", justifyContent: "center"}}>
                <TextInput 
                  placeholder="Pesquisar localização"
                  style={{width: "100%", paddingHorizontal: 10, fontSize: 16}}
                />
              </View>
            </View> */}
          </>
        )}
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
    </TouchableWithoutFeedback>
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
    ...StyleSheet.absoluteFillObject,
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