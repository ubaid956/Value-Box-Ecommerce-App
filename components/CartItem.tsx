import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import InputSpinner from "react-native-input-spinner";
import CheckBox from "react-native-check-box";
import { ProductStyle } from "@/Styles/ProductStyle";
const { width, height } = Dimensions.get("window");

const CartItem = ({ picture, description, price, rating }) => {
  const [number, setNumber] = useState(0);
  const [selected, setSelected] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // Properly managing checkbox state

  const toggleSelect = () => {
    setSelected(!selected);
    // setIsChecked(!isChecked)
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity onPress={toggleSelect}>
      <View
        style={[styles.cartContainer]}
      >
        <CheckBox
          style= {styles.checkBox}
          onClick={toggleCheckbox}
          isChecked={isChecked}
          leftText={"CheckBox"}
        />
        <Image source={picture} style={styles.image} />

        <View style={styles.detailsContainer}>
          <Text numberOfLines={2} ellipsizeMode="tail">
            {description}
          </Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={ProductStyle.discountPrice}>Rs{price}</Text>
          <Text style={ProductStyle.actualPrice}>Rs.{Number(price) + 100}</Text>
          </View>
        <View style={styles.bottomRightContainer}>
          <InputSpinner
            max={10}
            width={110}
            min={1}
            step={1}
            editable={false}
            buttonStyle={styles.spinnerButton}
            colorLeft={"#ffc136"}
            colorRight={"#ffc136"}
            buttonTextStyle={styles.spinnerText}
            value={number}
            onChange={(num) => {
              setNumber(num);
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  cartContainer: {
    width: width,
    paddingTop: 5,
    paddingHorizontal: 10,
    height: height * 0.15,
    backgroundColor: "white",
    flexDirection: "row",
    position: "relative",
    marginBottom: 10,
  },
  checkBox:{
    marginRight: 10,
    marginLeft:3
  },
  image: {
    width: 70,
    height: 90,
  },
  detailsContainer: {
    width: width * 0.8,
    height: height * 0.1,
    marginHorizontal: 10,
    // backgroundColor:'black',
    paddingRight: 50,
  },
  priceContainer: {
    position: "absolute",
    bottom: 10,
    left: 130,
  },
  bottomRightContainer: {
    position: "absolute",
    bottom: 0,
    right: 10,
    padding: 10,
  },
  spinnerButton: {
    height: 30,
    width: 30,
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerText: {
    lineHeight: 20,
    fontSize: 16,
  }
 
});

export default CartItem;
