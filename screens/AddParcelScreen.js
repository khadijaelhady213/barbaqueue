import React, { Component ,useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, TextInput, Text, Button, Image, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
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
          const response = await fetch(`https://api.geocoding-service.com/geocode?address=${localizacion}&country=YOUR_COUNTRY_CODE`);
          const data = await response.json();
    
          if (data.length > 0) {
            setEsValido(true);
          } else {
            setEsValido(false);
            console.log('La localización ingresada no existe o no se encuentra en el mismo país');
          }
        } catch (error) {
          console.error('Error al validar la localización:', error);
        }
    };
    
    const seleccionarFoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permiso denegado para acceder a la galería de fotos');
          return;
        }
      
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: true,
          maxSelectedAssets: 3,
        });
      
        if (result && !result.canceled && result.selectedAssets) {
          setFotos(result.selectedAssets);
        }
      };
      
      const renderFotos = () => {
        return (
          <View style={styles.fotosContainer}>
            {fotos.map((foto, index) => (
              <View key={index} style={styles.fotoContainer}>
                <Image source={{ uri: foto.uri }} style={styles.foto} />
              </View>
            ))}
            {fotos.length < 3 && (
              <TouchableOpacity style={styles.fotoContainer} onPress={seleccionarFoto}>
                <FontAwesomeIcon icon={faCamera} size={48} color="#ccc" />
              </TouchableOpacity>
            )}
          </View>
        );
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
        <ScrollView style={styles.container}>
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
            <Button title="Seleccionar fotos" onPress={seleccionarFoto} />
            {renderFotos()}
    
            <Button title="Guardar" onPress={handleSubmit} />
          </View>
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 16,
        marginTop:"10%"
      },
      formContainer: {
        marginBottom: 16,
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
      fotoContainer: {
        width: 100,
        height: 100,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
      },
      foto: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
    });
    
    export default HuertoForm;