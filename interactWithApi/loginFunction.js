import AsyncStorage from "@react-native-async-storage/async-storage";
import { endpoint } from "./configEndpoints";

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

        navigation.navigate("NavbarScreen", {user});
        console.log('ok');
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
