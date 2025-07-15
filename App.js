import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticatedNav from './CustomNavigator/AuthenticadNav';
import UnAuthenticatedNav from './CustomNavigator/UnAuthenticatedNav';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const status = await AsyncStorage.getItem('isUserLoggedIn');
      setIsUserLoggedIn(status === 'true');
    };
    checkLoginStatus();
  }, []);

  const getUser = async () => {
    
  };

  return (
    <NavigationContainer>
      {isUserLoggedIn ? (
        <AuthenticatedNav />
      ) : (
        <UnAuthenticatedNav
          setIsUserLoggedIn={setIsUserLoggedIn}
          isUserLoggedIn={isUserLoggedIn}
          getUser={getUser}
        />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
