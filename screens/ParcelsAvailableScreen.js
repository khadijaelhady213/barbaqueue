import { Image, Text, View, StyleSheet, ScrollView } from "react-native";
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
export default function ParcelsAvailableScreen(props) {
  return (
    <ScrollView style={styles.BigContainer}>
      <View style={styles.container}>
        <Card title="hola" price="10 euros" image={listings[0].image}></Card>
        <Card title="hola" price="10 euros" image={listings[1].image}></Card>
        <Card title="hola" price="10 euros" image={listings[1].image}></Card>
        <Card title="hola" price="10 euros" image={listings[1].image}></Card>
        <Card title="hola" price="10 euros" image={listings[1].image}></Card>
        <Card title="hola" price="10 euros" image={listings[1].image}></Card>
        <Card title="hola" price="10 euros" image={listings[1].image}></Card>
        <Card title="hola" price="10 euros" image={listings[1].image}></Card>
        <Card title="hola" price="10 euros" image={listings[1].image}></Card>
        <Card title="hola" price="10 euros" image={listings[1].image}></Card>
      </View>
    </ScrollView>
  );

  //  ;
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flex: 2,
    flexWrap: "wrap",
  },
});
