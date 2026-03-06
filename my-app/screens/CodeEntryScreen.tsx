import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

type CodeEntryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CodeEntry"
>;

type Props = {
  navigation: CodeEntryScreenNavigationProp;
};

export const CodeEntryScreen: React.FC<Props> = ({ navigation }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleProceed = () => {
    if (!code.trim()) {
      setError("School code is required");
      return;
    }

    // For now, any code works, but typically this would validate against an API or hardcoded list
    setError("");
    navigation.navigate("Registration");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.headerTitle}>Enter School Code</Text>
        <Text style={styles.headerSubtitle}>
          Please enter the code provided by the school to register your visit.
        </Text>

        <View style={styles.formCard}>
          <Input
            label="School Code"
            placeholder="e.g. 123456"
            keyboardType="default"
            value={code}
            onChangeText={(text) => {
              setCode(text);
              if (error) setError("");
            }}
            error={error}
          />
        </View>

        <Button title="Verify & Continue" onPress={handleProceed} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    padding: 24,
    flexGrow: 1,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#212529",
    marginBottom: 12,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 24,
  },
});
