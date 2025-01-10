import { View, Text,StyleSheet,Dimensions } from 'react-native'
import React from 'react'

const { height, width } = Dimensions.get("window");

const CustomHeader = ({title}) => {
  return (
    <View style={styles.header}>
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 20,
        marginTop: height*0.06,
        marginHorizontal: width*0.04,
        // backgroundColor:'black'
      }}
    >
     {title}
    </Text>
  </View>
  )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "white",
        // height: height * 0.09,
        marginBottom: 8,
        paddingBottom: height*0.01
      },
})

export default CustomHeader