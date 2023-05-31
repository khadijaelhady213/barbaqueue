import React from 'react';
import { View, Button,StyleSheet } from 'react-native';
import Communications from 'react-native-communications';
/**

OpenInGoogleMapsButton component.
@param {object} location - Location object containing address information.
@returns {JSX.Element} JSX element representing the OpenInGoogleMapsButton component.
/
const OpenInGoogleMapsButton = ({ location }) => {
/*
Handle opening the location in Google Maps.
*/

const OpenInGoogleMapsButton = ({ location }) => {
  const handleOpenInGoogleMaps = () => {
    const address = encodeURIComponent(location);
    const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
    Communications.web(url);
  };

  return (
    <View style={styles.bt}>
        
      <Button title="Open in Google Maps" color="black" onPress={handleOpenInGoogleMaps} />
    </View>
  );
};
const styles = StyleSheet.create({
    bt:{
        borderWidth: 1,
        borderColor:"#d6d3d2",
        borderRadius:5
    }
});

export default OpenInGoogleMapsButton;
