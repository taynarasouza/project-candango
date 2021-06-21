import React, { useState, useEffect, Fragment } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Modal, ScrollView, Alert, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FAB, Portal, Provider, Button } from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import MarkerView from "../MarkerView"; 
import GetMedalView from "../GetMedalView";

import { Routes } from "../../utils/constants";
import { setUserPosition } from '../../store/modules/user/actions';
import api from "../../services/api";

import { FabPosition, FabCancel } from "./styles";

const GOOGLE_API_KEY = "AIzaSyB90RnyJ2NDSeoXAuIEGfv8viCx_BrCo28";

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.1722;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_LATITUDE = -15.793542565926458; 
const INITIAL_LONGITUDE = -47.88287557901528;
const initialRegion = {
  latitude: INITIAL_LATITUDE,
  longitude: INITIAL_LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
}

const MARKER_RADIUS = 150; // Radius in meters

function haversine_distance(mk1, mk2) {
  var R = 6371.0710; // Radius of the Earth in kilometers
  var rlat1 = mk1.latitude * (Math.PI/180); // Convert degrees to radians
  var rlat2 = mk2.latitude * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (mk2.longitude-mk1.longitude) * (Math.PI/180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return d;
}

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
  const markers = useSelector(state => state.markers.markers);
  const mapRef = React.useRef();

  const [ComponentGMV, setComponentGMV] = useState({
    open: false,
    payload: {
      name: "",
      exp: 0,
      urlImg: "http://anokha.world/images/not-found.png"
    }
  });
  const [destination, setDestination] = useState({
    // start || pause || stop
    status: "stop",
    coordinates: {
      latitude: null,
      longitude: null
    }
  });

  // Effect para resgatar a posicao do usuario 
  // e disparar a acao para salvar a posicao na store
  useEffect(() => {
    getUserPosition();    

    return () => {
      dispatch(
        setUserPosition({
          latitude: null,
          longitude: null
        })
      );
    }
  }, []);

  // useEffect(() => {

  // }, []);

  const getUserPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
          dispatch(
            setUserPosition({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            })
          );
      },
      error => Alert.alert("Position", JSON.stringify(error)),
      { 
          enableHighAccuracy: true, 
          timeout: 2000, 
          maximumAge: 3600000 
      },
    );
  }

  const _setUserPosition = e => {
    const coordinates = e.nativeEvent.coordinate;
    dispatch(setUserPosition(coordinates));
    // console.log(coordinates);
  }
  
  const [openMenu, setOpenMenu] = useState(false);
  const [modal, setModal] = useState({
    open: false,
    payload: {}
  });

  const handleMenu = ({open}) =>
    setOpenMenu(open);

  // Controller responsavel por qual acao fazer:
  // 1: destination status stop && !isNear  => Abrir MarkerView
  // 2: destination status stop && isNear   => Abrir GetMedalView
  // 3: destination status start && !isNear => Faz nada
  // 4: destination status start && isNear  => Abrir GetMedalView
  const MarkerController = (coordinates, marker) => {
    // verifica a distancia entre o usuario e o ponto turistico desejado
    // e seta o estado para informar se esta perto ou nao do ponto
    // constante distance referente a distancia do player para o ponto
    // multiplado por 1000 para conversao para metros para verificacao com a
    // constante MARKER_RADIUS
    const distance = Math.round(haversine_distance(position, coordinates) * 1000); // metros
    const isnear = (distance <= MARKER_RADIUS);
    const { status } = destination;

    // Acao 1
    if (status === "stop" && !isnear) {
      handlePressMarker(coordinates, marker);
      return;
    }
    // Acao 2 ou Acao 4
    if ((status === "stop" && isnear) || (status === "start" && isnear)) {
      setComponentGMV({
        open: true,
        payload: { marker }
      });
      return;
    }

    // console.log("-----------------");
    // console.log({
    //   coordinates,
    //   marker,
    //   destination,
    //   distance,
    //   isnear
    // });
    // console.log("-----------------\n");
  }

  const handlePressMarker = (coordinates, marker) => {
    setDestination({ 
      status: "stop", 
      coordinates
    });
    setModal({
      open: true,
      payload: marker
    });
  };

  const handleDirectUser = () => {
    setDestination(d => ({ 
      status: "start", 
      coordinates: {
        longitude: d.coordinates.longitude,
        latitude: d.coordinates.latitude
      }
    }));
    setModal(m => ({
      open: false,
      payload: m.payload 
    }));
  };

  const handleClose = () => {
    setDestination(d => ({ 
      status: "stop", 
      coordinates: {
        longitude: null,
        latitude: null
      } 
    }));
    setModal(m => ({
      open: false,
      payload: {} 
    }));
  }

  const handleReadyDirections = result => {
    mapRef.current.fitToCoordinates(
      result.coordinates,
      {
        edgePadding: {
          right: (width / 20),
          bottom: (height / 20),
          left: (width / 20),
          top: (height / 20)
        }
      }
    )

    setTimeout(() => {
      handleGoToMyPosition(0, 0);
    }, 100);
  }

  const handleCancelDestination = () => {
    mapRef.current.animateToRegion({ 
      ...destination.coordinates, 
      latitudeDelta: LATITUDE_DELTA, 
      longitudeDelta: LONGITUDE_DELTA 
    }, 1000);

    setTimeout(() => {
      setDestination({ 
        status: "stop", 
        coordinates: { 
          latitude: null, 
          longitude: null
        }
      });
    }, 150);
  }

  const handleGoToMyPosition = (latitudeDelta = LATITUDE_DELTA, longitudeDelta = LONGITUDE_DELTA) => {
    mapRef.current.animateToRegion({ 
      ...position, 
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta
    }, 1000);
  }

  const handleErrorDirections = errorMessage =>
    Alert.alert(errorMessage);

  const handleSetUserMedal = () => {
    api.post("/medals/user", { 
      attractionCode: ComponentGMV.payload.marker.codLocal 
    })
    .then(() => setComponentGMV({
      open: false,
      payload: {
        name: "",
        exp: 0,
        urlImg: "http://anokha.world/images/not-found.png"
      }
    }))
    .catch(() => setComponentGMV({
      open: false,
      payload: {
        name: "",
        exp: 0,
        urlImg: "http://anokha.world/images/not-found.png"
      }
    }))
  }

  const actions = [
    { icon: 'information',
      label: 'Informações',
      onPress: () => navigation.navigate(Routes.Info),
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
      icon: 'bag-personal',
      label: 'Mochila',
      onPress: () => navigation.navigate(Routes.Bag),
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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{...StyleSheet.absoluteFillObject}}>
          <>
            <MapView
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              // mapType={Platform.OS === "android" ? "none" : "standard"}
              initialRegion={initialRegion}
              loadingEnabled={true}
              toolbarEnabled={false}
              // minZoomLevel={0}
              maxZoomLevel={15}
              showsUserLocation={true}
              followsUserLocation={true}
              showsMyLocationButton={false}
              pitchEnabled={true}
              style={styles.mapStyle}
              onMapReady={getUserPosition}
              // onUserLocationChange={_setUserPosition}
            > 
              <Fragment key={99}>
                <Marker
                  pinColor={"blue"}
                  coordinate={{
                    latitude: -15.815580,
                    longitude: -47.982582
                  }}
                  onPress={e => {
                    const coordinates = e.nativeEvent.coordinate;
                    MarkerController(
                      coordinates,
                      {
                        "Local": {
                          "CEP": "70354-400",
                          "Endereco": "EQS 307/308, s/n, SHCS, Brasília - DF",
                          "Latitude": "-15.815580",
                          "Longitude": "-47.982582",
                        },
                        "codAttractionFather": null,
                        "codAttractionType": 1,
                        "codLocal": 99,
                        "description": "A Igreja Nossa Senhora de Fátima, também conhecida como Igrejinha da 307/308 Sul, foi o primeiro templo católico em alvenaria a ser erguido em Brasília, inaugurado em 28 de junho de 1958.",
                        "exp": 30,
                        "microAttraction": false,
                        "name": "Igreja Nossa Senhora de Fátima (Igrejinha)",
                        "urlImg": null,
                      }
                    )
                  }}
                />
                <Circle 
                  center={{
                    latitude: -15.815580, 
                    longitude: -47.982582
                  }}
                  fillColor="rgba(135,206,235, .5)"
                  strokeColor="rgba(135,206,235, .8)"
                  strokeWidth={1}
                  radius={MARKER_RADIUS}
                  zIndex={100}
                />
              </Fragment>
              {markers && markers.map((marker, i) => {
                let color = "red";
                const latitude = parseFloat(marker.Local.Latitude);
                const longitude = parseFloat(marker.Local.Longitude);

                return (
                  <Fragment key={marker.codLocal}>
                    <Marker
                      key={marker.codLocal}
                      pinColor={color}
                      coordinate={{
                        latitude,
                        longitude 
                      }}
                      onPress={e => {
                        const coordinates = e.nativeEvent.coordinate;
                        MarkerController(
                          coordinates,
                          marker
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
                      radius={MARKER_RADIUS}
                      zIndex={100}
                    />
                  </Fragment>
                )
              })}

              {destination.status === "start" && (
                <MapViewDirections
                  mode="DRIVING"
                  origin={position}
                  destination={destination.coordinates}
                  apikey={GOOGLE_API_KEY}
                  strokeWidth={4}
                  strokeColor="#000099"
                  onReady={handleReadyDirections}
                  onError={handleErrorDirections}
                />
              )}
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

        <FabPosition onPress={() => handleGoToMyPosition()} />
        {destination.status === "start" && (
          <FabCancel label="Cancelar" onPress={() => handleCancelDestination()} />
        )}
        {/* Menu FAB */}
        {destination.status !== "start" && (
          <Menu 
            open={openMenu}
            actions={actions}
            onClick={handleMenu}
          />
        )}

        <MarkerView 
          open={modal.open}
          marker={modal.payload}
          onDirectUser={handleDirectUser}
          onClose={handleClose}
        />

        {ComponentGMV.open && (
          <GetMedalView 
            open={ComponentGMV.open}
            marker={ComponentGMV.payload.marker}
            onGetMedal={handleSetUserMedal}
            onClose={() => setComponentGMV({
              open: false,
              payload: {
                name: "",
                exp: 0,
                urlImg: "http://anokha.world/images/not-found.png"
              }
            })}
          />
        )}
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