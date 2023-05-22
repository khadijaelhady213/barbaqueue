import React, { Component ,useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, TextInput, Text, Button, Image, ScrollView, StyleSheet,TouchableHighlight,useWindowDimensions,FlatList,ActivityIndicator,ImageBackground} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';


const HuertoForm = () => {
    const [nombreHuerto, setNombreHuerto] = useState('');
    const [precioPorPersona, setPrecioPorPersona] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [localizacion, setLocalizacion] = useState('');
    const [fotos, setFotos] = useState([]);
    const [esValido, setEsValido] = useState(false);
  
    const validarLocalizacion = async () => {
        try {
          setEsValido(true);
          // const response = await fetch(`https://api.geocoding-service.com/geocode?address=${localizacion}&country=YOUR_COUNTRY_CODE`);
          // const data = await response.json();
    
          // if (data.length > 0) {
          //   setEsValido(true);
          // } else {
          //   setEsValido(false);
          //   console.log('La localización ingresada no existe o no se encuentra en el mismo país');
          //}
        } catch (error) {
          console.error('Error al validar la localización:', error);
        }
    };
    
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { width } = useWindowDimensions();
  
    const pickImages = async () => {
      setIsLoading(true);
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 3,
        aspect: [4, 3],
        quality: 1,
      });
      setIsLoading(false);
      console.log(result);
      if (!result.cancelled) {
        if (result.assets) {
          setImages(result.assets.map((asset) => asset.uri));
        } else if (result.uri) {
          setImages([result.uri]);
        }
      }
    };
      
    
  
    const handleSubmit = () => {
       if (!esValido) {
        console.log('La localización ingresada no es válida');
        console.log('Datos del formulario:', nombreHuerto, precioPorPersona, descripcion, fotos);
        return;
        }
        console.log('Datos del formulario:', nombreHuerto, precioPorPersona, descripcion, fotos);
    };
  
    return (
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Nombre del huerto:</Text>
            <TextInput
              value={nombreHuerto}
              onChangeText={setNombreHuerto}
              style={styles.input}
              placeholder="Introduce el nombre del huerto"
            />
    
            <Text style={styles.label}>Precio por persona:</Text>
            <TextInput
              value={precioPorPersona}
              onChangeText={setPrecioPorPersona}
              style={styles.input}
              placeholder="Introduce el precio por persona"
              keyboardType="numeric"
            />
    
            <Text style={styles.label}>Descripción:</Text>
            <TextInput
              value={descripcion}
              onChangeText={setDescripcion}
              style={[styles.input, styles.multilineInput]}
              placeholder="Introduce una descripción"
              multiline
            />

            <Text style={styles.label}>Localización:</Text>
            <TextInput
                value={localizacion}
                onChangeText={setLocalizacion}
                style={styles.input}
                placeholder="Introduce la localización"
            />
            <Button title="Validar localización" onPress={validarLocalizacion} />
    
            <Text style={styles.label}>Fotos:</Text>
            <FlatList
              style={styles.imagesContainer}
              data={images}
              
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={{ width: width / 4, height: 160,  marginRight:11 ,paddingBottom: 0}}
                />
              )}
              numColumns={3}
              keyExtractor={(item) => item}
              contentContainerStyle={{ marginVertical: 50, paddingBottom: 0, marginTop:0,marginBottom:0}}
              ListHeaderComponent={
                isLoading ? (
                  <View>
                    <Text
                      style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
                    >
                      Loading...
                    </Text>
                    <ActivityIndicator size={"large"} />
                  </View>
                ) : (
                  <TouchableHighlight style={styles.imagesIcon} onPress={pickImages}>
                     <Image
                   
                      style={styles.background}
                      source={require("../assets/fotos2.jpg")} />
                  </TouchableHighlight>
                

                )
              }
            />

            <View style={ { backgroundColor: "#F63809" , borderRadius:10}}>
              <Button style={styles.Button}title="Guardar"  color="white" onPress={handleSubmit} />
            </View>
    
            
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 16,
        marginTop:"10%"
      },
      formContainer: {
     
        padding: 20,
       
      },
      label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 16,
      },
      multilineInput: {
        height: 80,
        paddingTop: 8,
        textAlignVertical: 'top',
      },
      fotosContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
      },
      imagesContainer: {
       
        backgroundColor: '#d6d5d2',
        height:"25%",
        display:'flex',
        flexDirection:'row',
        marginBottom:"5%"
       
      },
      foto: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
      button:{
        width: "70%",
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "8%",
        backgroundColor:"blue"
      }
    });
    
    export default HuertoForm;