import { Text, View ,StyleSheet,Image, Button, TextInput ,Dimensions,ScrollView,  Alert, Modal, } from 'react-native';
import React, { Component, useState ,useEffect} from 'react'
import { useTranslation } from 'react-i18next';
import OpenInGoogleMapsButton from './OpenInGoogleMapsButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationDot} from '@fortawesome/free-solid-svg-icons';
import { StatusBar } from 'expo-status-bar';
import { Calendar, LocaleConfig } from 'react-native-calendars';


const images = [
    require('../assets/test1.jpg'),
    require('../assets/test1.jpg'),
    require('../assets/test1.jpg'),
  ];

export default function ParcelDetailsScreen() {
  //obtener variable traductor
  const { t } = useTranslation();

  
  //variables para el carrusel de imagenes de la parcela
  const deviceWidth = Dimensions.get('window').width;
  const [activeSlide, setActiveSlide] = useState(0);

  //permite el movimiento de los puntos del carrusel
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

  // Handler para el cambio de fecha
  const handleChangeDate = (date) => {
    setSelectedDate(date.dateString);
  };

  // Handler para guardar la fecha seleccionada
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
  
 const handleBooking =() =>{
  // Comprobar si la fecha ya está validada y realizar  la reserva
  if (selectedDate) {
    // Perform booking actions here (e.g., make API request, update database)
    // Show a success message or navigate to a confirmation screen
    Alert.alert(t('succes'), t('bookingConfirmed'));
  } else {
    // Show an error message or handle the case when the date is not validated
    Alert.alert('Error', 'Please select a valid date');
  }

 }
  

  const location = 'Carretera Pont de Vilomara 37, Manresa';


    return (
      <View style={styles.container}>
        <StatusBar style="auto" /> 
            <View >
                <View style={styles.parcelOwnerContainer}>
                    <Image source={require("../assets/user-pic1.jpg")}  style={styles.ownerImage}/>
                    
                    <View style={styles.OwnerContainer}>
                        <Text style={{ fontSize:20, fontWeight: 'bold' }}>khadija el hady</Text>
                        <Text style={styles.parcelPrice}>khadijaelhady@gmail.com</Text>
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
                        <Image source={image} style={styles.image} resizeMode="cover" />
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
                <Text style={{ fontSize:20, fontWeight: 'bold' }}>Camp xup barbacoa</Text>
                <Text style={styles.parcelPrice}>20€ persona</Text>
            </View>
            <View style={styles.mapContainer}>
                <View style={{display:'flex', flexDirection:'row',  marginBottom:"5%", alignItems:"center"}}>
                    <FontAwesomeIcon icon={faLocationDot} size={30} paddingTop='0%' color="#FF8300"/>
                    <Text style={{marginStart:"2%", fontSize:16, paddingTop:"2%"}}>Carretera pont de vilomara 37 Manresa</Text>
                </View>
                <OpenInGoogleMapsButton location={location} />
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
    )
  
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:"5%",
      padding:"5%",
     
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
      },
    //fin carrusel 
    pareceInfoContainer:{
        marginTop:"2%",
    },
    parcelName:{
        fontSize:20,
        // fontWidth:'bold'

    },
    parcelPrice:{
        paddingTop:"1%",
        fontSize:17,

    },
    parcelOwnerContainer:{
        marginTop:'5%',
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

