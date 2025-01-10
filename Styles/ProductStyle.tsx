import { Dimensions, StyleSheet } from "react-native";

const {height, width} = Dimensions.get('window')

export const ProductStyle = StyleSheet.create({
    discountPrice: {
        color: "#e10600",
        fontWeight: "bold",
        width: 60,
      },
      actualPrice: {
        textDecorationLine: "line-through",
      },

})