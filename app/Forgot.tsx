import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { globalStyles } from '@/Styles/globalStyles';
import CustomButton from '@/components/Buttons/CustomButton';
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from 'expo-router';
import { useDispatch } from 'react-redux';
import { forgot } from '../redux/auth/authSlice';

const { height, width } = Dimensions.get("window");

const forgetSchema = yup.object({
    email: yup.string().email().required("Email is required")
});


const Forgot = () => {
    const navigation = useNavigation()
    const verifyEmail = (email) => {
        console.log(email)
        // dispatch(forgot(email))
        navigation.navigate('VerifyCode')
    }
    return (
        <View style={styles.main}>
            <View style={styles.content}>
                <Text style={{ fontWeight: 'bold', fontSize: 30, color: "#0C134F",}}>Forgot Password</Text>
                <Text style={{ marginVertical: height * 0.02 }}>Please enter your email to reset the password </Text>
                <Formik
                    initialValues={{ email: "" }}
                    validationSchema={forgetSchema}
                    onSubmit={(email) => {
                        handleSignIn(email);
                    }}
                >
                    {(props) => (
                        <View>
                            <TextInput
                                style={[globalStyles.inputField,{alignSelf:'center'}]}
                                placeholder="Email"
                                placeholderTextColor={"#888"}
                                value={props.values.email}
                                onChangeText={props.handleChange("email")}
                                onBlur={props.handleBlur("email")}
                            />
                            <Text style={globalStyles.error}>
                                {props.touched.email && props.errors.email}
                            </Text>
                            <CustomButton title="Reset Password" onPress={verifyEmail} 
                            />
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white',

    },
    content: {
        width: width*0.8,
        // backgroundColor:'black',

        // justifyContent:'center',
        marginHorizontal: width * 0.1,
        // alignItems:'center',
        marginTop: height * 0.1

    }

})
export default Forgot