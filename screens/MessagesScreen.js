/**
MessagesScreen component to display a list of messages.
@param {object} props - The props passed to the MessagesScreen component.
@returns {JSX.Element} - The rendered MessagesScreen component.
*/

import {  Text, View ,ListItem, SafeAreaView, StyleSheet, FlatList} from 'react-native'
import React, { Component } from 'react'
/**
Array of messages.
@type {Array<object>}
*/

const messages=[
    {
        id: 1,
        title:"t1",
        description:"desc1",
        image: require("../assets/test1.jpg")   
    },
    {
        id: 2,
        title:"t2",
        description:"desc2",
        image: require("../assets/test1.jpg")   
    },
    {
        id: 3,
        title:"t3",
        description:"desc3",
        image: require("../assets/test1.jpg")   
    },
]

function MessagesScreen(props) {
  
    return (
        <SafeAreaView style={styles.screen}>
            <FlatList
                data={messages}
                keyExtractor={message =>  message.id.toString}
                renderItem={({item}) => 
                <ListItem
                    title={item.title}
                    subTitle={item.description}
                    image={item.image}
                />}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen:{
        // paddingTop: Plataform.OS === 'android' ? StatusBar.currentHeight: 0,
    }
})

export default  MessagesScreen;