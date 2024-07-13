import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const CustomTextInput = ({ label, placeholder, iconname, style, ...rest }) => {
  return (
    <TextInput
      mode="outlined"
      label={label}
      placeholder={placeholder}
      left={iconname ? <TextInput.Icon icon={iconname} /> : null}
      style={[styles.input, style]}
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
});

export default CustomTextInput;
