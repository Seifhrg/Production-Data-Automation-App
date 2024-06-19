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
    codeArticle: "",
    quantityOrdered: "",
    issuedQuantity: "0",
    unaccountedDirectLaborHours: "0",
    unaccountedDirectLaborAmount: "0",
    quantityCanceled: "0",
    documentType: "WO",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function validateInput() {
    let newErrors = {};
    if (!ArticleData.description) {
      newErrors.description = "Description is required";
    }
    if (!ArticleData.codeArticle) {
      newErrors.codeArticle = "Code Article is required";
    } else if (isNaN(Number(ArticleData.codeArticle))) {
      newErrors.codeArticle = "Code Article must be a number";
    }
    if (!ArticleData.quantityOrdered) {
      newErrors.quantityOrdered = "Quantity ordered is required";
    }
    if (isNaN(ArticleData.quantityOrdered) || ArticleData.quantityOrdered < 0) {
      newErrors.quantityOrdered = "Quantity Ordered must be a positive number";
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

      const formData = {
        ...ArticleData,
        codeArticle: parseInt(ArticleData.codeArticle, 10),
        quantityOrdered: Number(ArticleData.quantityOrdered),
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

      console.log(formData);

      try {
        // Fetch the current ItemLocation data
        const itemLocationResponse = await axios.get(
          `http://${API_URL}/item-location/${formData.codeArticle}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const itemLocation = itemLocationResponse.data;
        const newQuantityAvailable =
          itemLocation.quantityAvailable - formData.quantityOrdered;

        if (newQuantityAvailable < 0) {
          Alert.alert(
            "Error",
            "Not enough quantity available in stock for the requested article."
          );

          // Send email alert
          try {
            const emailResponse = await axios.post(
              `http://${API_URL}/email/send-stock-alert`,
              {
                codeArticle: formData.codeArticle,
                quantityOrdered: formData.quantityOrdered,
                quantityAvailable: newQuantityAvailable,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            console.log("Email response:", emailResponse.data);
          } catch (emailError) {
            console.error(
              "Email alert error:",
              emailError.response || emailError.message || emailError
            );
            Alert.alert("Error", "Failed to send stock alert email.");
          }
          setLoading(false);

          return;
        }

        // First API call to add work order parts list
        const response = await axios.post(
          `http://${API_URL}/work-order-parts-list`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const { UKID } = response.data;

        const transactionData = {
          numOF: formData.numOF,
          codeArticle: formData.codeArticle,
          UKID: UKID,
          orderAndTransactionDate: new Date(),
          quantityAvailable: newQuantityAvailable,
          documentType: "WO",
          transactionExplanation: "Requested Article quantity",
        };

        await axios.post(
          `http://${API_URL}/transaction-history`,
          transactionData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        await axios.patch(
          `http://${API_URL}/item-location/${formData.codeArticle}`,
          {
            quantityAvailable: newQuantityAvailable,
            quantityOnHand:
              itemLocation.quantityOnHand - formData.quantityOrdered,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        Alert.alert("Success", "Article Added Successfully");
        if (route.params.refresh) {
          route.params.refresh();
        }
        navigation.goBack();
      } catch (error) {
        console.error("Submission error:", error);
        Alert.alert(
          "Error",
          "Failed to add article. Please make sure that the article exists in the stock list OR you use it twice in this WO."
        );
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
