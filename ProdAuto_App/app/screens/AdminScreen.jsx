

import React, {useState, useEffect} from 'react';
import {Text, View, Image, FlatList,SafeAreaView,TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL, EMPTY_IMAGE } from '@env'
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc"
import styles from './Styles/AdminScreenStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function AdminScreen() {
    
    const [userData, setUserData] = useState('');
    const [allUserData, setAllUserData] = useState('');
    const navigation = useNavigation();
  
    async function getAllData() {
        
      axios.get(`http://${API_URL}/users`).then(res => {
        
        setAllUserData(res.data);
      });
    }
  
    async function getData() {
      const token = await AsyncStorage.getItem('token');
      console.log("this is the token ,",token)
   
      axios
        .post(`http://${API_URL}/users/userData`, {token: token})
        .then(res => {
          console.log(res,"ddddd");
          setUserData(res.data);
        });
    }
    useEffect(() => {
      getData();
      getAllData();
      
    }, []);
    
    function signOut() {
      AsyncStorage.setItem('IsLoggedIn', '');
      AsyncStorage.setItem('token', '');
      AsyncStorage.setItem('userRole', '');
      navigation.navigate("Login");
    }
  

    const UserCard=({data})=>(
        <View style={styles.card}>
              <Image source={{uri:
                 data.image|| EMPTY_IMAGE
                 
              
              }} style={styles.image} />
              <View style={styles.cardDetails}>
                <Text style={styles.name}>{data.firstName} {data.lastName}</Text>
                <Text style={styles.email}>{data.email}</Text>
                <Text style={styles.userType}>{data.role}</Text>
              </View>
              <View>
                <Icon name="pencil" size={30} color="black"/>
              </View>
            </View>
      )
      return (
        <>
          <View style={styles.container}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userData.firstName} {userData.lastName}</Text>
              <Text style={styles.userType}>{userData.role}</Text>
            </View>
            <FlatList data={allUserData}
            keyExtractor={item => item.id}
            renderItem={({item})=>(<UserCard data={item}/>)}
            
            />
            
          </View>
          <TouchableOpacity
              
              onPress={() => signOut()}
              style={tw`bg-blue-500 w-full rounded-none my-0 p-3`}
          >
              <Text style={tw`text-base text-white text-center`}>Log Out</Text>
              </TouchableOpacity>
        </>
      );
    }
   
