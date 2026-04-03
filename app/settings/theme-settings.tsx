import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text, TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

const THEMES = [
  { id: 'light',  label: 'Light Mode',      desc: 'Bright and clean interface',  icon: '☀️' },
  { id: 'dark',   label: 'Dark Mode',       desc: 'Easy on the eyes at night',   icon: '🌙' },
  { id: 'system', label: 'System Default',  desc: 'Match Device settings',       icon: '⚙️' },
];

const ACCENT_COLORS = [
  '#6B4EFF', '#3B82F6', '#A855F7', '#EC4899',
  '#EF4444', '#F97316', '#F59E0B', '#EAB308',
  '#22C55E', '#10B981', '#06B6D4', '#64748B',
];

export default function ThemeSettingsScreen() {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState('system');
  const [accentColor, setAccentColor] = useState('#EAB308');

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Theme</Text>
      </View>

      <View style={s.content}>
        <Text style={s.sectionLabel}>Select Theme</Text>

        {THEMES.map(t => {
          const isActive = selectedTheme === t.id;
          return (
            <TouchableOpacity
              key={t.id}
              style={[s.themeCard, isActive && s.themeCardActive]}
              onPress={() => setSelectedTheme(t.id)}
            >
              <View style={s.themeIcon}>
                <Text style={{ fontSize: 22 }}>{t.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.themeLabel}>{t.label}</Text>
                <Text style={s.themeDesc}>{t.desc}</Text>
              </View>
              <View style={[s.radio, isActive && s.radioActive]}>
                {isActive && <Ionicons name="checkmark" size={14} color="#000" />}
              </View>
            </TouchableOpacity>
          );
        })}

        <Text style={s.accentTitle}>Pick Your Accent Color</Text>
        <Text style={s.accentSub}>Personalize buttons, highlights, and interactive elements</Text>

        <View style={s.colorGrid}>
          {ACCENT_COLORS.map(color => (
            <TouchableOpacity
              key={color}
              style={[s.colorSwatch, { backgroundColor: color }]}
              onPress={() => setAccentColor(color)}
            >
              {accentColor === color && (
                <Ionicons name="checkmark" size={16} color="#fff" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
    padding: 20,
  },

  sectionLabel: { color: COLORS.text, fontFamily: FONTS.medium, fontSize: 16, marginBottom: 14 },

  themeCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: COLORS.card, borderRadius: 14,
    padding: 16, marginBottom: 10,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  themeCardActive: { borderColor: COLORS.primary },
  themeIcon: {
    width: 44, height: 44, borderRadius: 10,
    backgroundColor: COLORS.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  themeLabel: { color: COLORS.text, fontFamily: FONTS.semibold, fontSize: 15 },
  themeDesc: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 13, marginTop: 2 },
  radio: {
    width: 26, height: 26, borderRadius: 13,
    borderWidth: 2, borderColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  radioActive: { backgroundColor: COLORS.primary },

  accentTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 18, marginTop: 24, marginBottom: 4 },
  accentSub: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 13, marginBottom: 16 },

  colorGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  colorSwatch: {
    width: 46, height: 46, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
  },
});
