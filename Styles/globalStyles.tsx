import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");
export const globalStyles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    alignItems:'center',
  },
  eCom_text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    width: "100%",
  },
  discriptionText: {
    fontSize: 15,
    color: "white",
    width: "100%",
  },
  lowerText: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign:'center',
    // marginLeft:width*0.03,
    width: width,
    paddingLeft: width*0.08,
    // position: "absolute",
    // bottom: height * 0.08,
    marginTop:height*0.05,
    // backgroundColor:'black',
    // color:'white'

  },
  backgroundImage: {
    width: width,
    height: height * 0.5,
    position: "absolute",
  },
  overlayContainer: {
    position: "absolute",
    top: height * 0.13, // Adjust the value to control vertical position
    left: 20,
    alignItems: "flex-start",
    width: width * 0.5,
  },
  lowerContainer: {
    marginTop: height * 0.5,
    height: height * 0.5,
    width: width,
    alignItems: "center",
    flexDirection:'column',
    // justifyContent:'center'
    // backgroundColor:'black'
  },
  iconText: {
    color: "#FFC136",
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
  inputField: {
    width: width * 0.8,
    // marginBottom:height*0.03,
    height: height * 0.06,
    // marginHorizontal: width * 0.1,
    borderColor: "black",
    // backgroundColor:'black',
    paddingLeft:10,
    borderWidth: 1,
    borderRadius: 5,
  },
  label: {
    marginHorizontal: width * 0.1,
    fontWeight: "bold",
    marginBottom: 2,
  },
  errorText: {
    marginHorizontal: width * 0.1,
    color: "red",
    marginBottom: height * 0.01,
  },
  header: {
    paddingTop: height * 0.05,
    paddingLeft: width * 0.03,
  
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    position: "static",
  },
  emptyContainer: {
    // backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.3,
  },
  emptyText: {
    fontSize: 18,
    color: "#333",
  },

  mainText: {
    fontSize: 36,
    color: "#0C134F",
    fontWeight: "bold",
    marginVertical: "1%",
    marginTop: "2%",
  },
  credentialText: {
    fontSize: 17,
    opacity: 0.55,
  },
  credentialText2: {
    fontSize: 22,
    opacity: 0.55,
    marginBottom: 8,
  },
  signin_container: {
    marginTop: height * 0.1,
    marginHorizontal: width * 0.1,
    flexDirection: "column",
    height: height * 0.1,
  },
  errorText: {
    color: "red",
    marginBottom: height * 0.01,
  },
  // inputField: {
  //   width: width * 0.8,
  //   borderWidth: 1,
  //   borderColor: "#DDD",
  //   backgroundColor: "#FFF",
  //   borderRadius: 10,
  //   height: 50,
  //   padding: 10,
  //   // marginBottom: height * 0.02,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 5,
  //   elevation: 5,
  // },
  upperText: {
    color: "#000000",
    fontSize: 14,
    marginBottom: 5,
    opacity: 0.7,
  },
  error: {
    fontSize: 14,
    marginBottom: height * 0.02,
    marginHorizontal: width * 0.01,
    opacity: 0.7,
    color: "red",
  },
});
