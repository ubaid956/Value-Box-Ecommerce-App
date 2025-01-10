import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { SimpleGrid } from "react-native-super-grid";

import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Swiper from "react-native-swiper";
import Categories from "@/components/Categories";
import Items from "@/components/Items";
import { globalStyles } from "@/Styles/globalStyles";
import { useNavigation } from "expo-router";
const { height, width } = Dimensions.get("window");

const index = () => {

  const data = [
    {
      title: "Black Shirt Polo",
      image: require("../../assets/images/CartItems/blackshirt.png"),
      price: "900",
      rating: "(4.2) | 11k sold",
      reviews:
        "rich black that hasn’t faded even after multiple washes, which is a huge plus for me.",
    },
    {
      title: "Hat",
      image: require("../../assets/images/CartItems/hat.png"),
      price: "600",
      rating: "(4) | 1k sold",
    },
    {
      title: "Shoes",
      image: require("../../assets/images/CartItems/shoes.png"),
      price: "100",
      rating: "(5) | 6k sold",
      review:
        "I recently purchased this black shirt, and I couldn't be happier          with my decision. The fit is absolutely perfect, hugging the  body in all the right places without being too tight. The material is soft yet durable, with a slight stretch that makes it incredibly comfortable to wear all day. The color is a deep,",
    },
    {
      title: "Toy",
      image: require("../../assets/images/Categories/toygames.png"),
      price: "200",
      rating: "(5) | 6k sold",
      reviews: "Nice Product",
    },
    
    {
      title: "Shirt Men",
      image: require("../../assets/images/MenFashion/shirt.png"),
      price: "200",
      rating: "(5) | 6k sold",
      reviews: "Nice Product",
    },
    {
      title: "Perfume For Men",
      image: require("../../assets/images/MenFashion/perfume.png"),
      price: "200",
      rating: "(5) | 6k sold",
      reviews: "Nice Product",
    },
  ];

  const navigation = useNavigation();
  // const productOpen = () => {
  //   navigation.navigate("Product");
  // };

  const [Refreshing, setRefreshing] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <View style={globalStyles.header}>
        <MaterialCommunityIcons name="line-scan" size={24} color="black" />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            placeholderTextColor="#999"
          />
          <View style={styles.iconContainer}>
            <Ionicons name="search-outline" size={25} color="white" />
          </View>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        refreshControl={<RefreshControl refreshing={Refreshing} />}
      >
        <View style={styles.topContainer}>
          <View style={styles.swipperContainer}>
            <Swiper
              // loop={true} // Ensure loop is enabled
              // autoplay={true} // Optionally enable autoplay
              showsButtons={true}
              activeDotColor="#002882"
              buttonWrapperStyle={{
                backgroundColor: "transparent",
                flexDirection: "row",
                position: "absolute",
                top: 0,
                left: 0,
                flex: 1,
                paddingHorizontal: 10,
                paddingVertical: 10,
                justifyContent: "space-between",
                alignItems: "center",
              }}
              nextButton={<Text style={styles.buttonText}>›</Text>}
              prevButton={<Text style={styles.buttonText}>‹</Text>}
            >
              <Image
                source={require("../../assets/images/Slider/slide1.png")}
                style={styles.slides}
              />
              <Image
                source={require("../../assets/images/Slider/slide2.png")}
                style={styles.slides}
              />
              <Image
                source={require("../../assets/images/Slider/slide3.png")}
                style={styles.slides}
              />
            </Swiper>
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              paddingTop: 10,
            }}
          >
            <Text style={styles.categoryText}> Categories</Text>
            <TouchableOpacity>
              <Text>Shop More</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Categories
              image={require("../../assets/images/Categories/home.png")}
              category="Home"
            />
            <Categories
              image={require("../../assets/images/Categories/womenfashion.png")}
              category="Women"
            />
            <Categories
              image={require("../../assets/images/Categories/toygames.png")}
              category="Toy"
            />
            <Categories
              image={require("../../assets/images/Categories/manfashion.png")}
              category="Man"
              onPress={() =>
                navigation.navigate("ShopCategories", {
                  category: "Men Fashion",
                })
              }
            />
            <Categories
              image={require("../../assets/images/Categories/electronics.png")}
              category="Electronics"
            />
          </ScrollView>
        </View>

        <View style={{ flex: 1 }}>
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
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    height: height * 0.25,
    paddingTop: height * 0.01,
    paddingLeft: width * 0.03,
    backgroundColor: "white",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    height: height * 0.05,
    width: width * 0.8,
    borderColor: "#002882",
    borderWidth: 1,
    borderRadius: 4,
  },
  searchBar: {
    flex: 1,
    paddingLeft: 15,
    color: "black", // Adjust the text color as needed
  },
  iconContainer: {
    backgroundColor: "#002882",
    height: "100%",
    width: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  swipperContainer: {
    width: width * 0.9,
    marginHorizontal: width * 0.02,
    marginTop: height * 0.02,
    backgroundColor: "black",
    height: height * 0.18,
    borderRadius: 10,
  },

  wrapper: {},
  slides: { height: height * 0.18, width: width * 0.9, borderRadius: 10 },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  buttonText: {
    color: "#002882",
    fontSize: 35,
  },
  categoriesContainer: {
    backgroundColor: "white",
    width: width,
    // height: height * 0.26,
    marginTop: height * 0.01,
  },
  categoryText: {
    fontWeight: "bold",
    fontSize: 18,
    width: 200,
    // backgroundColor:'black'
  },
});

export default index;
