import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const Description = ({description}) => {
  return (
    <View style={styles.descriptionView}>
      <Text style={styles.label}>
        Sobre
      </Text>
      <ScrollView style={styles.scroll}>
        <Text style={styles.scrollText}>
          {description}
        </Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 24,
    color: "rgba(0,0,0,.5)",
    marginBottom: 5
  },
  descriptionView: {
    padding: 5,
    width: "100%",
    // minHeight: 300,
    // maxHeight: 400,
  },
  scroll: {
    maxHeight: 300
  },
  scrollText: {
    fontSize: 18,
    textAlign: "justify",
    color: "rgba(0,0,0,.85)"
  }
});

export default Description;