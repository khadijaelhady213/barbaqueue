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
import { listAllParcelsFunction } from "../interactWithApi/listAllParcels";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


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

  const [parcels, setParcels] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // get parcels variables
        const value = await AsyncStorage.getItem('parcels');

        if (value !== null) {
          // We have data!!
          console.log("Parcels working", JSON.parse(value).length)
          setParcels(JSON.parse(value))        
        }

      } catch (error) {
        console.log("This is the error of getting parcels data", error)
      }
    })();
  }, []);

  if(parcels) {
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search"
          onChangeText={(searchText) => console.log(searchText)}
          onCancel={() => console.log("Search cancelled")}
          containerStyle={styles.searchBar}
        />
        <ScrollView contentContainerStyle={styles.contentContainer}>

          {parcels.map((parcel, index) => (
            <Card title={parcel.title} price={parcel.people_price} image={{uri: parcel.image}}></Card>
          ))}
          
        </ScrollView>
      </View>
    );  
  }
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
