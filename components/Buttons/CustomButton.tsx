import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const {height, width} = Dimensions.get('window')
const CustomButton = ({title, onPress}) => {
  return (
    <TouchableOpacity
    style={styles.btn}
    onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
        
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    btn:{
        width: width * 0.8,
        height: 55,
        backgroundColor: '#002882',
        borderRadius: 10,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        color:'white',
        alignSelf:'center'

    },
    text:{
        color: 'white',
        fontSize: 18

    }
})
export default CustomButton