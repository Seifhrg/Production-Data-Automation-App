//avatar without menu list
import React from "react";
import { View, Text } from "react-native";

const CircleAvatar = ({ firstName, lastName }) => {
  const getInitials = (firstName, lastName) => {
    const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
    return initials;
  };

  const getRandomColor = () => {
    const colors = ["#6a1b9a", "#00695c", "#ef6c00", "#2e7d32", "#1565c0"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

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
      <Text style={{ color: "#fff", fontSize: 24 }}>
        {getInitials(firstName, lastName)}
      </Text>
    </View>
  );
};

export default CircleAvatar;
