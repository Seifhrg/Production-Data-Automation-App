
import { Image, SafeAreaView, View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { ActivityIndicator } from "react-native";
import tw from "twrnc"
import { Input } from '@rneui/themed'
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";


import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from '@env'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({ email: '', password: '' })
    const navigation = useNavigation();

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
            const userData = { email, password }

            axios.post(`http://${API_URL}/auth/login`, userData)
                .then((res) => {
                    if (res.status == 201) {
                        Alert.alert('Logged In Successfully !');
                        
                        AsyncStorage.setItem('token', res.data.token)
                        AsyncStorage.setItem('IsLoggedIn',JSON.stringify(true))
                        navigation.navigate("AdminScreen");
                    }
                })
                .catch((error) => {
                  setLoading(false);
                  console.log('Error config:', error.config);
                  if (error.response) {
                    
                    console.log('Error response data:', error.response.data);
                    console.log('Error response status:', error.response.status);
                    console.log('Error response headers:', error.response.headers);
                  } else if (error.request) {
                    // The request was made but no response was received
                    console.log('Error request:', error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error message:', error.message);
                  }
                });
        }
    }

    

  


    return (
      <ScrollView contentContainerStyle={tw`flex-grow bg-white`} keyboardShouldPersistTaps="always">
          <SafeAreaView style={tw`flex-1 justify-center items-center`}>
              <View style={tw`w-full px-8`}>
              <View  style={tw`flex items-center bg-white`}>
<Image source={require("../../assets/innoTechLogo.png")}
    > 
  
</Image>
</View>

<View style={tw`mt-[7rem]  self-center   `}>  
</View> 

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
                          leftIcon={{ type: 'font-awesome', name: 'envelope', color: 'gray' }}
                          errorMessage={errors.email}
                          errorStyle={tw`text-red-600`}
                          onChangeText={(text) => setEmail(text)}
                      />
                      <Input
                          placeholder="Password"
                          secureTextEntry={true}
                          inputStyle={tw`text-lg`}
                          inputContainerStyle={tw`border-b-2 border-gray-300 py-2 mt-4`}
                          leftIcon={{ type: 'font-awesome', name: 'lock', color: 'gray' }}
                          errorMessage={errors.password}
                          errorStyle={tw`text-red-600`}
                          onChangeText={(text) => setPassword(text)}
                      />
                  </View>
                  <TouchableOpacity
                      style={tw`mt-15 bg-blue-600 py-3 rounded-lg`}
                      onPress={handleSubmit}
                      disabled={loading}
                  >
                      {loading ? (
                          <ActivityIndicator size="small" color="#FFF" />
                      ) : (
                          <Text style={tw`text-white text-center text-lg`}>LOGIN</Text>
                      )}
                  </TouchableOpacity>
                  <Text style={tw`text-red-500 text-center mt-4`}>Forgot Password?</Text>
              </View>
          </SafeAreaView>
      </ScrollView>
  );


}


