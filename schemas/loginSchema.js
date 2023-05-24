import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Emaill"),
  password: Yup.string().required().min(4).label("Password"),
});
