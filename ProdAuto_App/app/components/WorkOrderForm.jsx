import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles/workOrderStylingForm";

const statusOptions = [
  { label: "Work Order Launched", code: "10" },
  { label: "Material Issued", code: "30" },
  { label: "Partial Receipt", code: "45" },
  { label: "Work Order Completed", code: "50" },
  { label: "Accounting Completed", code: "91" },
  { label: "Work Order Closed", code: "99" },
];

const WorkOrderForm = ({
  workOrderData,
  handleInputChange,
  errors,
  handleSubmit,
  isUpdate = false, // Determines if the form is used for update
}) => {
  const [datePickerShown, setDatePickerShown] = useState({
    requestedDate: false,
    workOrderDate: false,
    statusChangeDate: false,
    completionDate: false,
    startDate: false,
  });
  const [modalVisible, setModalVisible] = useState(false);

  const handleDateChange = (event, selectedDate, key) => {
    const currentDate = selectedDate || new Date(workOrderData[key]);
    handleInputChange(key, currentDate);
    setDatePickerShown({ ...datePickerShown, [key]: false });
  };

  const showDatePicker = (key) => {
    setDatePickerShown({ ...datePickerShown, [key]: true });
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
              .trim()
              .charAt(0)
              .toUpperCase() +
              key
                .replace(/([A-Z])/g, " $1")
                .trim()
                .slice(1)}
          </Text>
          {key.includes("Date") ? (
            <>
              <TouchableOpacity
                onPress={() => showDatePicker(key)}
                style={styles.datePickerButton}
              >
                <Text style={styles.datePickerText}>
                  {new Date(value).toDateString()}
                </Text>
                <MaterialIcons
                  name="calendar-today"
                  size={24}
                  color={styles.icons.color}
                />
              </TouchableOpacity>
              {datePickerShown[key] && (
                <DateTimePicker
                  value={new Date(value)}
                  mode="date"
                  display="spinner"
                  onChange={(event, selectedDate) =>
                    handleDateChange(event, selectedDate, key)
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
                  {getStatusLabelByCode(value) || "Select Status"}
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
              value={value.toString()}
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
