import { ImageBackground, StyleSheet, Text, View,Button, Image,onPress ,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
//VIDEO 7 ICONS
import {MaterialCommunityIcons} from '@expo/vector-icons'

function WelcomeScreen() {
  const [email, onChangeEmail] = React.useState('Email');
  const [pwd, onChangePwd] = React.useState('Password');

  return (
    <ImageBackground 
    resizeMode='contain'
        style={styles.background} 
       
        source={require('../assets/b7.png')}>
       
        <View style={styles.logoContainer}>
            <Image style={styles.logo}  source={require('../assets/BARBACUEUE.png')}/>
        </View>

        <View style={styles.inputsButtonsContainer}>
            
            <TextInput style={styles.input} onChangeText={onChangeEmail}value={email}/>
            <TextInput style={styles.input} onChangeText={onChangePwd} value={pwd} />
            <TouchableOpacity style={styles.txt} > 
                <Text >Password forgotten?</Text>
            </TouchableOpacity>
            
            <View style={[styles.Button, { backgroundColor:'white'}]}>
            <Button onPress={console.log("kara")}  title="Login" color= 'black' accessibilityLabel="Learn more about this purple button"/>
            </View>
            <View style={[styles.Button, { backgroundColor:'#F63809', borderColor:'white',borderWidth:2,}]}>
            <Button onPress={console.log("kara")}  title="Register" color= 'white' accessibilityLabel="Learn more about this purple button"/>
            </View>
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    background:{
        flex: 1,
    //    justifyContent:"flex-end",
       
       alignItems:"center",
       width:'100%',
       height:'130%',
       
        
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
        paddingStart:"35%"
      
    },
    Button:{
       
        width:'70%',
        height:60,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:"8%",
       

    }
})
export default WelcomeScreen;