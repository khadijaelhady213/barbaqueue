import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { pluralRules } from 'intl-pluralrules';

const resources = {
  en: {
    translation: {
      //LoginScreen  
      Email: 'Email',
      Password:'Password',
      PassworForgotten:'Password forgotten?',
      Login:'Login',
      Register:'Register',
      
      //RegisterScreen
      firtName:'First Name',
      lastName:'Last Name',
      bithDate:'Birthdate:',
      agreementContitions:'I accept Barbaqueue use of my data for purposes that improves the App and I accept Privacy Policy and Data Processing Agreement',
      JoinUsBt:'Join Us!',
      //Control de errores
      requiredMsg:'is a required field',
      //userProfileScreen
      help:'Need help?',
      updataData:'Update user data',

      //AddParcelScreen
      newParcel:"New Parcel",
      name: "Parcel name:",
      nameInput: "Enter the parcel name",
      price: "Price per person:",
      priceInput: "Enter the price per person",
      description: "Description:",
      descInput: "Enter a description",
      location: "Location:",
      locationInput: "Enter the location",
      validateLocationBtn: "Validate location",
      pictures: "Pictures",
      pickImage:"Pick  3 Images",
      loading:"Loading ...",
      saveBtn: "Save",
      requiredField:"This field is required",
      invalidAddress:"Invalid Adress",
      capacity:'Capacidad:',
      capacityInput:'Introduce la capacidad',

      //parcelDetailsScreen
      cancel: 'Cancel',
      save: 'Save',
      chat:"Chat",
      chooseDate:"Choose a date:",
      bookIt:"Book It !",
      succes:"Success",
      bookingConfirmed: "Booking confirmed",
      
    },
  },
  es: {
    translation: {
      //LoginScreen  
      Email: 'Email',
      Password:'Contraseña',
      PassworForgotten:'Contraseña olvidada?',
      Login:'Iniciar sessión',
      Register:'Registrarse',

      //RegisterScreen
      firtName:'Nombre',
      lastName:'Apellidos',
      bithDate:'Fecha Nacimineto:',
      agreementContitions:'Acepto el uso de mis datos por parte de Barbaqueue para mejorar la aplicación y acepto la Política de privacidad y el Acuerdo de procesamiento de datos.',
      JoinUsBt:'Registrarse!',

      //Control de errores
      requiredMsg:' es un campo obligatorio',
      ValidEmail:'correo no valido',

      //userProfileScreen
      help:'Necesitas ayuda?',
      updataData:'Actualizar información del usuario',

      //AddParcelScreen
      newParcel:"Parcela Nueva",
      name:"Nombre del huerto:",
      nameInput: "Introduce el nombre del huerto",
      price:"Precio por persona:",
      priceInput:"Introduce el precio por persona",
      description:"Descripción:",
      decInput:"Introduce una descripción",
      location:"Localización:",
      locationInput:"Introduce la localización",
      validateLocationBtn:"Validar localizació",
      pictures:"Fotos:",
      pickImage:"Selecciona 3 Fotos",
      loading:"Cargando ...",
      sabeBtn:"Guardar",
      requiredField:"Este campo es obligatorio",
      invalidAddress:"Dirección inválida",
      capacity:'Capacidad:',
      capacityInput:'Introduce la capacidad',

      //parcelDetailsScreen
      cancel: 'Cancelar',
      save: 'Guardar',
      chat:"Chat",
      chooseDate:"Eligue una fecha: ",
      bookIt:"Alquila !",
      succes:"Éxito",
      bookingConfirmed:"Reserva Confirmada"



    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: Localization.locale,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    pluralRules: pluralRules,
  });

export default i18n;
