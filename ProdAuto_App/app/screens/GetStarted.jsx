import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GetStarted = ({ navigation }) => {
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Initial fade-in animation for the entire view
    Animated.timing(buttonScale, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    // Scale down animation when the button is pressed
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    // Scale back to normal when the press is released
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 5,
      tension: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    navigation.navigate("HomeAdmin");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <Text style={styles.header}>Welcome to Our App!</Text>
          <Animated.View
            style={[styles.button, { transform: [{ scale: buttonScale }] }]}
          >
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handlePress}
              activeOpacity={0.8}
              style={styles.buttonInner}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#FFF",
    backgroundColor: "transparent",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#6200EE",
    borderRadius: 30,
    shadowColor: "#6200EE",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  buttonInner: {
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default GetStarted;
