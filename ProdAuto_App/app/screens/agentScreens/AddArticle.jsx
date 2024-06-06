import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity, Text, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import styles from "./Styles/WorkOrderStyle";
import { API_URL } from "@env";
import ArticleForm from "../../components/ArticlesOf/ArticleForm";
import { useAuthStore } from "../../providers/AuthProvider";

export default function AddArticle({ navigation, route }) {
  const { token } = useAuthStore();
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
      newErrors.quantityOrdered = "Quantity ordered is required";
    }

    if (
      isNaN(ArticleData.quantityCanceled) ||
      ArticleData.quantityCanceled < 0
    ) {
      newErrors.quantityCanceled = "Must be a number";
    }
    if (isNaN(ArticleData.issuedQuantity) || ArticleData.issuedQuantity < 0) {
      newErrors.issuedQuantity = "Must be a number";
    }
    if (
      isNaN(ArticleData.unaccountedDirectLaborAmount) ||
      ArticleData.unaccountedDirectLaborAmount < 0
    ) {
      newErrors.unaccountedDirectLaborAmount = "Must be a number";
    }
    if (
      isNaN(ArticleData.unaccountedDirectLaborHours) ||
      ArticleData.unaccountedDirectLaborHours < 0
    ) {
      newErrors.unaccountedDirectLaborHours = "Must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (validateInput()) {
      setLoading(true);

      // Prepare data for submission by converting relevant fields to integers
      const formData = {
        ...ArticleData,
        quantityOrdered: parseInt(ArticleData.quantityOrdered, 10),
        issuedQuantity: parseInt(ArticleData.issuedQuantity, 10),
        unaccountedDirectLaborHours: parseInt(
          ArticleData.unaccountedDirectLaborHours,
          10
        ),
        unaccountedDirectLaborAmount: parseInt(
          ArticleData.unaccountedDirectLaborAmount,
          10
        ),
        quantityCanceled: parseInt(ArticleData.quantityCanceled, 10),
      };

      try {
        // First API call to add work order parts list
        await axios.post(`http://${API_URL}/work-order-parts-list`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Second API call to add transaction history
        const transactionData = {
          numOF: formData.numOF,

          codeArticle: formData.LITM,
          orderAndTransactionDate: new Date().toISOString(),
          recordCreationDate: new Date().toISOString(),
          documentType: "WO",
        };

        await axios.post(
          `http://${API_URL}/transaction-history`,
          transactionData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        Alert.alert("Success");
        if (route.params.refresh) {
          route.params.refresh();
        }
        navigation.goBack();
      } catch (error) {
        Alert.alert(
          "Error",
          "Failed to add the work order parts list and transaction history. Please try again."
        );
        console.error("Submission error:", error);
      } finally {
        setLoading(false);
      }
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
