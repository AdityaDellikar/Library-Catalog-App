import React, { Component } from 'react'
import { Text, View } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStoredStatus = async () => {
    const data = await AsyncStorage.getItem("bookStatus");
    return data ? JSON.parse(data) : {};
};

export const saveStatus = async(statusObj) => {
    await AsyncStorage.setItem('bookStatus', JSON.stringify(statusObj));
};

export const getBookcomments = async(bookId) => {
    try {
        const jsonValue = await AsyncStorage.getItem(`comments_${bookId}`);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
        console.log("Error loading comments", error);
        return[];
    }
};

export const saveBookComments = async(bookId, comments) => {
  try {
    await AsyncStorage.setItem(`comments_${bookId}`, JSON.stringify(comments));
  } catch (error) {
    console.log("Error svaing comments" ,error);
  }
};

const Storage = () => {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }


export default Storage
