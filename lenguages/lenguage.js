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
