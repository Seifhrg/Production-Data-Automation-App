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
                <Text style={styles.menuHeader}>{user.email}</Text>
                <Text style={styles.menuItem}>{user.role}</Text>
                <TouchableOpacity
                  onPress={onLogout}
                  style={styles.logoutButton}
                >
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
    fontSize: 18,
    color: "#2C5282",
    marginBottom: 16,
    fontWeight: "600",
  },
  menuItem: {
    fontSize: 16,
    color: "#2C5282",
    marginBottom: 16,
  },
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: "#E53E3E", // Deep red for emphasis
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
