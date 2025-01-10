import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { globalStyles } from "@/Styles/globalStyles";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SearchBar } from "@rneui/themed";
import { loadOptions } from "@babel/core";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const { width, height } = Dimensions.get("window");



const ProductHeader = ({shareProduct}) => {
  const [search, setSearch] = useState("");

  const [isFocused, setIsFocused] = useState(false);
  const updateSearch = (search) => {
    setSearch(search);
  };
  return (
    <View style={globalStyles.header}>
      <AntDesign name="left" size={22} color="black" />
      <SearchBar
        placeholder="Search On Value Box"
        platform="android"
        onChangeText={updateSearch}
        searchIcon={null}
        cancelIcon={null}
        value={search}
        containerStyle={{
          width: width * 0.78,
          height: height * 0.05,
          justifyContent: "center",
          //   backgroundColor: "black",
          marginHorizontal: 10,
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 5,
          overflow: "hidden",
          //   borderColor: "white",
        }}
        inputContainerStyle={{
          height: height * 0.05,

          backgroundColor: "white",
        }}
      />
      <TouchableOpacity onPress={shareProduct}>
      <SimpleLineIcons name="share-alt" size={22} color="black" />
        
      </TouchableOpacity>
    </View>
  );
};

export default ProductHeader;
