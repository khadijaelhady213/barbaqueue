import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';


// Componente de la pagina de Login
const ViewLoginScreen = () => {
    const { t } = useTranslation();

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
                <Text>Welcome to Barbaqueue!</Text>
                <Text>A Social App</Text>
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

                            <TextInput secureTextEntry placeholder={t('Password')} style={styles.input} onChangeText={handleChange("password")} value={values.password} />
                            <Text style={{ color: "red" }}>{errors.password}</Text>

                            <Button styles={[styles.Button]} color='white' onPress={handleSubmit} title={'forgot password?'} accessibilityLabel="" />
                        </View>
                        {/* Register + Copyright */}

                        <View style={[
                            styles.gridItem, styles.blue
                        ]
                        }>
                            <Button styles={[styles.Button]} color='white' onPress={handleSubmit} title={'Register'} accessibilityLabel="" />
                            <Text>Copyright @DanielNager 2025</Text>

                        </View>
                    </>
                )}
            </Formik>
        </View>
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
        backgroundColor: "red",
    },
    green: {
        flex: 3,
        backgroundColor: "green",
    },
    blue: {
        flex: 1,
        backgroundColor: "blue",
    },
    logo: {
        width: 260,
        height: 200,
    },


})

export default ViewLoginScreen;