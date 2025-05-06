import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableHighlight,
} from "react-native";
import React, { Component } from "react";
import { SearchBar } from "react-native-elements";
import ListItem from "./ListItem";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Card from "./Card";
import { listAllParcelsFunction } from "../interactWithApi/listAllParcels";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ParcelDetailsScreen from "./ParcelDetailsScreen";
import { useNavigation } from "@react-navigation/native";

/**

Array of listings.
@type {Array}
*/
const listings = [
  {
    id: 1,
    title: "Red jacket for sale",
    price: 100,
    image: require("../assets/mainScreenBackground.png"),
  },
  {
    id: 2,
    title: "Couch in great condition",
    price: 1000,
    image: require("../assets/splash.png"),
  },
];

/**
Parcels Available screen component.
@param {object} props - Component props.
@returns {JSX.Element} JSX element representing the Parcels Available screen.
*/
export default function ParcelsAvailableScreen(props) {
  const [parcels, setParcels] = useState(null);
  const [searchParcel, setSearchParcel] = useState('');
  const [filteredParcels, setFilteredParcels] = useState([]);
  const navigation = useNavigation();
  /**
  
  Handles the search functionality.
  @param {string} searchText - The text to search.
  @returns {void}
  */
  const handleSearch = (searchText) => {
    if (parcels) {
      setFilteredParcels(parcels.filter(parcel => parcel.location.toLowerCase().includes(searchText.toLowerCase())));
    }
  }

  useEffect(() => {
    (async () => {
      await listAllParcelsFunction();

      try {
        // get parcels variables
        const value = await AsyncStorage.getItem('parcels');

        if (value !== null) {
          // We have data!!
          console.log("Parcels working", JSON.parse(value).length);
          const parsedParcels = JSON.parse(value);
          setParcels(parsedParcels);
          setFilteredParcels(parsedParcels);
        }

      } catch (error) {
        console.log("This is the error of getting parcels data", error);
      }
    })();
  }, []);

  /**
  
  Handles the card click action.
  @param {object} parcel - The selected parcel object.
  @returns {void}
  */
  const handleCard = (parcel) => {
    navigation.navigate("ParcelDetailsScreen", { parcel })

  }

  if (parcels) {
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search"
          onChangeText={(searchText) => {
            setSearchParcel(searchText);
            handleSearch(searchText);
          }}
          onCancel={() => console.log("Search cancelled")}
          containerStyle={styles.searchBar}
          inputContainerStyle={{
            backgroundColor: 'orange',
          }}
          inputStyle={{
            color: 'white',
          }}
          value={searchParcel}
        />

        <ScrollView contentContainerStyle={styles.contentContainer}>
          {filteredParcels.map((parcel, index) => (
            <TouchableHighlight onPress={() => handleCard(parcel)}>
              <Card key={index} title={parcel.title} price={parcel.people_price + " €"} image={{ uri: parcel.image1 }}></Card>
            </TouchableHighlight>
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
