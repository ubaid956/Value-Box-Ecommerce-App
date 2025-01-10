import {
  Modal,
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StyleSheet,
} from "react-native";
import React from "react";

const CheckoutModal = () => {
  return (
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
  );
};

export default CheckoutModal;
