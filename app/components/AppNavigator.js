import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./login";
import Register from "./register";
import Search from "./form/search";
import Home from "./form/drawer";
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen
          name="home"
          component={Home}
          // options={{ title: "Coronavirus Hoy" }}
        />
        <Stack.Screen name="search" component={Search} />

        <Stack.Screen name="register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
