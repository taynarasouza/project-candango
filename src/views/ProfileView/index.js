import React from "react";
import { Appbar } from "react-native-paper";
import { useHistory } from "react-router-native";

export default function ProfileView() {
  const history = useHistory();

  return (
    <>
      <Appbar.Header style={{backgroundColor: "#F5F5F5"}}>
        <Appbar.BackAction onPress={() => history.push("/home")} />
        <Appbar.Content title="Perfil" />
      </Appbar.Header>
    </>
  )
}