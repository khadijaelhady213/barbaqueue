import { Text, View } from 'react-native'
import React, { Children, Component } from 'react'

function AppText({children}) {

    return<Text >{Children}</Text>
}
const styles = StyleSheet.create({
    text:{
        fontSize: 18,
    }
})