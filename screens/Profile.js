import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform , TouchableOpacity, StyleSheet,Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAlignLeft, faPencil} from '@fortawesome/free-solid-svg-icons';
import imgPlaceHolder from "../assets/defaultUserPic.png";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


export default function Profile() {
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };
//-----------------MAPA-------------

const [errorMsg, setErrorMsg] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   })();
  // }, []);
  // if (errorMsg) {
  //   return <Text>{errorMsg}</Text>;
  // }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor:"#e0e0e0"}}>
      <View  style={styles.imgContainer} >
        
        {image ? (
          <Image source={{ uri: image }} style={styles.profilPic} />
        ) : (
          <Image source={imgPlaceHolder} style={styles.profilPic} />
        )}
        
        <TouchableOpacity  onPress={pickImage} style={styles.pencilIconContainer}>
          <FontAwesomeIcon icon={faPencil} size={30} paddingTop='0%' color="#FF8300"/>
        </TouchableOpacity>

        <View>
          <Text>CONTENIDO PERFIL USUARIO</Text>
        </View>


        {/* <View style={styles.containerMap}>
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
        </View> */}
      </View>  
  </View>
     
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:"blue"
    },
    profileContainer: {
        flex: 0.8,
        justifyContent: 'start',
        // alignItems: 'center'
    },
    imgContainer: {
      backgroundColor:"blue",
      alignItems:"center"
    },
    profilPic: {
      width: 130,
      height: 130,
      borderRadius: 64,
      borderColor: "black",
      borderWidth: 3,
      backgroundColor:"white"
    },
    pencilIconContainer: {  //no vaaaaaaaaaaaaa
       alignItems:"start",  
       faAlignLeft:"end"
    },
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
                                                                                                                                