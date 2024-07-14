import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const CustomTextInput = ({
  label,
  placeholder,
  iconname,
  style,
  readOnly,
  ...rest
}) => {
  return (
    <TextInput
      mode="outlined"
      label={label}
      placeholder={placeholder}
      left={iconname ? <TextInput.Icon icon={iconname} /> : null}
      style={[styles.input, style, readOnly ? styles.readOnlyInput : null]}
      editable={!readOnly}
      theme={{
        colors: { primary: "#dc3558", underlineColor: "transparent" },
      }}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    marginVertical: 10,
  },
  readOnlyInput: {
    backgroundColor: "#f0f0f0",
    opacity: 0.6,
  },
});

export default CustomTextInput;
