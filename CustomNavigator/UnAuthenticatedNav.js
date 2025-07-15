import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../Screens/Register';
import Login from '../Screens/Login';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const UnAuthenticatedNav =({setIsUserLoggedIn, isUserLoggedIn, getUser }) => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Register" 
            component={Register}
            initialParams={{setIsUserLoggedIn, isUserLoggedIn, getUser}}
            options={{
                headerLeft:() => (
                    <MaterialCommunityIcons 
                    name="book-open-page-variant-outline" 
                    size={28} color="black" 
                    style={{marginLeft:16}}
                    />
                )
            }}
             />
            <Stack.Screen name='Login' 
            component={Login} 
            initialParams={{setIsUserLoggedIn, isUserLoggedIn, getUser}}
            />
        </Stack.Navigator>
    );
  }

export default UnAuthenticatedNav;