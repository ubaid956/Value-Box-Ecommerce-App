import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
import React from "react";
import { globalStyles } from "@/Styles/globalStyles";
import Divider from "./Divider";

const { height, width } = Dimensions.get("window");

const Onboard_1 = () => {
  return (
    <View style={globalStyles.container}>
      <Image
        source={require("../assets/images/onboarding/Background_1.png")}
        style={globalStyles.backgroundImage}
      />
      <View style={globalStyles.overlayContainer}>
        <View style={{flexDirection: 'row', width: width, alignItems:'center'}}>
          <Text style={globalStyles.iconText }>Value </Text>
          <Image
          source={require("../assets/images/Logo.png")}
          style={{ width: 90, height: 60 }}
        />
        </View>
       
        <Text style={globalStyles.eCom_text}>eCommerce Shop</Text>
        <Divider color={'white'} />
        <Text style={globalStyles.discriptionText}>
        Best and Trusted{'\n'}Online Shopping Partner
        </Text>
      </View>

      <View style={globalStyles.lowerContainer}>
        <Image source={require('../assets/images/first.png')} style={{width: width*0.5, height:height*0.3}}/>
        <Text style={[globalStyles.lowerText]}>Purchase Online !!</Text>
      </View>
    </View>
  );
};


export default Onboard_1;
