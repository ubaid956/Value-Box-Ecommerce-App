import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import CustomButton from "@/components/Buttons/CustomButton";
import { useNavigation } from "expo-router";

const { height, width } = Dimensions.get("window");

const OrderSuccess = () => {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <Image
        source={require("../assets/images/bags.png")}
        style={styles.image}
      />
      <Text
        style={{ marginTop: height * 0.08, fontSize: 30, fontWeight: "bold" }}
      >
        Success!{" "}
      </Text>
      <Text>Your order will be delivered soon.</Text>
      <Text>Thank you for choosing our app!</Text>
      <View style={styles.btn}>
        <CustomButton title="Continue Shopping" onPress={()=> navigation.navigate("(tabs)")}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width * 0.5,
    height: height * 0.4,
    marginTop: height * 0.15,
    // marginBottom: height*0.05
  },
  btn:{
    position:'absolute',
    bottom:height*0.04,
  }
});

export default OrderSuccess;
