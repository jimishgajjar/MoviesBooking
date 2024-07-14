import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import Icon from "react-native-vector-icons/Ionicons";

import Logo from "../assets/images/logo/logo.png";
import CustomTextInput from "../components/CustomTextInput/CustomTextInput";
import { addUser } from "../services/api";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function RegisterScreen() {
  const navigation = useNavigation();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    mobile: yup
      .string()
      .matches(/^[0-9]{10}$/, "Invalid mobile number")
      .required("Mobile Number is required"),
    password: yup.string().required("Password is required"),
  });

  const handleRegister = async (values) => {
    try {
      const response = await addUser(values);

      if (response) {
        Alert.alert("Success", "Registration successful");
        navigation.navigate("LoginScreen");
      } else {
        Alert.alert("Error", "Registration failed");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}
    >
      <Image source={Logo} style={styles.image} />

      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.subtitle}>Join us for a great experience</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          setFieldTouched,
          touched,
        }) => (
          <>
            <CustomTextInput
              label="First Name"
              placeholder="First Name"
              iconname="account-outline"
              style={styles.input}
              value={values.firstName}
              onChangeText={handleChange("firstName")}
              onBlur={() => setFieldTouched("firstName")}
              error={touched.firstName && errors.firstName}
            />
            {touched.firstName && errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}

            <CustomTextInput
              label="Last Name"
              placeholder="Last Name"
              iconname="account-outline"
              style={styles.input}
              value={values.lastName}
              onChangeText={handleChange("lastName")}
              onBlur={() => setFieldTouched("lastName")}
              error={touched.lastName && errors.lastName}
            />
            {touched.lastName && errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}

            <CustomTextInput
              label="Email"
              placeholder="Email"
              iconname="email-outline"
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
              error={touched.email && errors.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <CustomTextInput
              label="Mobile Number"
              placeholder="Mobile Number"
              iconname="phone-outline"
              style={styles.input}
              keyboardType="phone-pad"
              value={values.mobile}
              onChangeText={handleChange("mobile")}
              onBlur={() => setFieldTouched("mobile")}
              error={touched.mobile && errors.mobile}
            />
            {touched.mobile && errors.mobile && (
              <Text style={styles.errorText}>{errors.mobile}</Text>
            )}

            <CustomTextInput
              label="Password"
              placeholder="Password"
              iconname="lock-outline"
              style={styles.input}
              secureTextEntry
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={() => setFieldTouched("password")}
              error={touched.password && errors.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleSubmit}
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="logo-google" size={24} color="#DB4437" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Icon name="logo-facebook" size={24} color="#3b5998" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Icon name="logo-apple" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.loginButtonText}>
          Already have an account?{" "}
          <Text style={styles.loginLinkText}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    paddingTop: 50,
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 15,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 15,
  },
  input: {
    width: "100%",
    marginVertical: 10,
    borderColor: "#dc3558",
  },
  registerButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#dc3558",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  registerButtonText: {
    color: "white",
    fontSize: 16,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  socialButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
  },
  loginButton: {
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 16,
    textAlign: "center",
  },
  loginLinkText: {
    color: "#dc3558",
    fontWeight: "500",
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginBottom: 5,
    alignSelf: "flex-start",
  },
});
