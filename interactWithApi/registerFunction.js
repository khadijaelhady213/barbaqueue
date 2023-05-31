import { endpoint } from "./configEndpoints";

export const registerFunction = async (values) => {
  try {
    const response = await fetch(endpoint + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        password: values.password,
        last_name: values.lastname,
        phone_number: "646 198 581",
        birth_date: "2022-06-02 10:01:10",
        email: values.email,
      }),
    });

    const data = await response.json();

    if (data.id != null) {
      console.log("EXITO register");

      const user = {
        name: values.name,
        password: values.password,
        lastname: values.lastname,
        email: values.email,
      };

      navigation.navigate("NavbarScreen", { user });
    }

    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
