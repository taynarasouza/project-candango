import React from 'react';
import { ProgressViewIOSComponent, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInputMask } from 'react-native-masked-text';

import { fade } from "../../utils";

const Input = ({render, type, placeholder, label, value, onChange, style, secureTextEntry}) => {
  return (
    <TextInput
      render={render} //Para fazer a mask funcionar
      mode="outlined"
      label={label}
      keyboardType={type}
      placeholder={placeholder}
      style={{...styles.input, ...style}}
      autocomplete="off"
      autoCapitalize="none"
      onChangeText={text => onChange(text)}
      secureTextEntry={secureTextEntry}
    />
  )
};

export const

  EmailField = ({value, label="Email", placeholder = "Escreva seu email", onChange, style}) => {

    return (
      <>
        <Input
          style={style}
          label={label}
          type="email-address"
          placeholder={placeholder}
          onChange={onChange}
        />
      </>
    )
  },

  PasswordField = ({value, label = "Senha", placeholder = "Senha", onChange, style}) => {
    return (
      <Input
        style={style}
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

  CustomInput = ({secureTextEntry, type, value, label, placeholder = "Placeholder", onChange}) => {
    return (
      <Input
        type={type}
        label={label}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        onChange={onChange}
      />
    )
  },

  CustomPicker = ({
    value,
    items,
    open,
    setOpen,
    setValue,
    setItems,
    label,
    placeholder = "Placeholder",
    onChange
  }) => {
    return (
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
    );
  }
;

const styles = StyleSheet.create({
  input: {
    // marginTop: 15,
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