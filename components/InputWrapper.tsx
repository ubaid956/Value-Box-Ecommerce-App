import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const {height, width} = Dimensions.get('window')

const InputWrapper = () => {
  return (
    <View style={styles.wrapper}>
        
    </View>
      
    
  )
}

const styles = StyleSheet.create({
    wrapper:{
        width: width*0.8,
        height: height*0.08,
        backgroundColor:'white'
        // backgroundColor:'black',
    }
})
export default InputWrapper