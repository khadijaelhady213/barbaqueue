import { ImageBackground, StyleSheet, Text, View,Button, Image,onPress ,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import * as Localization from 'expo-localization';
import { withNavigation } from '@react-navigation/compat';


const validationSchema= Yup.object().shape({
    email: Yup.string().required().email().label("Emaill"),
    password: Yup.string().required().min(4).label("Password")
})

function WelcomeScreen({navigation}) {
    const { t } = useTranslation(); //array con las traducciones
    console.log(".......Z> ",Localization.locale)
 
  return (
    <ImageBackground 
    resizeMode='contain'
        style={styles.background} 
       
        source={require('../assets/b7.png')}>
        <View style={styles.logoContainer}>
            <Image style={styles.logo}  source={require('../assets/BARBACUEUE.png')}/>
        </View>

        <View style={styles.inputsButtonsContainer}>
            
            <Formik
                initialValues={{email:'', password:''}}
                onSubmit={(values)=> console.log("----> ",values)}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({handleChange ,handleSubmit, errors })=>(
                 <>
                    <TextInput keyboardType='email-address' placeholder={t('Email')} style={styles.input} onChangeText={handleChange("email")}/>
                    <Text style={styles.err}>{errors.email}</Text>
                    <TextInput placeholder={t('Password')} style={styles.input} onChangeText={handleChange("password")}/>
                    <Text style={{color:"red"}}>{errors.password}</Text>

                    <TouchableOpacity style={styles.txt} > 
                        <Text >{t('PassworForgotten')}</Text>
                    </TouchableOpacity>
                    
                    <View style={[styles.Button, { backgroundColor:'white'}]}>
                        <Button  title={t('Login')}  color= 'black' accessibilityLabel="Learn more about this purple button"/>
                    </View>
                    <View style={[styles.Button, { backgroundColor:'#F63809', borderColor:'white',borderWidth:2,}]}>
                    <Button     onPress={() => navigation.navigate('RegisterScreen')}  title={t('Register')}  color='white' accessibilityLabel="Learn more about this purple button"/>
                    </View>
                 </>   
                )}
            </Formik>

           
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    background:{
        flex: 1,
       alignItems:"center",
       width:'100%',
       height:'130%', 
       backgroundColor:"white"
    },
    logo:{
        height:153,
        width:200,
        marginBottom:"8%"
        
    },
    logoContainer:{
        position:'absolute',
        top:'10%',
        alignItems:"center",
       
    },
    inputsButtonsContainer:{
        top:'30%',
        // backgroundColor:"blue",
        width:"100%",
        alignItems:"center",
    },
    input:{
        width:'70%',
        margin: 12,
        // borderWidth: 1,
        padding: 10,
        borderBottomWidth:1,
    },
    txt:{
        // backgroundColor:"red",
        width:'70%',
        marginBottom: "45%",
        // alignSelf:'flex-end',
        justifyContent:"end",
        paddingStart:"30%"
      
    },
    Button:{
       
        width:'70%',
        height:60,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:"8% ",
    },
    err:{
        color:"red",
        with:'70%',
        backgroundColor:'yellow'

    }
})
export default WelcomeScreen;