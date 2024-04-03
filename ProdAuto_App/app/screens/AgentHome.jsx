import { View, Text } from "react-native";
import React from "react";
import { useAuthStore } from "../providers/AuthProvider";
import { TouchableOpacity } from "react-native";
import tw from "twrnc";
export default function AgentHome() {
  const { logout } = useAuthStore();
  return (
    <View>
      <Text>AgentHome</Text>
      <TouchableOpacity
        onPress={logout}
        style={tw`bg-blue-500 w-full rounded-none my-0 p-3`}
      >
        <Text style={tw`text-base text-white text-center`}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
