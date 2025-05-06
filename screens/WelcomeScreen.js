import { ImageBackground, StyleSheet, View, Button, Image } from 'react-native';
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
                  styles.Button, styles.LoginButton
                ]}>
                  <Button
                    title={t("Login")}
                    color="white"
                    onPress={handleSubmit}
                  />
                </View>

                {/** TODO: Al hacer click, mandar a la pantalla de registro */}
                <View style={[
                  styles.Button, styles.RegisterButton
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
    flex: 1,
    flexDirection: 'column',
    paddingTop: 80

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
  Button: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    marginBottom: "8%",
  },
  LoginButton: {
    backgroundColor: "#000000"
  },
  RegisterButton: {
    backgroundColor: "#F63809",
    borderColor: "white",
    borderWidth: 2
  }

});
export default WelcomeScreen;
