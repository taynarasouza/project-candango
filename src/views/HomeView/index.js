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
import { stopCircuit, visitCircuitAttraction } from '../../store/modules/circuits/actions';
import { Audio } from 'expo-av';
// import profile from '../../../assets/images/profile.png';

import { 
  FabPosition, 
  FabCancel, 
  HorizontalScroll, 
  FooterCard, 
  FooterContent, 
  FooterCover, 
  FooterDivider, 
  FooterTitle, 
  ProfileContainer, 
  ProfileAvatarXp 
} from "./styles";

const GOOGLE_API_KEY = "AIzaSyB90RnyJ2NDSeoXAuIEGfv8viCx_BrCo28";

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.2122;
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
  const circuits = useSelector(state => state.circuits.circuits);
  const mapRef = React.useRef();

  const [ComponentGMV, setComponentGMV] = useState({
    open: false,
    payload: {},
    isNear: false
  });
  const [destination, setDestination] = useState({
    // start || pause || stop
    status: "stop",
    coordinates: {
      latitude: null,
      longitude: null
    }
  });

  // Effect para atualizar o payload do GMV
  // GMV => GetMedalView
  useEffect(() => {
    if (ComponentGMV.open && Object.keys(ComponentGMV.payload).length) {
      const marker = markers.filter(marker => marker.codLocal === ComponentGMV.payload.codLocal)[0];
      setComponentGMV({
        open: true,
        payload: marker,
        isNear: true
      });
    }
  }, [markers]);

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

  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../../../assets/audios/win_medal_audio.mpeg')
    );

    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); 
        }
      : undefined;
  }, [sound]);

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
    // if (destination.status === "start") {
    //   mapRef.current.animateToRegion({ 
    //     ...coordinates, 
    //     latitudeDelta: 0, 
    //     longitudeDelta: 0 
    //   }, 500);
    // }
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
        payload: marker,
        isNear: true
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
    setModal(m => ({
      open: false,
      payload: {},
      isNear: false
    }));
  }

  const handleReadyDirections = result => {
    // mapRef.current.fitToCoordinates(
    //   result.coordinates,
    //   {
    //     edgePadding: {
    //       right: (width / 20),
    //       bottom: (height / 20),
    //       left: (width / 20),
    //       top: (height / 20)
    //     }
    //   }
    // )

    if (mapTimeout != null)
      clearTimeout(mapTimeout);

    mapTimeout = setTimeout(() => {
      // mapRef.current.animateToRegion({ 
      //   ...position, 
      //   latitudeDelta: 0.0212, 
      //   longitudeDelta: 0.0212 * ASPECT_RATIO
      // }, 1000);

      // mapRef.current.animateToViewingAngle(90, 1000);
      mapRef.current.animateCamera({ 
        center: position,
        zoom: 17,
        pitch: 0 
      }, 
      { duration: 1500 });
    }, 500);
  }

  const handleStopCircuit = (cs, id) => {
    let k = [];

    if (cs.filter(c => c.status === "start").length > 0) {
      const circuitIndex = circuits.findIndex(cc => cc.circuitId === id);
      dispatch(
        stopCircuit(circuitIndex)
      );
    }
  }

  const handleCancelDestination = () => {
    // mapRef.current.animateToRegion({ 
    //   ...destination.coordinates, 
    //   latitudeDelta: LATITUDE_DELTA, 
    //   longitudeDelta: LONGITUDE_DELTA 
    // }, 1000);

    mapRef.current.animateCamera(
      { 
        center: destination.coordinates,
        zoom: 13,
        pitch: 0 
      }, 
      { 
        duration: 1500
      }
    );

    setDestination({ 
      status: "stop", 
      coordinates: { 
        latitude: null, 
        longitude: null
      }
    });
  }

  const handleGoToMyPosition = (latitudeDelta = LATITUDE_DELTA, longitudeDelta = LONGITUDE_DELTA) => {
    mapRef.current.animateCamera({
      center: position
    });
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
    playSound();
  }

  const handlePressCard = (attraction) => {
    setDestination({
      status: "start",
      coordinates: {
        latitude: parseFloat(attraction.Local.Latitude),
        longitude: parseFloat(attraction.Local.Longitude),   
      }
    });
    // mapRef.current.animateToRegion({ 
    //   latitude: parseFloat(attraction.Local.Latitude),
    //   longitude: parseFloat(attraction.Local.Longitude), 
    //   latitudeDelta: LATITUDE_DELTA,
    //   longitudeDelta: LONGITUDE_DELTA
    // }, 1000);
  }

  let mapTimeout = null;
  const handleMapReady = () => {
    // Mapa terminou de carregar
    // - Recupera a posicao do usuario
    // - Verifica se tem timeout, se sim limpa
    // - Seta um timeout de 1s para levar o usuario
    // a regiao do DF

    getUserPosition();
    // if (mapTimeout != null)
    //   clearTimeout(mapTimeout);
    
    // mapTimeout = setTimeout(() => {
    //   // mapRef.current.animateToRegion(initialRegion, 1000);
    //   mapRef.current.animateCamera({ 
    //     center: { 
    //       latitude: INITIAL_LATITUDE, 
    //       longitude: INITIAL_LONGITUDE 
    //     },
    //     zoom: 13
    //   }, 
    //   { duration: 1500 });
    // }, 800);
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

  const isDirecting = destination.status === "start";
  const isCircuitOngoing = circuits.filter(c => c.status === "start").length > 0;
  // console.log("\n--------");
  // console.log(circuits);
  // console.log("-----------\n")

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
            // maxZoomLevel={15}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={false}
            pitchEnabled={true}
            style={styles.mapStyle}
            onMapReady={handleMapReady}
            onUserLocationChange={_setUserPosition}
            enableHighAccuracy
          >
            {isCircuitOngoing && circuits.filter(c => c.status === "start").map((circuit, i) => {
              // console.log(circuit.attractions.map(marker => marker));
              return circuit.attractions.map(marker => (
                <Fragment key={marker.codLocal}>
                  <Marker
                    pinColor="#000099"
                    coordinate={{
                      latitude: parseFloat(marker.Local.Latitude),
                      longitude: parseFloat(marker.Local.Longitude)
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
                      latitude: parseFloat(marker.Local.Latitude),
                      longitude: parseFloat(marker.Local.Longitude)
                    }}
                    fillColor="rgba(135,206,235, .5)"
                    strokeColor="rgba(135,206,235, .8)"
                    strokeWidth={1}
                    radius={MARKER_RADIUS}
                    zIndex={100}
                  />
                </Fragment>
              ))
            })}

            {!isCircuitOngoing && markers && markers.map((marker, i) => {
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

            {isDirecting && (
              <MapViewDirections
                mode="DRIVING"
                origin={position}
                destination={destination.coordinates}
                apikey={GOOGLE_API_KEY}
                strokeWidth={3}
                strokeColor="#000099"
                resetOnChange={false}
                onReady={handleReadyDirections}
                onError={handleErrorDirections}
              />
            )}
          </MapView>
        </>

        {isCircuitOngoing && circuits.filter(c => c.status === "start").map((circuit, i) => {
          return (
            <Fragment key={circuit.circuitId}>
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
              <FabCancel
                icon="stop"
                label="Parar circuito" 
                onPress={() => handleStopCircuit(circuits, circuit.circuitId)} 
              />
            </Fragment>
          )
        })}

        {/* <ProfileContainer>
          <ProfileAvatarXp
            size={50}
            percent={user.exp}
            image={profile}
          />
        </ProfileContainer> */}

        
        <FabPosition 
          onPress={() => handleGoToMyPosition()} 
          isDirecting={isDirecting} 
          isCircuiting={isCircuitOngoing} 
        />

        {!isCircuitOngoing && isDirecting && (
          <FabCancel label="Cancelar" onPress={() => handleCancelDestination()} />
        )}
        
        {/* Menu FAB */}
        {!isCircuitOngoing && !isDirecting && (
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