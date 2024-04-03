import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { TouchableOpacity } from "react-native";
import { useAuthStore } from "../providers/AuthProvider";
export default function ResponsableStockHome() {
  const { logout } = useAuthStore();
  return (
    <View>
      <Text>ResponsableStockHome</Text>
      <TouchableOpacity
        onPress={logout}
        style={tw`bg-blue-500 w-full rounded-none my-0 p-3`}
      >
        <Text style={tw`text-base text-white text-center`}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
