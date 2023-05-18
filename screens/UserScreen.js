import { Text, View, StyleSheet, Image, TouchableHighlight,TouchableOpacity,Entypo,Title,Caption } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import ImagePicker from 'react-native-image-picker';
import imgPlaceHolder from "../assets/Fuego.png";

function UserScreen() {
  //----------------FOTO PERFIL-----------------------------
  const [profile, setProfile] = useState(null)

  const imagePick = () => {
      ImagePicker.openPicker({
          width: 400,
          height: 400,
          cropping: true
      }).then(image => {
          console.log(image);
          setProfile(image.path)
      });
  }

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
    <View style={styles.Usercontainer}>
      <View style={styles.logoContainer}>
        <Image style={styles.logoImage} source={require("../assets/Fuego.png")} />
        <Text style={styles.logoTxt}>Barbaqueue</Text>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.imgContainer}>
            <Image style={styles.image} source={profile ? { uri: profile } : imgPlaceHolder} />
            <TouchableOpacity onPress={imagePick}
                style={{ alignItems: 'flex-end', top: -10 }}>
                <Entypo name="pencil" size={20} color="green" />
            </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
            <Title>Vishal Pawar</Title>
            <Caption>github/vishalpwr</Caption>
        </View>
      </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'red'

    },

    //USER SCREEN------------------------------
    Usercontainer:{
        // backgroundColor:'#FFFCE4',
        flex:1,
        height:"100%",
        top:"5%"
    },
    logoContainer:{
      height:"7%",
      display: "flex",
      flexDirection: "row",
      alignItems:"center",
      backgroundColor:"red"
    },
    logoImage:{
      height:"90%",
      width:"10%"
    },
    logoTxt:{
      marginStart:"2%",
      fontSize:25,
      fontWeight:600
    },
    profileContainer: {
      flex: 0.8,
      justifyContent: 'center',
      alignItems: 'center'
  },
  imgContainer: {},
  textContainer: {
      alignItems: 'center',
  },
  image: {
      width: 110,
      height: 110,
      borderRadius: 55,
      borderColor: "black",
      borderWidth: 3,
  },
  userInfo: {
      flex: 1,
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

   export default UserScreen ;