import { Image, Button, Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";

import ListItem from "./ListItem";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Card from "./Card";
import { TouchableOpacity } from "react-native-gesture-handler";
/**

Array of listings containing information about each listing.
@typedef {Object} Listing
@property {number} id - The unique identifier of the listing.
@property {string} title - The title of the listing.
@property {number} price - The price of the listing.
@property {ImageSource} image - The source of the image for the listing.
*/
/**
An array of listings.
@type {Listing[]}
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

Component for displaying the details of a listing.
@param {object} props - The props passed to the ListingDetailsScreen component.
@returns {JSX.Element} - The rendered ListingDetailsScreen component.
*/
export default function ListingDetailsScreenRefactored(props) {
  return (
    <View style={styles.container}>
      <View style={styles.imageBlock}>
        <Image source={require("../assets/barbacoaa.png")} style={styles.imageWidth} />
      </View>
      <View style={styles.infoBlock}>
        <Text style={styles.description_title}>Información sobre la parcela</Text>
        <Text style={styles.description}>Parcela rústica ideal para acampar o disfrutar de escapadas al aire libre. Ubicada en un entorno natural y tranquilo, rodeada de vegetación, con fácil acceso por carretera. Espacio amplio y versátil para caravanas, tiendas o actividades recreativas. Perfecta para desconectar y disfrutar de la naturaleza.</Text>
        <Text style={styles.cars}>Características generales</Text>
        <Text style={styles.description}>• Zona de parrilla</Text>
        <Text style={styles.description}>• Mesas y bancos</Text>
        <Text style={styles.description}>• Pérgola para el sol</Text>
        <Text style={styles.description}>• Fuente</Text>
        <Text style={styles.description}>• Zona segura</Text>
        <Text style={styles.cars}>Coste por persona</Text>
        <Text style={styles.description}> 3€ por persona.</Text>
        <TouchableOpacity style={styles.button} title="Email" >
          <Text style={styles.buttonText}>Reservar</Text>
        </TouchableOpacity>

        {/* <ListItem
          title="khadija el hady"
          subTitle="5 listings"
          image={require("../assets/test1.jpg")}
        />

        <Card title="hola" price="10 euros" image={listings[1].image}></Card> */}

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  imageWidth: {
    width: 400,
    height: 250
  },
  buttonsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 4
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    textAlign: "center"
  },
  description_title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  cars: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 20,
    paddingTop: 20
  },

  description: {
    fontSize: 14,
    textAlign: "justify"
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    height: 50,
    width: 180,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#7615de",
    marginLeft: 100
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  imageBlock: {
    flex: 3.5,
    paddingTop: 60
  },
  infoBlock: {
    flex: 6.5,
    padding: 20,
  },
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
