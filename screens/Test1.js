import React from 'react';
import { View, Button } from 'react-native';
import Communications from 'react-native-communications';

const OpenInGoogleMapsButton = ({ location }) => {
  const handleOpenInGoogleMaps = () => {
    const address = encodeURIComponent(location);
    const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
    Communications.web(url);
  };

  return (
    <View>
      <Button title="Open in Google Maps" onPress={handleOpenInGoogleMaps} />
    </View>
  );
};

export default OpenInGoogleMapsButton;
