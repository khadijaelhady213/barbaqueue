import { ImageBackground, StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity } from 'react-native';
import React from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { createStackNavigator } from '@react-navigation/stack';

// Navegador del Stack
const Stack = createStackNavigator();

// Componente de la pagina principal
function WelcomeScreen({ navigation }) {
  const { t } = useTranslation();

  return (
    <ImageBackground
      resizeMode="contain"
      style={styles.background}
      source={require("../assets/mainScreenBackground.png")}
    >
      <View style={[
        styles.mainGrid,
        {
          flexDirection: 'column'
        }
      ]}>
        <View style={{ flex: 1 }}>
          <Image
            style={styles.logo}
            source={require("../assets/BARBACUEUE.png")}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Formik
            onSubmit={(values) => {

            }}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ handleChange, handleSubmit, errors }) => (
              <>

                {/** TODO: Al hacer click, mandar a la pantalla del login */}
                <View style={[
                  styles.Button,
                  {
                    backgroundColor: "#000000"
                  }
                ]
                }>
                  <Button
                    title={t("Login")}
                    color="white"
                    onPress={handleSubmit}
                  />
                </View>

                {/** TODO: Al hacer click, mandar a la pantalla de registro */}
                <View style={[
                  styles.Button,
                  {
                    backgroundColor: "#F63809",
                    borderColor: "white",
                    borderWidth: 2
                  }
                ]}>
                  <Button
                    onPress={() => navigation.navigate("RegisterScreen")}
                    title={t("Register")}
                    color="white"
                    accessibilityLabel="Learn more about this purple button"
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    </ImageBackground>
  );
}

// Estilos en css de la pantalla principal
// No externalizar a un archivo, por simplicidad
const styles = StyleSheet.create({
  mainGrid: {
    flex: 1
  },
  background: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    height: 153,
    width: 200,
    marginTop: "20%",
  },
  logoContainer: {
    position: "absolute",
    top: "10%",
    alignItems: "center",
  },
  inputsButtonsContainer: {
    top: "30%",
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "70%",
    margin: 12,
    padding: 10,
    borderBottomWidth: 1,
  },
  txt: {
    width: "70%",
    marginBottom: "45%",
    justifyContent: "end",
    paddingStart: "30%",
  },
  Button: {
    width: "70%",
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "8%",
  },

});
export default WelcomeScreen;
