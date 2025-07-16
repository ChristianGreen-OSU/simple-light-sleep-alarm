import React from 'react';
import { View, Text, Button } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Simple Alarm App</Text>
      <Button title="Set Alarm" onPress={() => alert('Alarm placeholder')} />
    </View>
  );
}