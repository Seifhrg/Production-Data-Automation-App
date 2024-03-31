
import { Image, SafeAreaView, View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { ActivityIndicator } from "react-native";
import tw from "twrnc"
import { Input } from '@rneui/themed'
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Home from "./Home";
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

        setErrors(errors); // Set the errors state

        if (Object.keys(errors).length === 0) {
          setLoading(true);
            const userData = { email, password }

            axios.post(`http://${API_URL}/auth/login`, userData)
                .then((res) => {
                    if (res.status == 201) {
                        Alert.alert('Logged In Successfully !');
                        navigation.navigate(Home);
                        AsyncStorage.setItem('token', res.data.token)
                    }
                })
                .catch((error) => {
                  setLoading(false);
                  console.log('Error config:', error.config);
                  if (error.response) {
                    // The server responded with a status code out of the range of 2xx
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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="always">
          <View style={tw`flex-1  bg-white`}>
              <SafeAreaView style={tw`flex-1`}>
              <Image source={require("../../assets/cloudBig.png")}
  style={tw`absolute bottom-0`}> 

</Image>
<View  style={tw`flex items-center bg-white`}>
<Image source={require("../../assets/innoTechLogo.png")}
  style={tw`mt-[5.5rem]  `}> 

</Image>
</View>

<View style={tw`w-full mt-[4rem] px-4 `}>
  <Text style={tw`text-[2.5rem] font-medium`}>
      Welcome Back !
  </Text>
  <Text style={tw`text-[1.1rem] text-gray-600`}>
      Enter Your Email & Password
  </Text>
</View>
<View style={tw`w-full mt-[6rem] px-4`}>
                      <Input
                          containerStyle={tw`w-full mt-4 `}
                          inputContainerStyle={tw`py-2`}
                          placeholder="Email"
                          keyboardType="email-address"
                          onChange={e => setEmail(e.nativeEvent.text)}
                      />
                      {errors.email ? <Text style={tw`text-red-600 `}>{errors.email}</Text> : null}
                      <Input
                          containerStyle={tw`w-full mt-4  `}
                          inputContainerStyle={tw`py-2`}
                          placeholder="Password"
                          keyboardType="default"
                          secureTextEntry={true}
                          onChange={e => setPassword(e.nativeEvent.text)}
                      />
                      {errors.password ? <Text style={tw`text-red-600 mb-6`}>{errors.password}</Text> : null}
                  </View>
                  <View style={tw`w-full items-center`}>
  <TouchableOpacity style={tw`rounded-100 py-3 w-[15rem] mt-4 bg-black `} onPress={handleSubmit}
  disabled={loading}
  >
     {loading ? (
                          <ActivityIndicator size="small" color="#FFF" />
                      ) : (
                          <Text style={tw`text-white text-center text-lg`}>LOGIN</Text>
                      )}

  
  </TouchableOpacity>
   <Text style={tw`mt-4 text-red-600`}>Forgot Password ?</Text>  
</View>
              </SafeAreaView>
          </View>
      </ScrollView>
  );

}


