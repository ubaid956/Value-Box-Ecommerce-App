import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import React from "react";
import { ProductStyle } from "@/Styles/ProductStyle";
import Entypo from "@expo/vector-icons/Entypo";

const { width, height } = Dimensions.get("window");

const ListItem1 = ({ title, price, rating, image, showBtn, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={image} style={styles.image} />

      <View>
        <View style={styles.detailsContainer}>
          <Text numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={[ProductStyle.discountPrice, { width: width * 0.4 }]}>
          Rs{price} {rating}
          </Text>
          <Text style={ProductStyle.actualPrice}>Rs.{price}</Text>
        </View>
      </View>

      {showBtn && (
        <Entypo
          name="cross"
          size={26}
          color="lightgrey"
          style={{ position: "absolute", right: 5, top: 5 }}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.98,

    borderTopLeftRadius: 5,
    borderTopBottomRadius: 5,

    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: width * 0.01, // Adjust spacing between items
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
  detailsContainer: {
    width: width * 0.5,
    height: height * 0.08,
    marginHorizontal: 10,
    // backgroundColor:'black',
    marginLeft: 15,
    paddingTop: 10,
  },
  priceContainer: {
    marginLeft: 15,
    // backgroundColor:'black'
  },
});

export default ListItem1;
