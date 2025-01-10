import {
  View,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { globalStyles } from "@/Styles/globalStyles";
import CustomHeader from "@/components/CustomHeader";
import { useLocalSearchParams, useNavigation } from "expo-router";
import FilterComponent from "@/components/FilterComponent";
import ListItem1 from "@/components/ListItem1";
import Items from "@/components/Items"; // Import the Items component
import { SimpleGrid } from "react-native-super-grid";

const { width, height } = Dimensions.get("window");

const ShopCategories = () => {
  const { category } = useLocalSearchParams(); // Destructure the category from route.params
  const [GridActive, setGridActive] = useState(false);
  const toggleGrid = () => {
    setGridActive(!GridActive);
  };

  const [isSortVisible, setSortVisible] = useState(false);
  const toggleSort = () => {
    setSortVisible(!isSortVisible);
  };
  const navigation = useNavigation();

  const data = [
    {
      title: "Man Peshawer Chapal",
      image: require("../assets/images/MenFashion/chapal.png"),
      price: ".9000",
      rating: "4.2 | 11k sold",
    },
    {
      title: "Perfume",
      image: require("../assets/images/MenFashion/perfume.png"),
      price: ".200",
      rating: "4 | 1k sold",
    },
    {
      title: "Men Shirt ",
      image: require("../assets/images/MenFashion/shirt.png"),
      price: ".100",
      rating: "5 | 6k sold",
    },
    {
      title: "Men Traditional Suit",
      image: require("../assets/images/MenFashion/suit.png"),
      price: ".200",
      rating: "5 | 6k sold",
    },
  ];
  return (
    <View>
      <CustomHeader title={category} />
      <FilterComponent
        GridActive={GridActive}
        toggleGrid={toggleGrid}
        toggleSort={toggleSort}
      />

      {GridActive ? (
        <ScrollView
          style={{ backgroundColor: "#f9f9f9", marginBottom: height * 0.15 }}
        >
          <SimpleGrid
            itemDimension={160}
            data={data}
            renderItem={({ item }) => (
              <Items
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
                onPress={() =>
                  navigation.navigate("Product", {
                    title: item.title,
                    price: item.price,
                    rating: item.rating,
                    image: item.image,
                    reviews: item.reviews,
                  })
                }
              />
            )}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        </ScrollView>
      ) : (
        // Default List View using ListItem1 component
        <FlatList
          data={data}
          style={{ backgroundColor: "#f9f9f9", marginBottom: height * 0.15 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem1
              image={item.image}
              price={item.price}
              title={item.title}
              rating={item.rating || "0"}
              onPress={() =>
                navigation.navigate("Product", {
                  title: item.title,
                  price: item.price,
                  rating: item.rating,
                  image: item.image,
                  reviews: item.reviews,
                })
              }
            />
          )}
        />
      )}

      <Modal
        animationIn="slideInUp"
        transparent={true}
        visible={isSortVisible}
        onRequestClose={toggleSort}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.overlayTouchable}
            onPress={toggleSort}
          />

          <View style={styles.modalContainer}>
            <View style={styles.divider}></View>
            <Text
              style={{
                marginTop: 20,
                alignSelf: "center",
                fontWeight: "bold",
                fontSize: 20,
                marginBottom:height*0.02
              }}
            >
              Sort By
            </Text>

            <TouchableOpacity style={styles.wrapper}>
              <Text>Popular</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.wrapper}>
              <Text>Newest</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.wrapper}>
              <Text>Price: Lowest to High</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.wrapper}>
              <Text>Price: Highest to Low</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: width,
    paddingLeft: width * 0.05,
    height: height * 0.08,
    backgroundColor: "white",
    justifyContent: "center",
    alignSelf: "center",
    // marginTop: height * 0.04,
    // backgroundColor:'black',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for dull effect
    justifyContent: "flex-end",
  },
  overlayTouchable: {
    flex: 1,
  },
  divider: {
    width: width * 0.08,
    height: 3,
    backgroundColor: "black",
    alignSelf: "center",
  },
  modalContainer: {
    width: width,
    // height: height * 0.6, // Set the modal height to 50% of the screen height
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default ShopCategories;
