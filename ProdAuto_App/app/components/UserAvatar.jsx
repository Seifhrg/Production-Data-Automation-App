import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons"; // Importing Icon

export default function UserAvatar({ user, onLogout }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const opacity = useState(new Animated.Value(0))[0];

  const toggleMenu = () => {
    if (!isMenuVisible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setIsMenuVisible(false));
    }
    setIsMenuVisible((prev) => !prev);
  };

  const closeMenu = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setIsMenuVisible(false));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu}>
        <Avatar.Text
          size={45}
          label={`${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`}
          color="#FFFFFF"
          style={styles.avatar}
        />
      </TouchableOpacity>

      {isMenuVisible && (
        <Modal transparent visible={isMenuVisible} onRequestClose={closeMenu}>
          <TouchableWithoutFeedback onPress={closeMenu}>
            <Animated.View style={[styles.modalOverlay, { opacity }]}>
              <View style={styles.menu}>
                <Text style={styles.menuHeader}>
                  {user.firstName} {user.lastName}
                </Text>
                <View style={styles.roleBadge}>
                  <Text style={styles.menuItem}>{user.role.toUpperCase()}</Text>
                </View>
                <TouchableOpacity
                  onPress={onLogout}
                  style={styles.logoutButton}
                >
                  <Icon name="logout" size={24} color="#FFFFFF" />
                  <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 10,
    paddingTop: 25,
  },
  avatar: {
    backgroundColor: "#005f73",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  menu: {
    position: "absolute",
    right: 10,
    top: 60,
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowColor: "#000",
    shadowOffset: { height: 3, width: 0 },
    elevation: 7,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  menuHeader: {
    fontSize: 20, // Slightly larger font size, adjust as needed
    color: "#000000", // Black color for text
    marginBottom: 4, // Reduced bottom margin
    fontWeight: "bold", // Bold font weight
    textTransform: "uppercase", // Uppercase text
  },

  roleBadge: {
    backgroundColor: "#EBF4FF", // Light blue background, adjust color as needed
    alignSelf: "flex-start", // Align to the start of the menu
    borderRadius: 15, // Half of the height and width to create a circle
    paddingVertical: 2, // Small vertical padding
    paddingHorizontal: 10,
    marginBottom: 13,
  },
  menuItem: {
    fontSize: 12, // Adjust font size as needed
    fontWeight: "bold",
    color: "#0504AA", // Adjust text color to match your design
    textAlign: "center",
  },
  logoutButton: {
    flexDirection: "row", // Added for inline icon and text
    alignItems: "center", // Align icon and text vertically
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: "#DE0A26", // Deep red for emphasis
  },
  logoutButtonText: {
    marginLeft: 10, // Space between icon and text
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
