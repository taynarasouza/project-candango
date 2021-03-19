import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const Input = ({type, placeholder, value, onChange}) => {
  return (
    <TextInput
      keyboardType={type}
      placeholder={placeholder}
      style={styles.input}
      autocomplete="off"
      autoCapitalize="none"
      onChangeText={text => onChange(text)}
    />
  )
};

export const

  EmailField = ({value, placeholder = "Email", onChange}) => {
    return (
      <Input
        type="email-address"
        placeholder={placeholder}
        onChange={onChange}
      />
    )
  },

  PasswordField = ({value, placeholder = "Senha", onChange}) => {
    return (
      <Input
        type="default"
        placeholder={placeholder}
        onChange={onChange}
      />
    )
  }
;

const styles = StyleSheet.create({
  input: {
    marginBottom: 35,
    borderWidth: 1,
    borderColor: "#000099",
    backgroundColor: "rgba(0,0,0,.025)",
    borderRadius: 10,
    width: 300,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16
  },
});