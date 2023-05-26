import React, { useState } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ReservationScreen() {
  // Fechas reservadas (ejemplo: 28, 29 y 30 de este mes)
  const reservedDates = [28, 29, 30];

  // Fecha seleccionada por el usuario
  const [selectedDate, setSelectedDate] = useState(null);

  // Handler para el cambio de fecha
  const handleChangeDate = (_, date) => {
    setSelectedDate(date);
  };

  // Handler para guardar la fecha seleccionada
  const handleSaveDate = () => {
    if (!selectedDate) {
      Alert.alert('Error', 'Por favor, selecciona una fecha');
      return;
    }

    // Verificar si la fecha seleccionada está reservada
    const selectedDay = selectedDate.getDate();
    if (reservedDates.includes(selectedDay)) {
      Alert.alert('Error', 'La fecha seleccionada está reservada');
      return;
    }

    // La fecha seleccionada es válida, realizar las acciones correspondientes
    Alert.alert('Éxito', `Fecha seleccionada: ${selectedDate}`);
  };

  // Obtener la fecha actual
  const currentDate = new Date();

  // Estilos para el componente DateTimePicker
  const dateTimePickerStyles = StyleSheet.create({
    datePicker: {
      backgroundColor: '#fff',
      marginBottom: 10,
    },
    reservedDate: {
      backgroundColor: '#ccc',
    },
  });

  return (
    <View>
      <DateTimePicker
        value={selectedDate || currentDate}
        mode="date"
        display="default"
        onChange={handleChangeDate}
        style={dateTimePickerStyles.datePicker}
        disabled={reservedDates.includes(currentDate.getDate())}
        dayTextStyle={(day) =>
          reservedDates.includes(day.getDate()) && dateTimePickerStyles.reservedDate
        }
      />
      <Button title="Guardar" onPress={handleSaveDate} />
    </View>
  );
}
