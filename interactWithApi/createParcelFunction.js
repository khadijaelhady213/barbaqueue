import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { endpoint } from "./configEndpoints";

export const createParcelFunction = async (createParcelRequest, navigation) => {
  console.log("Hello");
  console.log(createParcelRequest);

  try {
    const response = await fetch(endpoint + "/createParcel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createParcelRequest),
    });

    const data = await response.json();
    if (data.id != null) {
      return true; // Parcel created
    } else {
      return false; // Parcel not created
    }
  } catch (error) {
    console.error(error);
    return false; // Error occurred during the fetch request
  }
};
