import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";

import * as ImagePicker from "expo-image-picker";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Foundation from "@expo/vector-icons/Foundation";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import ModalHeader from "@/components/ModalHeader";
import { globalStyles } from "@/Styles/globalStyles";
import * as yup from "yup";
import { Formik } from "formik";
import CustomButton from "@/components/Buttons/CustomButton";
import Feather from "@expo/vector-icons/Feather";
import { Picker } from "@react-native-picker/picker";
import ShippingAddressModal from "@/components/Modals/ShippingModal";
import { useNavigation } from "expo-router";

const { width, height } = Dimensions.get("window");

const profileSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup
    .string()
    .min(10, "Phone Number must be at least 10 characters long")
    .required(),
});

const addressSchema = yup.object({
  name: yup.string().required(),
  phone: yup
    .string()
    .min(10, "Phone Number must be at least 10 characters long")
    .required(),
  address: yup.string().required(),
});

const Profile = () => {
  const [image, setImage] = useState(null);
  const [eidtProfile, setEditProfile] = useState(null);

  const [addressVisible, setAddressVisible] = useState(null);
  const countries = ["Pakistan", "India"];

  const currencies = ["PKR", "INR"];

  const language = ["English"];

  const toggleEditProfile = () => {
    setEditProfile(!eidtProfile);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    // You can implement your image upload logic here
    console.log("Image URI to upload:", uri);
  };

  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Select a country");

  const [isCurrencyVisible, setCurrencyVisible] = useState(false);
  const [selectedCurr, setCurr] = useState("PKR");

  const [isLanguageVisible, setLanguageVisible] = useState(false);
  const [selectedLan, setSelectedLan] = useState("English");

  const [isShipping, setShippingVisible] = useState(false);
  const renderLanguage = ({ item }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => {
        setSelectedLan(item);
        setLanguageVisible(false);
      }}
    >
      <Text style={styles.countryText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderCurrency = ({ item }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => {
        setCurr(item);
        setCurrencyVisible(false);
      }}
    >
      <Text style={styles.countryText}>{item}</Text>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => {
        setSelectedCountry(item);
        setPickerVisible(false); // Close the picker after selection
      }}
    >
      <Text style={styles.countryText}>{item}</Text>
    </TouchableOpacity>
  );

  const navigation = useNavigation();

  const HEADER_MAX = height * 0.2;
  const HEADER_MIN = height * 0.15;
  const Scroll_Distance = HEADER_MAX - HEADER_MIN;
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const DynamicHeader = ({ value }) => {
    // The inputRange specifies that the animation will occur as value changes from 0 to SCROLL_DISTANCE
    // The outputRange defines the corresponding header heights. extrapolate: "clamp"
    // ensures that the header height won't exceed the specified range.
    const animatedHeaderHeight = value.interpolate({
      inputRange: [0, Scroll_Distance],
      outputRange: [HEADER_MAX, HEADER_MIN],
      extrapolate: "clamp",
    });

    const animatedHeaderColor = value.interpolate({
      inputRange: [0, Scroll_Distance],
      outputRange: ["white", "white"],
      extrapolate: "clamp",
    });

    const animatedTextSize = value.interpolate({
      inputRange: [0, Scroll_Distance],
      outputRange: [26, 10], // Adjust these values as needed
      extrapolate: "clamp",
    });

    const animatedImageWidth = value.interpolate({
      inputRange: [0, Scroll_Distance],
      outputRange: [width * 0.18, 30], // Adjust these values as needed
      extrapolate: "clamp",
    });

    const animatedImageHeight = value.interpolate({
      inputRange: [0, Scroll_Distance],
      outputRange: [height * 0.09, 30], // Adjust these values as needed
      extrapolate: "clamp",
    });

    const animatedImageBorderRadius = value.interpolate({
      inputRange: [0, Scroll_Distance],
      outputRange: [50, 25], // Adjust these values as needed
      extrapolate: "clamp",
    });

    const animatedImageMarginStart = value.interpolate({
      inputRange: [0, Scroll_Distance],
      outputRange: [20, 10], // Adjust these values as needed
      extrapolate: "clamp",
    });

    const animatedTextOpacity = value.interpolate({
      inputRange: [0, Scroll_Distance],
      outputRange: [1, 0], // Fades out as header height decreases
      extrapolate: "clamp",
    });
    const showWishList = animatedHeaderHeight._value > HEADER_MIN + 10;

    return (
      <Animated.View style={[styles.topcontainer]}>
        <Pressable onPress={pickImage}>
          <Animated.Image
            source={
              image ? { uri: image } : require("../../assets/images/user.png")
            }
            style={{
              width: animatedImageWidth,
              height: animatedImageHeight,
              borderRadius: animatedImageBorderRadius,
              marginStart: animatedImageMarginStart,
              alignSelf: "center",
            }}
          />
        </Pressable>

        <View style={{ marginLeft: width * 0.02, alignSelf: "center" }}>
          <Animated.Text
            style={[
              styles.headerText,
              {
                fontSize: animatedTextSize,
              },
            ]}
          >
            John Doe
          </Animated.Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View>
      <DynamicHeader value={scrollOffsetY} />
      <ScrollView
        scrollEventThrottle={5}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          { useNativeDriver: false }
        )}
        style={{ marginBottom: height * 0.18 }}
        // style={{ flex: 1, backgroundColor: "#f9f9f9" }}
      >
        <View style={styles.orderContainer}>
          <Text style={styles.containerTitle}>My Orders</Text>
          <TouchableOpacity
            style={{ position: "absolute", right: 5, paddingTop: 10 }}
            onPress={() => navigation.navigate("Orders")}
          >
            <Text>View All Ordres</Text>
          </TouchableOpacity>

          <View style={styles.iconsContainer}>
            <TouchableOpacity
              style={styles.iconTextContainer}
              onPress={() => navigation.navigate("Orders")}
            >
              <Fontisto name="wallet" size={30} color="#002882" />
              <Text style={styles.iconText}>Pending Payment</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconTextContainer}
              onPress={() => navigation.navigate("Orders")}
            >
              <MaterialIcons name="local-shipping" size={30} color="#002882" />
              <Text style={styles.iconText}>Shipping</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconTextContainer}
              onPress={() => navigation.navigate("Orders")}
            >
              <MaterialIcons name="reviews" size={30} color="#002882" />
              <Text style={styles.iconText}>Reviews</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Services Container */}
        <View style={styles.orderContainer}>
          <Text style={styles.containerTitle}>Services</Text>
          <View style={styles.iconsContainer}>
            <TouchableOpacity style={styles.iconTextContainer}>
              <AntDesign name="customerservice" size={30} color="#002882" />
              <Text style={styles.iconText}>Customer care</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconTextContainer}>
              <MaterialIcons name="info-outline" size={30} color="#002882" />

              <Text style={styles.iconText}>About us</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconTextContainer}>
              <MaterialIcons name="feedback" size={30} color="#002882" />

              <Text style={styles.iconText}>About us</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.orderContainer}>
          <TouchableOpacity
            onPress={toggleEditProfile}
            style={[
              styles.iconTextContainer,
              {
                flexDirection: "row",
                width: width * 0.9,
                marginBottom: height * 0.03,
                marginTop: 10,
              },
            ]}
          >
            <Text style={styles.text}>Edit Profile</Text>
            <AntDesign
              name="right"
              size={20}
              color="black"
              style={{ position: "absolute", right: 5 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.iconTextContainer,
              {
                flexDirection: "row",
                width: width * 0.9,
                marginBottom: height * 0.03,
              },
            ]}
            onPress={() => setAddressVisible(!addressVisible)}
          >
            <Text style={styles.text}>Address</Text>
            <AntDesign
              name="right"
              size={20}
              color="black"
              style={{ position: "absolute", right: 5 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.iconTextContainer,
              {
                flexDirection: "row",
                width: width * 0.9,
                marginBottom: height * 0.03,
              },
            ]}
            onPress={() => setPickerVisible(!isPickerVisible)}
          >
            <Text style={styles.text}>Country</Text>
            <Text style={styles.label}>{selectedCountry}</Text>
            {/* Dynamically updating text */}
            <AntDesign
              name="right"
              size={20}
              color="black"
              style={{ position: "absolute", right: 5 }}
            />
          </TouchableOpacity>

          {/* Modal for Picker */}
          <Modal
            transparent={true}
            visible={isPickerVisible}
            animationType="slide"
            onRequestClose={() => setPickerVisible(false)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              onPress={() => setPickerVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.listContainer}>
                  <FlatList
                    data={countries}
                    keyExtractor={(item) => item}
                    renderItem={renderItem}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </Modal>

          <TouchableOpacity
            style={[
              styles.iconTextContainer,
              {
                flexDirection: "row",
                width: width * 0.9,
                marginBottom: height * 0.03,
              },
            ]}
            onPress={() => setCurrencyVisible(!isCurrencyVisible)}
          >
            <Text style={styles.text}>Currency</Text>
            <Text style={styles.label}>{selectedCurr}</Text>
            <AntDesign
              name="right"
              size={20}
              color="black"
              style={{ position: "absolute", right: 5 }}
            />
          </TouchableOpacity>

          {/* Modal for Currency */}
          <Modal
            transparent={true}
            visible={isCurrencyVisible}
            animationType="slide"
            onRequestClose={() => setCurrencyVisible(false)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              onPress={() => setCurrencyVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.listContainer}>
                  <FlatList
                    data={currencies}
                    keyExtractor={(item) => item}
                    renderItem={renderCurrency}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </Modal>

          <TouchableOpacity
            style={[
              styles.iconTextContainer,
              {
                flexDirection: "row",
                width: width * 0.9,
                marginBottom: height * 0.03,
              },
            ]}
            onPress={() => setLanguageVisible(!isLanguageVisible)}
          >
            <Text style={styles.text}>Language</Text>
            <Text style={styles.label}>{selectedLan}</Text>
            <AntDesign
              name="right"
              size={20}
              color="black"
              style={{ position: "absolute", right: 5 }}
            />
          </TouchableOpacity>
        </View>

        <Modal
          transparent={true}
          visible={isLanguageVisible}
          animationType="slide"
          onRequestClose={() => setLanguageVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setLanguageVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.listContainer}>
                <FlatList
                  data={language}
                  keyExtractor={(item) => item}
                  renderItem={renderLanguage}
                />
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Address Modal  */}
        <Modal
          animationType="left"
          visible={addressVisible}
          onRequestClose={() => setAddressVisible(!addressVisible)}
        >
          <View style={styles.addressModal}>
            <ModalHeader headerText="Address" toggleModal={toggleEditProfile} />
            <TouchableOpacity
              style={styles.addressBtn}
              onPress={() => setShippingVisible(!isShipping)}
            >
              <AntDesign name="plus" size={20} color="grey" />

              <Text style={{ marginLeft: 5 }}>Add Address</Text>
            </TouchableOpacity>
            <View style={styles.addressContainer}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>John Doe</Text>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{ width: 300, marginTop: 10, fontSize: 18 }}
              >
                House no 180 Islamabad, House no 180 Islamabad, House no 180
                Islamabad,
              </Text>
              <Text style={{ marginTop: 4 }}>03047796880</Text>
              <TouchableOpacity
                style={styles.changeText}
                onPress={() => setShippingVisible(!isShipping)}
              >
                <Text>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <ShippingAddressModal
          visible={isShipping}
          toggleModal={() => setShippingVisible(!isShipping)}
          addressSchema={addressSchema}
        />

        <Modal
          animationType="left"
          hasBackdrop={true}
          visible={eidtProfile}
          onRequestClose={toggleEditProfile}
        >
          <ModalHeader
            headerText="Edit Profile"
            toggleModal={toggleEditProfile}
          />
          <ScrollView style={styles.main}>
            <KeyboardAvoidingView
              style={styles.main}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150} // Adjust offset if needed
            >
              <View style={styles.main}>
                <Pressable
                  onPress={pickImage}
                  style={{
                    marginTop: height * 0.08,
                    alignSelf: "center",
                    marginBottom: height * 0.08,
                  }}
                >
                  <Image
                    source={
                      image
                        ? { uri: image }
                        : require("../../assets/images/user.png")
                    }
                    style={{
                      borderRadius: 50,
                      width: width * 0.18,
                      height: height * 0.09,
                      marginStart: 20,
                    }}
                  />
                </Pressable>
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    phone: "",
                  }}
                  validationSchema={profileSchema}
                >
                  {(props) => (
                    <View>
                      <Text style={globalStyles.label}>
                        Name <Text style={{ color: "red" }}>*</Text>
                      </Text>
                      <TextInput
                        placeholder="Name"
                        style={[globalStyles.inputField, { paddingLeft: 15 }]}
                        value={props.values.name}
                        onChangeText={props.handleChange("name")}
                        onBlur={props.handleBlur("name")}
                      />
                      <Text style={globalStyles.errorText}>
                        {props.touched.name && props.errors.name}
                      </Text>

                      <Text style={globalStyles.label}>
                        Email<Text style={{ color: "red" }}> *</Text>
                      </Text>
                      <TextInput
                        placeholder="Email"
                        style={[globalStyles.inputField, { paddingLeft: 15 }]}
                        value={props.values.email}
                        onChangeText={props.handleChange("email")}
                        onBlur={props.handleBlur("email")}
                      />
                      <Text style={globalStyles.errorText}>
                        {props.touched.address && props.errors.address}
                      </Text>
                      <Text style={globalStyles.label}>
                        Phone<Text style={{ color: "red" }}> *</Text>
                      </Text>
                      <TextInput
                        placeholder="Phone"
                        style={[globalStyles.inputField, { paddingLeft: 15 }]}
                        value={props.values.phone}
                        keyboardType="Numeric"
                        onChangeText={props.handleChange("phone")}
                        onBlur={props.handleBlur("phone")}
                      />
                      <Text style={globalStyles.errorText}>
                        {props.touched.phone && props.errors.phone}
                      </Text>
                      <CustomButton title="Save Changes" />
                    </View>
                  )}
                </Formik>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </Modal>

        <TouchableOpacity style={styles.logoutbtn}>
          <Text
            style={{ color: "white", width: width * 0.9, textAlign: "center" }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topcontainer: {
    flexDirection: "row",
    width: width,
    paddingTop: height * 0.07,
    paddingBottom: height * 0.01,
    backgroundColor: "white",
  },
  logoutbtn: {
    backgroundColor: "#002882",
    borderWidth: 1,
    borderColor: "#002882",
    marginTop: height * 0.04,
    width: width * 0.9,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
  },
  addressBtn: {
    borderWidth: 1,
    flexDirection: "row",
    borderColor: "#002882",
    width: width * 0.8,
    alignItems: "center",
    height: height * 0.08,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: height * 0.03,
    marginBottom: height * 0.01,
  },
  main: {
    flex: 1,
    flexDirection: "column",
    height: height,
    backgroundColor: "#ffffff",
  },
  username: {
    fontWeight: "bold",
    width: width,
    fontSize: 26,
  },
  orderContainer: {
    width: width * 0.9,
    marginHorizontal: width * 0.05,
    marginTop: height * 0.03,
    backgroundColor: "white",
    paddingBottom: height * 0.02,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  addressModal: {
    backgroundColor: "#f9f9f9",
    width: width,
    height: height,
  },
  addressContainer: {
    width: width,
    marginBottom: height * 0.08,
    backgroundColor: "white",
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  changeText: {
    position: "absolute",
    right: width * 0.05,
    top: 5,
  },
  label: {
    position: "absolute",
    right: width * 0.08,
    fontSize: 12,
  },
  iconTextContainer: {
    alignItems: "center",
    width: 100, // Adjust this to fit the icons properly within the available space
  },
  iconText: {
    marginTop: 5,
    color: "#002882",
    fontSize: 12,
  },

  containerTitle: {
    fontWeight: "bold",
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 10,
  },
  text: { marginLeft: 20, paddingLeft: 5, paddingTop: 5, fontSize: 18 },
  modalContainer: {
    width: width * 0.8,
    maxHeight: height * 0.6, // Adjust the height as needed
    borderRadius: 10,
    padding: 20,
    backgroundColor: "white",
  },
  modalOverlay: {
    flex: 1,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  listContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  countryItem: {
    padding: 15,
  },
  countryText: {
    fontSize: 16,
  },
});

export default Profile;
