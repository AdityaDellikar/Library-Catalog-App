import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const maxStars = 5;

const RatingStars = ({rating = 0, onRate = () => {}, editable = false, size = 24}) => {
 
    return (
      <View style={styles.starRow} >
        {[...Array(maxStars)].map((_, index) => {
          const filled = index < rating;
          return(
            <TouchableOpacity 
            key={index}
            onPress={() => editable && onRate(index+1)}
            activeOpacity={editable ? 0.6 : 1}
            disabled={!editable}
            >
              <Ionicons
              name={filled ? 'star' : 'star-outline'}
              size={size}
              color={filled ? '#fdd835' : '#ccc'}
              style={styles.star}
            />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };


export default RatingStars;

const styles = StyleSheet.create({
  starRow:{
    flexDirection: 'row',
    marginVertical: 8,
  },
  star:{
    marginHorizontal: 2,
  },
});
