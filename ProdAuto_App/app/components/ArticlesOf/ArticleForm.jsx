import React, { useState } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";

import styles from "../styles/workOrderStylingForm";
import { ColorSpace } from "react-native-reanimated";
//need to be reviewed and fixed
const ArticleForm = ({
  ArticleData,
  handleInputChange,
  errors,
  handleSubmit,
  isUpdate = false,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.entries(ArticleData).map(([key, value]) => {
        if (key === "updatedDate" || key === "numOF") return null;

        return (
          <View key={key} style={styles.inputContainer}>
            <Text style={styles.label}>
              {key
                .replace(/([A-Z])/g, " $1")
                .charAt(0)
                .toUpperCase() + key.replace(/([A-Z])/g, " $1").slice(1)}
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleInputChange(key, text)}
              value={
                value !== null && value !== undefined ? value.toString() : ""
              }
              placeholderTextColor="#999"
              placeholder="Enter value"
            />
            {errors[key] && <Text style={styles.errorText}>{errors[key]}</Text>}
          </View>
        );
      })}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>{isUpdate ? "Update" : "Create"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ArticleForm;
