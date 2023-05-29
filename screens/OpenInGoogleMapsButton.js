import React from 'react';
import { View, Button,StyleSheet } from 'react-native';
import Communications from 'react-native-communications';

/**
 * Button component to open a location in Google Maps.
 * @param {Object} props - The component props.
 * @param {string} props.location - The location address.
 * @returns {JSX.Element} - The rendered component.
 */
const OpenInGoogleMapsButton = ({ location }) => {
 /**
   * Handles opening the location in Google Maps.
   */
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
