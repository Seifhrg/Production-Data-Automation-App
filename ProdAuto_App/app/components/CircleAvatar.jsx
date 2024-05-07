//avatar without menu list
import React from "react";
import { View, Text } from "react-native";

const CircleAvatar = ({ doco, firstName, lastName }) => {
  const getRandomColor = () => {
    const colors = ["#6a1b9a", "#00695c", "#ef6c00", "#2e7d32", "#1565c0"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getInitials = (firstName, lastName) => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    return ""; // Return empty if names are not provided
  };

  // Determine what content to display in the avatar the name or doco is provided
  const content = doco ? doco.toString() : getInitials(firstName, lastName);

  return (
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: getRandomColor(),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 24 }}>{content}</Text>
    </View>
  );
};

export default CircleAvatar;
