
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { NavigationContainer } from '@react-navigation/native';
import Login from './app/screens/Login';
import AdminScreen from './app/screens/AdminScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import Messages from './app/screens/Messages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();



export default function App() {
  const[IsLoggedIn,setIsLoggedIn] =useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const Stack =createNativeStackNavigator();
  async function getAuthValue (){
    const data = await AsyncStorage.getItem('IsLoggedIn')
    
    setIsLoggedIn(data)
    setIsLoggedIn(data === 'true');
    setIsLoading(false); 
  }

  useEffect(()=>{
    getAuthValue()
    
  },[])
  
  
  
function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={AdminScreen} />
      <Tab.Screen name="Messages" component={Messages} />
    </Tab.Navigator>
  );
}
  return (

<NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      {IsLoggedIn ? (
        <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      ) : (
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
      )}
    </Stack.Navigator>
</NavigationContainer>

  );
}


