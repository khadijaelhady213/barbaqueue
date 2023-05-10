/*import Checkbox from 'expo-checkbox';*/
import { Image, Text, View , Button, TextInput, StyleSheet, TouchableOpacity, TouchableHighlight} from 'react-native'
import React, { useState } from 'react'

export default function RegisterScreen(props) {
    const [email, onChangeEmail] = useState('Email address');
    const [pwd, onChangePwd] = useState('Password');
    const [firstName, onChangeFirstName] = useState('Firstname');
    const [lastName, onChangeLastName] = useState('Firstname');
    const [day, onChangeDay] = useState('dd');
    const [month, onChangeMonth] = useState('mm');
    const [year, onChangeYear] = useState('yyyy');
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const handleCheckbox = () => {
            setToggleCheckBox(!toggleCheckBox)
    }

    return (
      <View>
        <View style={styles.container}>
            { /** LOGO */}
            <Image style={styles.image} source={require("../assets/BARBACUEUE.png")}  />

            { /** FORM */}
            <TextInput placeholder="Email Address"  style={styles.input} onChangeText={onChangeEmail} />
            <TextInput placeholder="Password" style={styles.input} onChangeText={onChangePwd}/>
            <TextInput placeholder="First Name" style={styles.input} onChangeText={onChangeFirstName}/>
            <TextInput placeholder="Last Name" style={styles.input} onChangeText={onChangeLastName}/>


            { /** Birthdate fields */}
            <Text style={styles.titles}>
                Birthdate:
            </Text>

{ /*           <Checkbox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}/>
*/}

            <View style={styles.birthdateContainer}>
                <TextInput       keyboardType="numeric" placeholder="dd" style={[styles.input, styles.specialBirthdateField]} onChangeText={onChangeDay}/>
                <TextInput      keyboardType="numeric"  placeholder="mm" style={[styles.input, styles.specialBirthdateField]} onChangeText={onChangeMonth}/>
                <TextInput       keyboardType="numeric" placeholder="yyyy" style={[styles.input, styles.specialBirthdateField]} onChangeText={onChangeYear}/>
            </View>
            <View style={styles.inline}>
                <TouchableHighlight style={styles.checkBox} onPress={handleCheckbox}>
                    <Text style={toggleCheckBox ? styles.checks : styles.unChecked}>✔</Text>
                </TouchableHighlight>
                <Text style={styles.agreement}>
                I accept Barbaqueue use of my data for their own purposes and I accept Privacy Policy and Data Processing Agreement
                </Text>
            </View>
            <View style={[styles.Button]}>
                <Button styles={[styles.Button]} color= 'white' onPress={console.log("testing button")}  title="Join Us!"  accessibilityLabel="Learn more about this purple button"/>
            </View>

        </View>

      </View>
    );
  
}
const styles = StyleSheet.create({
    agreement: {
        paddingHorizontal: 10, // Add ho    
        fontSize: 16,
        paddingTop: 20,
        paddingRight: 55,
        marginBottom: 40,
        textAlign: 'justify'
    },
    inline: {
        flexDirection: 'row', // Set flex direction to row
        alignItems: 'center', // Align items horizontally
        paddingHorizontal: 42 // Add ho    
    },
    checks: {
        fontSize: 18,
        color: 'blue'
    },
    unChecked: {
        fontSize: 18,
        color: 'blue',
        display: 'none'
    },
    checkBox: {
        height: 25,
        width: 25,
        borderWidth: 1,
        borderColor: '#cccccc',
        marginLeft: 55,
        position: 'relative',
        display: 'inline'
    },
    container:{
        marginTop: '10%',
        display: 'flex',
        alignItems: 'center'
    },
    titles: {
        marginTop: 12,
        padding: 10,
        marginLeft: -200,
        fontSize: 16 
    },
    birthdateContainer: {
        display: "flex",
        flexDirection: "row",
    },
    specialBirthdateField: {
        width: "15%"
    },
    detailsConatiner:{
       
        padding:20,

    },
    input:{
        width:'70%',
        margin: 12,
        // borderWidth: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: "#CCCCCC",
        color: "#4d4d4d",
        fontSize: 16
    },
   image:{
    marginBottom: '10%',
        width:170,
        height:130,
        alignContent: 'center'
    },
    title:{
        fontSize: 18,
        fontWeight:600,
    },
    Button:{
        fontSize: 40,
        backgroundColor:'#ff8300',
        width:'70%',
        height:60,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:"8%",
        color: "#FFFFFF",
        fontWeight: '120',
        fontSize: 20,
        TouchableOpacity: {
            underlayColor: 'white', // Reset the clicked color effect
        },
    },
    price:{
        paddingTop:"2%",
        paddingBottom:"2%",
        color:"#F63809",
        fontSize: 15,
        fontWeight:500,        
    }
});