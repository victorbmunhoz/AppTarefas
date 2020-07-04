import React, { Component } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable';


export default function TaskList({ data, handleDelete }) {
    return(
        <Animatable.View 
        style={styles.container}
        animation="fadeInUp"
        useNativeDriver
        >
            <TouchableOpacity onPress={ () => handleDelete(data) }>
                <Ionicons name="md-checkmark-circle" size={40} color="#84a9ac" />
            </TouchableOpacity>
            <View>
                <Text style={styles.task}> {data.task} </Text>
            </View>
        </Animatable.View>
    )
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#e7dfd5',
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        padding: 7,
        elevation: 1.5,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset:{
            width: 1,
            height: 3
        },
    },

    task:{
        color:'#204051',
        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 20,
    },
});

