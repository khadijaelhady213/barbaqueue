import { Text, View ,StyleSheet,Image, Button, TextInput ,Dimensions,ScrollView,  Alert, Modal,SafeAreaView } from 'react-native';
import React, { Component, useState ,useEffect} from 'react'
import { useTranslation } from 'react-i18next';
import OpenInGoogleMapsButton from './OpenInGoogleMapsButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationDot} from '@fortawesome/free-solid-svg-icons';
import { StatusBar } from 'expo-status-bar';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { createBillingFunction } from '../interactWithApi/createBillingFunction';


/**
 * Parcel details screen component.
 * @returns {JSX.Element} - The rendered component.
 */
export default function ParcelDetailsScreen({route}) {
  
  /**
   * All the text that the user sees either in english or spanish.
   * @constant
   */
   const [user, setUser] = useState([]);
   const { parcel } = route.params;
  const { t } = useTranslation();
  const images = [
    parcel.image1,
    parcel.image2,
    parcel.image3
  ];

  //variables para el carrusel de imagenes de la parcela
  const deviceWidth = Dimensions.get('window').width;
  const [activeSlide, setActiveSlide] = useState(0);

/**
   * Handles the scroll event of the carousel.
   * @param {Object} event - The scroll event.
   */
  const handleScroll = (event) => {
      const slideWidth = deviceWidth - 40;
      const contentOffset = event.nativeEvent.contentOffset.x;
      const index = Math.round(contentOffset / slideWidth);
      setActiveSlide(index);
  };

  //-------------CALENDARIO-------------------------------
     // Fechas reservadas (ejemplo: 28, 29 y 30 de este mes)
  const reservedDates = ['2023-05-28', '2023-05-29', '2023-05-30'];

  // Fecha seleccionada por el usuario
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate.toISOString().split('T')[0]);

  // Estado del modal
  const [modalVisible, setModalVisible] = useState(false);

  /**
   * Handles the date change.
   * @param {Object} date - The selected date.
   */
  const handleChangeDate = (date) => {
    setSelectedDate(date.dateString);
  };

 /**
   * Handles saving the selected date.
   */
  const handleSaveDate = () => {
    if (!selectedDate) {
      Alert.alert('Error', 'Por favor, selecciona una fecha');
      return;
    }

    // Verificar si la fecha seleccionada es anterior a la fecha actual
    const selectedDateTime = new Date(selectedDate).getTime();
    const currentDateTime = new Date().getTime();
    if (selectedDateTime < currentDateTime) {
      Alert.alert('Error', 'No puedes seleccionar una fecha anterior a la fecha actual');
      return;
    }

    // La fecha seleccionada es válida, realizar las acciones correspondientes
    Alert.alert('Éxito', `Fecha seleccionada: ${selectedDate}`);

    // Cerrar el modal y restablecer el estado
    setModalVisible(false);
  };

  // Configurar los textos en español para la biblioteca react-native-calendars
  LocaleConfig.locales['es'] = {
    monthNames: [ 'Enero','Febrero', 'Marzo','Abril','Mayo','Junio', 'Julio', 'Agosto', 'Septiembre','Octubre','Noviembre','Diciembre', ],
    monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
  };
  LocaleConfig.defaultLocale = 'es';
 //-------------FIN CALENDARIO--------------------------
 
 /**
   * Handles the booking action.
   */
  const handleBooking = async () => {
    if (selectedDate) {

      const created = await createBillingFunction();
  
      if (created) {
        console.log("Dime que entras please");
        navigation.replace("NavbarScreen");
      }
  
      Alert.alert(t('success'), t('bookingConfirmed'));
    } else {
      Alert.alert('Error', 'Please select a valid date');
    }
  };
    
 //-------------VARIABLES QUE SE TIENEN QUE OBTENER DESDE LA BASE DE DATOS----------------
  const location = 'Carretera Pont de Vilomara 37, Manresa';
  const useImageProfile="../assets/user-pic1.jpg";
  const useName="khadija el hady";
  const userEmail="khadijaelhady@gmail.com";
  const parcelTilte="Casa rural barbacoa";
  const parcelPrice="20";
  const parcelCapacity=" 5 personas";
  const parcelDescription=" Espacio preparado completamente"

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View style={styles.container}>
        <StatusBar backgroundColor="white" style="auto" />
              <View >
                  <View style={styles.parcelOwnerContainer}>
                      <Image source={require(useImageProfile)}  style={styles.ownerImage}/>
                      
                      <View style={styles.OwnerContainer}>
                          <Text style={{ fontSize:20, fontWeight: 'bold' }}>{parcel.username + " " + parcel.userlastname}</Text>
                          <Text style={styles.parcelPrice}>{parcel.useremail}</Text>
                      </View>

                  </View>
                  
                  <View  style={ styles.chatBtn}>
                    <Button title={t('chat')}  color="white"  />
                  </View>
              </View>
              <View style={{height: '35%'}} >
                  <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.carouselContainer}
                      onScroll={handleScroll} // Handle scroll event
                      pagingEnabled // Enable snapping to each image
                  >
                      {images.map((image, index) => (
                      <View key={index} style={[styles.carouselItem, { width: deviceWidth - 40 }]}>
                          <Image source={{uri: image}} style={styles.image} resizeMode="cover" />
                      </View>
                      ))}
                  </ScrollView>
                  <View style={styles.paginationContainer}>
                      {images.map((_, index) => (
                      <View
                          key={index}
                          style={[
                          styles.paginationDot,
                          index === activeSlide && styles.activePaginationDot, // Apply active style
                          ]}
                      />
                      ))}
                  </View>
              </View>

          <View style={{paddingRigth:2, paddingLeft:2 }}>
              <View style={styles.pareceInfoContainer}>
                  <Text style={{ fontSize:20, fontWeight: 'bold' }}>{parcel.title}</Text>
                  <Text style={styles.parcelPrice}>{parcelPrice}€</Text>
                  <Text style={styles.parcelPrice}>Capacidad: {parcel.capacity}</Text>
                  <Text style={styles.parcelPrice}>Descripción: {parcel.description}</Text>
              </View>
              <View style={styles.mapContainer}>
                  <View style={{display:'flex', flexDirection:'row',  marginBottom:"5%", alignItems:"center"}}>
                      <FontAwesomeIcon icon={faLocationDot} size={30} paddingTop='0%' color="#FF8300"/>
                      <Text style={{marginStart:"2%", fontSize:16, paddingTop:"2%"}}>{parcel.location}</Text>
                  </View>
                  <OpenInGoogleMapsButton location={parcel.location} />
              </View>

                
              {/* <View style={{display:'flex', flexDirection:'row',marginTop:0,alignItems:'center', marginTop:"5%",marginBottom:"5%"}}> */}
              <Text style={{ fontSize:16, marginTop:"5%"}}>{t('chooseDate')}</Text>
              {/* //calendario */}
              
                <TextInput
                  style={styles.input}
                  placeholder={selectedDate}
                  onFocus={() => setModalVisible(true)}
                />

                <Modal visible={modalVisible} animationType="slide">
                  <View style={styles.modalContainer}>
                    <Calendar
                      markedDates={{
                        [selectedDate]: { selected: true, marked: true },
                        ...reservedDates.reduce((acc, date) => {
                          acc[date] = { disabled: true, disableTouchEvent: true,
                            customStyles: {
                              container: styles.disabledDate, text: styles.disabledDateText,
                            },
                          };
                          return acc;
                        }, {}),
                      }}
                      onDayPress={handleChangeDate}
                      markingType="custom"
                    />

                    <Button title="Guardar" onPress={handleSaveDate} />
                  </View>
                </Modal>
            
              <View  style={[ styles.chatBtn, {marginTop:"3%"}]}>
              <Button title={t('bookIt')}  color="white" onPress={handleBooking} />
              </View>
          </View>
          
        </View>
      </ScrollView>
      </SafeAreaView>
    </View>
  )
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    padding:"5%",
    paddingTop:"0%"
    
  },
  carouselContainer: {
      
      flexDirection: 'row',
      alignItems: 'center',
      
    },
    carouselItem: {
      height: 250,
      borderRadius: 10,
      paddingRight: 2, // Space between images
      paddingLeft: 2, // Space between images
      marginBottom:0,
      margintTop:0,
      padding:0
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },
    paginationContainer: {
      marginTop: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paginationDot: {
      width: 10,
      height: 10,
      borderRadius: 7,
      marginHorizontal: 8,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    activePaginationDot: {
      backgroundColor: '#F63809',
      width: 12, // Increase the width for the active dot
      height: 12, // Increase the height for the active dot
    },
    
    pareceInfoContainer: {
      marginTop: '2%',
    },
    parcelName: {
      fontSize: 20,
      fontWeight:'bold'
    },
    parcelPrice: {
      paddingTop: '1%',
      fontSize: 17,
      // backgroundColor:"blue"
    },
  //fin carrusel 
  pareceInfoContainer:{
      marginTop:"2%",
  },
  parcelName:{
      fontSize:20,
      // fontWidth:'bold'

  },

  parcelOwnerContainer:{
      
      display:'flex',
      flexDirection:'row',
      heigth:"10%",
      overflow:'hidden'

  },
  ownerImage:{
      width: 70,
      height: 70,
      borderRadius: 40,
  },
  OwnerContainer:{
      marginStart:"3%",
      // backgroundColor:"red",
      justifyContent:"center"
      
      
  },
  chatBtn:{
      
  backgroundColor: '#F63809',
  borderRadius: 10,
  marginTop:"2%",
  marginBottom:"2%"
  },
  dateInputcontainer:{
      marginTop:"2%",
      height:'20%'
  },
  // input:{
  //     padding:10,
  //     marginTop:"5%",
  //     borderWidth: 1,
  //     borderColor:"#d6d3d2",
  //     borderRadius:5,
  //     color:"black"
  // },
  
  //--------------------mapa------------------
  mapContainer: {
      
      marginTop: '5%',
      overflow:'hidden'
  },
  map: {
    
      width: '100%',
      height: '100%',
  },
  //calendario---------
  input: {
    height: 40,
    borderColor: '#d6d3d2',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop:"2%",
    borderRadius:5,
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },  // Estilos para el calendario
  reservedDate: {
    backgroundColor: 'orange',
    borderRadius: 20,
    borderColor: 'white',
  },
  reservedDateText: {
    color: 'white',
  },
  disabledDate: {
    backgroundColor: 'gray',
    borderRadius: 20,
    borderColor: 'white',
  },
  disabledDateText: {
    color: 'white',
  },
    

   
});
