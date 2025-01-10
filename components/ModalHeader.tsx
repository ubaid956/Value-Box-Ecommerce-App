import { View, Text, StyleSheet, Dimensions,Pressable } from "react-native";
import React from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const { height, width } = Dimensions.get("window");

const ModalHeader = ({headerText, toggleModal}) => {
  return (
    <View style={styles.modalHeader}>
      <Pressable onPress={toggleModal}>
        <EvilIcons name="chevron-left" size={35} color="black" />
      </Pressable>
      <Text style={{ marginLeft: width * 0.05, fontSize: 20, paddingBottom:10}}>{headerText}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
    modalHeader: {
        width: width,
        // height: height * 0.07,
        backgroundColor: "white",
        flexDirection: "row",
        paddingTop: 20,
        paddingLeft: 6,
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
      },
})
export default ModalHeader;
