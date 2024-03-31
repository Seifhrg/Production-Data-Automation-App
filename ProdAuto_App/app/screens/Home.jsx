import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { API_URL } from '@env'

export default function Home() {
  const [dataUser,setDataUser]=useState({});
    async function getDataUser(){
    const token = await AsyncStorage.getItem('token')
   
 
    axios.post(`http://${API_URL}/users/userData`,{token: token})
    .then(res => {
        console.log('**',res.data);
        setDataUser(res.data);
    })
    .catch((error) => {
      console.log('Error config:', error.config);
      AsyncStorage.setItem('IsLoggedIn',JSON.stringify(false))
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
  useEffect(()=>{
    
    getDataUser()},[]); 
  return (
    <View>
      <Text>
      {dataUser.address}
      </Text>
    </View>
  )
}

