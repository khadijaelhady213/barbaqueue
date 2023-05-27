import React, { useState } from 'react';
import { View, Button, Alert, Modal, TextInput, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

export default function ReservationScreen() {
  // Fechas reservadas (ejemplo: 28, 29 y 30 de este mes)
  const reservedDates = ['2023-05-28', '2023-05-29', '2023-05-30'];

  // Fecha seleccionada por el usuario
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate.toISOString().split('T')[0]);

  // Estado del modal
  const [modalVisible, setModalVisible] = useState(false);

  // Handler para el cambio de fecha
  const handleChangeDate = (date) => {
    setSelectedDate(date.dateString);
  };

  // Handler para guardar la fecha seleccionada
  const handleSaveDate = () => {
    if (!selectedDate) {
      Alert.alert('Error', 'Por favor, selecciona una fecha');
      return;
    }

    // Verificar si la fecha seleccionada es anterior a la fecha actual
    const selectedDateTime = new Date(selectedDate).getTime();
    const currentDateTime = new Date().getTime();
    if (selectedDateTime < currentDateTime) {
      Alert.alert('Error', 'No puedes seleccionar una fecha anterior a la fecha actual');
      return;
    }

    // La fecha seleccionada es válida, realizar las acciones correspondientes
    Alert.alert('Éxito', `Fecha seleccionada: ${selectedDate}`);

    // Cerrar el modal y restablecer el estado
    setModalVisible(false);
  };

  // Configurar los textos en español para la biblioteca react-native-calendars
  LocaleConfig.locales['es'] = {
    monthNames: [ 'Enero','Febrero', 'Marzo','Abril','Mayo','Junio', 'Julio', 'Agosto', 'Septiembre','Octubre','Noviembre','Diciembre', ],
    monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
  };
  LocaleConfig.defaultLocale = 'es';



  return (
    <View style={{ marginTop: '15%', padding: 16 }}>
      <TextInput
        style={styles.input}
        placeholder={selectedDate}
        onFocus={() => setModalVisible(true)}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Calendar
            markedDates={{
              [selectedDate]: { selected: true, marked: true },
              ...reservedDates.reduce((acc, date) => {
                acc[date] = { disabled: true, disableTouchEvent: true,
                  customStyles: {
                    container: calendarStyles.disabledDate, text: calendarStyles.disabledDateText,
                  },
                };
                return acc;
              }, {}),
            }}
            onDayPress={handleChangeDate}
            markingType="custom"
          />

          <Button title="Guardar" onPress={handleSaveDate} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },  // Estilos para el calendario
  reservedDate: {
    backgroundColor: 'orange',
    borderRadius: 20,
    borderColor: 'white',
  },
  reservedDateText: {
    color: 'white',
  },
  disabledDate: {
    backgroundColor: 'gray',
    borderRadius: 20,
    borderColor: 'white',
  },
  disabledDateText: {
    color: 'white',
  },
  
});
