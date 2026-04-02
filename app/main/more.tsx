import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView, ScrollView,
  StyleSheet,
  Text, TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

const MENU_ITEMS = [
  {
    section: 'Business',
    items: [
      { label: 'Dashboard',   icon: 'tv-outline',            route: '/main/dashboard',  color: '#3B82F6' },
      { label: 'Invoice',     icon: 'document-text-outline', route: '/main/invoice',    color: '#F97316' },
      { label: 'Purchase',    icon: 'bag-handle-outline',    route: '/main/purchase',   color: '#22C55E' },
      { label: 'Statement',   icon: 'card-outline',          route: '/main/statement',  color: '#8B5CF6' },
    ],
  },
  {
    section: 'Support',
    items: [
      { label: 'Complaints',  icon: 'headset-outline',       route: '/main/complaints', color: '#EF4444' },
      { label: 'Scheme',      icon: 'gift-outline',          route: '/main/scheme',     color: '#EAB308' },
    ],
  },
];

export default function MoreScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>More</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {MENU_ITEMS.map(section => (
          <View key={section.section} style={styles.section}>
            <Text style={styles.sectionLabel}>{section.section}</Text>
            <View style={styles.card}>
              {section.items.map((item, idx) => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.menuRow,
                    idx < section.items.length - 1 && styles.menuRowBorder,
                  ]}
                  onPress={() => router.push(item.route as any)}
                >
                  <View style={[styles.iconBox, { backgroundColor: item.color + '22' }]}>
                    <Ionicons name={item.icon as any} size={20} color={item.color} />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surface },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20, paddingVertical: 16,
  },
  headerTitle: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 22 },
  content: { flex: 1, padding: 16 },
  section: { marginBottom: 24 },
  sectionLabel: {
    color: COLORS.textMuted, fontFamily: FONTS.semibold,
    fontSize: 12, textTransform: 'uppercase',
    letterSpacing: 1, marginBottom: 8, marginLeft: 4,
  },
  card: { backgroundColor: COLORS.card, borderRadius: 14, overflow: 'hidden' },
  menuRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 15, gap: 14,
  },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  iconBox: {
    width: 38, height: 38, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
  },
  menuLabel: { flex: 1, color: COLORS.text, fontFamily: FONTS.medium, fontSize: 15 },
});
