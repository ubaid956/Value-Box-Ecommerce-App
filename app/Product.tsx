import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Share,
  TouchableOpacity,
} from "react-native";

import { SimpleGrid } from "react-native-super-grid";
import React, { useState } from "react";
import ProductHeader from "@/components/ProductHeader";
import Swiper from "react-native-swiper";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { globalStyles } from "@/Styles/globalStyles";
import { ProductStyle } from "@/Styles/ProductStyle";
import Items from "@/components/Items";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { addWishList, removeWishList } from "@/redux-toolkit/WishSlice";
import { useDispatch } from "react-redux";
import SmallBtn from "@/components/Buttons/SmallBtn";
import BuyBtn from "@/components/Buttons/BuyBtn";
import { addToCart, removeFromCart } from "@/redux-toolkit/CartSlice";
const { height, width } = Dimensions.get("window");

const Product = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  console.log(params);

  const dispatch = useDispatch();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeWishList({ id: params.id }));
    } else {
      dispatch(
        addWishList({
          // id: params.id,
          title: params.title,
          image: params.image,
          price: params.price,
          rating: params.rating,
        })
      );
    }
    setIsWishlisted(!isWishlisted);
  };

  const cartItems = () => {
    dispatch(
      addToCart({
        picture: params.image,
        description: params.title,
        price: params.price,
        discount: params.rating,
      })
    );
  };
  const [selectedSize, setSelectedSize] = useState(null);

  const handlePress = (size) => {
    setSelectedSize(size);
  };

  const buyNow = () => {
    navigation.navigate("CheckOut", {
      price: params.price,
      title: params.title,
      image: params.image,
    });
  };

  const data = [
    {
      title: "Black Shirt Polo",
      image: require("../assets/images/CartItems/blackshirt.png"),
      price: "9000",
      rating: "4.2 | 11k sold",
    },
    {
      title: "Hat",
      image: require("../assets/images/CartItems/hat.png"),
      price: "200",
      rating: "4 | 1k sold",
    },
    {
      title: "Shoes",
      image: require("../assets/images/CartItems/shoes.png"),
      price: "100",
      rating: "5 | 6k sold",
    },
    {
      title: "Toy",
      image: require("../assets/images/Categories/toygames.png"),
      price: "200",
      rating: "5 | 6k sold",
    },
  ];

  const renderPagination = (index, total, context) => {
    return (
      <View style={styles.paginationStyle}>
        <Text style={styles.paginationText}>
          <Text style={styles.paginationText}>{index + 1}</Text>/{total}
        </Text>
      </View>
    );
  };

  const shareProduct = async () => {
    try {
      const result = await Share.share({
        message: `Check out this amazing product!\n\nTitle: ${params.title}\nPrice: ${params.price}\nRating: ${params.rating}\n\nYou can find it here: [Insert your link here]`,
        url: params.image,  // This is optional; if you have a URL, you can use it to share images.
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error("Error sharing the product:", error);
    }
  };
  
  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <ProductHeader shareProduct={shareProduct} style={{justifyContent:'space-between'}}/>
      <ScrollView style={{ backgroundColor: "#f9f9f9" }}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.swipperContainer}>
            <Swiper
              // loop={true} // Ensure loop is enabled
              // autoplay={true} // Optionally enable autoplay
              showsButtons={true}
              renderPagination={renderPagination}
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
                // source={require("../assets/images/Slider/slide1.png")}
                source={params.image}
                style={styles.slides}
              />
              <Image
                // source={require("../assets/images/Slider/slide2.png")}
                source={params.image}
                style={styles.slides}
              />
              <Image
                // source={require("../assets/images/Slider/slide3.png")}
                source={params.image}
                style={styles.slides}
              />
            </Swiper>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={{ fontSize: 12, color: "red", fontWeight: "bold" }}>
            Rs
          </Text>
          <Text
            style={[
              ProductStyle.discountPrice,
              { fontSize: 18, paddingRight: 6 },
            ]}
          >
            {params.price}
          </Text>
          <Text style={[ProductStyle.actualPrice, { fontSize: 12 }]}>
            Rs. 1999
          </Text>
        </View>

        <Text numberOfLines={2} style={styles.titleText}>
          {/* Dress Shirt for Men and Boys - Formal and Party Wear Shirt for Men and
          Boys - Casual and fromal wear */}

          {params.title}
        </Text>

        <View
          style={[
            styles.shareConatiner,
            { alignItems: "center", marginBottom: height * 0.01 },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Entypo name="star" size={24} color="yellow" />
            <Text style={{ marginHorizontal: 6 }}>5</Text>
            <Text>{params.rating}</Text>
          </View>

          <TouchableOpacity onPress={toggleWishlist}>
            <MaterialIcons
              name={isWishlisted ? "favorite" : "favorite-outline"}
              size={24}
              color={"#002882"}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.shareConatiner, { justifyContent: "flex-start" }]}>
          <TouchableOpacity
            style={[
              styles.sizeContainer,
              selectedSize === "S" && { backgroundColor: "#002882" },
            ]}
            onPress={() => handlePress("S")}
          >
            <Text style={[selectedSize === "S" && { color: "white" }]}>S</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sizeContainer,
              selectedSize === "L" && { backgroundColor: "#002882" },
            ]}
            onPress={() => handlePress("L")}
          >
            <Text style={[selectedSize === "L" && { color: "white" }]}>L</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sizeContainer,
              selectedSize === "XL" && { backgroundColor: "#002882" },
            ]}
            onPress={() => handlePress("XL")}
          >
            <Text style={[selectedSize === "XL" && { color: "white" }]}>
              XL
            </Text>
          </TouchableOpacity>
        </View>

        {/* Gaurentee Container */}
        <View
          style={[
            styles.shareConatiner,
            {
              backgroundColor: "lightgrey",
              borderRadius: 5,
              padding: width * 0.02,
              marginTop: height * 0.02,
              flexDirection: "column",
            },
          ]}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: width * 0.9,
              alignItems: "center",
            }}
          >
            <View style={styles.returnContainer}>
              <MaterialIcons name="verified-user" size={20} color="grey" />
              <Text style={{ marginHorizontal: width * 0.02, color: "black" }}>
                14 days easy return
              </Text>
            </View>
            <EvilIcons name="chevron-right" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: width * 0.9,
              alignItems: "center",
              marginTop: height * 0.02,
            }}
          >
            <View style={styles.returnContainer}>
              <Ionicons name="gift" size={20} color="grey" />
              <Text style={{ marginHorizontal: width * 0.02, color: "black" }}>
                Get by 30 August-5 Sep
              </Text>
            </View>
            <EvilIcons name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Review container */}
        <View style={styles.review}>
          {/* Review Header */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.text}>Ratings & Reviews</Text>
              <Text style={{ marginLeft: width * 0.02 }}>(2)</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ marginRight: width * 0.02 }}>5</Text>
              <Entypo name="star" size={24} color="yellow" />
              <Entypo name="star" size={24} color="yellow" />
              <Entypo name="star" size={24} color="yellow" />
              <Entypo name="star" size={24} color="yellow" />
              <Entypo name="star" size={24} color="yellow" />
            </View>
          </View>

          {/* Customer Review */}
          <View
            style={[
              styles.customerReview,
              { flexDirection: "row", marginTop: height * 0.02 },
            ]}
          >
            <View style={{ width: width * 0.45 }}>
              <Text numberOfLines={3}>{params.reviews}</Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                {/* <Text style={{ marginRight: width * 0.02 }}>5</Text> */}
                <Entypo name="star" size={20} color="yellow" />
                <Entypo name="star" size={20} color="yellow" />
                <Entypo name="star" size={20} color="yellow" />
                <Entypo name="star" size={20} color="yellow" />
                <Entypo name="star" size={20} color="yellow" />
                <Text style={{ marginLeft: 5 }}>0***4</Text>
              </View>
            </View>

            <Image
              source={require("../assets/images/CartItems/blackshirt.png")}
              style={styles.image}
            />
            <Image
              source={require("../assets/images/CartItems/blackshirt.png")}
              style={[styles.image, { marginLeft: width * 0.01 }]}
            />
          </View>
        </View>

        {/* Related Product */}

        <View style={{ width: width, marginTop: height * 0.025 }}>
          <Text style={[styles.text, { alignSelf: "center" }]}>
            Recommendations
          </Text>
          <SimpleGrid
            itemDimension={160}
            data={data}
            renderItem={({ item }) => (
              <Items
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
              />
            )}
          />
        </View>
      </ScrollView>
      <View style={styles.divider} />

      <View style={styles.btnContainer}>
        <View style={{ alignSelf: "center", marginRight: width * 0.05 }}>
          <MaterialIcons name="support-agent" size={24} color="black" />
          <Text>Chat</Text>
        </View>

        <BuyBtn title="Add To Cart" onPress={cartItems} />

        <BuyBtn title="Buy Now" confirm={true} onPress={buyNow} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slides: { height: height * 0.5, width: width },
  swipperContainer: {
    width: width,

    backgroundColor: "black",
    height: height * 0.5,
  },
  btnContainer: {
    flexDirection: "row",
    padding: width * 0.02,

    backgroundColor: "white",
    justifyContent: "flex-end",
  },
  divider: {
    width: width,
    height: 1,
    backgroundColor: "grey",
  },
  paginationStyle: {
    backgroundColor: "grey",
    padding: 4,
    borderRadius: 20,
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  paginationText: {
    color: "white",
    fontSize: 16,
  },
  priceContainer: {
    flexDirection: "row",
    marginStart: width * 0.04,
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
    alignItems: "center",
  },
  titleText: {
    marginHorizontal: width * 0.04,
    marginBottom: height * 0.01,
    fontSize: 18,
  },
  shareConatiner: {
    flexDirection: "row",
    marginHorizontal: width * 0.04,
    justifyContent: "space-between",
    marginTop: 4,
  },
  review: {
    backgroundColor: "white",
    paddingTop: height * 0.03,
    paddingHorizontal: width * 0.04,
  },
  sizeText: {},
  sizeContainer: {
    width: width * 0.08,
    marginRight: 10,
    height: height * 0.05,
    justifyContent: "center",
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 2,
    borderColor: "black",
  },
  returnContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  customerReview: {
    backgroundColor: "lightgrey",
    width: width * 0.9,
    paddingTop: 10,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: height * 0.01,
    paddingBottom: 10,
  },
  image: {
    width: width * 0.2,
    height: height * 0.1,
    borderRadius: 8,
  },
});

export default Product;
