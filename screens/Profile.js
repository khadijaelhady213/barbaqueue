import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform , TouchableOpacity, StyleSheet,Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faPencil,faEnvelope, faCalendarDays, faCircleInfo, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import imgPlaceHolder from "../assets/user-pic.jpg";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useTranslation } from 'react-i18next';

export default function Profile() {
  const { t } = useTranslation(); //array con las traducciones
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const pickImage = async () => {

    //lo que se encarga de cambiar foto perdil
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
  console.log('*********** Location:', location);
  console.log('ErrorMsg:', errorMsg);
  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.logoContainer,styles.shadowContainer]}>
        <Image source={require("../assets/Fuego.png")} style={styles.logoImg}/>
        <Text style={styles.logoTxt}>Profile</Text>
      </View>
      
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
          <Text>~ khadija el hady ~</Text>

        </View>
         {/* Espacio entre el perfil y el mapa */}
        <View style={{display:'flex', flexDirection:'row', paddingTop:'1%'}}>
          <FontAwesomeIcon icon={faStar} size={20}  color="#FFD700"/>
          <FontAwesomeIcon icon={faStar} size={20}  color="#FFD700"/>
          <FontAwesomeIcon icon={faStar} size={20} color="#FFD700"/>
          <FontAwesomeIcon icon={faStar} size={20} color="#FFD700"/>
          <FontAwesomeIcon icon={faStar} size={20} color="#FFD700"/>
        </View>
        <View style={styles.infoContainer}>
            <View style={styles.info}>
              <FontAwesomeIcon icon={faEnvelope} size={20} color="#000"/>
              <Text style={{marginStart:"5%", paddingTop:"0%", fontSize:15}}>khadijaelhady@gmail.com</Text>
            </View>
            
            <View style={[styles.info]}>
              
              <FontAwesomeIcon icon={faCircleInfo} size={20} color="#000"/>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                
                <Text style={{ marginStart: "5%", paddingTop: "0%", fontSize: 15 }}>Need help?</Text>
                <TouchableOpacity style={{ justifyContent: 'flex-end' }}>
                  <FontAwesomeIcon icon={faArrowRight} size={20} color="#000" />
                </TouchableOpacity>

              </View>

            </View>
            <View style={[styles.info]}>
              
              <FontAwesomeIcon icon={faPencil} size={20} color="#000"/>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                
                <Text style={{ marginStart: "5%", paddingTop: "0%", fontSize: 15 }}>Update user data</Text>
                <TouchableOpacity style={{ justifyContent: 'flex-end' }}>
                  <FontAwesomeIcon icon={faArrowRight} size={20} color="#000" />
                </TouchableOpacity>
                
              </View>

            </View>
            
            
        </View>
        
      </View>  

      <View style={styles.mapContainer}>
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
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
    top:"3%",
  },
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 5,
    borderTopWidth: 0,
  
  },
  logoContainer:{
    backgroundColor:"white",
    marginBottom:"2%",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  logoImg:{
    marginTop:"5%",
    marginBottom:"2%",
    height:30,
    width:30,
    resizeMode: 'contain', //esto evita que la imagen se corte
  },
  logoTxt:{
    marginTop:"5%",
    fontSize:25,
    fontWeight:600,
    marginStart:"2%",
    color: "#F63809",
  },
  imgContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"green",
    marginTop:"2%",
    marginBottom:"5%"
  },
  profilPic:{
    width: 110,
    height: 110,
    borderRadius: 55,
    // borderColor: "#e0e0e0",
    // borderWidth: 2,
    backgroundColor: 'red',
  },
  pencilIconContainer:{
    marginTop:-20,
    paddingLeft:25
  },
  infoContainer:{
    
    marginTop: "2%",
    marginBottom: "5%",
    alignSelf: 'start',
    width:"100%"
    // justifyContent: 'center',
    // display:'flex', 
    // flexDirection:'row', 
    // paddingTop:'5%'
  },
  info:{
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: '4%',
    marginRight: '6%',
    marginTop: '4%',
  // backgroundColor: 'green',
 

  },
  //--------------------mapa------------------
  mapContainer: {
    flex: 1,
    width: '100%',
    height: '50%',
    position: 'absolute',
    top: '50%',
    zIndex: 1,
    backgroundColor:"yellow"
  },
  map: {
    flex: 1,
    width: '100%',
    height: '50%',
  },
});

                                                                                                                                