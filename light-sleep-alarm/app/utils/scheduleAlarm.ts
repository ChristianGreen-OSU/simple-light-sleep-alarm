import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications';

export async function scheduleAlarm(alarmTime: Date, buzzMinutesBefore: number[]) {
  for (let i = 0; i < buzzMinutesBefore.length; i++) {
    const minutesBefore = buzzMinutesBefore[i];
    const buzzTime = new Date(alarmTime.getTime() - minutesBefore * 60 * 1000);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Wake Up Buzz',
        body: 'Buzz '.repeat(i + 1).trim(),
        sound: true,
      },
      trigger: { date: buzzTime, type: SchedulableTriggerInputTypes.DATE },
    });
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'ALARM!',
      body: 'Time to wake up!',
      sound: true,
    },
    trigger: { date: alarmTime, type: SchedulableTriggerInputTypes.DATE },
  });
}