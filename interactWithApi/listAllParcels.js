import AsyncStorage from "@react-native-async-storage/async-storage";
import { endpoint } from "./configEndpoints";

export const listAllParcelsFunction = async () => {
  try {
    const response = await fetch(endpoint + "/parcels", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    const _storeData = async () => {
      try {
        await AsyncStorage.setItem('parcels', JSON.stringify(data));
        console.log("Parcels stored successfully");
      } catch (error) {
        console.log("Error storing parcels data in local storage");
      }
    };

    _storeData();
  } catch (error) {
    console.error(error);
  }
};
