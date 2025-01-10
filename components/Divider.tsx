import { View, StyleSheet, Dimensions } from "react-native";
import React from "react";

const { height, width } = Dimensions.get("window");
const Divider = ({color}) => {
  return  <View style={[styles.divider, { backgroundColor: color }]} />
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: width * 0.44,
    marginVertical: 8,
  },
});
export default Divider;
