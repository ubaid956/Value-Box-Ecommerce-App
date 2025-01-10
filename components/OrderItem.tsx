import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ProductStyle } from "@/Styles/ProductStyle";
import Entypo from "@expo/vector-icons/Entypo";
import SmallBtn from "./Buttons/SmallBtn";

const { width, height } = Dimensions.get("window");

const OrderItem = ({ title, price, rating, image, confirmbtn, cancelbtn, total }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image source={image} style={styles.image} />

        <View>
          <View style={styles.detailsContainer}>
            <Text numberOfLines={2} ellipsizeMode="tail">
              {title}
            </Text>
          </View>

          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <View style={styles.priceContainer}>
              <Text
                style={[ProductStyle.discountPrice, { width: width * 0.4 }]}
              >
                Rs.{price} {rating}
              </Text>
            </View>
            <Text>Qty. 1</Text>
          </View>
        </View>
      </View>

      <View>
        <Text
          style={{
            alignSelf: "flex-end",
            padding: width * 0.02,
            paddingRight: width * 0.05,
          }}
        >
          Total (1 item): Rs. {total}
        </Text>
        <View style={styles.btnContainer}>
          <SmallBtn title={cancelbtn} />
          {/* <TouchableOpacity style={styles.cancelbtn}>
            <Text>{cancelbtn}</Text>
          </TouchableOpacity> */}
          {confirmbtn && (
            // <TouchableOpacity
            //   style={[styles.cancelbtn, { backgroundColor: "#002882" }]}
            // >
            //   <Text style={{ color: "white" }}>{confirmbtn}</Text>
            // </TouchableOpacity>
            <SmallBtn title={confirmbtn} confirm={true} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,

    // height: height * 0.3,

    flexDirection: "column",
    backgroundColor: "white",
    // Adjust spacing between items
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
    // height: height * 0.08,
    marginBottom: 4,
    marginHorizontal: 10,
    // backgroundColor:'black',
    marginLeft: 15,
    paddingTop: 10,
  },
  priceContainer: {
    marginLeft: 15,
    width: width * 0.6,
    // backgroundColor:'black'
  },
  cancelbtn: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginRight: width * 0.02,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#002882",
  },

  btnContainer: {
    flexDirection: "row",
    padding: width * 0.02,
    // backgroundColor:'black',
    justifyContent: "flex-end",
  },
});

export default OrderItem;
