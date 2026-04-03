import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="theme-settings" />
      <Stack.Screen name="notif-settings" />
      <Stack.Screen name="help" />
      <Stack.Screen name="faq" />
      <Stack.Screen name="account" />
      <Stack.Screen name="security" />
      <Stack.Screen name="privacy" />
    </Stack>
  );
}
