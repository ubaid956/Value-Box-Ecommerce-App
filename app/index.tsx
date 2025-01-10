import React, { Component } from "react";
import { View } from "react-native";
import Onboarding from "./Onboarding";
import store from "@/redux-toolkit/store";
import { Provider } from "react-redux";

export default class Index extends Component {
  render() {
    return (
   <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Onboarding />
        </View>
    </Provider> 
    );
  }
}
