import { View, Text, StyleSheet,Dimensions } from 'react-native'
import React from 'react'
import Box from '../components/Box'
import CustomButton from '@/components/Buttons/CustomButton';
import { useNavigation } from 'expo-router';

const { height, width } = Dimensions.get("window");



const VerifyCode = () => {
    const navigation = useNavigation()
    const verify =()=>{
        navigation.navigate('NewPassword')
    }
    return (
        <View style={styles.main}>
            <View style={styles.content}>
                <Text style={{ fontWeight: 'bold', fontSize: 30, color: "#0C134F", }}>Check you Email</Text>
                <Text style={{ marginVertical: height * 0.02 }}>We sent a reset link to contact@dscode...com
                    enter 5 digit code that mentioned in the email</Text>
                <View style = {styles.boxes}>
                    <Box/>
                    
                </View>

                <CustomButton title="Reset Password" onPress={verify} />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',

    },
    content: {
        width: width *0.8,
        // backgroundColor:'black',
        marginHorizontal: width * 0.1,
        marginTop: height * 0.1

    },
    boxes: {
        flexDirection: 'row',
        alignContent:'center',
        alignSelf:'center'


    }
})

export default VerifyCode