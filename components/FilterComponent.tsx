import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const FilterComponent = ({ GridActive, toggleGrid,toggleSort }) => {
  return (
    <View
      style={{
        width: width,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingBottom: 10,
      }}
    >
      <View style={styles.box}>
        <Ionicons
          name="filter"
          size={24}
          color="black"
          style={{ marginRight: 7 }}
        />
        <Text>Filter</Text>
      </View>


      <TouchableOpacity style={styles.box}
      onPress={toggleSort}>
        <Ionicons
          name="swap-vertical"
          size={24}
          color="black"
          style={{ marginRight: 7 }}
        />
        <Text>Price lowest to high</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box}>
        <Ionicons
          name={GridActive ? "grid" : "list"}
          size={20}
          color="black"
          onPress={toggleGrid} // Handle the toggle
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  box: { flexDirection: "row" },
});

export default FilterComponent;
