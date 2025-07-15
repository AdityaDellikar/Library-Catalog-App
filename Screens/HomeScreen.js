import React, { Component, useEffect, useState } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import booksData from "../data/books.json";
import BookAtem from '../components/BookAtem';
import { getStoredStatus, saveStatus } from '../utils/Storage';
import { TextInput } from 'react-native-gesture-handler';

const FILTERS = ['All', 'Favourite', 'Read', 'Unread'];

const HomeScreen = () =>  {
    const [books, setBooks] = useState([]);
    const [statusMap,  setStatusMap] = useState({});
    const [ searchText, setSearchText ] = useState('');
    const [ activeFilter, setActiveFilter ] = useState('All');


    useEffect(() => {
        setBooks(booksData);
        loadStatus();
    }, []);

    const loadStatus = async () => {
        const saved = await getStoredStatus();
        setStatusMap(saved);
    };

    const toggleFavourite  = (id) => {
        const updated = {
            ...statusMap,
            [id]: {
                ...statusMap[id],
                favourite: !statusMap[id]?.favourite ?? false,
            },
        };
        setStatusMap(updated);
        saveStatus(updated);
    };

    const toggleRead = (id) => {
        const updated = {
            ...statusMap,
            [id]: {
                ...statusMap[id],
                read: !statusMap[id]?.read ?? false,
            },
        };
        setStatusMap(updated);
        saveStatus(updated);
    };

    const filteredBooks = books.filter((book) => {
        const status = statusMap[book.id] || {} ;

        const matchesSearch = book.title.toLowerCase().includes(searchText.toLowerCase());

        let matchesFilter = true;
        if (activeFilter === 'Favourite') matchesFilter = status.favourite;
        else if (activeFilter === 'Read') matchesFilter = status.read;
        else if (activeFilter === 'Unread') matchesFilter = !status.read;

        return matchesSearch && matchesFilter;
    })

    return (
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.container} >
            <TextInput 
            placeholder='Search by title...'
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            />


      <View style={styles.filterRow}>
        {FILTERS.map((filter) => (
            <TouchableOpacity 
            key={filter}
            onPress={() => setActiveFilter(filter)}
            style={[styles.filterButton,
            activeFilter === filter && styles.filterButtonActive,]}
            >
                <Text style={activeFilter === filter ? styles.filterTextActive : styles.filterText}>
                    {filter}
                </Text>
            </TouchableOpacity>
        ))}
      </View>
        <FlatList
        data = {filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
        <BookAtem 
        book = {item}
        status = {statusMap[item.id] || {}}
        onToggleFavourite = {() => toggleFavourite(item.id)}
        onToggleRead = {() => toggleRead(item.id)} 
        />
        )}
        contentContainerStyle = {{paddingBottom: 100}}
        />

      

      </View>
      </SafeAreaView>
    );
  };


export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor:"#fff",
    },
    searchInput:{
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        padding: 10,
        marginBottom: 12,
    },
    filterRow:{
        flexDirection: 'row',
        marginBottom: 16,
        justifyContent: 'space-around',
    },
    filterButton:{
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: '#eee',
    },
    filterButtonActive:{
        backgroundColor: '#007bff',
    },
    filterText:{
        color: '#333',
        fontWeight: '500',
    },
    filterTextActive:{
        color: '#fff',
        fontWeight: '600',
    },
    safeArea:{
        flex:1,
        backgroundColor:"#fff",
    },
})
