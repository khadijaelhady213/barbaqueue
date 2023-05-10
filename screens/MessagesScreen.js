import { FlatList, Text, View } from 'react-native'
import React, { Component } from 'react'
import ListItem from './ListItem';

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
      <FlatList
        data={messages}
        keyExtractor={message =>  message.id.toString}
        renderItem={({item}) => 
        <ListItem
            title=
        />}/>
    )
}

export default  MessagesScree;