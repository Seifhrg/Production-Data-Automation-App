import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./app/screens/Login";
import AdminScreen from "./app/screens/AdminScreen";
import AgentHome from "./app/screens/AgentHome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthProvider, useAuthStore } from "./app/providers/AuthProvider";
import ProfileUpdate from "./app/screens/adminScreens/ProfileUpdate";
import GetStarted from "./app/screens/GetStarted";
import AddUser from "./app/screens/adminScreens/AddUser";
import WorkOrderUpdate from "./app/screens/agentScreens/WorkOrderUpdate";
import AddWorkOrder from "./app/screens/agentScreens/AddWorkOrder";
import WorkOrderList from "./app/components/WorkOrderList";
import { Provider } from "react-redux";
import Store from "./app/store/Store";
import ListArticles from "./app/components/ArticlesOf/ListArticles";
import AddArticle from "./app/screens/agentScreens/AddArticle";
import UpdateArticle from "./app/screens/agentScreens/UpdateArticle";
import Logs from "./app/screens/adminScreens/Logs";
import Icon from "react-native-vector-icons/MaterialIcons";
import TransationHistoryList from "./app/screens/ResponsableStockScreens.jsx/TransationHistoryList";
import InventoryList from "./app/screens/ResponsableStockScreens.jsx/InventoryList";
import WorkOrderStatistique from "./app/screens/agentScreens/workOrdersStatistiques";

const Tab = createBottomTabNavigator();

function HomeAdmin() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={AdminScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Logs"
        component={Logs}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function HomeInventoryManager() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="InventoryList"
        component={InventoryList}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="inventory" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="TransationHistoryList"
        component={TransationHistoryList}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="history" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AgentHomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={AgentHome}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="WorkOrderStatistique"
        component={WorkOrderStatistique}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="bar-chart" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const { isAuthenticated, user } = useAuthStore();

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
                initialParams={{ screen: "HomeAdmin" }}
              />
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
            <Stack.Group>
              <Stack.Screen
                name="GetStarted"
                component={GetStarted}
                options={{ headerShown: false }}
                initialParams={{ screen: "AgentHome" }}
              />
              <Stack.Screen
                name="AgentHome"
                component={AgentHomeTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddWorkOrder"
                component={AddWorkOrder}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="WorkOrderList"
                component={WorkOrderList}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="WorkOrderUpdate"
                component={WorkOrderUpdate}
                options={{ headerShown: false }}
              />
              {/* For testing only */}
              <Stack.Screen
                name="ListArticles"
                component={ListArticles}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddArticle"
                component={AddArticle}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="UpdateArticle"
                component={UpdateArticle}
                options={{ headerShown: false }}
              />
              {/* For testing only */}
            </Stack.Group>
          ) : user.role === "Responsable_Stock" ? (
            <Stack.Group>
              <Stack.Screen
                name="GetStarted"
                component={GetStarted}
                options={{ headerShown: false }}
                initialParams={{ screen: "HomeInventoryManager" }}
              />
              <Stack.Screen
                name="HomeInventoryManager"
                component={HomeInventoryManager}
                options={{ headerShown: false }}
              />
            </Stack.Group>
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
    <Provider store={Store}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </Provider>
  );
}
