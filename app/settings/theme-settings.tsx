import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView,
  StyleSheet,
  Text, TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import { useThemeStore } from '../../hooks/useThemeStore';

const THEMES = [
  { id: 'light',  label: 'Light Mode',     desc: 'Bright and clean interface',  icon: '☀️' },
  { id: 'dark',   label: 'Dark Mode',      desc: 'Easy on the eyes at night',   icon: '🌙' },
  { id: 'system', label: 'System Default', desc: 'Match Device settings',       icon: '⚙️' },
];

const ACCENT_COLORS = [
  { hex: '#6B4EFF', name: 'Indigo' },
  { hex: '#3B82F6', name: 'Blue' },
  { hex: '#A855F7', name: 'Purple' },
  { hex: '#EC4899', name: 'Pink' },
  { hex: '#EF4444', name: 'Red' },
  { hex: '#F97316', name: 'Orange' },
  { hex: '#F59E0B', name: 'Amber' },
  { hex: '#EAB308', name: 'Yellow' },
  { hex: '#22C55E', name: 'Green' },
  { hex: '#10B981', name: 'Emerald' },
  { hex: '#06B6D4', name: 'Cyan' },
  { hex: '#64748B', name: 'Slate' },
];

export default function ThemeSettingsScreen() {
  const router = useRouter();
  const { theme, setTheme } = useThemeStore();
  const [selectedTheme, setSelectedTheme] = useState<string>(theme || 'system');
  const [accentColor, setAccentColor] = useState('#EAB308'); // ← local state

  const handleThemeSelect = (id: string) => {
    setSelectedTheme(id);
    setTheme(id as any);
  };

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Theme</Text>
      </View>

      <ScrollView style={s.content} showsVerticalScrollIndicator={false}>
        <Text style={s.sectionLabel}>Select Theme</Text>

        {THEMES.map(t => {
          const isActive = selectedTheme === t.id;
          return (
            <TouchableOpacity
              key={t.id}
              style={[s.themeCard, isActive && s.themeCardActive]}
              onPress={() => handleThemeSelect(t.id)}
              activeOpacity={0.8}
            >
              <View style={s.themeIcon}>
                <Text style={{ fontSize: 22 }}>{t.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.themeLabel}>{t.label}</Text>
                <Text style={s.themeDesc}>{t.desc}</Text>
              </View>
              {/* Radio circle */}
              <View style={[s.radio, isActive && s.radioActive]}>
                {isActive && <Ionicons name="checkmark" size={14} color="#000" />}
              </View>
            </TouchableOpacity>
          );
        })}

        <Text style={s.accentTitle}>Pick Your Accent Color</Text>
        <Text style={s.accentSub}>
          Personalize buttons, highlights, and interactive elements
        </Text>

        {/* Color grid — 6 per row */}
        <View style={s.colorGrid}>
          {ACCENT_COLORS.map(color => {
            const isSelected = accentColor === color.hex;
            return (
              <TouchableOpacity
                key={color.hex}
                style={[
                  s.colorSwatch,
                  { backgroundColor: color.hex },
                  isSelected && s.colorSwatchSelected,
                ]}
                onPress={() => setAccentColor(color.hex)} // ← state updates here
                activeOpacity={0.75}
              >
                {isSelected && (
                  <Ionicons name="checkmark" size={18} color="#fff" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Preview of selected color */}
        <View style={s.previewRow}>
          <Text style={s.previewLabel}>Selected color:</Text>
          <View style={[s.previewDot, { backgroundColor: accentColor }]} />
          <Text style={[s.previewHex, { color: accentColor }]}>{accentColor}</Text>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[s.saveBtn, { backgroundColor: accentColor }]}
          onPress={() => router.back()}
        >
          <Text style={s.saveBtnText}>Save Preferences</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.primary },
  header: {
    backgroundColor: COLORS.primary, flexDirection: 'row',
    alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12,
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
  themeIcon: { width: 44, height: 44, borderRadius: 10, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center' },
  themeLabel: { color: COLORS.text, fontFamily: FONTS.semibold, fontSize: 15 },
  themeDesc: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 13, marginTop: 2 },
  radio: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  radioActive: { backgroundColor: COLORS.primary },

  accentTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 18, marginTop: 24, marginBottom: 4 },
  accentSub: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 13, marginBottom: 16 },

  colorGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 12,
  },
  colorSwatch: {
    width: 48, height: 48, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
    // default — no border
  },
  colorSwatchSelected: {
    borderWidth: 3,
    borderColor: '#fff',
    // white border + checkmark shows selection
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },

  previewRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 10, marginTop: 20, marginBottom: 20,
    backgroundColor: COLORS.card, borderRadius: 12, padding: 14,
  },
  previewLabel: { color: COLORS.textMuted, fontFamily: FONTS.medium, fontSize: 14 },
  previewDot: { width: 20, height: 20, borderRadius: 10 },
  previewHex: { fontFamily: FONTS.bold, fontSize: 15 },

  saveBtn: {
    borderRadius: 14, paddingVertical: 16,
    alignItems: 'center', marginBottom: 30,
  },
  saveBtnText: { color: '#000', fontFamily: FONTS.bold, fontSize: 16 },
});
