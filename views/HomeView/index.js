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
      <View style={{width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", height: 95, padding: 5, backgroundColor: "#F5F5F5"}}>
        <View style={{flexGrow: 2, flexDirection: "row", justifyContent: "flex-start"}}>
          <Button onPress={() => history.goBack()}><Text>Voltar</Text></Button>
        </View>
        <Text style={{fontSize: 18, padding: 8}}>Cadastro</Text>
        <View style={{flexGrow: 2, flexDirection: "row", justifyContent: "flex-end"}}>
          <Button onPress={() => history.goBack()}><Text>Voltar</Text></Button>
        </View>
      </View>
      {/* Menu FAB */}
      <Provider>
        <Portal>
          <FAB.Group
            open={openMenu}
            icon={openMenu ? 'close' : 'plus'}
            actions={[
              { icon: 'plus', onPress: () => console.log('Pressed add') },
              {
                icon: 'star',
                label: 'Star',
                onPress: () => console.log('Pressed star'),
              },
              {
                icon: 'email',
                label: 'Email',
                onPress: () => console.log('Pressed email'),
              },
              {
                icon: 'bell',
                label: 'Remind',
                onPress: () => console.log('Pressed notifications'),
                small: false,
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