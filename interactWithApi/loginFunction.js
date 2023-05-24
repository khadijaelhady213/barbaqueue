import AsyncStorage from "@react-native-async-storage/async-storage";
import { endpoint } from "./configEndpoints";

export const loginFunction = (values, navigation) => {
  console.log(values);
  fetch(endpoint + "/userlogin", {
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
      // User logged in
      if (data.message == "ok") {
        // make the user object with data retrieved from the api
        const user = {
          email: data.email,
          name: data.name,
          lastname: data.lastname,
          id: data.id,
        };

        // print the user data
        console.log(user);

        // set the user data to userData asyncstorage
        AsyncStorage.setItem("userData", JSON.stringify(user))
          .then(() => {
            // Iniciar sesión en el store
            navigation.navigate("NavbarScreen");
            console.log("dispatched");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    })
    .catch((error) => {
      // Handle the error
      console.error(error);
    });
};
