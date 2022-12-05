import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

// Improrting the other screens
import Login from "./src/Login";
import Dashboard from "./src/Dashboard"

// Create a stack navigator
const Stack = createStackNavigator();

export default function App() {

    return (
        <NavigationContainer>
          <Stack.Navigator>
          <Stack.Screen
            name = "Log"
            component = {Login}
            options = {{
              headerStyle: {
                height:120,
                borderBottomRightRadius:250,
                backgroundColor:'#00e699',
                shadowColor:'#000',
                elevation:25
              }
            }}
          /> 
          <Stack.Screen 
            name = "Code Entering"
            component={Dashboard}
            options = {{
              headerStyle: {
                height:120,
                borderBottomRightRadius:250,
                backgroundColor:'#00e699',
                shadowColor:'#000',
                elevation:25
              }
            }}
          />
          <Stack.Screen
            name = "Login Again"
            component = {Login}
            options = {{
              headerStyle: {
                height:120,
                borderBottomRightRadius:250,
                backgroundColor:'#00e699',
                shadowColor:'#000',
                elevation:25
              }
            }}
          /> 
          </Stack.Navigator>
        </NavigationContainer>
      
      
    );
  



}