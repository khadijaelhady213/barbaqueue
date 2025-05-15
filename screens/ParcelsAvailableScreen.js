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

// Ejemplos de entradas para el listing
const listings = [
  {
    id: 1,
    title: "Red jacket for sale",
    price: 100,
    image: require("../assets/mainScreenBackground.png"),
    location: 'manlleu'
  },
  {
    id: 2,
    title: "Couch in great condition",
    price: 1000,
    image: require("../assets/splash.png"),
    location: 'Manresa'
  },
];

/** Parcels Available screen component.
    @param {object} props - Component props.
    @returns {JSX.Element} JSX element representing the Parcels Available screen. */

export default function ParcelsAvailableScreen(props) {
  const [parcels, setParcels] = useState(null);
  const [searchParcel, setSearchParcel] = useState('');
  const [filteredParcels, setFilteredParcels] = useState([]);
  const navigation = useNavigation();
  const [cargando, setCargando] = useState(false);

  /**   Handles the search functionality.
        @param {string} searchText - The text to search.
        @returns {void} */

  const handleSearch = (searchText) => {
    if (parcels) {
      setFilteredParcels(parcels.filter(parcel => parcel.location.toLowerCase().includes(searchText.toLowerCase())));
    }
  }

  useEffect(() => {
    const cargarDatos = async () => {

      //  await listAllParcelsFunction(); // GET a JSON and save it into AsyncStorage
      await new Promise(resolve => setTimeout(resolve, 1500));

      setParcels(listings);
      setCargando(true);

      /*      try {
              // Get parcels variables from async Storage (used by react and different from sessionstorage or localStorage)
              const value = await AsyncStorage.getItem('parcels');
      
              if (value !== null) { // We have data from server!!
                console.log("Parcels working", JSON.parse(value).length);
                const parsedParcels = JSON.parse(value);
                setParcels(parsedParcels);
                setFilteredParcels(parsedParcels);
      
              } else { // Demo data
                const parsedParcels = JSON.parse(listings);
                setParcels(parsedParcels);
                setFilteredParcels(parsedParcels);
              }
      
      
            } catch (error) {
              console.log("This is the error of getting parcels data", error);
            }*/
    }

    cargarDatos();
  }, []);

  /**
  
  Handles the card click action.
  @param {object} parcel - The selected parcel object.
  @returns {void}
  */
  const handleCard = (parcel) => {
    navigation.navigate("ParcelDetailsScreen", { parcel })

  }

  if (cargando) {
    return (
      <View style={styles.container}>
        <SearchBar
          platform="default"
          placeholder="Search"
          onChangeText={(text) => {
            setSearchParcel(text);
            handleSearch(text);
          }}
          containerStyle={{
            marginTop: 50,
            marginLeft: 50,
            marginright: 80,
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 12,
            padding: 0,
          }}
          inputContainerStyle={{
            backgroundColor: 'white',
          }}
          inputStyle={{
            color: 'black',
          }}
          value={searchParcel}
        />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {filteredParcels.map((parcel, index) => (
            <TouchableHighlight onPress={() => handleCard(parcel)}>
              <Card key={index} title={parcel.title} price={parcel.people_price + " €"} image={parcel.image}></Card>
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
    overflow: 'hidden',
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
    marginTop: 30,
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
