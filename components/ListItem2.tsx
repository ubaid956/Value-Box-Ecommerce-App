import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import { ProductStyle } from "@/Styles/ProductStyle";
import Entypo from "@expo/vector-icons/Entypo";


const ListItem2 = () => {
  return (
    <View style={styles.container}>
    <Image source={image} style={styles.image} />

    <View style={styles.detailsContainer}>
      <Text numberOfLines={2} ellipsizeMode="tail">
        {description}
      </Text>
    </View>

    <View style={styles.priceContainer}>
      <Text style={ProductStyle.discountPrice}>Rs.{discount}</Text>
      <Text style={ProductStyle.actualPrice}>Rs.{price}</Text>
      
    </View>
    <Entypo name="cross" size={24} color="lightgrey"  style={{position:'absolute', right:5, top:5}}/>
  </View>
  )
}

const styles = StyleSheet.create({
    container:{
        width: width*0.5,
    }
})
export default ListItem2