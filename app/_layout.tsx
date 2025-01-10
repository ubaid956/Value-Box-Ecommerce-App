import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "@/redux-toolkit/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="Onboarding" />
        <Stack.Screen name="Login"/>
        <Stack.Screen name="SignUp"/>
        
        <Stack.Screen name="(tabs)" /> 
        <Stack.Screen name="Orders"/>
        <Stack.Screen name="Product" />
        <Stack.Screen name="OrderSuccess" />
        <Stack.Screen name="ShopCategories"/>
       
      </Stack>
    </Provider>
  );
}
