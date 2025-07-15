import React, { Component, useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Login = () => {

    const route = useRoute();
    const {setIsUserLoggedIn} = route.params;
    const [email, setEmail ] = useState();
    const [ password, setPassword] = useState();
    const navigation = useNavigation();

  return (
   <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.avoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.icon} >
            <MaterialCommunityIcons name="book-open-page-variant-outline" size={60} color="black" />
        </View>
        <TextInput style={styles.input} 
        placeholder='Enter your email' 
        onChangeText={(email)=>setEmail(email)}
        />
        <TextInput style={styles.input} 
        placeholder='enter your password' 
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button}
        onPress={async() => {
            console.log({email,password});
            await AsyncStorage.setItem("token", "abcd");
            await AsyncStorage.setItem("userEmail", email);
            setIsUserLoggedIn(true);
        }}
        >
            <Text style={styles.btnText} >Login User</Text>
        </TouchableOpacity>
        <Text style={styles.linkText} onPress={()=>{
            navigation.navigate("Register");
        }}>
            New User? Register....
        </Text>
        </KeyboardAvoidingView>
      </SafeAreaView>
  )
}

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#fff', 
    },
    // header: {
    //   fontSize: 32,
    //   fontWeight: 'bold',
    //   color: '#2C2C2C',
    //   textAlign: 'center',
    //   marginBottom: 30,
    // },
    input: {
      backgroundColor: '#fofofo',
      padding: 14,
      borderRadius: 12,
      marginBottom: 15,
      fontSize: 16,
      color: '#2C2C2C',
      borderWidth:1,
      borderColor: "#000",
    },
    button: {
      backgroundColor: '#212121',
      paddingVertical: 14,
      borderRadius: 12,
      marginTop: 20,
      alignItems:"center",
    },
    btnText: {
      color: '#FFFFFF',
      fontSize: 16,
      textAlign: 'center',
      fontWeight: '600',
    },
    linkText: {
      textAlign: 'center',
      marginTop: 20,
      color: '#2C2C2C',
      fontSize: 14,
    },
    avoidingView: {
      flex: 1,
      justifyContent: 'center',
    },
    icon:{
        alignItems: "center",
        marginBottom: 90,
    },
})
