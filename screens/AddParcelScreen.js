import React, { useState } from 'react';
import { View, TextInput, Text, Button, Image, FlatList, StyleSheet ,useWindowDimensions,ActivityIndicator} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';

const HuertoForm = () => {
  const { t } = useTranslation();
  const [nombreHuerto, setNombreHuerto] = useState('');
  const [precioPorPersona, setPrecioPorPersona] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [localizacion, setLocalizacion] = useState('');
  const [fotos, setFotos] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();

  //la parte que se encarga de poder seleccionar 3 imagenes de la galeria del dispositivo 
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
  //validar los inputs
  const validationSchema = Yup.object().shape({
    nombreHuerto: Yup.string().required(t('requiredField')),
    precioPorPersona: Yup.number().required(t('requiredField')),
    descripcion: Yup.string().required(t('requiredField')),
    localizacion: Yup.string().required(t('requiredField')),
  });

  //validar localizacion, no va
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
  const handleSubmit = (values) => {
    console.log('Datos del formulario:', values);
    // const formData = new FormData();
    //   formData.append('nombreHuerto', values.nombreHuerto);
    //   formData.append('precioPorPersona', values.precioPorPersona);
    //   formData.append('descripcion', values.descripcion);
    //   formData.append('localizacion', values.localizacion);
      
    //   // Agregar las imágenes al objeto FormData
    //   images.forEach((image, index) => {
    //     formData.append(`image${index + 1}`, {
    //       uri: image,
    //       type: 'image/jpeg', // Ajusta el tipo de archivo según corresponda
    //       name: `image${index + 1}.jpg`, // Ajusta el nombre del archivo según corresponda
    //     });
    //   });

    //   try {
    //     // Realizar la solicitud fetch al servidor
    //     const response = await fetch('URL_DEL_ENDPOINT_DE_TU_API', {
    //       method: 'POST',
    //       body: formData,
    //       // Asegúrate de ajustar los encabezados de la solicitud según sea necesario
    //     });

    //     // Manejar la respuesta del servidor
    //     if (response.ok) {
    //       console.log('Imágenes guardadas correctamente en la base de datos.');
    //     } else {
    //       console.error('Error al guardar las imágenes en la base de datos.');
    //     }
    //   } catch (error) {
    //     console.error('Error de red:', error);
    //   }
    // };

  };
  const registerFunction = (values) => {
    console.log(values)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" /> 
      
      <View style={[styles.logoContainer,styles.shadowContainer]}>
        <Image source={require("../assets/Fuego.png")} style={styles.logoImg}/>
        <Text style={styles.logoTxt}>{t('newParcel')}</Text>
      </View>

      <Formik
        initialValues={{nombreHuerto: '',precioPorPersona: '',descripcion: '',localizacion: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnChange={false} //esto y 
        validateOnBlur={false} //esto eviata que los errores de validacion aparezcan antes de pulsar el votón Join Us
      >
        {({ handleChange, handleSubmit, errors, values }) => (
          <View style={styles.formContainer}>
          
            <Text style={styles.label}>{t('name')}</Text>
            <TextInput value={values.nombreHuerto} onChangeText={handleChange('nombreHuerto')} style={[styles.input, errors.nombreHuerto && styles.inputError]}
              placeholder={errors.nombreHuerto ? errors.nombreHuerto : t('nameInput')}
            />

            <Text style={styles.label}>{t('price')}</Text>
            <TextInput  keyboardType="numeric" value={values.precioPorPersona} onChangeText={handleChange('precioPorPersona')} style={[styles.input, errors.precioPorPersona && styles.inputError]}
              placeholder={errors.precioPorPersona ? errors.precioPorPersona : t('priceInput')}
            />

            <Text style={styles.label}>{t('description')}</Text>
            <TextInput value={values.descripcion} onChangeText={handleChange('descripcion')} style={[styles.input, errors.descripcion && styles.inputError]}
             placeholder={errors.descripcion ? errors.descripcion : t('decInput')}
            />

            <Text style={styles.label}>{t('location')}</Text>
            <TextInput value={values.localizacion} onChangeText={handleChange('localizacion')} style={[styles.input, errors.localizacion && styles.inputError]}
             placeholder={errors.localizacion ? errors.localizacion : t('locationInput')}/>

            <View  style={ styles.saveBtn}>
              <Button title={t('sabeBtn')}  color="white" onPress={handleSubmit} />
            </View>

            <Text style={styles.label}>{t('pictures')}</Text>

            <FlatList
              
              style={[styles.imagesContainer, images.length > 0 && styles.imagesContainerWithImages]}
              data={images}
              
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={{ width: width / 3.6, height: 150, paddingTop:0,paddingBottom: 0, marginTop:0,marginBottom:0, marginRight:10 ,paddingBottom: 0, borderRadius:5 }}
                />
              )}
              numColumns={3}
              keyExtractor={(item) => item}
              contentContainerStyle={{ marginVertical: 0, paddingTop:0,paddingBottom: 0, marginTop:0,marginBottom:0,}}
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
                  
                  <View style={[styles.buttonContainer, images.length > 0 && styles.buttonContainerWithImages]}>
                    <Button title={t('pickImage')}  color="white" onPress={pickImages} />
                  </View>
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
    marginTop:"5%"

  },
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity:  0.2,
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
  formContainer:{
   padding:20

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
    marginBottom:"5%",
  },
  imagesContainerWithImages:{
    height:"27%",
    width:"100%",
    // backgroundColor:"green",
    width:"100%",
    display:'flex',
    flexDirection:'row',
    marginBottom:"5%",
    overflow:'hide'
  },
  
  button:{
    width: "70%",
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "8%",
    marginBottom:"5%",
    
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
    marginStart:0,
    paddingStart:0,
    marginStart:0,
    backgroundColor: '#F63809',
    
  },
  inputError: {
    borderColor: 'red',
    // Otros estilos adicionales para indicar el error
  },
});

export default HuertoForm;