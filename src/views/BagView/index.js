import React from "react";
import { Appbar, BottomNavigation, Text } from "react-native-paper";
import { useHistory } from "react-router-native";

const CircuitsView = () => <Text>Circuitos</Text>;

const MedalsView = () => <Text>Medalhas</Text>;

const InfoView = () => <Text>Informações</Text>;

export default function BagView() {
  const history = useHistory();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'circuitos', title: 'Circuitos', icon: 'information-outline' },
    { key: 'medalhas', title: 'Medalhas', icon: 'album' },
    { key: 'informacoes', title: 'Informações', icon: 'information-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    circuitos: CircuitsView,
    medalhas: MedalsView,
    informacoes: InfoView,
  });

  return (
    <>
      <Appbar.Header style={{backgroundColor: "#F5F5F5"}}>
        <Appbar.BackAction onPress={() => history.push("/home")} />
        <Appbar.Content title="Mochila" />
      </Appbar.Header>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  )
}