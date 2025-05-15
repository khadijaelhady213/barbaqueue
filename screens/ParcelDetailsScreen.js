import { StyleSheet, View, Button, Image } from 'react-native';
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { createStackNavigator } from '@react-navigation/stack';

// Navegador del Stack
const Stack = createStackNavigator();

// Componente de la pagina principal
function ParcelDetailsScreen({ navigation }) {
  const { t } = useTranslation();

  return (
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
                  onPress={() => { navigation.navigate("ViewLoginScreen") }}
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
  );
}

// Estilos en css de la pantalla principal
// No externalizar a un archivo, por simplicidad
const styles = StyleSheet.create({
  mainGrid: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 80,
    backgroundColor: "#ffffff",
    alignItems: "center"
  },
  logo: {
    width: 260,
    height: 200,
    marginTop: "20%",
  },
  Button: {
    height: 60,
    width: 300,
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
export default ParcelDetailsScreen;
