import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Button = ({variant, label, spaceTop, fullWidth, pathTo, onPress}) => {
  let _styleText = [styles.text];
  let _styleRoot = [styles.button];

  if (spaceTop)
    _styleRoot.push(styles.spaceTop);

  if (variant === "flat") {
    _styleRoot.push(styles.flat);
    _styleText.push(styles.text);
  }

  if (variant === "link") {
    _styleRoot.push(styles.link);
    _styleText.push(styles.linkText);
  }

  if (fullWidth)
    _styleRoot.push(styles.fullWidth);

  const handlePress = () => {
    if (pathTo) {
      onPress(pathTo);
      return;
    }

    onPress();
  };

  return (
    <TouchableOpacity style={_styleRoot} onPress={handlePress}>
      <Text style={_styleText}>
        {label}
      </Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  button: {
    minWidth: 150,
    height: 50,
    padding: 8,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 35,
  },
  fullWidth: {
    width: 300
  },
  flat: {
    backgroundColor: "#000099",
  },
  spaceTop: {
    marginTop: 15
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16
  },
  linkText: {
    color: "#000099"
  }
});

export default Button;