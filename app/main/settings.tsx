import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../constants/theme';

const SETTINGS_SECTIONS = [
  {
    items: [
      { label: 'Theme',         icon: 'moon-outline',          route: '/settings/theme-settings',  color: COLORS.text },
    ],
  },
  {
    items: [
      { label: 'Notifications', icon: 'notifications-outline', route: '/settings/notif-settings',  color: COLORS.text },
      { label: 'Security',      icon: 'shield-outline',        route: '/settings/security',        color: COLORS.text },
      { label: 'Privacy',       icon: 'lock-closed-outline',   route: '/settings/privacy',         color: COLORS.text },
    ],
  },
  {
    items: [
      { label: 'Account',       icon: 'person-outline',        route: '/settings/account',         color: COLORS.text },
      { label: 'Help',          icon: 'help-circle-outline',   route: '/settings/help',            color: COLORS.text },
      { label: 'About',         icon: 'information-circle-outline', route: '/settings/about',      color: COLORS.text },
    ],
  },
  {
    items: [
      { label: 'FAQ',           icon: 'document-text-outline', route: '/settings/faq',             color: COLORS.text },
    ],
  },
  {
    items: [
      { label: 'Logout',        icon: 'log-out-outline',       route: null,                        color: '#EF4444' },
    ],
  },
];

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={s.safe}>
      {/* Yellow Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={s.content} showsVerticalScrollIndicator={false}>
        {/* Profile Row */}
        <View style={s.profileRow}>
          <View style={s.avatar}>
            <Ionicons name="person" size={28} color={COLORS.textMuted} />
          </View>
          <View>
            <Text style={s.profileName}>Hiday</Text>
            <Text style={s.profilePhone}>+91 98765 43210</Text>
          </View>
        </View>

        {/* Settings sections with dividers */}
        {SETTINGS_SECTIONS.map((section, si) => (
          <View key={si} style={s.section}>
            {section.items.map((item, idx) => (
              <TouchableOpacity
                key={item.label}
                style={[
                  s.row,
                  idx < section.items.length - 1 && s.rowBorder,
                ]}
                onPress={() => {
                  if (!item.route) return; // logout — handle separately
                  router.push(item.route as any);
                }}
              >
                <View style={s.rowLeft}>
                  <View style={s.iconCircle}>
                    <Ionicons name={item.icon as any} size={18} color={item.color} />
                  </View>
                  <Text style={[s.rowLabel, { color: item.color }]}>{item.label}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
              </TouchableOpacity>
            ))}
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
    paddingHorizontal: 16, paddingTop: 20,
  },

  profileRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    paddingVertical: 16, marginBottom: 8,
  },
  avatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: COLORS.card,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: COLORS.border,
  },
  profileName: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 18 },
  profilePhone: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 14, marginTop: 2 },

  section: {
    borderTopWidth: 1, borderTopColor: COLORS.border,
    paddingVertical: 4,
  },

  row: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  rowBorder: {
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  iconCircle: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: COLORS.card,
    justifyContent: 'center', alignItems: 'center',
  },
  rowLabel: { fontFamily: FONTS.medium, fontSize: 16 },
});
