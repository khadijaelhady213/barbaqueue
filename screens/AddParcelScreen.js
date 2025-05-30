import React, { useState } from 'react';
import { View, TextInput, Text, Button, Image, FlatList, StyleSheet, useWindowDimensions, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { createParcelFunction } from '../interactWithApi/createParcelFunction';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const AddParcelScreen = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  console.log("aqui esta el valor de navigation: ", navigation)
  //la parte que se encarga de poder seleccionar 3 imagenes de la galeria del dispositivo 
  /**
 * Handler for picking images from the device's gallery.
 */
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
    if (!result.canceled) {
      if (result.assets) {
        setImages(result.assets.map((asset) => asset.uri));
      } else if (result.uri) {
        setImages([result.uri]);
      }
    }
  };

  const validateLocalizacion = async (value) => {
    if (value && value.trim().length > 0) {
      return await validateAddress(value);
    }
    return true;
  };

  /**
 * Component for adding a new parcel.
 */
  const validationSchema = Yup.object().shape({
    nombreHuerto: Yup.string().required(t('requiredField')),
    precioPorPersona: Yup.number().required(t('requiredField')),
    descripcion: Yup.string().required(t('requiredField')),
    capacity: Yup.string().required(t('requiredField')),
    localizacion: Yup.string()
      .test('isValidAddress', t('invalidAddress'), validateLocalizacion)
      .required(t('requiredField')),
  });

  /**
 * Validates the address using the Nominatim API.
 * @param {string} address - The address to validate.
 * @returns {Promise<boolean>} - A promise that resolves to true if the address is valid, false otherwise.
 */

  const validateAddress = async (address) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      return response.data.length > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  /**
 * Handles the form submission.
 * @param {object} values - The form values.
 */
  const handleSubmit = async (values) => {

    console.log('Dades del formulari:', values);

    try {
      await validationSchema.validate(values, { abortEarly: false });

      // create Parcel request
      const createParcelRequest = {
        title: values.nombreHuerto,
        people_price: parseFloat(values.precioPorPersona),
        capacity: parseInt(values.capacity),
        location: values.localizacion,
        image1: images[0] ? images[0] : null,
        image2: images[1] ? images[1] : null,
        image3: images[2] ? images[2] : null,
        description: values.descripcion,
        user_id: user.id
      }

      const created = await createParcelFunction(createParcelRequest, navigation)

      if (created) {
        // Call the navigation.navigate method with the desired screen name
        navigation.replace("NavbarScreen");
      }


    } catch (error) {
      console.log('Errores de validación:', error);
      // Si hay un error de validación en localizacion pero no está vacío, modificar el mensaje de error
      if (error.path === 'localizacion' && values.localizacion.trim() !== '') {
        error.errors = [t('invalidAddress')];
      }
    }
  };
  const registerFunction = (values) => {
    console.log(values)
  }

  useEffect(() => {
    (async () => {
      try {
        // get parcels variables
        const value = await AsyncStorage.getItem('user');

        if (value !== null) {
          // We have data!!
          console.log("user from createparcel working", JSON.parse(value).length)
          setUser(JSON.parse(value))
        }

      } catch (error) {
        console.log("This is the error of getting USERS data", error)
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/** TOP LOGO */}
      <Text style={styles.logoTxt}>Crear parcela</Text>

      {/** Parcel FORM */}
      <Formik
        initialValues={{ nombreHuerto: '', precioPorPersona: '', descripcion: '', localizacion: '', capacity: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnChange={false} //esto y 
        validateOnBlur={false} //esto eviata que los errores de validacion aparezcan antes de pulsar el votón Join Us
      >
        {({ handleChange, handleSubmit, errors, values }) => (
          <View style={styles.formContainer}>

            {/** Name of Parcel INPUT */}
            <TextInput value={values.nombreHuerto} onChangeText={handleChange('nombreHuerto')} style={[styles.input, errors.nombreHuerto && styles.inputError]}
              placeholder={errors.nombreHuerto ? errors.nombreHuerto : 'Nombre parcela'}
            />

            {/** Price of Parcel INPUT */}
            <TextInput keyboardType="numeric" value={values.precioPorPersona} onChangeText={handleChange('precioPorPersona')} style={[styles.input, errors.precioPorPersona && styles.inputError]}
              placeholder={errors.precioPorPersona ? errors.precioPorPersona : 'Precio'}
            />
            {/** Capacity of Parcel INPUT */}
            <TextInput value={values.capacity} onChangeText={handleChange('capacity')} style={[styles.input, errors.capacity && styles.inputError]}
              placeholder={errors.capacity ? errors.capacity : 'Capacidad'} />

            {/** Description of Parcel INPUT */}
            <TextInput value={values.descripcion} onChangeText={handleChange('descripcion')} style={[styles.input, errors.descripcion && styles.inputError]}
              placeholder={errors.descripcion ? errors.descripcion : 'Descripción'}
            />

            {/** Location of Parcel INPUT */}
            <TextInput value={values.localizacion} onChangeText={handleChange('localizacion')} style={[styles.input, errors.localizacion && styles.inputError]}
              placeholder={errors.localizacion ? errors.localizacion : 'Localización'} />


            {/** Save BUTTON */}
            <LinearGradient
              colors={['#7615DE', '#9E15DE', '#B915DE']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            >

              <Button title={t('sabeBtn')} color="white" onPress={handleSubmit} />
            </LinearGradient>

            <FlatList
              style={[styles.imagesContainer, images.length > 0 && styles.imagesContainerWithImages]}
              data={images}

              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={{ width: width / 3.6, height: 150, paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0, marginRight: 10, paddingBottom: 0, borderRadius: 5 }}
                />
              )}
              numColumns={3}
              keyExtractor={(item) => item}
              contentContainerStyle={{ marginVertical: 0, paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0, }}
              ListHeaderComponent={
                isLoading ? (
                  <View>
                    <Text
                      style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
                    >canceled
                      {t('loading')}
                    </Text>
                    <ActivityIndicator size={"large"} />
                  </View>
                ) : (
                  <LinearGradient
                    colors={['#7615DE', '#9E15DE', '#B915DE']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                  >
                    <Button title={'Seleccionar Imagen'} color="white" onPress={pickImages} />
                  </LinearGradient>
                )

              }

            />

          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "5%",
    backgroundColor: "white"

  },
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    borderTopWidth: 0,

  },
  logoContainer: {
    backgroundColor: "white",
    marginBottom: "2%",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  logoImg: {
    marginTop: "5%",
    marginBottom: "2%",
    height: 30,
    width: 30,
    resizeMode: 'contain', //esto evita que la imagen se corte
  },
  logoTxt: {
    paddingTop: 70,
    paddingBottom: 0,
    fontSize: 25,
    fontWeight: 600,
    marginStart: 20,
    color: "black",
  },
  formContainer: {
    padding: 20,
    paddingTop: 20

  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    color: "black"
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  multilineInput: {
    height: 80,
    paddingTop: 8,
    textAlignVertical: 'top',
  },

  imagesContainer: {
    marginBottom: "5%",
  },
  gradient: {
    borderRadius: 12,
    height: 50,
    marginBottom: 10,
  },
  imagesContainerWithImages: {
    height: "27%",
    width: "100%",
    // backgroundColor:"green",
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    marginBottom: "5%",
    overflow: 'hide'
  },

  button: {
    width: "70%",
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "8%",
    marginBottom: "5%",

  },
  saveBtn: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    backgroundColor: '#F63809',
    borderRadius: 10,
    // marginTop:10
  },
  buttonContainer: {
    backgroundColor: '#F63809',
    width: '100%',
    marginBottom: 10,
    borderRadius: 10,
    alignSelf: 'start',

  },
  buttonContainerWithImages: {
    width: '98%',
    marginStart: 0,
    paddingStart: 0,
    marginStart: 0,
    backgroundColor: '#F63809',

  },
  inputError: {
    borderColor: 'red',
    // Otros estilos adicionales para indicar el error
  },
});

export default AddParcelScreen;