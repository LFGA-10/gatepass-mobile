import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

type RegistrationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Registration"
>;

type Props = {
  navigation: RegistrationScreenNavigationProp;
};

export const RegistrationScreen: React.FC<Props> = ({ navigation }) => {
  const [parentName, setParentName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentNames, setStudentNames] = useState("");
  const [visitorsCountStr, setVisitorsCountStr] = useState("1");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleVisitorsCountChange = (text: string) => {
    // Only allow numbers
    const cleanText = text.replace(/[^0-9]/g, "");
    setVisitorsCountStr(cleanText);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!parentName.trim()) newErrors.parentName = "Parent Name is required";
    if (!nationalId.trim()) newErrors.nationalId = "National ID is required";
    else if (!/^\d+$/.test(nationalId.trim()))
      newErrors.nationalId = "National ID must be numeric";

    if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone Number is required";
    else if (phoneNumber.trim().length < 10)
      newErrors.phoneNumber = "Phone Number is invalid";

    if (!studentNames.trim())
      newErrors.studentNames = "Student Name(s) are required";

    const count = parseInt(visitorsCountStr, 10);
    if (isNaN(count) || count < 1) {
      newErrors.visitorsCount = "Number of visitors must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceed = () => {
    if (validate()) {
      const count = parseInt(visitorsCountStr, 10);
      const totalCost = count * 100;

      navigation.navigate("Checkout", {
        parentName: parentName.trim(),
        nationalId: nationalId.trim(),
        phoneNumber: phoneNumber.trim(),
        studentNames: studentNames.trim(),
        totalVisitors: count,
        visitors: [], // No longer asking for individual names
        totalCost,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.headerTitle}>Visitor Details</Text>
        <Text style={styles.headerSubtitle}>
          Please fill in your details and the students you are visiting.
        </Text>

        <View style={styles.formCard}>
          <Input
            label="Parent Full Name"
            placeholder="e.g. John Doe"
            value={parentName}
            onChangeText={setParentName}
            error={errors.parentName}
          />

          <Input
            label="National ID"
            placeholder="e.g. 1199..."
            keyboardType="numeric"
            value={nationalId}
            onChangeText={setNationalId}
            error={errors.nationalId}
          />

          <Input
            label="Phone Number"
            placeholder="e.g. 078..."
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            error={errors.phoneNumber}
          />

          <Input
            label="Student(s) Being Visited"
            placeholder="e.g. Jane Doe"
            value={studentNames}
            onChangeText={setStudentNames}
            error={errors.studentNames}
          />

          <Input
            label="Total Number of Visitors (including you)"
            placeholder="1"
            keyboardType="numeric"
            value={visitorsCountStr}
            onChangeText={handleVisitorsCountChange}
            error={errors.visitorsCount}
          />
        </View>

        <Button
          title="Proceed to Checkout"
          onPress={handleProceed}
          style={styles.submitButton}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#212529",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: "#6c757d",
    marginBottom: 24,
  },
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#495057",
    marginTop: 12,
    marginBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
    paddingTop: 16,
  },
  additionalVisitorsContainer: {
    marginTop: 8,
  },
  submitButton: {
    marginTop: 8,
  },
});
