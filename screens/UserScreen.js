import { Text, View, StyleSheet, Image, TouchableHighlight,TouchableOpacity,Entypo,Title,Caption } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import ImagePicker from 'react-native-image-picker';
import imgPlaceHolder from "../assets/Fuego.png";

function UserScreen() {


  //--------------------------MAPA-----------------------------------
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

 
  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  return (

      <View style={styles.containerMap}>
        {location && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Your Location"
            />
          </MapView>
        )}
      </View>
   
  );
}

const styles = StyleSheet.create({

    containerMap: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
     
    },
    map: {
      width: '100%',
      height: '50%',
    },
   });

   export default UserScreen ;