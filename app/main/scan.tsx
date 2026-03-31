import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/theme';

export default function ScanScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Scan QR</Text>
        <Text style={styles.icon}>📱</Text>
        <Text style={styles.placeholder}>QR Scanner coming soon</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    fontSize: 48,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  placeholder: {
    fontSize: 16,
    color: COLORS.textMuted,
  },
});
