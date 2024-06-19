import React, { useEffect, useState } from "react";
import { ScrollView, View, TouchableOpacity, Text, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import styles from "./Styles/WorkOrderStyle";
import { API_URL } from "@env";
import WorkOrderForm from "../../components/WorkOrderForm";
import { statusOptions } from "../../config/StatusOptions";
import { useSelector } from "react-redux"; // import useSelector
import { useAuthStore } from "../../providers/AuthProvider";
import FloatingActionMenu from "../../components/FloatingActionMenu";
const WorkOrderUpdate = ({ navigation }) => {
  const { token } = useAuthStore();
  const workOrder = useSelector((state) => state.workOrders.selectedWorkOrder); // retrieve the selected workOrder from the store
  console.log("from redux", workOrder);
  if (!workOrder) {
    // handle the case where workOrder is null
    Alert.alert("Error", "No work order selected.");
    navigation.goBack();
    return null;
  }

  const DOCO = workOrder.DOCO;

  // Extract initial status code based on the label to show in the form
  const initialStatusCode =
    statusOptions.find((option) => option.label === workOrder.statusCode)
      ?.code || workOrder.statusCode;

  const [workOrderData, setWorkOrderData] = useState({
    quantityOrdered: workOrder.quantityOrdered,
    requestedDate: new Date(workOrder.requestedDate),
    workOrderDate: new Date(workOrder.workOrderDate),
    startDate: new Date(workOrder.startDate),
    quantityShipped: workOrder.quantityShipped,
    quantityCanceled: workOrder.quantityCanceled,
    unaccountedDirectLaborHours: workOrder.unaccountedDirectLaborHours,
    documentType: workOrder.documentType,
    statusChangeDate: new Date(workOrder.statusChangeDate),
    statusCode: initialStatusCode,
    completionDate: new Date(workOrder.completionDate),
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    if (field === "statusCode" && typeof value === "string") {
      const foundStatus = statusOptions.find(
        (option) => option.label === value
      );
      value = foundStatus ? foundStatus.code : value;
    }
    setWorkOrderData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateInput = () => {
    let newErrors = {};
    if (!workOrderData.documentType) {
      newErrors.documentType = "Document type is required";
    }
    if (!workOrderData.statusCode) {
      newErrors.statusCode = "Status code is required";
    }
    // Add other necessary validations
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateInput()) {
      const payload = {
        ...workOrderData,
        quantityOrdered: parseInt(workOrderData.quantityOrdered, 10),
        quantityShipped: parseInt(workOrderData.quantityShipped, 10),
        quantityCanceled: parseInt(workOrderData.quantityCanceled, 10),
        unaccountedDirectLaborHours: parseInt(
          workOrderData.unaccountedDirectLaborHours,
          10
        ),
        statusCode: workOrderData.statusCode,
      };

      try {
        const response = await axios.patch(
          `http://${API_URL}/work-orders/${DOCO}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        Alert.alert("Success", "Work Order Updated Successfully");
        console.log(response);

        navigation.goBack();
      } catch (error) {
        console.error("Update error:", error);
        Alert.alert(
          "Error",
          "Failed to update the work order. Please try again."
        );
      }
    } else {
      let errorMessages = Object.values(errors).join("\n");
      Alert.alert("Validation Error", errorMessages);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.navButton}
        >
          <Icon name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>{workOrder.description}</Text>
        <FloatingActionMenu navigation={navigation} />
      </View>
      <WorkOrderForm
        workOrderData={workOrderData}
        handleInputChange={handleInputChange}
        errors={errors}
        handleSubmit={handleSubmit}
        isUpdate={true}
      />
    </ScrollView>
  );
};

export default WorkOrderUpdate;
