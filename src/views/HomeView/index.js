import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import { View, Text } from 'react-native';
import {Button, FAB, Portal, Provider} from 'react-native-paper';
import {BackButton} from 'react-router-native';

const HomeView = () => {
  const history = useHistory();
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenu = ({open}) =>
    setOpenMenu(open);

  return (
    <View style={{flex: 1, borderWidth: 1, borderColor: "black"}}>
      {/* Menu FAB */}
      <Provider>
        <Portal>
          <FAB.Group
            fabStyle={{backgroundColor: "#000099"}}
            open={openMenu}
            icon={openMenu ? 'close' : 'menu'}
            actions={[
              { icon: 'exit-to-app',
                label: 'Sair',
                onPress: () => history.push("/"),
                small: false,
                style: {
                  backgroundColor: "#000099"
                }
              },
              {
                icon: 'bag-personal',
                label: 'Mochila',
                onPress: () => console.log('Ir para mochila'),
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
                onPress: () => console.log('Pressed notifications'),
                small: false,
                style: {
                  backgroundColor: "#000099"
                }
              },
            ]}
            onStateChange={handleMenu}
          />
        </Portal>
      </Provider>
    </View>
  )
};

export default HomeView;