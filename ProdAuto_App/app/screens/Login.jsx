import {
  Image,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ActivityIndicator } from "react-native";
import tw from "twrnc";
import { Input } from "@rneui/themed";
import { useState } from "react";

import { useAuthStore } from "../providers/AuthProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(undefined);

  const [errors, setErrors] = useState({ email: "", password: "" });

  const { login } = useAuthStore();
  function handleSubmit() {
    let errors = {};

    if (!email) {
      errors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password needs to be 6 characters or more";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      login({ email, password })
        .then(() => {
          setLoading(true);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          setLoginError("Invalid Credentials !");
        });
    }
  }
  return (
    <ScrollView
      contentContainerStyle={tw`flex-grow bg-white`}
      keyboardShouldPersistTaps="always"
    >
      <SafeAreaView style={tw`flex-1 justify-center items-center`}>
        <View style={tw`w-full px-8`}>
          <View style={tw`flex items-center bg-white`}>
            <Image source={require("../../assets/innoTechLogo.png")}></Image>
          </View>

          <View style={tw`mt-[7rem]  self-center   `}></View>

          <Text style={tw`text-4xl text-blue-800 font-bold text-center`}>
            Welcome Back!
          </Text>
          <Text style={tw`text-lg text-gray-600 text-center mt-2`}>
            Enter Your Email & Password
          </Text>
          <View style={tw`mt-10`}>
            <Input
              placeholder="Email"
              keyboardType="email-address"
              inputStyle={tw`text-lg`}
              inputContainerStyle={tw`border-b-2 border-gray-300 py-2`}
              leftIcon={{
                type: "font-awesome",
                name: "envelope",
                color: "gray",
              }}
              errorMessage={errors.email}
              errorStyle={tw`text-red-600`}
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              placeholder="Password"
              secureTextEntry={true}
              inputStyle={tw`text-lg`}
              inputContainerStyle={tw`border-b-2 border-gray-300 py-2 mt-4`}
              leftIcon={{ type: "font-awesome", name: "lock", color: "gray" }}
              errorMessage={errors.password}
              errorStyle={tw`text-red-600`}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          {loginError && (
            <Text style={tw`text-red-400 text-center mt-4 text-lg`}>
              {loginError}
            </Text>
          )}
          <TouchableOpacity
            style={tw`mt-8 bg-blue-600 py-3 rounded-lg`}
            onPress={() => {
              handleSubmit();
            }}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={tw`text-white text-center text-lg`}>LOGIN</Text>
            )}
          </TouchableOpacity>

          <Text style={tw`text-red-500 text-center mt-7`}>
            Forgot Password?
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
