import React from "react";
import { StyleSheet, View } from "react-native";
import Swiper from "react-native-swiper";
import Onboard_1 from "@/components/Onboard_1";
import Onboard_2 from "@/components/Onboard_2";
import Onboard_3 from "@/components/Onboard_3";
import { useNavigation } from "expo-router";

const styles = StyleSheet.create({
  wrapper: {},
});

const Onboarding = () => {
  const navigation = useNavigation();

  const handleIndexChanged = (index) => {
    if (index === 3) {
      // Navigate to the login screen when the user swipes again after Onboard_3
      navigation.navigate("Login"); // Replace "Login" with your actual login route
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Swiper
        loop={false}
        style={styles.wrapper}
        onIndexChanged={(index) => {
          // When index 2 (Onboard_3) is reached, add a swipe listener for one more swipe
          if (index === 2) {
            handleIndexChanged(3); // Navigate to Login on next swipe
          }
        }}
      >
        <Onboard_1 />
        <Onboard_2 />
        <Onboard_3 />
      </Swiper>
    </View>
  );
};

export default Onboarding;
