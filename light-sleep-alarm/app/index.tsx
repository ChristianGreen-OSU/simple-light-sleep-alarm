import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { scheduleAlarm } from './utils/scheduleAlarm';

export default function Index() {
  const [buzz1, setBuzz1] = useState(30);
  const [buzz2, setBuzz2] = useState(20);
  const [buzz3, setBuzz3] = useState(10);
  const [alarmTime, setAlarmTime] = useState<Date>(new Date(Date.now() + 60 * 60 * 1000)); // default = 1 hour later
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Enable notifications to use the alarm.');
      }
    })();
  }, []);

  const handleSetAlarm = () => {
    const buzzIntervals = [buzz1, buzz2, buzz3];
    scheduleAlarm(alarmTime, buzzIntervals);
    Alert.alert('Alarm Scheduled', `Buzzes at ${buzz1}, ${buzz2}, ${buzz3} mins before.`);
  };

  const timeOptions = Array.from({ length: 6 }, (_, i) => 30 - i * 5); // [30, 25, ..., 5]

  return (
    <View style={{ flex: 1, paddingTop: 80, alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Customize Alarm</Text>

      <Text>1st Buzz:</Text>
      <Picker selectedValue={buzz1} onValueChange={(v) => setBuzz1(v)} style={{ width: 200 }}>
        {timeOptions.map((min) => (
          <Picker.Item key={`buzz1-${min}`} label={`${min} min before`} value={min} />
        ))}
      </Picker>

      <Text>2nd Buzz:</Text>
      <Picker selectedValue={buzz2} onValueChange={(v) => setBuzz2(v)} style={{ width: 200 }}>
        {timeOptions.map((min) => (
          <Picker.Item key={`buzz2-${min}`} label={`${min} min before`} value={min} />
        ))}
      </Picker>

      <Text>3rd Buzz:</Text>
      <Picker selectedValue={buzz3} onValueChange={(v) => setBuzz3(v)} style={{ width: 200 }}>
        {timeOptions.map((min) => (
          <Picker.Item key={`buzz3-${min}`} label={`${min} min before`} value={min} />
        ))}
      </Picker>

      <Text>Alarm Time:</Text>
      <Button title={alarmTime.toLocaleTimeString()} onPress={() => setShowTimePicker(true)} />
      {showTimePicker && (
        <DateTimePicker
          value={alarmTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            setShowTimePicker(false);
            if (selectedDate) {
              const now = new Date();
              const picked = new Date(now);
              picked.setHours(selectedDate.getHours());
              picked.setMinutes(selectedDate.getMinutes());
              picked.setSeconds(0);
              if (picked < now) picked.setDate(picked.getDate() + 1); // schedule for tomorrow if time already passed
              setAlarmTime(picked);
            }
          }}
        />
      )}

      <Button title="Set Alarm" onPress={handleSetAlarm} />
    </View>
  );
}