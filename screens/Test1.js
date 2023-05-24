import React, { useState } from 'react';
import { View, TextInput, Text, Button, Image, ScrollView, StyleSheet, TouchableHighlight, useWindowDimensions, FlatList, ActivityIndicator, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const HuertoForm = () => {
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    nombreHuerto: Yup.string().required('El nombre del huerto es obligatorio'),
    precioPorPersona: Yup.number().required('El precio por persona es obligatorio'),
    descripcion: Yup.string().required('La descripción es obligatoria'),
    localizacion: Yup.string().required('La localización es obligatoria'),
  });

  const [nombreHuerto, setNombreHuerto] = useState('');
  const [precioPorPersona, setPrecioPorPersona] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [localizacion, setLocalizacion] = useState('');
  const [fotos, setFotos] = useState([]);
  const [errors, setErrors] = useState({});

  const validarLocalizacion = async () => {
    try {
      // Validar existencia y validez de la localización aquí
      if (localizacion === 'TU_CODIGO_DE_VALIDACION') {
        setErrors((prevErrors) => ({ ...prevErrors, localizacion: 'La localización ingresada no es válida' }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, localizacion: '' }));
      }
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

  const handleSubmit = async () => {
    try {
      await validationSchema.validate({
        nombreHuerto,
        precioPorPersona,
        descripcion,
        localizacion,
      });

      // Validar existencia y validez de la localización
      await validarLocalizacion();

      // La validación es exitosa, puedes enviar los datos o realizar otras acciones
      console.log('Datos del formulario:', nombreHuerto, precioPorPersona, descripcion, fotos);
    } catch (error) {
      // La validación falló, muestra los mensajes de error en los inputs correspondientes
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach((fieldError) => {
          errors[fieldError.path] = fieldError.message;
        });
        setErrors(errors);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.label}>{t('nombreHuerto')}</Text>
        <TextInput
          value={nombreHuerto}
          onChangeText={setNombreHuerto}
          style={styles.input}
          placeholder={t('nombreHuertoPlaceholder')}
        />
        {errors.nombreHuerto && <Text style={styles.error}>{errors.nombreHuerto}</Text>}

        <Text style={styles.label}>{t('precioPorPersona')}</Text>
        <TextInput
          value={precioPorPersona}
          onChangeText={setPrecioPorPersona}
          style={styles.input}
          placeholder={t('precioPorPersonaPlaceholder')}
          keyboardType="numeric"
        />
        {errors.precioPorPersona && <Text style={styles.error}>{errors.precioPorPersona}</Text>}

        <Text style={styles.label}>{t('descripcion')}</Text>
        <TextInput
          value={descripcion}
          onChangeText={setDescripcion}
          style={[styles.input, styles.multilineInput]}
          placeholder={t('descripcionPlaceholder')}
          multiline
        />
        {errors.descripcion && <Text style={styles.error}>{errors.descripcion}</Text>}

        <Text style={styles.label}>{t('localizacion')}</Text>
        <TextInput
          value={localizacion}
          onChangeText={setLocalizacion}
          style={styles.input}
          placeholder={t('localizacionPlaceholder')}
        />
        {errors.localizacion && <Text style={styles.error}>{errors.localizacion}</Text>}
        <Button title={t('validarLocalizacion')} onPress={validarLocalizacion} />

        <Text style={styles.label}>{t('fotos')}</Text>
        <FlatList
          style={[styles.imagesContainer, images.length > 0 && styles.imagesContainerWithImages]}
          data={images}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{ width: width / 3.9, height: 150, marginRight: 8, paddingBottom: 0, borderRadius: 5 }}
            />
          )}
          numColumns={3}
          keyExtractor={(item) => item}
          contentContainerStyle={{ marginVertical: 50, paddingBottom: 0, marginTop: 0, marginBottom: 0, justifyContent: 'space-between' }}
          ListHeaderComponent={
            isLoading ? (
              <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{t('loading')}</Text>
                <ActivityIndicator size={'large'} />
              </View>
            ) : (
              <View style={[styles.buttonContainer, images.length > 0 && styles.buttonContainerWithImages]}>
                <Button title={t('eligeFoto')} color="white" onPress={pickImages} />
              </View>
            )
          }
        />

        <View style={{ backgroundColor: '#F63809', borderRadius: 10 }}>
          <Button style={styles.Button} title={t('guardar')} color="white" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: '10%',
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
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  imagesContainer: {
    marginBottom: 16,
  },
  imagesContainerWithImages: {
    marginBottom: 0,
  },
  buttonContainer: {
    backgroundColor: '#FF5F0E',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 16,
  },
  buttonContainerWithImages: {
    marginVertical: 0,
  },
});

export default HuertoForm;
