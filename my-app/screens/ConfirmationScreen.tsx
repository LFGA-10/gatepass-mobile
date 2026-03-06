import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { Button } from "../components/Button";

type ConfirmationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Confirmation"
>;
type ConfirmationScreenRouteProp = RouteProp<
  RootStackParamList,
  "Confirmation"
>;

type Props = {
  navigation: ConfirmationScreenNavigationProp;
  route: ConfirmationScreenRouteProp;
};

export const ConfirmationScreen: React.FC<Props> = ({ navigation, route }) => {
  const { parentName, studentNames, totalVisitors, totalCost } = route.params;

  // Prompt: Display confirmation message, Parent Name, Student Name, Number of Visitors, Amount Paid
  const otherPeopleCount = totalVisitors - 1;
  const otherPeopleText =
    otherPeopleCount > 0
      ? `with ${otherPeopleCount} other visitor${otherPeopleCount > 1 ? "s" : ""} `
      : "";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>✅</Text>
      </View>

      <Text style={styles.headerTitle}>Confirmation Successful.</Text>

      <Text style={styles.paragraphText}>
        {parentName} is coming to visit {studentNames} {otherPeopleText}and has
        paid {totalCost} RWF.
      </Text>

      <Text style={styles.paragraphText}>
        Please show this confirmation at the school gate.
      </Text>

      <View style={styles.detailsCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.label}>Parent Name:</Text>
          <Text style={styles.value}>{parentName}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.label}>Student Name:</Text>
          <Text style={styles.value}>{studentNames}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.label}>Total Visitors:</Text>
          <Text style={styles.value}>{totalVisitors}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.label}>Amount Paid:</Text>
          <Text style={styles.value}>{totalCost} RWF</Text>
        </View>
      </View>

      <View style={styles.qrPlaceholder}>
        <Text style={styles.qrText}>[ QR Code Placeholder ]</Text>
      </View>

      <Button
        title="Done"
        onPress={() => navigation.popToTop()}
        style={styles.doneButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0056b3", // Theming confirmation screen to be distinct
  },
  content: {
    padding: 24,
    paddingBottom: 40,
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconText: {
    fontSize: 40,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraphText: {
    fontSize: 16,
    color: "#e9ecef",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 24,
  },
  detailsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    marginVertical: 24,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#6c757d",
    flex: 1,
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#212529",
    flex: 1.5,
    textAlign: "right",
  },
  qrPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginBottom: 32,
  },
  qrText: {
    color: "#adb5bd",
    fontWeight: "500",
  },
  doneButton: {
    backgroundColor: "#ffffff",
    // Wait, the Button component doesn't take backgroundColor inside style well without defining it inline.
    // Button component has primary, secondary, outline variants.
    // Let's use variant="secondary" or outline, but secondary works well.
  },
});
