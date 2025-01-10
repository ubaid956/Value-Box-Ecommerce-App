import {
  Modal,
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import React from "react";
import CustomHeader from "@/components/CustomHeader";
import CustomButton from "@/components/Buttons/CustomButton";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { addToShipping, selectShipping } from "@/redux-toolkit/ShippingSlice";

const { height, width } = Dimensions.get("window");

const CheckOut = () => {
  const navigatin = useNavigation();

  const dispatch = useDispatch();
  const shipping = useSelector(selectShipping);
  const { price, title, image } = useLocalSearchParams();

  console.log("Price:", price);
  const parsedPrice = parseFloat(price); // Convert string to float
  console.log("Parsed Price:", parsedPrice);

  // Ensure total is a valid number and add 100
  const total = isNaN(parsedPrice) ? 0 : parsedPrice + 100;
  console.log("Total:", total);

  const submitOrder = () => {
    dispatch(addToShipping({ title, image, price, total }));
    navigatin.navigate("OrderSuccess");
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <CustomHeader title="Check Out" />
      {/* <ModalHeader headerText="Check Out" toggleModal={toggleCheckOut} /> */}

      <View style={styles.shippingConatiner}>
        <Text style={styles.headerText}>Shipping Address</Text>
        <View style={styles.address}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>John Doe</Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{ width: 300, marginTop: 10, fontSize: 18 }}
          >
            House no 180 Islamabad, House no 180 Islamabad, House no 180
            Islamabad,
          </Text>
          <Text style={{ marginTop: 4 }}>03047796880</Text>
          <TouchableOpacity
            style={styles.changeText}
            // onPress={toggleShippingAddress}
          >
            <Text>Change</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.paymentConatiner}>
        <Text style={styles.headerText}>Payment</Text>
        <Text style={styles.changeText}>Change</Text>
        <Image
          source={require("../assets/images/mastercard.png")}
          style={{ width: 90, height: 50, marginTop: 10 }}
        />
        <Text style={{ position: "absolute", left: 100, top: 45 }}>
          **** **** **** 0000
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginBottom: height * 0.05,
            margin: width * 0.01,
          }}
        >
          <Image
            source={require("../assets/images/easypaisa.png")}
            style={{ width: 90, height: 50 }}
          />

          <Image
            source={require("../assets/images/jaazcash.png")}
            style={{ width: 90, height: 50, marginLeft: 20 }}
          />
        </View>

        <RadioButtonItem
          style={{ marginLeft: 15 }}
          selected={true}
          value="1"
          label={<Text>Cash On Delivery</Text>}
        />
      </View>

      <View style={styles.lowerContainer}>
        <View style={styles.orderContainer}>
          <Text>Order: </Text>
          <Text style={styles.rsText}>Rs.{price}</Text>
        </View>
        <View style={styles.orderContainer}>
          <Text>Delivery: </Text>
          <Text style={styles.rsText}>Rs.10</Text>
        </View>

        <View style={styles.orderContainer}>
            <Text>Summary: </Text>
            <Text style={styles.rsText}>Rs.{total}</Text>
          </View>

        <CustomButton title="Submit Order" onPress={submitOrder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shippingConatiner: {
    width: width * 0.8,
    // backgroundColor:'black',
    marginHorizontal: width * 0.1,
    height: height * 0.2,
    marginTop: 40,
    marginBottom: 5,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 15,
    paddingLeft: 10,
  },
  address: {
    marginTop: 10,
    backgroundColor: "white",
    height: height * 0.15,
    padding: 10,
  },
  changeText: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 70,
    color: "#002882",
    fontWeight: "bold",
  },
  paymentConatiner: {
    width: width * 0.8,
    // backgroundColor:'black',
    marginHorizontal: width * 0.1,
    height: height * 0.26,
    marginTop: height * 0.04,
  },
  lowerContainer: {
    position: "absolute",
    bottom: 30,
    width: width * 0.8,
    // backgroundColor:'black',
    marginLeft: width * 0.1,
  },
  orderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.8,
    marginVertical: 10,
    height: height * 0.03,
    // backgroundColor:'black',
  },
  rsText: {
    fontWeight: "bold",
    // width: 00,
    width: 70,
    paddingRight: 5,
    // width: 200,
    textAlign: "right",
  },
});
export default CheckOut;
