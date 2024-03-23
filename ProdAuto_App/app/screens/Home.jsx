import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const Home = () => {
  //getting data from the token to the home screen after login need the backend
  /* async function getData(){
    const token = await AsyncStorage.getItem('token')
    console.log(token)
    axios.post('http://localhost3000/users',{token: token})
    .then(res=>console.log(res.data))
  }
  useEffect(()=>{getData()},[]); */
  return (
    <View>
      <Text>home</Text>
    </View>
  )
}

export default Home