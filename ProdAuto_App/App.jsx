import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";
import Login from "./app/screens/Login";
import AdminScreen from "./app/screens/AdminScreen";

import { useEffect } from "react";
import Messages from "./app/screens/Messages";
import AgentHome from "./app/screens/AgentHome";
import ResponsableStockHome from "./app/screens/ResponsableStockHome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthProvider, useAuthStore } from "./app/providers/AuthProvider";
import ProfileUpdate from "./app/screens/adminScreens/ProfileUpdate";
import GetStarted from "./app/screens/GetStarted";
import AddUser from "./app/screens/adminScreens/AddUser";

const Tab = createBottomTabNavigator();

function HomeAdmin() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={AdminScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export const Navigation = () => {
  const Stack = createNativeStackNavigator();

  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    console.log({ isAuthenticated });
  });
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {isAuthenticated && user ? (
          user.role === "SuperAdmin" ? (
            <Stack.Group>
              <Stack.Screen
                name="GetStarted"
                component={GetStarted}
                options={{ headerShown: false }}
              ></Stack.Screen>
              <Stack.Screen
                name="HomeAdmin"
                component={HomeAdmin}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ProfileUpdate"
                component={ProfileUpdate}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddUser"
                component={AddUser}
                options={{ headerShown: false }}
              />
            </Stack.Group>
          ) : user.role === "Agent" ? (
            <Stack.Screen
              name="AgentHome"
              component={AgentHome}
              options={{ headerShown: false }}
            />
          ) : user.role === "Responsable_Stock" ? (
            <Stack.Screen
              name="ResponsableStockHome"
              component={ResponsableStockHome}
              options={{ headerShown: false }}
            />
          ) : null
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
