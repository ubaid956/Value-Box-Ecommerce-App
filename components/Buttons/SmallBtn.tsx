import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
const { width, height } = Dimensions.get("window");
const SmallBtn = ({ title, confirm, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.cancelbtn, 
        confirm && { backgroundColor: "#002882",}]}
    >
      <Text style={confirm && { color: "white" }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cancelbtn: {
    padding: width*0.02,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginRight: width * 0.02,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#002882",
  },
});
export default SmallBtn;
