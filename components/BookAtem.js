import * as Animatable from 'react-native-animatable';
import React, { Component, useRef } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';


const BookAtem = ({book, status, onToggleFavourite, onToggleRead}) => {
    const navigation = useNavigation();
    const animRef = useRef();
    const handlePress = () => {
      navigation.navigate("Book Details", {book, status});
    };
    return (
      <Animatable.View ref={animRef} animation="fadeInRight" duration={500} >
        <TouchableOpacity style={styles.card} onPress={handlePress} >
        <Image source={{ uri: book.cover }} style={styles.cover} />
        <View style={styles.info}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>by {book.author}</Text>
          <Text style={styles.genre}>{book.genre}</Text>
          <Text numberOfLines={3} style={styles.description}>
            {book.description}
          </Text>

          <View style={styles.icons}>
            <TouchableOpacity onPress={onToggleFavourite}>
            <Ionicons name={ status?.favourite ? 'heart' : "heart-outline"} 
            size={24} 
            color={ status?.favourite ? 'red' : "gray"} /> 
            </TouchableOpacity>

            <TouchableOpacity onPress={onToggleRead} style={{marginLeft: 12}}>
            <Ionicons name={ status?.read ? "checkmark-circle" : "checkmark-circle-outline"} 
            size={24} 
            color={ status?.read ? "#4caf50" : "#888"} />

            </TouchableOpacity>

          </View>
        </View>
      </TouchableOpacity>
      </Animatable.View>
    );
  };


export default BookAtem;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2, 
        shadowColor: '#000', 
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderColor:"#cfd1ca",
        borderWidth: 1,
      },
      cover: {
        width: 100,
        height: 140,
      },
      info: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
      },
      title: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
      },
      author: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
      },
      genre: {
        fontSize: 12,
        color: '#888',
        marginBottom: 6,
      },
      description: {
        fontSize: 13,
        color: '#333',
      },

      icons:{
        flexDirection: "row",
        marginTop: 10,
      },
});
