import { endpoint } from "./configEndpoints";

export const createBillingFunction = async (values) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer 123");

    var raw = JSON.stringify({
      "user_id": values.user_id,
      "parcel_id": values.parcel_id,
      "date": "2022-06-02 10:01:10",
      "total_price": values.total_price,
      "people_amount": values.people_amount
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(endpoint + "/billings", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  } catch (error) {
    console.error(error);
  }
};
