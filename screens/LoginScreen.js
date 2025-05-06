import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Componente de la pagina de Login
const ViewLoginScreen = () => {
    return (
        <View style={[
            styles.mainGrid
        ]}>
            <View style={[
                styles.gridItem, styles.red
            ]
            }>
                <Text>Welcome to Barbaqueue!</Text>
                <Text>A Social App</Text>

            </View>
            <View style={[
                styles.gridItem, styles.green
            ]
            }>
                <Text>Form with email & password & loginbtn & forgot passwordbtn</Text>
            </View>
            <View style={[
                styles.gridItem, styles.blue
            ]
            }>
                <Text>Copyright @DanielNager 2025</Text>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    mainGrid: {
        flex: 1,
        height: "100%",
        backgroundColor: "red"
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


})

export default ViewLoginScreen;