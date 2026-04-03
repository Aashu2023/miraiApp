import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <Text style={s.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => router.push('/main/settings' as any)} style={s.settingsBtn}>
          <Ionicons name="settings-outline" size={22} color={COLORS.background} />
        </TouchableOpacity>
      </View>
      <View style={s.content}>
        <View style={s.avatar}>
          <Ionicons name="person" size={42} color={COLORS.textMuted} />
        </View>
        <Text style={s.name}>Hiday</Text>
        <Text style={s.phone}>+91 98765 43210</Text>

        {[
          { label: 'Account',       icon: 'person-outline',        route: '/settings/account' },
          { label: 'Notifications', icon: 'notifications-outline', route: '/main/notifications' },
          { label: 'Settings',      icon: 'settings-outline',      route: '/main/settings' },
          { label: 'Help',          icon: 'help-circle-outline',   route: '/settings/help' },
          { label: 'FAQ',           icon: 'document-text-outline', route: '/settings/faq' },
        ].map(item => (
          <TouchableOpacity key={item.label} style={s.row} onPress={() => router.push(item.route as any)}>
            <View style={s.iconBox}>
              <Ionicons name={item.icon as any} size={20} color={COLORS.primary} />
            </View>
            <Text style={s.rowLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.primary },
  header: { backgroundColor: COLORS.primary, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14 },
  headerTitle: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 22 },
  settingsBtn: { padding: 4 },
  content: { flex: 1, backgroundColor: COLORS.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, alignItems: 'center' },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: COLORS.card, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 12 },
  name: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 22, marginBottom: 4 },
  phone: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 14, marginBottom: 28 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, width: '100%', backgroundColor: COLORS.card, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 10 },
  iconBox: { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,193,7,0.1)', justifyContent: 'center', alignItems: 'center' },
  rowLabel: { flex: 1, color: COLORS.text, fontFamily: FONTS.medium, fontSize: 15 },
});
