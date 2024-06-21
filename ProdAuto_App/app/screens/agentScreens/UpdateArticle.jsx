import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity, Text, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import styles from "./Styles/WorkOrderStyle";
import { API_URL } from "@env";
import ArticleForm from "../../components/ArticlesOf/ArticleForm";
import { useAuthStore } from "../../providers/AuthProvider";

const UpdateArticle = ({ route, navigation }) => {
  const { token } = useAuthStore();
  const { article } = route.params;
  const { numOF } = route.params;

  const UKID = article.UKID;

  const [ArticleData, setArticleData] = useState({
    numOF: numOF,
    codeArticle: article.codeArticle,
    quantityOrdered: article.quantityOrdered,
    issuedQuantity: article.issuedQuantity,
    unaccountedDirectLaborHours: article.unaccountedDirectLaborHours,
    unaccountedDirectLaborAmount: article.unaccountedDirectLaborAmount,
    quantityCanceled: article.quantityCanceled,
    documentType: article.documentType,
    description: article.description,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setArticleData((prev) => ({ ...prev, [field]: value }));
    if (errors[field] !== null && errors[field] !== undefined) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

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
  const sendEmailAlert = async (payload, newQuantityAvailable) => {
    try {
      const emailResponse = await axios.post(
        `http://${API_URL}/email/send-stock-alert`,
        {
          codeArticle: payload.codeArticle,
          quantityOrdered: payload.quantityOrdered,
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
  };
  const handleSubmit = async () => {
    if (validateInput()) {
      const payload = {
        ...ArticleData,
        quantityOrdered: parseInt(ArticleData.quantityOrdered, 10),
        quantityCanceled: parseInt(ArticleData.quantityCanceled, 10),
        issuedQuantity: parseInt(ArticleData.issuedQuantity, 10),
        unaccountedDirectLaborAmount: parseInt(
          ArticleData.unaccountedDirectLaborAmount,
          10
        ),
        unaccountedDirectLaborHours: parseInt(
          ArticleData.unaccountedDirectLaborHours,
          10
        ),
      };

      try {
        // Fetch the current ItemLocation data
        const itemLocationResponse = await axios.get(
          `http://${API_URL}/item-location/${payload.codeArticle}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const itemLocation = itemLocationResponse.data;
        const quantityDifference =
          payload.quantityOrdered - article.quantityOrdered;
        const newQuantityAvailable =
          itemLocation.quantityAvailable - quantityDifference;

        if (newQuantityAvailable < 0) {
          Alert.alert(
            "Error",
            "Not enough quantity available in stock , we will send Email to stock manager "
          );
          await sendEmailAlert(payload, newQuantityAvailable);

          return;
        } else if (newQuantityAvailable <= 60) {
          await sendEmailAlert(payload, newQuantityAvailable);
        }

        // Update work order parts list
        const response = await axios.patch(
          `http://${API_URL}/work-order-parts-list/${UKID}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const transactionData = {
          numOF: payload.numOF,
          codeArticle: payload.codeArticle,
          UKID: UKID,
          orderAndTransactionDate: new Date(),
          quantityAvailable: newQuantityAvailable,
          documentType: "WO",
          transactionExplanation: "Update Article quantity",
        };

        // Create a new transaction
        await axios.post(
          `http://${API_URL}/transaction-history`,
          transactionData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Update item location
        await axios.patch(
          `http://${API_URL}/item-location/${payload.codeArticle}`,
          {
            quantityAvailable: newQuantityAvailable,
            quantityOnHand: itemLocation.quantityOnHand - quantityDifference,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        Alert.alert("Success", "Article Updated Successfully");
        if (route.params.refresh) {
          route.params.refresh();
        }
        navigation.goBack();
      } catch (error) {
        console.error("Update error:", error);

        Alert.alert("Error", "Failed to update the article. Please try again.");
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
        <Text style={styles.navTitle}>Article Details</Text>
      </View>
      <ArticleForm
        ArticleData={ArticleData}
        handleInputChange={handleInputChange}
        errors={errors}
        handleSubmit={handleSubmit}
        isUpdate={true}
      />
    </ScrollView>
  );
};

export default UpdateArticle;
