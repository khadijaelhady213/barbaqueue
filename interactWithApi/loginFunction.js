import AsyncStorage from "@react-native-async-storage/async-storage";
import { endpoint } from "./configEndpoints";
import { listAllParcelsFunction } from "./listAllParcels";

export const loginFunction = (values, navigation) => {
  // todo -> Login
  fetch(endpoint+"/userlogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: values.email,
      password: values.password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data
      if (data.message == "ok") {
        console.log("EXITO");

        const user = {
          email: data.email,
          name: data.name,
          lastname: data.lastname,
          id: data.id,
        }
//        console.log(user)

        // Afegir al local storage
        _storeData = async () => {
          try {
            await AsyncStorage.setItem(
              'user',
               JSON.stringify(user)
            );
            console.log("Fet amb exit")
          } catch (error) {
            // Error saving data
            console.log("No ha anat bé el guardar les dades al local storage")
          }
        };

        _storeData()
        listAllParcelsFunction()
        navigation.navigate("NavbarScreen");
      }else{
        console.log("La conexión a la api ha fallado");
        console.log(data);
      }
     
    })
    .catch((error) => {
      // Handle the error
      console.error(error);
    });
};
