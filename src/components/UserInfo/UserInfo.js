import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import CustomTextInput from "../CustomTextInput/CustomTextInput";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string().required("Mobile number is required"),
});

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const UserInfo = ({ userInfo }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>
          {userInfo.firstName} {userInfo.lastName}
        </Text>
      </View>
      <View>
        <Formik
          initialValues={{
            email: userInfo.email,
            mobile: userInfo.mobile,
            address: userInfo.address,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            touched,
            errors,
            setFieldTouched,
          }) => (
            <View>
              <CustomTextInput
                label="Email"
                placeholder="Email"
                style={styles.input}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                error={touched.email && errors.email}
              />

              <CustomTextInput
                label="Mobile"
                placeholder="Mobile"
                style={styles.input}
                value={values.mobile}
                onChangeText={handleChange("mobile")}
                onBlur={() => setFieldTouched("mobile")}
                error={touched.mobile && errors.mobile}
              />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  name: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 0,
  },
  input: {
    width: "100%",
    marginBottom: 20,
  },
});

export default UserInfo;
