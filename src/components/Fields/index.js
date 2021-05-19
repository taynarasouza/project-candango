import React from 'react';
import { ProgressViewIOSComponent, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { ModalSelectList } from 'react-native-modal-select-list';

import {
  Picker as PickerComp,
  PickerText,
  PickerIcon,
  PickerClose,
  Helper,
} from './styles';

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
        type="phone-pad"
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

  Picker = React.forwardRef(({
    openModal,
    label,
    options,
    onSelectedOption,
    lines = 1,
    errors,
    touched,
  }, ref) => {
    return (
      <>
        <PickerComp onPress={openModal}>
          <PickerText>{label}</PickerText>
          <PickerIcon size={20} color="#ddd" />
        </PickerComp>
        <ModalSelectList
          ref={ref}
          placeholder={"Pesquisar"}
          closeButtonComponent={<PickerClose />}
          options={options}
          onSelectedOption={onSelectedOption}
          disableTextSearch={false}
          numberOfLines={lines}
        />
        <Helper type="error" visible={errors && touched}>
          {errors}
        </Helper>
      </>
    );
  })
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