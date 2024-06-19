import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Animated,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const FloatingActionMenu = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(200));

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
                navigation.navigate("WorkOrderRouting");
                toggleMenu();
              }}
            >
              <Icon
                name="paper-plane-outline"
                size={24}
                color="#007AFF"
                style={styles.menuIcon}
              />
              <Text style={styles.menuItemText}>Routing Related </Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    backgroundColor: "#007AFF",
    width: 40,
    height: 40,
    borderRadius: 20,
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
});

export default FloatingActionMenu;
