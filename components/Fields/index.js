import React from 'react';
import { ProgressViewIOSComponent, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';

import { fade } from "../../utils";

const Input = ({props, type, placeholder, label, value, onChange}) => {
  return (
    <TextInput
      {...props}
      mode="outlined"
      label={label}
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

  EmailField = ({value, label="Email", placeholder = "Email", onChange}) => {

    return (
      <>
        <Input
          label={label}
          type="email-address"
          placeholder={placeholder}
          onChange={onChange}
        />
      </>
    )
  },

  PasswordField = ({value, label = "Senha", placeholder = "Senha", onChange}) => {
    return (
      <Input
        label={label}
        type="default"
        placeholder={placeholder}
        onChange={onChange}
      />
    )
  },

  PhoneInput = ({value, label = "Telefone", placeholder = "Telefone", onChange}) => {
    return (
      <Input
        label={label}
        type="number-pad"
        placeholder={placeholder}
        onChange={onChange}
        render={props =>
          <TextInputMask
            {...props}
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
            }}
          />
        }
      />
    )
  },

  CustomInput = ({value, label, placeholder = "Placeholder", onChange}) => {
    return (
      <Input
        label={label}
        placeholder={placeholder}
        onChange={onChange}
      />
    )
  }
;

const styles = StyleSheet.create({
  input: {
    marginTop: 15,
    // borderWidth: 1,
    // borderColor: fade("#9e9e9e", .35),
    backgroundColor: fade("#fff", .9),
    borderRadius: 10,
    width: 300,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16
  },
});