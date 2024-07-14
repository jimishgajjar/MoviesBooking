import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import * as yup from "yup";

import Logo from "../assets/images/logo/logo.png";

import CustomTextInput from "../components/CustomTextInput/CustomTextInput";

import { loginUser } from "../services/api";
import useLoginStore from "../store/LoginStore"; // Import your Zustand store hook

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const LoginScreen = () => {
  const navigation = useNavigation();
  const setUser = useLoginStore((state) => state.setUser);

  // Initial values for Formik form
  const initialValues = {
    email: "test@gmail.com",
    password: "password",
  };

  // Validation schema for Formik form fields
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  // Function to handle form submission
  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      const { email, password } = values;
      const user = await loginUser(email, password);

      if (user) {
        setUser(user); // Update user state using Zustand
        navigation.navigate("MainTabNavigator");
      } else {
        setErrors({ login: "Invalid email or password" });
      }
    } catch (error) {
      setErrors({ login: error.message || "An error occurred" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.image} />

      <Text style={styles.title}>Let's Sign you in</Text>
      <Text style={styles.subtitle}>Welcome Back, You have been missed</Text>

      {/* Formik form for handling user input and validation */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          errors,
          isSubmitting,
        }) => (
          <>
            {/* CustomTextInput component for email input */}
            <CustomTextInput
              label="Email"
              placeholder="Email"
              iconname="email-outline"
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            {/* Display validation error for email field if touched and error exists */}
            {touched.email && errors.email && (
              <Text style={styles.validationError}>{errors.email}</Text>
            )}

            {/* CustomTextInput component for password input */}
            <CustomTextInput
              label="Password"
              placeholder="Password"
              iconname="lock-outline"
              style={styles.input}
              secureTextEntry
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
            />
            {/* Display validation error for password field if touched and error exists */}
            {touched.password && errors.password && (
              <Text style={styles.validationError}>{errors.password}</Text>
            )}

            {/* Display login error message if login fails */}
            {errors.login && (
              <Text style={[styles.validationError, styles.loginError]}>
                {errors.login}
              </Text>
            )}

            {/* Login button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      {/* Separator with 'OR' text for social login */}
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      {/* Container for social login buttons */}
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

      {/* Link to RegisterScreen */}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        <Text style={styles.registerButtonText}>
          Don't have an account?{" "}
          <Text style={styles.registerLinkText}>Register Now</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 35,
    height: screenHeight,
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
  },
  loginButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#dc3558",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  loginButtonText: {
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
  registerButton: {
    marginTop: 20,
  },
  registerButtonText: {
    fontSize: 16,
    textAlign: "center",
  },
  registerLinkText: {
    color: "#dc3558",
    fontWeight: "500",
  },
  validationError: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
  },
  loginError: {
    marginTop: 10,
  },
});

export default LoginScreen;
