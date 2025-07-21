import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import * as Notifications from "expo-notifications";
import { scheduleAlarm } from "./utils/scheduleAlarm";

export default function Index() {
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: false,
      }),
    });

    const requestPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Enable notifications to use the alarm.");
      }
    };
    requestPermission();
  }, []);

  const handleSetAlarm = () => {
    const alarmTime = new Date(Date.now() + 1 * 20 * 1000); // 20 seconds from now
    scheduleAlarm(alarmTime);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Light Sleep Alarm</Text>
      <Button
        title="Set Alarm for 20 seconds from now"
        onPress={handleSetAlarm}
      />
    </View>
  );
}
