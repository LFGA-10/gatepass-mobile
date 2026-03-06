import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

// Screens
import { SplashScreen } from "../screens/SplashScreen";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { CodeEntryScreen } from "../screens/CodeEntryScreen";
import { RegistrationScreen } from "../screens/RegistrationScreen";
import { CheckoutScreen } from "../screens/CheckoutScreen";
import { PaymentScreen } from "../screens/PaymentScreen";
import { ConfirmationScreen } from "../screens/ConfirmationScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: "600",
        },
        headerTintColor: "#0056b3",
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CodeEntry"
        component={CodeEntryScreen}
        options={{ title: "Enter Code" }}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ title: "Register Visit" }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: "Checkout" }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ title: "Payment" }}
      />
      <Stack.Screen
        name="Confirmation"
        component={ConfirmationScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};
