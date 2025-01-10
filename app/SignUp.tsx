import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "@/Styles/globalStyles";
import CustomButton from "@/components/Buttons/CustomButton";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const regSchema = yup.object({
  name: yup.string().required(),
  email: yup
    .string()
    .email("invalid email format")
    .required("email is required"),
  password: yup
    .string()
    .min(8, "password must be at least 8 characters")
    .required("password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match")
    .required("confirm Password is required"),
});

const SignUp = () => {
  const navigation = useNavigation();

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSignUp = async (values) => {};

  return (
    <ScrollView style={styles.main}>
      <KeyboardAvoidingView
        style={styles.main}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150} // Adjust offset if needed
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.main}>
            <View style={globalStyles.signin_container}>
              <Text style={globalStyles.mainText}>Sign Up</Text>
              <Text style={globalStyles.credentialText}>
                Enter your credentials
              </Text>
            </View>

            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={regSchema}
              onSubmit={(values, { resetForm }) => {
                handleSignUp(values);
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                touched,
                errors,
                resetForm,
              }) => {
                useEffect(() => {
                  // Reset form when the component unmounts
                  return () => resetForm();
                }, [resetForm]);

                return (
                  <View style={styles.centerView}>
                    <TextInput
                      style={globalStyles.inputField}
                      placeholder="Name"
                      value={values.name}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                    />
                    <Text style={globalStyles.errorText}>
                      {touched.name && errors.name}
                    </Text>

                    <TextInput
                      style={globalStyles.inputField}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      placeholder="Email"
                    />
                    <Text style={globalStyles.errorText}>
                      {touched.email && errors.email}
                    </Text>

                    <View style={styles.passwordContainer}>
                      <TextInput
                        style={[globalStyles.inputField, { flex: 1 }]}
                        secureTextEntry={!isPasswordVisible}
                        placeholder="Password"
                        onBlur={handleBlur("password")}
                        value={values.password}
                        onChangeText={handleChange("password")}
                      />
                      <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={() => setPasswordVisible(!isPasswordVisible)}
                      >
                        <Ionicons
                          name={isPasswordVisible ? "eye" : "eye-off"}
                          size={24}
                          color="gray"
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={globalStyles.errorText}>
                      {touched.password && errors.password}
                    </Text>

                    <View style={styles.passwordContainer}>
                      <TextInput
                        secureTextEntry={!isConfirmPasswordVisible}
                        style={[globalStyles.inputField, { flex: 1 }]}
                        placeholder="Confirm Password"
                        onBlur={handleBlur("confirmPassword")}
                        value={values.confirmPassword}
                        onChangeText={handleChange("confirmPassword")}
                      />
                      <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={() =>
                          setConfirmPasswordVisible(!isConfirmPasswordVisible)
                        }
                      >
                        <Ionicons
                          name={isConfirmPasswordVisible ? "eye" : "eye-off"}
                          size={24}
                          color="gray"
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={globalStyles.errorText}>
                      {touched.confirmPassword && errors.confirmPassword}
                    </Text>

                    <CustomButton title="Sign up" onPress={handleSubmit} />

                    <View style={styles.signUpContainer}>
                      <Text style={styles.signUpText}>
                        Already Have an Account?{" "}
                        <Text
                          style={styles.signUpLink}
                          onPress={() => navigation.navigate("SignIn")}
                        >
                          Sign In
                        </Text>
                      </Text>
                    </View>
                  </View>
                );
              }}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  centerView: {
    borderRadius: 20,
    height: height * 0.65,
    width: width * 0.8,
    marginHorizontal: width * 0.08,
    marginTop: height * 0.01,
    paddingTop: height * 0.02,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  eyeButton: {
    position: "absolute",
    right: 10,
  },
  signUpContainer: {
    marginTop: height * 0.01,
    marginLeft: width * 0.1,
  },
  signUpText: {
    color: "#888",
    fontSize: 14,
  },
  signUpLink: {
    color: "#0C134F",
    fontWeight: "bold",
  },
});

export default SignUp;
