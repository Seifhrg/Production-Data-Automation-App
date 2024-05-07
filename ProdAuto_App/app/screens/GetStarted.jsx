import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {
  useFonts,
  LexendDeca_400Regular,
} from "@expo-google-fonts/lexend-deca";
import { useNavigation } from "@react-navigation/native";

import { useAuthStore } from "../providers/AuthProvider";
import { AbrilFatface_400Regular } from "@expo-google-fonts/abril-fatface";
import Icon from "react-native-vector-icons/Ionicons";

const GetStarted = ({ route }) => {
  const { screen } = route.params;
  const navigation = useNavigation();
  const { user } = useAuthStore();
  const [fontsLoaded] = useFonts({
    LexendDeca_400Regular,
    AbrilFatface_400Regular,
  });

  if (!fontsLoaded) {
    return null; // Or a custom loading component
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/Manufacturing_Mesh.jpg")}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <View style={styles.content}>
            <Text style={[styles.text, styles.greetingText]}>
              Bonjour {user.firstName} {user.lastName}
            </Text>
            <Text style={[styles.text, styles.mainText]}>
              Accelerate the production
            </Text>

            <TouchableOpacity
              style={styles.arrowButton}
              activeOpacity={0.8}
              onPress={() => navigation.navigate(`${screen}`)}
            >
              <Icon name="arrow-forward" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    padding: 20,
    paddingBottom: 80,
  },
  text: {
    color: "#FFD700",
    marginBottom: 16,
  },
  mainText: {
    fontFamily: "LexendDeca_400Regular",
    fontSize: 28,
    paddingBottom: 25,
  },
  greetingText: {
    fontFamily: "AbrilFatface_400Regular",
    fontSize: 32,
  },
  arrowButton: {
    backgroundColor: "#FFF",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    alignSelf: "flex-start",
  },
  arrowText: {
    fontSize: 18,
    color: "#FFFFFF", // White text color for contrast
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default GetStarted;
