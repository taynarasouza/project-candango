import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import { View, Text } from 'react-native';
import {Button, FAB, Portal, Provider} from 'react-native-paper';
import {BackButton} from 'react-router-native';

import { Routes } from "../../utils/constants";

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

  return (
    <View style={{flex: 1, borderWidth: 1, borderColor: "black"}}>
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