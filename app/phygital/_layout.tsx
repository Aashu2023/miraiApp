import { Stack } from 'expo-router';

export default function PhygitalLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="history" />
      <Stack.Screen name="daily-detail" />
      <Stack.Screen name="transaction-detail" />
      <Stack.Screen name="painter-detail" />
    </Stack>
  );
}
