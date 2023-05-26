import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import React, { Component } from "react";
import { SearchBar } from "react-native-elements";
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
    <View style={styles.container}>
      <SearchBar
        placeholder="Search"
        onChangeText={(searchText) => console.log(searchText)}
        onCancel={() => console.log("Search cancelled")}
        containerStyle={styles.searchBar}
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Place your content here */}
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
      </ScrollView>
    </View>
  );

  //  ;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  searchBar: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 0,
    position: "absolute",
    top: Platform.select({
      ios: 50, // Adjust this value based on the status bar height on iOS
      android: 0,
    }),
    left: 0,
    right: 0,
    zIndex: 1,
  },
  contentContainer: {
    top: Platform.select({
      ios: 120, // Adjust this value based on the status bar height on iOS
      android: 0,
    }),

    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 200, // Adj
  },
});
