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
  const LITM = article.LITM;
  const UKID = article.UKID;

  const [ArticleData, setArticleData] = useState({
    quantityOrdered: article.quantityOrdered,
    issuedQuantity: article.issuedQuantity,
    unaccountedDirectLaborHours: article.unaccountedDirectLaborHours,
    unaccountedDirectLaborAmount: article.unaccountedDirectLaborAmount,
    quantityCanceled: article.quantityCanceled,
    documentType: article.documentType,
  });

  const [errors, setErrors] = useState({});

  //check The handle Input
  const handleInputChange = (field, value) => {
    setArticleData((prev) => ({ ...prev, [field]: value }));
    if (errors[field] !== null && errors[field] !== undefined) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateInput = () => {
    let newErrors = {};
    if (!ArticleData.documentType) {
      newErrors.documentType = "Document type is required";
    }
    if (isNaN(ArticleData.quantityOrdered) || ArticleData.quantityOrdered < 0) {
      newErrors.quantityOrdered = " must be a  number";
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
        const response = await axios.patch(
          `http://${API_URL}/work-order-parts-list/${LITM}/${UKID}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        Alert.alert("Success", "Article Updated Successfully");
        console.log(response);
        if (route.params.refresh) {
          route.params.refresh();
        }
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
