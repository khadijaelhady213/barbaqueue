/*import Checkbox from 'expo-checkbox';*/
import { Image, Text, View, Button, TextInput, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native'
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { StatusBar } from 'expo-status-bar';
import { endpoint } from '../interactWithApi/configEndpoints';
import { useNavigation } from '@react-navigation/native';

// Componente de la pagina de registro
export default function RegisterScreen() {
    const { t } = useTranslation();

    const navigation = useNavigation();

    const validationSchema = yup.object().shape({
        email: yup.string().required().email().label("Email"),
        password: yup.string().min(6, 'Password must have at least 6 characters').required('Password is required'),
        name: yup.string().max(50, 'Name cant have more than 50 characters').required(t('firtName') + t('requiredMsg')),
        lastname: yup.string().max(50, 'Lastname cant have more than 50 characters').required(t('lastName') + t('requiredMsg')),
        day: yup.number().min(1, 'Invalid day').max(31, 'Invalid day').required('Day is required'),
        month: yup.number().min(1, 'Invalid month').max(12, 'Invalid month').required('Month is required'),
        year: yup.number().min(1900, 'Invalid year').max(new Date().getFullYear() - 18, 'You must be at least 18 years old').required('Year is required'),
    });

    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    const handleCheckbox = () => {
        setToggleCheckBox(!toggleCheckBox)
    }

    const registerFunction = (values) => {
        //        console.log(values);
        // Peticiones para el registro
        fetch(endpoint + "/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: values.name,
                password: values.password,
                last_name: values.lastname,
                phone_number: "646 198 581",
                birth_date: "2022-06-02 10:01:10",
                email: values.email,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data
                if (data.id != null) {
                    console.log("EXITO register");

                    const user = {
                        name: values.name,
                        password: values.password,
                        lastname: values.lastname,
                        email: values.email,
                    }

                    navigation.navigate("NavbarScreen", { user });
                }
                console.log(data);
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });
    };


    // Vista
    return (
        <ScrollView style={styles.BigContainer}>
            <View style={styles.container}>
                <StatusBar style="auto" />
                { /** LOGO */}
                <Image style={styles.image} source={require("../assets/BARBACUEUE.png")} />

                { /** FORM */}
                <Formik
                    initialValues={{ email: '', password: '', name: '', lastname: '', day: '', month: '', year: '' }}
                    onSubmit={(values) => {
                        console.log("----> ", values)
                        registerFunction(values)
                    }
                    }
                    validationSchema={validationSchema}
                    validateOnChange={false} //esto y 
                    validateOnBlur={false} //esto eviata que los errores de validacion aparezcan antes de pulsar el votón Join Us
                >
                    {({ handleChange, handleSubmit, errors, values }) => (
                        <>
                            <TextInput keyboardType='email-address' placeholder={t('Email')} style={styles.input} onChangeText={handleChange("email")} value={values.email} />
                            <Text style={{ color: "red" }}>{errors.email}</Text>

                            <TextInput placeholder={t('firtName')} style={styles.input} onChangeText={handleChange("name")} value={values.name} />
                            <Text style={{ color: "red" }}>{errors.name}</Text>

                            <TextInput placeholder={t('lastName')} style={styles.input} onChangeText={handleChange("lastname")} value={values.lastname} />
                            <Text style={{ color: "red" }}>{errors.lastname}</Text>

                            <TextInput secureTextEntry placeholder={t('Password')} style={styles.input} onChangeText={handleChange("password")} value={values.password} />
                            <Text style={{ color: "red" }}>{errors.password}</Text>

                            { /** Birthdate fields */}
                            {/* <Text style={styles.titles}>
                                {t('bithDate')}
                            </Text> 

                            <View style={styles.birthdateContainer}>
                                <TextInput keyboardType="numeric" placeholder="dd" style={[styles.input, styles.specialBirthdateField]} onChangeText={handleChange("day")} value={values.day} />
                                <TextInput keyboardType="numeric" placeholder="mm" style={[styles.input, styles.specialBirthdateField, { marginStart: '3%' }]} onChangeText={handleChange("month")} value={values.month} />
                                <TextInput keyboardType="numeric" placeholder="yyyy" style={[styles.input, styles.specialBirthdateField, { marginStart: '3%' }]} onChangeText={handleChange("year")} value={values.year} />
                            </View>
                            */}
                            <View style={[styles.Button]}>
                                <Button styles={[styles.Button]} color='white' onPress={handleSubmit} title={t('JoinUsBt')} accessibilityLabel="Learn more about this purple button" />
                            </View>
                            <View style={styles.inline}>
                                <Text style={styles.agreement}>{t('agreementContitions')}</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                <Text style={styles.backButtonText}>Volver al menu anterior</Text>
                            </TouchableOpacity>

                        </>
                    )}
                </Formik>
            </View>
        </ScrollView>
    );

}
const styles = StyleSheet.create({
    agreement: {
        paddingHorizontal: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    inline: {
        flexDirection: 'row', // Set flex direction to row
        alignItems: 'start', // Align items horizontally
        paddingHorizontal: 42,// Add ho   
        justifyContent: 'start',
        top: '2%',
    },
    checks: {
        fontSize: 18,
        color: 'blue',

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
        display: 'inline',
        alignItems: 'start',

    },
    backButton: {
        paddingTop: 30,
    },
    backButtonText: {
        color: "blue"
    },
    BigContainer: {
        backgroundColor: "white",
        paddingTop: 100
    },
    container: {
        marginTop: '0%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        height: "100%"
    },
    titles: {
        marginTop: 0,
        padding: 10,
        paddingLeft: 0,
        fontSize: 16,
        width: "70%"
    },
    birthdateContainer: {
        display: "flex",
        flexDirection: "row",
        width: '70%',

    },
    specialBirthdateField: {
        width: "30%",
        marginStart: 0,

    },
    detailsConatiner: {

        padding: 20,

    },
    input: {
        width: '70%',
        margin: 5,
        // borderWidth: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: "#CCCCCC",
        color: "#4d4d4d",
        fontSize: 16,

    },
    image: {
        marginBottom: '8%',
        width: 170,
        height: 130,
        alignContent: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 600,

    },
    Button: {
        fontSize: 40,
        backgroundColor: '#000000',
        width: '70%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: "8%",
        color: "#FFFFFF",
        fontWeight: '120',
        fontSize: 20,
        TouchableOpacity: {
            underlayColor: 'white', // Reset the clicked color effect
        },
    },
    price: {
        paddingTop: "2%",
        paddingBottom: "2%",
        color: "#F63809",
        fontSize: 15,
        fontWeight: 500,
    },

});