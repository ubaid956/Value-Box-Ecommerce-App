import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
const { height, width } = Dimensions.get("window");

const Categories = ({ image, category, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <Text style={styles.text}>{category}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 10, // Adjust spacing between items
    marginTop: 10,
  },
  image: {
    width: width * 0.25,
    height: height * 0.15,
    borderRadius: 5,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
});

export default Categories;
