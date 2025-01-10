import { View, Text, Image, Dimensions, StyleSheet } from "react-native";

import React from "react";
import { globalStyles } from "@/Styles/globalStyles";
import Divider from "./Divider";

const { height, width } = Dimensions.get("window");
const Onboard_2 = () => {
  return (
    <View style={globalStyles.container}>
      <View style={styles.topContainer}>
        <Image
          source={require("../assets/images/onboarding/Background_2.png")}
          style={{ width: width, height: height * 0.3 }}
        />
      </View>

      <View style={styles.overlayContainer}>
      <View style={{flexDirection: 'row', width: width, alignItems:'center'}}>
          <Text style={globalStyles.iconText }>Value </Text>
          <Image
          source={require("../assets/images/Logo.png")}
          style={{ width: 90, height: 60 }}
        />
        </View>
        <Text style={[globalStyles.eCom_text, { color: "#002882" }]}>
          eCommerce Shop
        </Text>
        <Divider color={"#002882"} />
        <Text style={[globalStyles.discriptionText, { color: "#002882" }]}>
          Best and Trusted Online Shopping Partner
        </Text>
      </View>

      <View style={styles.lowerContainer}>
        <Image source={require('../assets/images/second.png')} style={{width: width*0.5, height:height*0.3}}/>
        <Text style={globalStyles.lowerText}>Track order !!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    width: width,
    height: height * 0.5,
    position: "absolute",
  },
  overlayContainer: {
    position: "absolute",
    top: height * 0.13, // Adjust the value to control vertical position
    left: 20,
    alignItems: "flex-start",
    width: width * 0.5,
  },
  lowerContainer: {
    marginTop: height*0.5,
    height: height * 0.5,
    width: width,
    alignItems:'center',
    // backgroundColor:'black'
   
  },
});
export default Onboard_2;
