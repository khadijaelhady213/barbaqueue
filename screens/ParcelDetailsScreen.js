import { Text, View ,StyleSheet,Image, Button, TextInput ,Dimensions,ScrollView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { Component, useState ,useEffect} from 'react'
import { useTranslation } from 'react-i18next';
import OpenInGoogleMapsButton from './OpenInGoogleMapsButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationDot} from '@fortawesome/free-solid-svg-icons';
import { StatusBar } from 'expo-status-bar';

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
  
  
    // Fechas reservadas (ejemplo: 28, 29 y 30 de este mes)
  const reservedDates = [28, 29, 30];
  //fechas seleccionadas por el usuario
  const [selectedDate, setSelectedDate] = useState('');
  // Función para comprobar si la fecha seleccionada ha pasado
  const handleSaveDate = () => {
    if (!selectedDate) {
      console.log('Error', 'Por favor, selecciona una fecha');
      return;
    }

    // Verificar si la fecha seleccionada está reservada
    const selectedDay = selectedDate.getDate();
    if (reservedDates.includes(selectedDay)) {
     console.log('Error', 'La fecha seleccionada está reservada');
      return;
    }

    // La fecha seleccionada es válida, realizar las acciones correspondientes
    console.log('Éxito', `Fecha seleccionada: ${selectedDate}`);
  };
  
  const currentDate = new Date();
  const selected = new Date(selectedDate);

  if (selected < currentDate) {
      console.log('Error', 'La fecha seleccionada ya ha pasado');
  } else {
      console.log('Éxito', 'La fecha seleccionada es válida data->', selected);
  }
  
  const handleChangeDate = (_, date) => {
    setSelectedDate(date);
  };

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
                <Text style={styles.parcelPrice}>4€ por persona</Text>
            </View>
            <View style={styles.mapContainer}>
                <View style={{display:'flex', flexDirection:'row',  marginBottom:"5%", alignItems:"center"}}>
                    <FontAwesomeIcon icon={faLocationDot} size={30} paddingTop='0%' color="#FF8300"/>
                    <Text style={{marginStart:"2%", fontSize:16, paddingTop:"2%"}}>Carretera pont de vilomara 37 Manresa</Text>
                </View>
                <OpenInGoogleMapsButton location={location} />
            </View>

              
            <View style={{display:'flex', flexDirection:'row',marginTop:0,alignItems:'center', marginTop:"5%",marginBottom:"5%"}}>
        
                <Text style={{ fontSize:16, width:"61%"}}>{t('bookParcel')}</Text>
                <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleChangeDate}
                    disabled={reservedDates.includes(currentDate.getDate())} //marcar los dias reservados
                    locale="es" // Establece el idioma a español
                    cancelText="Cancelar" // Personaliza el texto del botón de cancelar
                    confirmText="Guardar" // Personaliza el texto del botón de guardar
                    style={{ alignSelf: 'end'}}
                />
            
            </View>
            <View  style={[ styles.chatBtn, {marginTop:"3%"}]}>
            <Button title={t('bookIt')}  color="white" onPress={handleSaveDate} />
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
    input:{
        padding:10
    },
    
    //--------------------mapa------------------
    mapContainer: {
       
        marginTop: '5%',
        overflow:'hidden'
    },
    map: {
      
        width: '100%',
        height: '100%',
    },

   
});

