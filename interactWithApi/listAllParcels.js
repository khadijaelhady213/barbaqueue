import AsyncStorage from "@react-native-async-storage/async-storage";
import { endpoint } from "./configEndpoints";

export const listAllParcelsFunction = () => {
  
  fetch(endpoint + "/parcels", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((response) => response.json())
    .then((data) => {

      _storeData = async () => {
        try {
          await AsyncStorage.setItem(
            'parcels',
             JSON.stringify(data)
          );
          console.log("parceles creades amb éxit")
        } catch (error) {
          // Error saving data
          console.log("No ha anat bé el guardar les dades de les parceles al local storage")
        }
      };

      _storeData()

    })
    .catch((error) => {
      // Handle the error
      console.error(error);
    });
};
