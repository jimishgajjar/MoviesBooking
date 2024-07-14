import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
import { useStore } from "zustand";

import { addBookingToUser, updateUser } from "../services/api";
import { LoginStore } from "../store";

const TicketBookingScreen = ({ route, navigation }) => {
  const { movie } = route.params;
  const { user, setUser } = useStore(LoginStore);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleConfirmBooking = async (values) => {
    const bookingDate = new Date();
    const bookingData = {
      movie: movie,
      numberOfPeople: parseInt(values.numberOfPeople),
      numberOfChildren: parseInt(values.numberOfChildren),
      bookingDate: format(bookingDate, "dd-MM-yyyy"),
    };

    try {
      // Update the user with the new booking
      const updatedUser = {
        ...user,
        bookings: user.bookings
          ? [...user.bookings, bookingData]
          : [bookingData],
      };
      setUser(updatedUser);
      await updateUser(updatedUser);

      // Navigate to BookingsScreen or any other screen as needed
      navigation.navigate("BookingsScreen");
    } catch (error) {
      console.error("Error adding booking:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    numberOfPeople: Yup.number()
      .min(1, "Number of people must be greater than 0")
      .required("Number of people is required"),
    numberOfChildren: Yup.number()
      .min(0, "Number of children cannot be less than 0")
      .required("Number of children is required"),
  });

  return (
    <Formik
      initialValues={{ numberOfPeople: "1", numberOfChildren: "0" }}
      validationSchema={validationSchema}
      onSubmit={handleConfirmBooking}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldTouched,
        setFieldValue,
        isSubmitting,
        setSubmitting,
        validateForm,
      }) => {
        const handleFieldChange = (field) => (value) => {
          setFieldValue(field, value);
          setFieldTouched(field, true, false);
        };

        const handleFormSubmit = async () => {
          setSubmitting(true);
          const validationErrors = await validateForm();
          if (Object.keys(validationErrors).length === 0) {
            await handleSubmit();
          }
          setSubmitting(false);
        };

        return (
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <FontAwesome name="angle-left" size={24} color="#dc3558" />
              </TouchableOpacity>
              <Text style={styles.title}>Book Tickets</Text>
            </View>

            {movie && (
              <View style={styles.movieInfoContainer}>
                <Image
                  source={{ uri: movie.imageUri }}
                  style={styles.movieImage}
                />
                <Text style={styles.movieTitle}>{movie.title}</Text>
                <Text style={styles.movieDetails}>Type: {movie.type}</Text>
                <Text style={styles.movieDetails}>
                  Duration: {movie.duration}
                </Text>
                <Text style={styles.movieDetails}>
                  Language: {movie.language}
                </Text>
                <Text style={styles.movieDetails}>
                  Release Date: {movie.releaseDate}
                </Text>
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Number of People:</Text>
              <TextInput
                value={values.numberOfPeople}
                onChangeText={handleFieldChange("numberOfPeople")}
                onBlur={handleBlur("numberOfPeople")}
                keyboardType="numeric"
                style={styles.input}
              />
              {touched.numberOfPeople && errors.numberOfPeople && (
                <Text style={styles.errorText}>{errors.numberOfPeople}</Text>
              )}

              <Text style={styles.label}>Number of Children:</Text>
              <TextInput
                value={values.numberOfChildren}
                onChangeText={handleFieldChange("numberOfChildren")}
                onBlur={handleBlur("numberOfChildren")}
                keyboardType="numeric"
                style={styles.input}
              />
              {touched.numberOfChildren && errors.numberOfChildren && (
                <Text style={styles.errorText}>{errors.numberOfChildren}</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.bookButton}
              onPress={handleFormSubmit}
            >
              <Text style={styles.bookButtonText}>Confirm Booking</Text>
            </TouchableOpacity>
            {isSubmitting && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#dc3558" />
              </View>
            )}
          </View>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
  },
  movieInfoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  movieImage: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  movieDetails: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    height: 50,
    width: "100%",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  bookButton: {
    backgroundColor: "#dc3558",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    marginTop: 5,
    fontSize: 14,
    color: "red",
  },
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});

export default TicketBookingScreen;
