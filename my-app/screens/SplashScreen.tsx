import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Splash"
>;

type Props = {
  navigation: SplashScreenNavigationProp;
};

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Welcome");
    }, 2500); // 2.5 seconds delay

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Simulate Logo with stylized Text for now */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>GP</Text>
      </View>
      <Text style={styles.appName}>GatePass</Text>
      <Text style={styles.tagline}>School Visitor Management</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#0056b3",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffffff",
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: "#6c757d",
  },
});
