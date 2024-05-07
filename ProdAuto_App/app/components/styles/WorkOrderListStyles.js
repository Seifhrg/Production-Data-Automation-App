import {
    
    StyleSheet,
    
    Platform,
    
  } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F7F7F7",
      paddingTop: Platform.OS === "ios" ? 60 : 30,
    },
    navBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#CCCCCC",
    },
  
    navTitle: {
      fontSize: 20,
      fontWeight: "bold",
      flex: 1,
      textAlign: "center",
      paddingVertical: 20,
      paddingHorizontal: 15,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#ffffff",
      marginHorizontal: 10,
      marginTop: 10,
      padding: 15,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      justifyContent: "space-between",
    },
    deleteIcon: {
      padding: 10,
      borderRadius: 25,
      backgroundColor: "#FFF",
    },
    cardTouchable: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    cardDetails: {
      flex: 1,
      marginLeft: 15,
    },
    documentType: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
    },
    quantityOrdered: {
      fontSize: 16,
      color: "#555",
    },
    statusCode: {
      fontSize: 14,
      color: "#999",
    },
    requestedDate: {
      fontSize: 14,
      color: "#C30010",
    },
    listContainer: {
      paddingVertical: 20,
    },
  });
export default styles;  