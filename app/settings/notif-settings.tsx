import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

const NOTIF_ITEMS = [
  { key: 'push',      label: 'Push Notifications',  sub: 'Receive alerts on your device',        default: true },
  { key: 'invoice',   label: 'Invoice Updates',      sub: 'Get notified about invoice status',    default: true },
  { key: 'payment',   label: 'Payment Reminders',    sub: 'Alerts for upcoming payments',         default: true },
  { key: 'schemes',   label: 'New Schemes',          sub: 'Get alerts about new offers',          default: true },
  { key: 'products',  label: 'Product Updates',      sub: 'New products and stock alerts',        default: false },
  { key: 'marketing', label: 'Marketing Messages',   sub: 'Promotional content and tips',         default: false },
];

export default function NotifSettingsScreen() {
  const router = useRouter();
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(NOTIF_ITEMS.map(i => [i.key, i.default]))
  );

  const toggle = (key: string) =>
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Notifications</Text>
      </View>

      <ScrollView style={s.content} showsVerticalScrollIndicator={false}>
        <Text style={s.sectionTitle}>Notification Settings</Text>

        {NOTIF_ITEMS.map((item, idx) => (
          <View
            key={item.key}
            style={[s.row, idx < NOTIF_ITEMS.length - 1 && s.rowBorder]}
          >
            <View style={s.rowText}>
              <Text style={s.rowLabel}>{item.label}</Text>
              <Text style={s.rowSub}>{item.sub}</Text>
            </View>
            <Switch
              value={toggles[item.key]}
              onValueChange={() => toggle(item.key)}
              trackColor={{ false: COLORS.card, true: COLORS.primary }}
              thumbColor="#fff"
              ios_backgroundColor={COLORS.card}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.primary },
  header: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14, gap: 12,
  },
  backBtn: { padding: 4 },
  headerTitle: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 20 },

  content: {
    flex: 1, backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: 20, paddingTop: 24,
  },

  sectionTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 22, marginBottom: 8 },

  row: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  rowText: { flex: 1, marginRight: 16 },
  rowLabel: { color: COLORS.text, fontFamily: FONTS.semibold, fontSize: 15 },
  rowSub: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 13, marginTop: 2 },
});
