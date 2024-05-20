import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity, Text, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import styles from "./Styles/WorkOrderStyle";
import { API_URL } from "@env";
import ArticleForm from "../../components/ArticlesOf/ArticleForm";
//need to be reviewed and fixed
export default function AddArticle({ navigation, route }) {
  const { numOF } = route.params;

  const [ArticleData, setArticleData] = useState({
    numOF: numOF,
    LITM: "",
    quantityOrdered: "",
    issuedQuantity: "0",
    unaccountedDirectLaborHours: "0",
    unaccountedDirectLaborAmount: "0",
    quantityCanceled: "0",
    documentType: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function validateInput() {
    let newErrors = {};
    if (!ArticleData.documentType) {
      newErrors.documentType = "Document type is required";
    }
    if (!ArticleData.LITM) {
      newErrors.LITM = "LITM code is required";
    }
    if (
      (!ArticleData.quantityOrdered && isNaN(ArticleData.quantityOrdered)) ||
      ArticleData.quantityOrdered < 0
    ) {
      newErrors.quantityOrdered = "quantityOrdered  is required";
    }

    if (
      isNaN(ArticleData.quantityCanceled) ||
      ArticleData.quantityCanceled < 0
    ) {
      newErrors.quantityCanceled = " must be a  number";
    }
    if (isNaN(ArticleData.issuedQuantity) || ArticleData.issuedQuantity < 0) {
      newErrors.issuedQuantity = " must be a  number";
    }
    if (
      isNaN(ArticleData.unaccountedDirectLaborAmount) ||
      ArticleData.unaccountedDirectLaborAmount < 0
    ) {
      newErrors.unaccountedDirectLaborAmount = " must be a  number";
    }
    if (
      isNaN(ArticleData.unaccountedDirectLaborHours) ||
      ArticleData.unaccountedDirectLaborHours < 0
    ) {
      newErrors.unaccountedDirectLaborHours = " must be a  number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (validateInput()) {
      setLoading(true);

      // Prepare data for submission by converting relevant fields to integers
      const formData = {
        ...ArticleData,
        quantityOrdered: parseInt(ArticleData.quantityOrdered, 10), // Convert to integer
        issuedQuantity: parseInt(ArticleData.issuedQuantity, 10), // Convert to integer
        unaccountedDirectLaborHours: parseInt(
          ArticleData.unaccountedDirectLaborHours,
          10
        ), // Convert to integer
        unaccountedDirectLaborAmount: parseInt(
          ArticleData.unaccountedDirectLaborAmount,
          10
        ), // Convert to integer
        quantityCanceled: parseInt(ArticleData.quantityCanceled, 10), // Convert to integer
      };
      console.log("formData", formData);
      axios
        .post(`http://${API_URL}/work-order-parts-list`, formData)
        .then((res) => {
          Alert.alert("Success", "New Work Order Parts List Added");
          console.log(res);
          if (route.params.refresh) {
            route.params.refresh();
          }
          navigation.goBack();
        })
        .catch((error) => {
          Alert.alert(
            "Error",
            "Failed to add the work order parts list. Please try again."
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
    setArticleData((prev) => ({
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
        <Text style={styles.navTitle}>Add Article</Text>
      </View>
      <ArticleForm
        ArticleData={ArticleData}
        handleInputChange={handleInputChange}
        errors={errors}
        handleSubmit={handleSubmit}
      />
    </ScrollView>
  );
}
