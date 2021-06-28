import React, { useState, useEffect, Fragment } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Modal, ScrollView, Alert, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FAB, Portal, Provider, Button } from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import MarkerView from "../MarkerView"; 
import GetMedalView from "../GetMedalView";

import { Routes } from "../../utils/constants";
import { setUserPosition, visitAttraction } from '../../store/modules/user/actions';
import api from "../../services/api";

import { FabPosition, FabCancel, HorizontalScroll, FooterCard, FooterContent, FooterCover, FooterDivider, FooterTitle, Footer } from "./styles";

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

  const [circuit, setCircuit] = useState({
    attractions: []
  });

  useEffect(() => {
    if (("params" in navigation.state) && ("attractions" in navigation.state.params)) {
      setCircuit({ attractions: navigation.state.params.attractions });
    }

  }, [navigation.state]);

  const [ComponentGMV, setComponentGMV] = useState({
    open: false,
    payload: {}
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
  // assim que entrar na view
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
    // Verifica se mudou ou nao a posicao do usuario
    // se mudou executa o dispatch
    // se nao faz nada
    if ((coordinates.latitude === position.latitude) && (coordinates.longitude === position.longitude))
      return;

    dispatch(setUserPosition(coordinates));
    mapRef.current.animateToRegion({ 
      ...coordinates, 
      latitudeDelta: 0, 
      longitudeDelta: 0 
    }, 500);
  }
  
  const [openMenu, setOpenMenu] = useState(false);
  const [modal, setModal] = useState({
    open: false,
    payload: {},
    isNear: false
  });

  const handleMenu = ({open}) =>
    setOpenMenu(open);

  // Controller responsavel por qual acao fazer:
  // 1: destination status stop && !isNear  => Abrir MarkerView
  // 2: destination status stop && isNear   => Abrir GetMedalView
  // 3: destination status start && !isNear => Abrir MarkerView
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

    // Acao 1 ou 3
    if ((status === "stop" && !isnear) || (status === "start" && !isnear)) {
      handlePressMarker(coordinates, marker, false);
      return;
    }
    // Acao 2 ou Acao 4
    if ((status === "stop" && isnear) || (status === "start" && isnear)) {
      setComponentGMV({
        open: true,
        payload: marker
      });
      return;
    }
  }

  const handlePressMarker = (coordinates, marker, isNear) => {
    setDestination(d => ({ 
      status: d.status, 
      coordinates
    }));
    setModal({
      open: true,
      payload: marker,
      isNear
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
      payload: m.payload,
      isNear: false
    }));
  };

  const handleClose = () => {
    // setDestination(d => ({ 
    //   status: "stop", 
    //   coordinates: {
    //     longitude: null,
    //     latitude: null
    //   } 
    // }));
    setModal(m => ({
      open: false,
      payload: {},
      isNear: false
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

  const handleErrorDirections = errorMessage => {
    // Alert.alert(errorMessage);
    setDestination({
      status: "stop",
      coordinates: {
        latitude: null,
        longitude: null
      }
    });
  }

  const handleSetUserMedal = () => {
    dispatch(
      visitAttraction({
        attractionCode: ComponentGMV.payload.codLocal,
        exp: ComponentGMV.payload.exp,
        markers
      })
    );
  }

  const handlePressCard = (attraction) => {
    console.log(attraction);
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
      icon: 'medal',
      label: 'Medalhas',
      onPress: () => navigation.navigate(Routes.Bag),
      small: false,
      style: {
        backgroundColor: "#000099"
      }
    },
    {
      icon: 'map-marker-path',
      label: 'Circuitos',
      onPress: () => navigation.navigate(Routes.Circuits),
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
            onUserLocationChange={_setUserPosition}
            enableHighAccuracy
          >
            {circuit.attractions.length > 0 && circuit.attractions.map((marker, i) => {
              let color = "#000099";
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

            {circuit.attractions.length === 0 && markers && markers.map((marker, i) => {
              const latitude = parseFloat(marker.Local.Latitude);
              const longitude = parseFloat(marker.Local.Longitude);

              return (
                <Fragment key={marker.codLocal}>
                  <Marker
                    key={marker.codLocal}
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
                strokeWidth={3}
                strokeColor="#000099"
                onReady={handleReadyDirections}
                onError={handleErrorDirections}
              />
            )}
          </MapView>
        </>

        {circuit.attractions.length > 0 && (
          <>
            <HorizontalScroll>
              {circuit.attractions.map((attraction, i) => (
                <FooterCard key={i} onPress={() => handlePressCard(attraction)}>
                  <FooterCover source={{ uri: attraction.urlImg }} />
                  <FooterContent>
                    <FooterDivider />
                    <FooterTitle>{attraction.name}</FooterTitle>
                  </FooterContent>
                </FooterCard>
              ))}
            </HorizontalScroll>
            <FabCancel label="Cancelar circuito" onPress={() => setCircuit({ attractions: [] })} />
          </>
        )}

        {circuit.attractions.length === 0 && (
          <FabPosition onPress={() => handleGoToMyPosition()} />
        )}
        {destination.status === "start" && circuit.attractions.length === 0 && (
          <FabCancel label="Cancelar" onPress={() => handleCancelDestination()} />
        )}
        
        {/* Menu FAB */}
        {destination.status !== "start" && circuit.attractions.length === 0 && (
          <Menu 
            open={openMenu}
            actions={actions}
            onClick={handleMenu}
          />
        )}

        <MarkerView 
          open={modal.open}
          marker={modal.payload}
          isNear={modal.isNear}
          isDirecting={destination.status === "start"}
          onDirectUser={handleDirectUser}
          onClose={handleClose}
        />

        {ComponentGMV.open && (
          <GetMedalView 
            open={ComponentGMV.open}
            marker={ComponentGMV.payload}
            onGetMedal={handleSetUserMedal}
            onOpenMarkerView={() => {
              setModal({
                open: true,
                payload: ComponentGMV.payload,
                isNear: true
              });
            }}
            onClose={() => setComponentGMV({
              open: false,
              payload: {},
              isNear: false
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