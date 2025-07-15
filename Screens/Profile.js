import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';


const Profile = ({navigation}) => {
    const[ userData, setUserData ] = useState({name: '', email: ''});
    const route = useRoute();
    const {setIsUserLoggedIn} = route.params || {};

    useEffect(() => {
        const fetchUser = async () => {
            const name = await AsyncStorage.getItem('userName');
            const email = await AsyncStorage.getItem('userEmail');
            setUserData({ name: name || '', email: email || '' });
        };
        fetchUser();
    }, []);

    const handleLogOut = async () => {
        await AsyncStorage.clear();
        if (setIsUserLoggedIn) {
            setIsUserLoggedIn(false);
        }
    };
    const aniRef = useRef();


  return (
    <Animatable.View ref={aniRef} animation="fadeInRight" duration={900} style={styles.container} >
        <Image 
        source={{uri: 'https://via.placeholder.com/120/FFFFFF/000000?text=User'}}
        style={styles.avatar}
        />

        <Text style={styles.name} > {userData.name}</Text>
        <Text style={styles.email} > {userData.email}</Text>

        <TouchableOpacity style={styles.logoutbtn} onPress={handleLogOut} >
            <Text style={styles.logoutTxt} >Log Out</Text>

        </TouchableOpacity>
    </Animatable.View>
  );
};

export default Profile

const styles = StyleSheet.create({
    container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    },
    avatar:{
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
    marginBottom: 20,
    },
    name:{
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    },
    email:{
    fontSize: 14,
    color: '#777',
    marginBottom: 24,
    },
    logoutbtn:{
    backgroundColor: '#d32f2f',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    },
    logoutTxt:{
    color: '#fff',
    fontSize: 16,
    },
})
