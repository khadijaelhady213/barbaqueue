import { Image, Text, View ,StyleSheet} from 'react-native'
import React, { Component } from 'react'

function ListItem({title, subTitle, image}) {
 
    return (
        <View>
        <View style={styles.container1}>
            <Image style={styles.image} source={image}  />
             <View  style={styles.detailsConatiner}>
                <Text style={styles.title} >{title}</Text>
                <Text style={styles.price}> {subTitle}</Text> 
            </View>
      </View>
      </View>
    );
}
const styles = StyleSheet.create({
    container1:{
        // backgroundColor:"blue",
        flexDirection:"row",
        padding:20,
        paddingTop:0
    },
    detailsConatiner:{
        // backgroundColor:"yellow",
        padding:20,
        paddingTop:0,
        paddingStart:5

    },
    image:{
        width:"20%",
        height:70,
        borderRadius:"100%"
    },
    title:{
        fontSize: 18,
        fontWeight:600,
    },
    price:{
        // backgroundColor:"green",
        paddingTop:"2%",
        paddingBottom:"2%",
        

    },

});

export default  ListItem;