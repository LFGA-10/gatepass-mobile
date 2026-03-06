import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { Button } from "../components/Button";

type CheckoutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Checkout"
>;
type CheckoutScreenRouteProp = RouteProp<RootStackParamList, "Checkout">;

type Props = {
  navigation: CheckoutScreenNavigationProp;
  route: CheckoutScreenRouteProp;
};

export const CheckoutScreen: React.FC<Props> = ({ navigation, route }) => {
  const { parentName, phoneNumber, studentNames, totalVisitors, totalCost } =
    route.params;

  const [paymentMethod, setPaymentMethod] = useState<"momo" | "card" | null>(
    null,
  );

  const handleContinue = () => {
    if (paymentMethod) {
      navigation.navigate("Payment", {
        parentName,
        studentNames,
        totalVisitors,
        totalCost,
        paymentMethod,
      });
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerTitle}>Order Summary</Text>

      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.label}>Parent Name:</Text>
          <Text style={styles.value}>{parentName}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.value}>{phoneNumber}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.label}>Student Name(s):</Text>
          <Text style={styles.value}>{studentNames}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.label}>Number of Visitors:</Text>
          <Text style={styles.value}>{totalVisitors}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total Amount to Pay:</Text>
          <Text style={styles.totalValue}>{totalCost} RWF</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Select Payment Method</Text>

      <TouchableOpacity
        style={[
          styles.paymentOption,
          paymentMethod === "momo" && styles.paymentOptionSelected,
        ]}
        onPress={() => setPaymentMethod("momo")}
        activeOpacity={0.8}
      >
        <View style={styles.radioContainer}>
          <View
            style={[
              styles.radio,
              paymentMethod === "momo" && styles.radioSelected,
            ]}
          />
        </View>
        <Text style={styles.paymentText}>Mobile Money</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.paymentOption,
          paymentMethod === "card" && styles.paymentOptionSelected,
        ]}
        onPress={() => setPaymentMethod("card")}
        activeOpacity={0.8}
      >
        <View style={styles.radioContainer}>
          <View
            style={[
              styles.radio,
              paymentMethod === "card" && styles.radioSelected,
            ]}
          />
        </View>
        <Text style={styles.paymentText}>Credit/Debit Card</Text>
      </TouchableOpacity>

      <Button
        title="Continue to Payment"
        disabled={!paymentMethod}
        onPress={handleContinue}
        style={styles.continueButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#212529",
    marginBottom: 20,
  },
  summaryCard: {
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
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
    color: "#6c757d",
    flex: 1,
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#212529",
    flex: 2,
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: "#e9ecef",
    marginVertical: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#212529",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0056b3",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 16,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: "#dee2e6",
  },
  paymentOptionSelected: {
    borderColor: "#0056b3",
    backgroundColor: "#f0f7ff",
  },
  radioContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#adb5bd",
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  radio: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "transparent",
  },
  radioSelected: {
    backgroundColor: "#0056b3",
  },
  paymentText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#212529",
  },
  continueButton: {
    marginTop: 20,
  },
});
