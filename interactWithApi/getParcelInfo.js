import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { endpoint } from "./configEndpoints";

export const getParcelFunction = async (navigation) => {

  try {
    const response = await fetch(endpoint + "/parcels/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await response.json();

    if (data) {
      return data; // Parcel returned
    } else {
      return false; // Parcel not found
    }
  } catch (error) {
    console.error(error);
    return false; // Error occurred during the fetch request
  }
};
