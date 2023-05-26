import AsyncStorage from "@react-native-async-storage/async-storage";
import { endpoint } from "./configEndpoints";

export const createParcelFunction = (createParcelRequest, navigation) => {

  console.log("Hello")
  console.log(createParcelRequest)
  
  fetch(endpoint + "/createParcel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createParcelRequest),
  })
    .then((response) => response.json())
    .then((data) => {
      // Parcel created
      // {"id": 1}
      
      if (data.id != null) {
        console.log("ha llegao")
        navigation.navigate("NavbarScreen");
      }

    })
    .catch((error) => {
      // Handle the error
      console.error(error);
    });
};
