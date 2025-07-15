import * as Animatable from 'react-native-animatable';
import React, { Component, useState, useRef } from 'react';
import { Button, Text, TextInput, View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';



const Login = () => {

    const route = useRoute();
    const {setIsUserLoggedIn} = route.params;
    const [email, setEmail ] = useState();
    const [ password, setPassword] = useState();
    const navigation = useNavigation();
    const formRef = useRef(null);
    const logoRef = useRef(null);

  return (
    <LinearGradient colors={["#ebedff", "#f3f2f8", "#dbf8ff" ]} style={styles.gradient}>
   <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.avoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Animatable.View ref={logoRef} animation="bounceInDown" duration={1000} style={styles.icon} >
            <Image source={require("../assets/LibriScan-removebg-preview.png")} style={styles.logo} />
        </Animatable.View>

        <Animatable.View ref={formRef} animation="bounceInUp" duration={1000} >
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
            await logoRef.current?.animate("bounceOutUp", 600);
            await formRef.current?.animate("bounceOutDown", 600);
            await AsyncStorage.setItem("token", "abcd");
            await AsyncStorage.setItem("userEmail", email);
            setIsUserLoggedIn(true);
        }}
        >
            <Text style={styles.btnText} >Login User</Text>
        </TouchableOpacity>
        </Animatable.View>
        <Text style={styles.linkText} onPress={()=>{
            navigation.navigate("Register");
        }}>
            New User? Register....
        </Text>
        </KeyboardAvoidingView>
      </SafeAreaView>
      </LinearGradient>
  )
}

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
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
        marginBottom: 10,
    },
    logo:{
        width:250,
        height:250,
        resizeMode:"contain",
    },
    gradient:{
        flex: 1,
    },
})
