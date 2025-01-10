import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useDispatch, useSelector } from "react-redux";
import { SimpleGrid } from "react-native-super-grid";
import {
  addWishList,
  removeWishList,
  selectWishlist,
} from "@/redux-toolkit/WishSlice";
import { globalStyles } from "@/Styles/globalStyles";
import ListItem1 from "@/components/ListItem1";
import Items from "@/components/Items";
import CustomHeader from "@/components/CustomHeader";
import FilterComponent from "@/components/FilterComponent";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const { height } = Dimensions.get("window");

const Wishlist = () => {
  const [GridActive, setGridActive] = useState(false);
  const toggleGrid = () => setGridActive(!GridActive);

  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlist);
  const isWishlistEmpty = !wishlist || wishlist.length === 0;

  const removeItems = (item) => {
    dispatch(removeWishList(item));
    console.log("Item has been removed");
  };

  const HiddenItemWithActions = ({ item, onRemove }) => (
    <TouchableOpacity
      style={styles.backRightBtn}
      onPress={() => onRemove(item)}
    >
      <MaterialIcons name="delete-outline" size={24} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title="WishList" />
      <FilterComponent GridActive={GridActive} toggleGrid={toggleGrid} />

      {isWishlistEmpty ? (
        <View style={globalStyles.emptyContainer}>
          <Text style={globalStyles.emptyText}>No items in the wishlist</Text>
        </View>
      ) : GridActive ? (
        <ScrollView style={{ marginBottom: height * 0.15 }}>
          <SimpleGrid
            itemDimension={160}
            data={wishlist}
            renderItem={({ item }) => (
              <Items
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
                showRemoveButton={true}
                onRemove={() => removeItems(item)}
              />
            )}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        </ScrollView>
      ) : (
        <SwipeListView
          data={wishlist}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem1
              image={item.image}
              price={item.price}
              title={item.title}
              rating={item.rating || "0"}
              showRemoveButton={false}
            />
          )}
          renderHiddenItem={({ item }) => (
            <HiddenItemWithActions item={item} onRemove={removeItems} />
          )}
          rightOpenValue={-75}
          disableRightSwipe
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rowBack: {
    alignItems: "center",
    backgroundColor: "#002882",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    right: 0,
  },
  backTextWhite: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Wishlist;
