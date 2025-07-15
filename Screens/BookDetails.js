import React, { Component, use, useEffect, useState } from 'react'
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView,Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { getStoredStatus, saveStatus, getBookcomments, saveBookComments } from '../utils/Storage'
import { TextInput } from 'react-native-gesture-handler'
import RatingStars from '../components/RatingStars'

const BookDetails = ({route}) => {
    const {book} = route.params;
    const [status, setStatus] = useState({});
    const [ comments, setComments ] = useState([]);
    const [ newComment, setNewComment ] = useState('');

    useEffect(() => {
        const loadStatus = async () => {
          const saved = await getStoredStatus();
          setStatus(saved[book.id] || {});

          const savedComments = await getBookcomments(book.id);
          setComments(savedComments);
        };
        loadStatus();
      }, [book.id]);

      const updateStatus = async (key, value = null) => {
        const newStatus = {
          ...status,
          [key]: value = null ? !status?.[key] : value,
        };

        const allStatus = await getStoredStatus();
        const updated = {
          ...allStatus,
          [book.id]: newStatus,
        };

        setStatus(newStatus);
    saveStatus(updated);
  };

  const handleAddComment = async () => {
    if(newComment.trim() === "") return;

    const updatedComments = [
      ...comments,
      { text: newComment.trim(), date: new Date(). toISOString() },
    ];
    setComments(updatedComments);
    setNewComment('');
    await saveBookComments(book.id, updatedComments);
  };

    return (
        <KeyboardAvoidingView style={styles.avoidingView}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.container} >
            <Image source={{uri:book.cover}} style={styles.cover} />

          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>by {book.author}</Text>
          <Text style={styles.genre}>{book.genre}</Text>

          <View style={styles.statusRow} >
            <TouchableOpacity onPress={() => updateStatus('favourite')} >
            <Ionicons name={ status?.favourite ? 'heart' : "heart-outline"} 
            size={28} 
            color={ status?.favourite ? 'red' : "gray"} /> 
            </TouchableOpacity>

            <TouchableOpacity onPress={() => updateStatus('read')} style={{marginLeft: 16}} >
            <Ionicons name={ status?.read ? "checkmark-circle" : "checkmark-circle-outline"} 
            size={24} 
            color={ status?.read ? "#4caf50" : "#888"} />
            </TouchableOpacity>

          </View>

          <Text style={styles.description} >{book.description}</Text>

          <RatingStars
          rating={status.rating || 0}
          onRate={(newRating) => updateStatus('rating', newRating)}
          editable={true}
          />

          <Text style={styles.sectionTitle} >Reviews</Text>

          <View style={styles.commentBox}>
            <TextInput
            value={newComment}
            onChangeText={setNewComment}
            placeholder='Write a review...'
            style={styles.input}
            />

            <TouchableOpacity onPress={handleAddComment} style={styles.addButton} >
              <Text style={{color:"#fff"}} >Submit</Text>
            </TouchableOpacity>
          </View>

          {comments.length === 0 ? (
            <Text style={styles.noComment}>No reviews yet. Be the first!</Text>
          ): (
            comments.map((c, index) => (
              <View key={index} style={styles.commentItem} >
                <Text style={styles.commentText} >{c.text}</Text>
                <Text style={styles.commentDate} >{new Date(c.date).toLocaleString()}</Text>
              </View>
            ))
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    );
};



export default BookDetails

const styles = StyleSheet.create({
    container:{
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    cover:{
        width: 180,
        height: 260,
        marginBottom: 20,
        borderRadius: 12,
    },
    title:{
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 4,
        textAlign: 'center',
    },
    author:{
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    genre:{
        fontSize: 14,
        color: '#999',
        marginBottom: 12,
    },
    statusRow:{
        flexDirection: 'row',
        marginBottom: 16,
        justifyContent: 'center',
    },
    description:{
        fontSize: 15,
        color: '#333',
        textAlign: 'justify',
    },
    sectionTitle:{
      fontSize: 17,
      fontWeight: '600',
      marginBottom: 12,
    },
    commentBox:{
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    input:{
      flex: 1,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 8,
      padding: 10,
      marginRight: 8,
    },
    addButton:{
      backgroundColor: '#007bff',
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 8,
    },
    noComment:{
      color: '#999',
      fontStyle: 'italic',
      textAlign: 'center',
      marginTop: 8,
    },
    commentItem:{
      backgroundColor: '#f5f5f5',
      padding: 12,
      borderRadius: 8,
      marginBottom: 10,
    },
    commentText:{
      fontSize: 14,
      color: '#333',
    },
    commentDate:{
      fontSize: 11,
      color: '#888',
      marginTop: 4,
      textAlign: 'right',
    },
})