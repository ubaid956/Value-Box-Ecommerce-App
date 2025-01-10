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
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { globalStyles } from "@/Styles/globalStyles";
import CustomButton from "@/components/Buttons/CustomButton";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "expo-router";
import { signIn, selectErrorSignIn, selectToken } from "@/redux-toolkit/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const { height, width } = Dimensions.get("window");

const loginSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

const Login = () => {
  const navigation = useNavigation();
  const error = useSelector(selectErrorSignIn)
  const token = useSelector(selectToken)
  const dispatch = useDispatch()

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleSignIn = async (values) => {
    dispatch(signIn(values))
    // navigation.navigate('(tabs)')
  };

  useEffect(() => {
    if (token) {
      navigation.navigate("(tabs)");
    }
  }, [token, navigation]);

  return (
    <ScrollView style={styles.main}>
      <KeyboardAvoidingView
        style={styles.main}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150} // Adjust offset if needed
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.main}>
            <View style={styles.signin}>
              <Text style={globalStyles.mainText}>Sign In</Text>
              <Text style={globalStyles.credentialText}>
                Enter your credentials
              </Text>
            </View>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={(values) => {
                handleSignIn(values);
              }}
            >
              {(props) => (
                <View style={styles.textInput}>
                  <TextInput
                    style={globalStyles.inputField}
                    placeholder="Email"
                    placeholderTextColor={"#888"}
                    value={props.values.email}
                    onChangeText={props.handleChange("email")}
                    onBlur={props.handleBlur("email")}
                  />
                  <Text style={globalStyles.error}>
                    {props.touched.email && props.errors.email}
                  </Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      placeholder="Password"
                      style={[globalStyles.inputField, { flex: 1 }]}
                      placeholderTextColor={"#888"}
                      value={props.values.password}
                      secureTextEntry={!isPasswordVisible}
                      onChangeText={props.handleChange("password")}
                      onBlur={props.handleBlur("password")}
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
                  <Text style={globalStyles.error}>
                    {props.touched.password && props.errors.password}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Forgot")}
                  >
                    <Text style={styles.forgetText}>Forgot Password?</Text>
                  </TouchableOpacity>
                  <CustomButton title="Sign In" onPress={props.handleSubmit} />
                </View>
              )}
            </Formik>
            <Text style={[styles.signUpText, { marginTop: height * 0.06 }]}>
              or Continue With
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.lower_cont}>
          <TouchableOpacity>
            <Image
              source={require("../assets/images/google.png")}
              style={styles.icon}
            />
          </TouchableOpacity>

          <Image
            source={require("../assets/images/facebook.png")}
            style={styles.icon}
          />
        </View>
      </KeyboardAvoidingView>
      <View
        style={{
          width: width,
          justifyContent: "center",
          // backgroundColor:'black',
          alignItems: "center",
          marginTop: height * 0.15,
          flexDirection:'row'
        }}
      >
      
        <Text>
          Don't have an Account?{" "}
         
        </Text>
        <Text
            style={{ color: "#002882",fontWeight:'bold', width:100 }}
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign Up
          </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    // height: height,
    backgroundColor: "#ffffff",
  },
  signin: {
    marginTop: height * 0.1,
    marginHorizontal: width * 0.1,
    flexDirection: "column",
    height: height * 0.1,
  },
  textInput: {
    marginHorizontal: width * 0.1,
    // backgroundColor:'black',
    flexDirection: "column",
    borderRadius: 20,
    paddingTop: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    // marginBottom: height * 0.02,
  },
  eyeButton: {
    // paddingHorizontal: 10,
    position: "absolute",
    right: 10,
  },
  forgetText: {
    marginBottom: height * 0.01,
    color: "#000000",
    textAlign: "right",
  },
  signUpText: {
    textAlign: "center",
    marginTop: height * 0.01,
  },
  lower_cont: {
    width: width,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: height * 0.05,
  },
  icon: {
    width: width * 0.12,
    height: height * 0.06,
    marginHorizontal: width * 0.04,
  },
});

export default Login;
