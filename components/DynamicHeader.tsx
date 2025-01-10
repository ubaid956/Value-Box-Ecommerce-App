import React, { useRef } from "react";
import { View, Text, Image, Animated, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const DynamicHeader = ({ scrollY }) => {
  const HEADER_MAX_HEIGHT = height * 0.2;
  const HEADER_MIN_HEIGHT = height * 0.1;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: ["#181D31", "#678983"],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: headerHeight,
          backgroundColor: headerBackgroundColor,
        },
      ]}
    >
      <View style={styles.topcontainer}>
        <TouchableOpacity>
          <Image
            source={require("../assets/images/user.png")}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>User Name</Text>
          <Text>
            <Text style={styles.boldText}>10 </Text> WishList
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    paddingTop: 25,
  },
  topcontainer: {
    flexDirection: "row",
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  profileImage: {
    borderRadius: 50,
    width: width * 0.18,
    height: height * 0.09,
  },
  usernameContainer: {
    marginLeft: width * 0.05,
  },
  username: {
    fontWeight: "bold",
    fontSize: 26,
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default DynamicHeader;
