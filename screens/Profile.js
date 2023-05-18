import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform , TouchableOpacity, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPencil} from '@fortawesome/free-solid-svg-icons';


export default function Profile() {
  const [image=require("../assets/Fuego.png"), setImage] = useState(null);
  

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
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    
    
      <View style={styles.imgContainer}>
          <Image style={styles.image} source={profile ? { uri: profile } : imgPlaceHolder} />
          <TouchableOpacity onPress={pickImage}
                style={{ alignItems: 'flex-end', top: -10 }}>
               <FontAwesomeIcon icon={faPencil} size={30} paddingTop='2%' color="#FF8300" />
            </TouchableOpacity>
      </View>  
    </View>   
     
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
  });
                                                                                                                                