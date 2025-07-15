import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../Screens/HomeScreen';
import BookDetails from '../Screens/BookDetails';
import Profile from '../Screens/Profile';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();

const AuthenticatedNav = ({setIsUserLoggedIn}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Library Catalog"
        component={HomeScreen}
        options={({navigation}) => ({
            headerShown: true,
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{marginRight: 16}} >
                    <Ionicons name="person-circle-outline" size={28} color="#333" />
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <MaterialCommunityIcons 
                name="book-open-page-variant-outline" 
                size={28} color="black" 
                style={{marginLeft: 16}}
                />
            ),
        })}
        
      />
      <Stack.Screen
        name="Book Details"
        component={BookDetails}
        options={{ title: 'Details' }}
      />
      <Stack.Screen 
      name='Profile'
      component={Profile}
      options={{title: "Your Profile"}}
      initialParams={{setIsUserLoggedIn}}
      />
    </Stack.Navigator>
  );
};

export default AuthenticatedNav;