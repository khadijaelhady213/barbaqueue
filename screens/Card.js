import { Text, View ,StyleSheet, Image} from 'react-native'
import React, { Component } from 'react'

function Card({title, price, image}) {
  
    return (
      <View style={styles.card}>
        <Image style={styles.image} source={image}  />
        <View  style={styles.detailsConatiner}>
            <Text style={styles.title} >{title}</Text>
            <Text style={styles.price}> {price}</Text> 
        </View>
      </View>
    )
  
}
const styles = StyleSheet.create({
    card:{
        borderRadius:15,
        borderWidth:2,
        borderColor:"#F63809",
        marginBottom:'5%',
        paddingBottom:"6%",
        overflow:'hidden',
  
    },
    detailsConatiner:{
        top:'5%',
        marginStart:'5%'
 
    },
    title:{
        fontSize: 18,
        fontWeight:600
    },
    price:{
        fontSize: 15,
        paddingTop:"2%",
        paddingBottom:"2%"
    },
    image:{
       width:'100%',
      
    }
    
});

export default Card;