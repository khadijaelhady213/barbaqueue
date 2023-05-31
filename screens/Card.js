import { Text, View, StyleSheet, Image } from "react-native";
import React, { Component } from "react";

function Card({ title, price, image }) {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={image} />
      <View style={styles.detailsConatiner}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}> {price}</Text>
      </View>
    </View>
  );
}

/**

Card component to display information in a card format.
@param {string} title - The title of the card.
@param {string} price - The price displayed in the card.
@param {ImageSource} image - The source of the image displayed in the card.
@returns {JSX.Element} - The rendered Card component.
*/
const styles = StyleSheet.create({
  card: {
    width: 180,
    borderRadius: 15,
    borderWidth: 2,
    marginTop: 1,
    marginRight: 3,
    marginLeft: 10,
    borderColor: "#F63809",
    marginBottom: "5%",
    paddingBottom: "6%",
    overflow: "hidden",
  },
  detailsConatiner: {
    top: "5%",
    marginStart: "5%",
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
  },
  price: {
    fontSize: 15,
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

export default Card;
