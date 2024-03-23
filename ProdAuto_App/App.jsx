
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { NavigationContainer } from '@react-navigation/native';
import Login from './app/screens/Login';
import Home from './app/screens/Home';



export default function App() {
  const Stack =createNativeStackNavigator();
  return (

   <NavigationContainer>
    <Stack.Navigator screenOptions={{
    headerShown: false
  }}
    initialRouteName='Login' >
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Home' component={Home}/>
    </Stack.Navigator>
   </NavigationContainer>
  );
}


