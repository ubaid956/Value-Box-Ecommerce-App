import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import CartItem from "@/components/CartItem";
import CheckBox from "react-native-check-box";
import { ProductStyle } from "@/Styles/ProductStyle";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import CustomButton from "@/components/Buttons/CustomButton";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import ModalHeader from "@/components/ModalHeader";
import { Picker } from "@react-native-picker/picker";
import * as yup from "yup";
import { Formik } from "formik";
import { globalStyles } from "@/Styles/globalStyles";
import InputWrapper from "@/components/InputWrapper";
import CutomHeader from "@/components/CutomHeader";
import CustomHeader from "@/components/CustomHeader";
import { useSelector } from "react-redux";
import { selectCart } from "@/redux-toolkit/CartSlice";

const { height, width } = Dimensions.get("window");

const addressSchema = yup.object({
  name: yup.string().required(),
  phone: yup
    .string()
    .min(10, "Phone Number must be at least 10 characters long")
    .required(),
  address: yup.string().required(),
});
const Cart = () => {
  const [isChecked, setIsChecked] = useState(false);
  // Check Out Modal
  const [checkOut, setCheckOutVisible] = useState(false);

  // Shipping Address Modal
  const [shippingVisible, setShippingVisible] = useState(false);

  // Payment Modal
  const [payment, setPaymentVisible] = useState(false);

  const toggleCheckOut = () => {
    setCheckOutVisible(!checkOut);
  };

  const togglePayment = () => {
    setPaymentVisible(!payment);
  };

  const toggleShippingAddress = () => {
    setShippingVisible(!shippingVisible);
  };
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const cartList = useSelector(selectCart);
  const isCartEmpty = cartList.length === 0 || !cartList;
  const orderSuccess = () => {};

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title="My Cart" />

      {isCartEmpty ? (
        <View style={globalStyles.emptyContainer}>
          <Text style={globalStyles.emptyText}>No items in the wishlist</Text>
        </View>
      ) : (
        <FlatList
          data={cartList}
          style={styles.list}
          renderItem={({ item }) => (
            <CartItem
              price={item.price}
              discount={item.discount}
              picture={item.picture}
              description={item.description}
            />
          )}
        />
      )}

      {/* <CartItem
          price={6000}
          discount={4500}
          picture={require("../../assets/images/CartItems/shoes.png")}
          description={
            "Premium Leather Loafers offering unparalleled comfort and style for all-day wear."
          }
        />
        <CartItem
          price={1500}
          discount={1200}
          picture={require("../../assets/images/CartItems/hat.png")}
          description={
            "Comfortable Cotton Cap, a great accessory for both sunny and casual days."
          }
        />
        <CartItem
          price={4000}
          discount={3000}
          picture={require("../../assets/images/CartItems/shoes.png")}
          description={
            "Classic Black Polo Shirt with superior fabric quality, perfect for casual and formal wear."
          }
        />
        <CartItem
          price={4000}
          discount={3000}
          picture={require("../../assets/images/CartItems/blackshirt.png")}
          description={
            "Classic Black Polo Shirt with superior fabric quality, perfect for casual and formal wear."
          }
        />
        <CartItem
          price={4000}
          discount={3000}
          picture={require("../../assets/images/CartItems/hat.png")}
          description={
            "Classic Black Polo Shirt with superior fabric quality, perfect for casual and formal wear."
          }
        />
        <CartItem
          price={4000}
          discount={3000}
          picture={require("../../assets/images/CartItems/shoes.png")}
          description={
            "Classic Black Polo Shirt with superior fabric quality, perfect for casual and formal wear."
          }
        /> */}

      {!isCartEmpty && (
        <View style={styles.checkOut}>
          <View style={styles.checkBoxContainer}>
            <CheckBox
              style={styles.checkBox}
              onClick={toggleCheckbox}
              isChecked={isChecked}
            />
            <Text style={styles.checkBoxText}>All</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Subtotal: </Text>
            <Text style={[ProductStyle.discountPrice]}>Rs.</Text>
            <TouchableOpacity
              onPress={toggleCheckOut}
              style={{
                backgroundColor: "#002882",
                width: 100,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 4,
              }}
            >
              <Text style={{ color: "white" }}>Check Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Modal
        animationType="left"
        hasBackdrop={true}
        visible={checkOut}
        onRequestClose={toggleCheckOut}
      >
        <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
          <ModalHeader headerText="Check Out" toggleModal={toggleCheckOut} />

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
                onPress={toggleShippingAddress}
              >
                <Text>Change</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.paymentConatiner}>
            <Text style={styles.headerText}>Payment</Text>
            <Text style={styles.changeText} onPress={togglePayment}>
              Change
            </Text>
            <Image
              source={require("../../assets/images/mastercard.png")}
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
                source={require("../../assets/images/easypaisa.png")}
                style={{ width: 90, height: 50 }}
              />

              <Image
                source={require("../../assets/images/jaazcash.png")}
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
              <Text style={styles.rsText}>Rs.1000</Text>
            </View>
            <View style={styles.orderContainer}>
              <Text>Delivery: </Text>
              <Text style={styles.rsText}>Rs.1000</Text>
            </View>

            <View style={styles.orderContainer}>
              <Text>Summary: </Text>
              <Text style={styles.rsText}>Rs.1000</Text>
            </View>

            <CustomButton title="Submit Order" />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="left"
        hasBackdrop={true}
        visible={shippingVisible}
        onRequestClose={toggleShippingAddress}
      >
        <ModalHeader
          headerText="Adding Shipping Address"
          toggleModal={toggleShippingAddress}
        />
        <ScrollView style={styles.main}>
          <KeyboardAvoidingView
            style={styles.main}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150} // Adjust offset if needed
          >
            <View style={[styles.main, { marginTop: height * 0.2 }]}>
              <View
                style={[
                  globalStyles.inputField,
                  { marginBottom: height * 0.02 },
                ]}
              >
                <Text style={{ fontSize: 10, position: "absolute", left: 15 }}>
                  Country/Region
                </Text>
                <Picker style={styles.picker}>
                  <Picker.Item label="Pakistan" value="Pakistan" />
                </Picker>
              </View>
              <Formik
                initialValues={{
                  name: "",
                  address: "",
                  phone: "",
                }}
                validationSchema={addressSchema}
              >
                {(props) => (
                  <View>
                    <Text style={globalStyles.label}>
                      Name <Text style={{ color: "red" }}>*</Text>
                    </Text>
                    <TextInput
                      placeholder="Name"
                      style={[globalStyles.inputField, { paddingLeft: 15 }]}
                      value={props.values.name}
                      onChangeText={props.handleChange("name")}
                      onBlur={props.handleBlur("name")}
                    />
                    <Text style={globalStyles.errorText}>
                      {props.touched.name && props.errors.name}
                    </Text>
                    <Text style={globalStyles.label}>
                      Address<Text style={{ color: "red" }}> *</Text>
                    </Text>
                    <TextInput
                      placeholder="Address"
                      style={[globalStyles.inputField, { paddingLeft: 15 }]}
                      value={props.values.address}
                      onChangeText={props.handleChange("address")}
                      onBlur={props.handleBlur("address")}
                    />
                    <Text style={globalStyles.errorText}>
                      {props.touched.address && props.errors.address}
                    </Text>
                    <Text style={globalStyles.label}>
                      Phone<Text style={{ color: "red" }}> *</Text>
                    </Text>
                    <TextInput
                      placeholder="Phone"
                      style={[globalStyles.inputField, { paddingLeft: 15 }]}
                      value={props.values.phone}
                      keyboardType="Numeric"
                      onChangeText={props.handleChange("phone")}
                      onBlur={props.handleBlur("phone")}
                    />
                    <Text style={globalStyles.errorText}>
                      {props.touched.phone && props.errors.phone}
                    </Text>
                    <CustomButton title="Save" />
                  </View>
                )}
              </Formik>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>

      <Modal
        animationIn="slideInUp"
        transparent={true} // Make the modal background transparent
        visible={payment}
        onRequestClose={togglePayment}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.overlayTouchable}
            onPress={togglePayment}
          />
          <ScrollView style={styles.modalContainer}>
            <KeyboardAvoidingView
              style={styles.modalContainer}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150} // Adjust offset if needed
            >
              <View>
                <View style={styles.divider}></View>
                <Text style={{ marginTop: 20, alignSelf: "center" }}>
                  Add New Card
                </Text>

                <View style={styles.wrapper}>
                  <TextInput
                    placeholder="Name on Card"
                    style={[
                      globalStyles.inputField,
                      { marginLeft: 15, marginTop: 10, borderColor: "white" },
                    ]}
                  />
                </View>
                <View style={styles.wrapper}>
                  <TextInput
                    placeholder="Card Number"
                    style={[
                      globalStyles.inputField,
                      { marginLeft: 15, marginTop: 10, borderColor: "white" },
                    ]}
                  />
                </View>
                <View style={styles.wrapper}>
                  <TextInput
                    placeholder="Expire Date"
                    style={[
                      globalStyles.inputField,
                      { marginLeft: 15, marginTop: 10, borderColor: "white" },
                    ]}
                  />
                </View>
                <View style={[styles.wrapper, { marginBottom: height * 0.03 }]}>
                  <TextInput
                    placeholder="CVV"
                    style={[
                      globalStyles.inputField,
                      { marginLeft: 15, marginTop: 10, borderColor: "white" },
                    ]}
                  />
                </View>

                <CustomButton title="Save Card" />
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: width * 0.8,
    height: height * 0.08,
    backgroundColor: "white",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: height * 0.04,
    // backgroundColor:'black',
  },
  main: {
    flex: 1,
    flexDirection: "column",
    height: height,
    backgroundColor: "#ffffff",
  },
  checkOut: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    height: height * 0.08,
    justifyContent: "space-between",
    backgroundColor: "white",
    width: width,
    alignItems: "center",
    paddingHorizontal: 10,
    borderColor: "lightgrey",
    borderWidth: 1,
    // borderRadius:19
  },
  checkBox: {
    marginRight: 10,
    marginLeft: 3,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  list: {
    width: width,
    // backgroundColor:'black'
    marginBottom: height * 0.056,
  },

  shippingConatiner: {
    width: width * 0.8,
    // backgroundColor:'black',
    marginHorizontal: width * 0.1,
    height: height * 0.2,
    marginTop: 40,
    marginBottom: 5,
  },
  paymentConatiner: {
    width: width * 0.8,
    // backgroundColor:'black',
    marginHorizontal: width * 0.1,
    height: height * 0.26,
    marginTop: height * 0.04,
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
  headerText: {
    fontWeight: "bold",
    fontSize: 15,
    paddingLeft: 10,
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
  pickerWrapper: {
    width: width * 0.8,
    height: height * 0.06,
    marginHorizontal: width * 0.1,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for dull effect
    justifyContent: "flex-end",
  },
  overlayTouchable: {
    flex: 1,
  },
  modalContainer: {
    width: width,
    height: height * 0.6, // Set the modal height to 50% of the screen height
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    backgroundColor: "#f9f9f9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  divider: {
    width: width * 0.08,
    height: 3,
    backgroundColor: "black",
    alignSelf: "center",
  },
});
export default Cart;
