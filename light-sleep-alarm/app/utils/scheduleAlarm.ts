import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications';

export async function scheduleAlarm(alarmTime: Date) {
  const intervals = [15, 10, 5]; // minutes before alarm

  for (let i = 0; i < intervals.length; i++) {
    const minutesBefore = intervals[i];
    const buzzTime = new Date(alarmTime.getTime() - minutesBefore * 1000); //seconds now. 60k for minutes

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Wake Up Buzz',
        body: 'Buzz '.repeat(i + 1).trim(),
        sound: undefined,
      },
      trigger: {date: buzzTime, type: SchedulableTriggerInputTypes.DATE	},
    });
  }

  // Main alarm with default sound
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'ALARM!',
      body: 'Time to wake up!',
      sound: true,
    },
    trigger: {date: alarmTime, type: SchedulableTriggerInputTypes.DATE	},
  });
}