import React, { useState } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles/workOrderStylingForm";
import { statusOptions } from "../config/StatusOptions";

const WorkOrderForm = ({
  workOrderData,
  handleInputChange,
  errors,
  handleSubmit,
  isUpdate = false,
}) => {
  const [datePickerShown, setDatePickerShown] = useState({
    requestedDate: false,
    workOrderDate: false,
    statusChangeDate: false,
    completionDate: false,
    startDate: false,
  });
  const [modalVisible, setModalVisible] = useState(false);

  const showDatePicker = (key) => {
    setDatePickerShown((prev) => ({ ...prev, [key]: true }));
  };

  const handleDateChange = (key, event, selectedDate) => {
    setDatePickerShown((prev) => ({ ...prev, [key]: false }));
    if (selectedDate) {
      console.log(key, "key");
      handleInputChange(key, selectedDate);
    }
  };

  const getStatusLabelByCode = (code) => {
    const status = statusOptions.find((option) => option.code === code);
    return status ? status.label : "Select Status";
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.entries(workOrderData).map(([key, value]) => (
        <View key={key} style={styles.inputContainer}>
          <Text style={styles.label}>
            {key
              .replace(/([A-Z])/g, " $1")
              .charAt(0)
              .toUpperCase() + key.replace(/([A-Z])/g, " $1").slice(1)}
          </Text>
          {key.includes("Date") ? (
            <>
              <TouchableOpacity
                onPress={() => showDatePicker(key)}
                style={styles.datePickerButton}
              >
                <Text style={styles.datePickerText}>
                  {value ? new Date(value).toDateString() : "Select Date"}
                </Text>
                <MaterialIcons
                  name="calendar-today"
                  size={24}
                  color={styles.icons.color}
                />
              </TouchableOpacity>
              {datePickerShown[key] && (
                <DateTimePicker
                  value={new Date(value) || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) =>
                    handleDateChange(key, event, selectedDate)
                  }
                />
              )}
            </>
          ) : key === "statusCode" ? (
            <>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.datePickerButton}
              >
                <Text style={styles.datePickerText}>
                  {getStatusLabelByCode(value)}
                </Text>
                <MaterialIcons
                  name="arrow-drop-down"
                  size={24}
                  color={styles.icons.color}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <TouchableOpacity
                  style={styles.modalContainer}
                  onPress={() => setModalVisible(false)}
                >
                  <View style={styles.modalContent}>
                    {statusOptions.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.option}
                        onPress={() => {
                          handleInputChange("statusCode", option.code);
                          setModalVisible(false);
                        }}
                      >
                        <Text style={styles.optionText}>{option.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </TouchableOpacity>
              </Modal>
            </>
          ) : (
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleInputChange(key, text)}
              value={
                value !== null && value !== undefined ? value.toString() : ""
              }
              placeholderTextColor="#999"
              placeholder="Enter value"
            />
          )}
          {errors[key] && <Text style={styles.errorText}>{errors[key]}</Text>}
        </View>
      ))}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>{isUpdate ? "Update" : "Create"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default WorkOrderForm;
