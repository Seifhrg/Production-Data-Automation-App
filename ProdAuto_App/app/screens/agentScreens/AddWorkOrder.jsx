import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity, Text, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import styles from "./Styles/WorkOrderStyle";
import { API_URL } from "@env";
import WorkOrderForm from "../../components/WorkOrderForm";
import { statusOptions } from "../../config/StatusOptions";
import { useAuthStore } from "../../providers/AuthProvider";
import FloatingActionMenu from "../../components/FloatingActionMenu";

export default function AddWorkOrder({ navigation }) {
  const { token } = useAuthStore();
  console.log("token from useAuthStore", token);
  const [workOrderData, setWorkOrderData] = useState({
    description: "",
    quantityOrdered: "",
    requestedDate: new Date(),
    workOrderDate: new Date(),
    startDate: new Date(),
    quantityShipped: "0",
    quantityCanceled: "0",
    unaccountedDirectLaborHours: "0",
    documentType: "WO",
    statusChangeDate: new Date(),
    statusCode: "", // Initialize as empty or set a default code
    completionDate: new Date(),
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);

  function validateInput() {
    let newErrors = {};
    if (!workOrderData.description) {
      newErrors.description = "Description  is required";
    }

    if (!workOrderData.statusCode) {
      newErrors.statusCode = "Status code is required";
    }
    if (
      isNaN(workOrderData.quantityOrdered) ||
      workOrderData.quantityOrdered < 0
    ) {
      newErrors.quantityOrdered = " must be a  number";
    }
    if (
      isNaN(workOrderData.quantityShipped) ||
      workOrderData.quantityShipped < 0
    ) {
      newErrors.quantityShipped = " must be a  number";
    }
    if (
      isNaN(workOrderData.quantityCanceled) ||
      workOrderData.quantityCanceled < 0
    ) {
      newErrors.quantityCanceled = " must be a  number";
    }
    if (
      isNaN(workOrderData.unaccountedDirectLaborHours) ||
      workOrderData.unaccountedDirectLaborHours < 0
    ) {
      newErrors.unaccountedDirectLaborHours = " must be a  number";
    }
    // Add other validations as necessary
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (validateInput()) {
      setLoading(true);

      // Prepare data for submission by converting relevant fields to integers
      const formData = {
        ...workOrderData,
        quantityOrdered: parseInt(workOrderData.quantityOrdered, 10), // Convert to integer
        quantityShipped: parseInt(workOrderData.quantityShipped, 10), // Convert to integer
        quantityCanceled: parseInt(workOrderData.quantityCanceled, 10), // Convert to integer
        unaccountedDirectLaborHours: parseInt(
          workOrderData.unaccountedDirectLaborHours,
          10
        ), // Convert to integer
      };

      axios
        .post(`http://${API_URL}/work-orders`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          Alert.alert("Success", "New Work Order Added");
          console.log(res);
          setIsUpdate(true);
        })
        .catch((error) => {
          Alert.alert(
            "Error",
            "Failed to add the work order. Please try again."
          );
          console.error("Submission error:", error);
        })
        .finally(() => setLoading(false));
    } else {
      let errorMessages = Object.values(errors).join("\n");
      Alert.alert("Validation Error", errorMessages);
    }
  }

  function handleInputChange(field, value) {
    // Handle converting status labels to codes
    if (field === "statusCode" && typeof value === "string") {
      const foundStatus = statusOptions.find(
        (option) => option.label === value
      );
      value = foundStatus ? foundStatus.code : value; // ensure fallback to the original value if not found
    }

    setWorkOrderData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.navButton}
        >
          <Icon name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Add Work Order</Text>
        {isUpdate && <FloatingActionMenu navigation={navigation} />}
      </View>
      <WorkOrderForm
        workOrderData={workOrderData}
        handleInputChange={handleInputChange}
        errors={errors}
        handleSubmit={handleSubmit}
        isUpdate={isUpdate}
      />
    </ScrollView>
  );
}
