import { Image,SafeAreaView, View,Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import tw from "twrnc"
import {Input} from '@rneui/themed'
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Home from "./Home";
import AsyncStorage from "@react-native-async-storage/async-storage";




export default function Login() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigation =useNavigation();
    function handleSubmit() {
        console.log(email,password)
        const userData ={email,password}
       //need to create it in backend first to handle it  and add the home page ...
        /*  axios.post("http://localhost3000/users",userData)
        .then(res=>{console.log(res.data);
        if (res.data.status =='ok'){Alert.alert('Logged In Successfull !');
    navigation.navigate(Home);
AsyncStorage.setItem(res.data.data)}
          
    }); */
        
    }
    

    return(
        <ScrollView contentContainerStyle={{flexGrow:1}} keyboardShouldPersistTaps="always">
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
containerStyle={tw`w-full my-4 `}
inputContainerStyle={tw`py-2`}
placeholder="Email"
keyboardType="email-address"
onChange={e=>setEmail(e.nativeEvent.text)}/>
<Input
containerStyle={tw`w-full my-4 `}
inputContainerStyle={tw`py-2`}
placeholder="Password"
keyboardType="default"
secureTextEntry={true}
onChange={e=>setPassword(e.nativeEvent.text)}/>
</View>
<View style={tw`w-full items-center`}>
    <TouchableOpacity style={tw`rounded-100 py-3 w-[15rem] mt-4 bg-black `} onPress={()=>handleSubmit()}>
    <Text style={tw`text-white text-center text-[1.2rem]`}>LOGIN</Text>
    </TouchableOpacity>
     <Text style={tw`mt-4 text-red-600`}>Forgot Password ?</Text>  

</View>
        </SafeAreaView>
        </View>
        </ScrollView>
        
    );
}
