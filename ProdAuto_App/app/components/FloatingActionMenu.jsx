import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Animated,
  Platform,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { API_URL } from "@env";

const FloatingActionMenu = ({ navigation }) => {
  const workOrder = useSelector((state) => state.workOrders.selectedWorkOrder);
  const [menuVisible, setMenuVisible] = useState(false);
  const [pdfModalVisible, setPdfModalVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(200));
  const DOCO = workOrder.DOCO;

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: menuVisible ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: menuVisible ? 200 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePrint = async () => {
    try {
      console.log(`Requesting PDF for work order: ${DOCO}`);
      const response = await axios.post(`http://${API_URL}/pdf/${DOCO}`);
      console.log(`Server response: ${response.status}`);

      if (response.status === 200 || response.status === 201) {
        let { filePath } = response.data;

        // Replace backslashes with forward slashes
        filePath = filePath.replace(/\\/g, "/");

        // URL encode the file path
        const encodedFilePath = encodeURIComponent(filePath.split("/").pop());
        const downloadUrl = `http://${API_URL}/pdf/download/${encodedFilePath}`;

        console.log(`Download URL: ${downloadUrl}`);

        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission denied",
            "You need to grant storage permissions to download the file."
          );
          return;
        }

        const fileUri = FileSystem.documentDirectory + encodedFilePath;
        console.log(`Downloading file to: ${fileUri}`);

        const { uri } = await FileSystem.downloadAsync(downloadUrl, fileUri);
        console.log(`File downloaded to: ${uri}`);

        // Ensure correct file URI format for Android
        const assetUri =
          Platform.OS === "ios" ? uri.replace("file:///", "") : uri;

        const asset = await MediaLibrary.createAssetAsync(assetUri);
        if (asset) {
          console.log("Asset created:", asset);
        } else {
          console.error("Failed to create asset");
        }

        Alert.alert("Success", "PDF downloaded successfully");
      } else {
        Alert.alert("Error", "Failed to generate the PDF file");
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "An error occurred while generating or downloading the PDF file"
      );
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.floatingButton} onPress={toggleMenu}>
        <Icon name="grid-outline" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <Modal transparent={true} visible={menuVisible} animationType="none">
        <TouchableOpacity style={styles.modalOverlay} onPress={toggleMenu}>
          <Animated.View
            style={[
              styles.menuContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.menuTitle}>Menu</Text>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate("ListArticles");
                toggleMenu();
              }}
            >
              <Icon
                name="list-outline"
                size={24}
                color="#007AFF"
                style={styles.menuIcon}
              />
              <Text style={styles.menuItemText}>List Articles</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate("RoutingList");
                toggleMenu();
              }}
            >
              <Icon
                name="paper-plane-outline"
                size={24}
                color="#007AFF"
                style={styles.menuIcon}
              />
              <Text style={styles.menuItemText}>Routing Related</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setPdfModalVisible(true);
                toggleMenu();
              }}
            >
              <Icon
                name="print-outline"
                size={24}
                color="#007AFF"
                style={styles.menuIcon}
              />
              <Text style={styles.menuItemText}>Print PDF</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      <Modal transparent={true} visible={pdfModalVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.pdfModalContainer}>
            <Text style={styles.pdfModalTitle}>Print Options</Text>
            <TouchableOpacity
              style={styles.pdfModalButton}
              onPress={handlePrint}
            >
              <Text style={styles.pdfModalButtonText}>Print</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pdfModalButton}
              onPress={() => setPdfModalVisible(false)}
            >
              <Text style={styles.pdfModalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    backgroundColor: "#007AFF",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  menuContainer: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
    marginBottom: Platform.OS === "ios" ? 30 : 0,
  },
  menuTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 25,
    textAlign: "center",
    letterSpacing: 1.5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  menuIcon: {
    marginRight: 20,
  },
  menuItemText: {
    fontSize: 20,
    color: "#007AFF",
    fontWeight: "600",
  },
  pdfModalContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
  },
  pdfModalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
  },
  pdfModalButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  pdfModalButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default FloatingActionMenu;
