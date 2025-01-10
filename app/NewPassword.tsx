import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from '@/Styles/globalStyles';
import { Formik } from 'formik';
import * as yup from "yup";
import CustomButton from '@/components/Buttons/CustomButton';
const { width, height } = Dimensions.get('window');

const passSchema = yup.object({
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
});

const NewPassword = () => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const updatePassword = (values) => {
        // Handle password update logic here
        console.log(values);
    };

    return (
        <View style={styles.main}>
            <View style={styles.content}>
                <Text style={{ fontWeight: 'bold', fontSize: 30, color: "#0C134F", }}>
                    Set a new Password
                </Text>
                <Text style={{ marginVertical: height * 0.02 }}>
                    Create a new password. Ensure it differs from previous ones for security.
                </Text>
                <Formik
                    initialValues={{ password: "", confirmPassword: "" }}
                    validationSchema={passSchema}
                    onSubmit={(values) => updatePassword(values)}
                >
                    {(props) => (
                        <View>
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
                            <Text style={globalStyles.errorText}>
                                {props.touched.password && props.errors.password}
                            </Text>

                            <View style={styles.passwordContainer}>
                                <TextInput
                                    secureTextEntry={!isConfirmPasswordVisible}
                                    style={[globalStyles.inputField, { flex: 1 }]}
                                    placeholder="Confirm Password"
                                    value={props.values.confirmPassword}
                                    onChangeText={props.handleChange("confirmPassword")}
                                    onBlur={props.handleBlur("confirmPassword")}
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
                                {props.touched.confirmPassword && props.errors.confirmPassword}
                            </Text>

                            <CustomButton title="Update Password" onPress={props.handleSubmit} />
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        width: width * 0.8,
        marginHorizontal: width * 0.1,
        marginTop: height * 0.1,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    eyeButton: {
        position: "absolute",
        right: 10,
      },
});

export default NewPassword;
