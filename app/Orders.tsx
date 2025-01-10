import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import CustomHeader from "@/components/CustomHeader";
import OrderItem from "@/components/OrderItem";
import { useSelector } from "react-redux";
import CartItem from "@/components/CartItem";
import { selectCart } from "@/redux-toolkit/CartSlice";
import { selectShipping } from "@/redux-toolkit/ShippingSlice";

const FirstRoute = ({ cartList }) => {
  if (!cartList || cartList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.scene}
      data={cartList}
      renderItem={({ item }) => (
        <OrderItem
          title={item.description}
          image={item.picture}
          price={item.price}
          total={item.total}
          confirmbtn="Pay Now"
          cancelbtn="Cancel Order"
        />
      )}
      initialNumToRender={5} // Adjust based on your needs
      removeClippedSubviews={true} // For performance optimization
    />
  );
};
const SecondRoute = ({ shippingList }) => {
  if (!shippingList || shippingList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.scene}
      data={shippingList}
      renderItem={({ item }) => (
        <OrderItem
          title={item.title}
          image={item.image}
          price={item.price}
          total={item.total}
          cancelbtn="Cancel Order"
        />
      )}
      initialNumToRender={5} // Adjust based on your needs
      removeClippedSubviews={true} // For performance optimization
    />
  );
};

const ThirdRoute = () => (
  <ScrollView style={styles.scene}>
    <OrderItem
      title="Black polo shirt, designed for both comfort and style. Crafted from premium quality cotton, it offers a soft and breathable feel, perfect for everyday wear. The shirt features a classic collar with a two-button placket, giving it a refined yet casual look"
      image={require("../assets/images/CartItems/blackshirt.png")}
      price="Rs 9000"
      confirmbtn="Buy again"
      cancelbtn="Return/Refund"
    />
    <OrderItem
      title="Black Shirt Polo"
      image={require("../assets/images/CartItems/blackshirt.png")}
      price="Rs 9000"
      confirmbtn="Buy again"
      cancelbtn="Return/Refund"
    />
  </ScrollView>
);

const Orders = () => {
  const cartList = useSelector(selectCart);
  const shippingList = useSelector(selectShipping);
  console.log(shippingList);

  const renderScene = SceneMap({
    Pending: () => <FirstRoute cartList={cartList} />,
    Delivered: () => <SecondRoute shippingList={shippingList} />,
    Review: ThirdRoute,
  });
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "Pending", title: "Pending Payment" },
    { key: "Delivered", title: "Shipping" },
    { key: "Review", title: "Reviews", badge: 2 },
  ]);

  return (
    <View style={styles.container}>
      <CustomHeader title="Orders" />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={(props) => (
          <View style={styles.tabContainer}>
            {props.navigationState.routes.map((route, i) => (
              <TouchableOpacity
                key={route.key}
                style={styles.tab}
                onPress={() => setIndex(i)}
              >
                <View style={styles.tabContent}>
                  <Text
                    style={[
                      styles.tabText,
                      index === i && styles.activeTabText,
                    ]}
                  >
                    {route.title}
                  </Text>
                  {route.badge && (
                    <View style={styles.badgeContainer}>
                      <Text style={styles.badgeText}>{route.badge}</Text>
                    </View>
                  )}
                </View>
                {index === i && <View style={styles.activeTabIndicator} />}
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scene: {
    flex: 1,

    backgroundColor: "#f9f9f9",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 2,
  },
  tabText: {
    fontSize: 16,
    color: "black",
  },
  activeTabText: {
    color: "#002882",
    fontSize: 16,
  },
  activeTabIndicator: {
    marginTop: 4,
    height: 2,
    backgroundColor: "#002882", // Color for the active tab indicator
    width: "100%",
  },
  badgeContainer: {
    backgroundColor: "#002882", // Color for the badge
    borderRadius: 10,
    paddingHorizontal: 6,

    paddingVertical: 2,
    marginLeft: 8, // Add margin to the left to space it out from the title
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
});

export default Orders;
