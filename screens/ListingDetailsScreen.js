import { Image, Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";

import ListItem from "./ListItem";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Card from "./Card";

const listings = [
  {
    id: 1,
    title: "Red jacket for sale",
    price: 100,
    image: require("../assets/b7.png"),
  },
  {
    id: 2,
    title: "Couch in great condition",
    price: 1000,
    image: require("../assets/splash.png"),
  },
];
export default function ListingDetailsScreen(props) {
  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/test1.jpg")} />
        <View style={styles.detailsConatiner}>
          <Text style={styles.title}>Camp Xup </Text>
          <Text style={styles.price}> 100€ per persona </Text>
        </View>
        <ListItem
          title="khadija el hady"
          subTitle="5 listings"
          image={require("../assets/test1.jpg")}
        />
      </View>
      <Card title="hola" price="10 euros" image={listings[1].image}></Card>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
  detailsConatiner: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
  },
  price: {
    paddingTop: "2%",
    paddingBottom: "2%",
    color: "#F63809",
    fontSize: 15,
    fontWeight: 500,
  },
});
