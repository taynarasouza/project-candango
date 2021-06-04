import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { FAB, Portal, Provider, Button } from 'react-native-paper';
import {useDispatch } from 'react-redux';

import {signOut} from '../../store/modules/auth/actions';

import { Routes } from "../../utils/constants";

const Menu = ({open, actions, onClick}) => {
  return (
    // <Provider>
      <Portal>
        <FAB.Group
          fabStyle={{backgroundColor: "#000099"}}
          open={open}
          icon={open ? 'close' : 'menu'}
          actions={actions}
          onStateChange={onClick}
        />
      </Portal>
    // </Provider>
  )
}

const TestView = ({navigation}) => {
  const dispatch = useDispatch();

  const [openMenu, setOpenMenu] = useState(false);

  const handleMenu = ({open}) =>
    setOpenMenu(open);

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

  return (
    <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    }}
    >
            {/* <Text>Tela de teste, sem o mapa.</Text>
            <Button
                mode="contained"
                onPress={() => navigation.navigate(Routes.Home)}
                disabled={true}
            >
                Ir para tela do mapa (ainda não funcional)
            </Button> */}
      <Menu 
        open={openMenu}
        actions={actions}
        onClick={handleMenu}
      />
    </View>
  )
};

TestView.navigationOptions = ({navigation}) => ({
  title: 'TestView',
  headerShown: false,
});

export default TestView;