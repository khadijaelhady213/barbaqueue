import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { useFonts } from 'expo-font';

// Componente de la pagina de Login
const ViewLoginScreen = () => {
    const { t } = useTranslation();
    const [fontsLoaded] = useFonts({
        'firecode': require('../assets/fonts/firecode.ttf'),
    });
    if (!fontsLoaded) {
        return null; // No cargar la pagina hasta que esten todas las fuentes cargadas
    }
    return (
        <View style={[
            styles.mainGrid
        ]}>
            {/* logo + Welcome + Slogan */}
            <View style={[
                styles.gridItem, styles.red
            ]
            }>
                <Image
                    style={styles.logo}
                    source={require("../assets/BARBACUEUE.png")}
                />
                <View style={[
                    styles.sloganContainer
                ]}>
                    <Text style={{ fontWeight: 900, fontFamily: 'firecode', fontSize: 20, textAlign: 'center' }} >Welcome to Barbaqueue!</Text>
                    <Text style={{ fontWeight: 900, fontFamily: 'firecode', fontSize: 18, textAlign: 'center' }}>A Social App</Text>
                </View>
            </View>
            {/* Formik Form */}
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => {
                    console.log(values);
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.email) errors.email = 'Email required';
                    if (!values.password) errors.password = 'Password required';
                    return errors;
                }}
            >
                {/* Email + Password + Loginbtn */}
                {({ handleChange, handleSubmit, errors, values }) => (
                    <>
                        <View style={[
                            styles.gridItem, styles.green
                        ]
                        }>
                            <TextInput keyboardType='email-address' placeholder={t('Email')} style={styles.input} onChangeText={handleChange("email")} value={values.email} />
                            <Text style={{ color: "red" }}>{errors.email}</Text>

                            <TextInput secureTextEntry placeholder={'Password'} style={styles.input} onChangeText={handleChange("password")} value={values.password} />
                            <Text style={{ color: "red" }}>{errors.password}</Text>


                            <View style={[
                                styles.Button, styles.loginButton
                            ]}>
                                <Button
                                    title={t("Login")}
                                    color="white"
                                    onPress={() => { navigation.navigate("ViewLoginScreen") }}
                                />
                            </View>

                            <Button styles={[styles.Button]} color='white' onPress={handleSubmit} title={'forgot password?'} accessibilityLabel="" />
                        </View>
                        {/* Register + Copyright */}

                        <View style={[
                            styles.gridItem, styles.blue
                        ]
                        }>
                            <Button styles={[styles.Button]} color='black' onPress={handleSubmit} title={'Registrarse'} accessibilityLabel="" />
                            <Text>Copyright @DanielNager 2025</Text>

                        </View>
                    </>
                )}
            </Formik>
        </View >
    )
}


const styles = StyleSheet.create({
    mainGrid: {
        flex: 1,
        height: "70%",
        backgroundColor: "blue"
    },
    gridItem: {
        justifyContent: "center",
        alignItems: "center"
    },
    red: {
        flex: 3,
        backgroundColor: "white",
    },
    green: {
        flex: 3,
        backgroundColor: "white",
    },
    blue: {
        flex: 1,
        backgroundColor: "white",
    },
    logo: {
        marginTop: 50,
        width: 260,
        height: 200,
    },
    Button: {
        height: 60,
        width: 300,
        justifyContent: "center",
        marginBottom: "8%",
        borderRadius: "50%"
    },
    loginButton: {
        backgroundColor: "black",
        borderColor: "grey",
        borderWidth: 2,
        color: "grey"
    },
    input: {
        width: 300,
        height: 50,
        // borderWidth: 1,
        paddingLeft: 30,
        borderWidth: 1,
        borderColor: "grey",
        color: "#cccccc",
        fontSize: 16,
        borderRadius: 25
    },
    sloganContainer: {
        paddingTop: 50,
        fontSize: 40
    },

})

export default ViewLoginScreen;