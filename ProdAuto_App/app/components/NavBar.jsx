import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import UserAvatar from "./UserAvatar";

const NavBar = ({ user, onLogout, onBack, title }) => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={onBack} style={styles.navIcon}>
        <Icon name="arrow-back" size={24} color="#007AFF" />
      </TouchableOpacity>
      <Text style={styles.navBarTitle}>{title}</Text>
      <UserAvatar user={user} onLogout={onLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  navIcon: {
    paddingTop: 30,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    paddingVertical: 20,
    backgroundColor: "#ffffff",
  },

  navBarTitle: {
    paddingTop: 30,
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
});
export default NavBar;
