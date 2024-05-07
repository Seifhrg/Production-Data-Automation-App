import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./styles/FormAdminStyles";
import { Picker } from "@react-native-picker/picker";

const FormAdmin = ({ userData, handleInputChange, errors }) => {
  return (
    <View style={styles.formContainer}>
      {Object.entries(userData).map(([key, value]) =>
        key !== "description" && key !== "role" ? (
          <React.Fragment key={key}>
            <Text style={styles.label}>
              {key.replace(/^./, key[0].toUpperCase())}
            </Text>
            <TextInput
              style={[
                styles.input,
                errors[key] ? { borderColor: "#D32F2F" } : {},
              ]}
              placeholder={`Enter your ${key}`}
              value={value}
              onChangeText={(text) => handleInputChange(key, text)}
              secureTextEntry={key === "password"}
              keyboardType={key === "phoneNumber" ? "phone-pad" : "default"}
            />
            {errors[key] && <Text style={styles.errorText}>{errors[key]}</Text>}
          </React.Fragment>
        ) : null
      )}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={userData.description}
        onChangeText={(text) => handleInputChange("description", text)}
      />
      <Text style={styles.label}>Role</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={userData.role}
          onValueChange={(itemValue) => handleInputChange("role", itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Agent" value="Agent" />
          <Picker.Item label="Responsable_Stock" value="Responsable_Stock" />
          {/* Add other roles as necessary */}
        </Picker>
      </View>
    </View>
  );
};

export default FormAdmin;
