import { View, Text, Image, Dimensions, StyleSheet } from "react-native";

import React from "react";
import { globalStyles } from "@/Styles/globalStyles";
import Divider from "./Divider";

const { height, width } = Dimensions.get("window");
const Onboard_3 = () => {
  return (
    <View style={globalStyles.container}>
      <Image
        source={require("../assets/images/onboarding/Background_3.png")}
        style={globalStyles.backgroundImage}
      />

      <View style={[globalStyles.overlayContainer, styles.overlayRight]}>
        <View
          style={{ flexDirection: "row", width: width, alignItems: "center" }}
        >
          <Text style={globalStyles.iconText}>Value </Text>
          <Image
            source={require("../assets/images/Logo.png")}
            style={{ width: 90, height: 60 }}
          />
        </View>
        <Text style={globalStyles.eCom_text}>eCommerce Shop</Text>
        <Divider color={"white"} />
        <Text style={globalStyles.discriptionText}>
          Best and Trusted Online Shopping Partner
        </Text>
      </View>

      <View style={globalStyles.lowerContainer}>
        <Image
          source={require("../assets/images/third.png")}
          style={{width: width*0.5, height:height*0.3}}
        />
        <Text style={globalStyles.lowerText}>Get your order !!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayRight: {
    position: 'absolute', 
    right: 10,            
    left: 'auto',

  },
})
export default Onboard_3;
