import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
  } from "react-native";
  import MaterialIcons from '@expo/vector-icons/MaterialIcons';

  import React from "react";
  const { width, height } = Dimensions.get("window");
  const BuyBtn = ({ title, confirm, onPress }) => {
    return (
      <TouchableOpacity
      onPress={onPress}
        style={[styles.cancelbtn, 
          confirm && { backgroundColor: "#002882", paddingHorizontal: width*0.1}]}
      >
        <Text style={confirm && { color: "white" }}>{title}</Text>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    cancelbtn: {
      padding: width*0.02,
      paddingHorizontal: width*0.06,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 4,
      marginRight: width * 0.02,
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: "#002882",
    },
  });
  export default BuyBtn;
  