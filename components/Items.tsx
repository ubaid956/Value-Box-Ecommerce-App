import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";

const { height, width } = Dimensions.get("window");

const Items = ({
  title,
  price,
  rating,
  image,
  onRemove,
  showRemoveButton,
  onPress,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <Image
        source={image}
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          height: height * 0.2,
          width: width * 0.46,
        }}
      />
      {showRemoveButton && onRemove && (
        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <Entypo name="cross" size={26} color="lightgrey" />
        </TouchableOpacity>
      )}
      <View style={styles.lower}>
        <Text style={{ fontWeight: "bold" }}>{title}</Text>
        <Text style={styles.discountPrice}>Rs.{price}</Text>
        <Text>{rating}</Text>

        {/* {!showRemoveButton && !onRemove && (
          <TouchableOpacity onPress={onPress} style={styles.wishList}>
            <MaterialIcons
              name={isWishlisted ? "favorite" : "favorite-outline"}
              size={24}
              color={"#002882"}
            />
          </TouchableOpacity>
        )} */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: width * 0.46,
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 10,
  },
  lower: {
    padding: 10,
  },
  wishList: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  discountPrice: {
    // Add your discount price styling here or import it from ProductStyle
    color: "red", // Example styling
  },
  removeButton: {
    position: "absolute",
    right: 5,
    top: 5,
  },
});

export default Items;
