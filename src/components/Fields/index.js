import React from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { ModalSelectList } from 'react-native-modal-select-list';

import {
  InputText,
  Picker as PickerComp,
  PickerText,
  PickerIcon,
  PickerClose,
  Helper,
} from './styles';

export const CustomInput = React.forwardRef(({type, onChange, ...props}, ref) => {
  return (
    <InputText
      {...props}
      ref={ref}
      mode="outlined"
      keyboardType={type}
      autocomplete="off"
      autoCapitalize="none"
      onChangeText={text => onChange(text)}
    />
  )
});

export const

  EmailField = ({...props}) => {
    return (
      <>
        <CustomInput
          label="Email"
          placeholder = "Escreva seu email"
          type="email-address"
          {...props}
        />
      </>
    )
  },

  PasswordField = ({...props}) => {
    return (
      <CustomInput
        label = "Senha"
        type="default"
        placeholder = "Senha"
        {...props}
      />
    )
  },

  PhoneInput = ({...props }) => {
    return (
      <CustomInput
        label = "Telefone"
        type="phone-pad"
        placeholder = "Telefone"
        render={innerProps =>
          <TextInputMask
            {...innerProps}
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
            }}
          />
        }
        {...props}
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
        <Helper type="error" visible={Boolean(errors && touched)}>
          {errors}
        </Helper>
      </>
    );
  })
;