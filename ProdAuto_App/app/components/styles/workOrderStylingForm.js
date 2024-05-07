import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: "#F6F8FA",
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 18,
      color: "#333",
      marginBottom: 8,
      fontWeight: "600",
    },
    input: {
      borderWidth: 1,
      borderColor: "#CCCCCC",
      backgroundColor: "#FFFFFF",
      paddingVertical: 12,
      paddingHorizontal: 16,
      fontSize: 16,
      borderRadius: 8,
      color: "#333",
    },
    datePickerButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#007AFF",
      justifyContent: "space-between",
    },
    datePickerText: {
      color: "#333",
      fontSize: 16,
      marginRight: 10,
    },
    icons: {
      color: "#007AFF",
    },
    submitButton: {
      backgroundColor: "#007AFF",
      paddingVertical: 16,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 20,
      elevation: 2,
      marginBottom: 100,
    },
    submitText: {
      fontSize: 18,
      color: "#FFFFFF",
      fontWeight: "bold",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
    },
    option: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#CCCCCC",
    },
    optionText: {
      fontSize: 16,
      color: "#333",
    },
    errorText: {
      fontSize: 14,
      color: "red",
      marginTop: 5,
    },
  });
  export default styles;