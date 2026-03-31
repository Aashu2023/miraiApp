import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import { useThemeStore } from '../../hooks/useThemeStore';

const THEMES = [
  {
    id: 'light',
    label: 'Light Mode',
    desc: 'Bright and clean interface',
    icon: '☀️',
  },
  {
    id: 'dark',
    label: 'Dark Mode',
    desc: 'Easy on the eyes at night',
    icon: '🌙',
  },
  {
    id: 'system',
    label: 'System Default',
    desc: 'Match Device settings',
    icon: '⚙️',
  },
];

const ACCENT_COLORS = [
  '#6B4EFF', '#3B82F6', '#A855F7', '#EC4899',
  '#EF4444', '#F97316', '#F59E0B', '#EAB308',
  '#22C55E', '#10B981', '#06B6D4', '#64748B',
];

export default function ThemeScreen() {
  const router = useRouter();
  const { setTheme } = useThemeStore();
  const [selectedTheme, setSelectedTheme] = useState('system');
  const [accentColor, setAccentColor] = useState('#EAB308');

  return (
    <SafeAreaView style={styles.safe}>
      {/* Yellow Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>Choose Your{'\n'}Theme</Text>
            <Text style={styles.subtitle}>Select the appearance that suits you best</Text>
            <View style={styles.dots}>
              <View style={styles.dot} />
              <View style={[styles.dot, styles.dotActive]} />
              <View style={styles.dot} />
            </View>
          </View>
          <View style={styles.mascotPlaceholder}>
            <Text style={styles.mascotEmoji}>🎨</Text>
          </View>
        </View>
      </View>

      {/* Sheet */}
      <ScrollView style={styles.sheet} contentContainerStyle={styles.sheetContent}>
        <Text style={styles.sectionLabel}>Select Theme</Text>

        {THEMES.map(t => {
          const isActive = selectedTheme === t.id;
          return (
            <TouchableOpacity
              key={t.id}
              style={[styles.themeCard, isActive && styles.themeCardActive]}
              onPress={() => setSelectedTheme(t.id)}
            >
              <View style={styles.themeIcon}>
                <Text style={{ fontSize: 22 }}>{t.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.themeLabel}>{t.label}</Text>
                <Text style={styles.themeDesc}>{t.desc}</Text>
              </View>
              <View style={[styles.radio, isActive && styles.radioActive]}>
                {isActive && (
                  <Ionicons name="checkmark" size={14} color={COLORS.background} />
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        <Text style={[styles.sectionLabel, { marginTop: 24, fontSize: 18, fontFamily: FONTS.bold }]}>
          Pick Your Accent Color
        </Text>
        <Text style={styles.accentSubtitle}>
          Personalize buttons, highlights, and interactive elements
        </Text>

        <View style={styles.colorGrid}>
          {ACCENT_COLORS.map(color => (
            <TouchableOpacity
              key={color}
              style={[styles.colorSwatch, { backgroundColor: color }]}
              onPress={() => setAccentColor(color)}
            >
              {accentColor === color && (
                <Ionicons name="checkmark" size={16} color="#fff" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.btnNext}
          onPress={() => {
            setTheme(selectedTheme as any);
            router.replace('/main/home');
          }}
        >
          <Text style={styles.btnNextText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnSkip}
          onPress={() => router.replace('/main/home')}
        >
          <Text style={styles.btnSkipText}>Skip</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.primary },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerContent: { flexDirection: 'row', alignItems: 'flex-start' },
  titleBlock: { flex: 1 },
  title: {
    fontSize: 36,
    fontFamily: FONTS.bold,
    color: COLORS.background,
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.background,
    marginTop: 8,
    fontFamily: FONTS.regular,
    opacity: 0.85,
  },
  dots: { flexDirection: 'row', gap: 6, marginTop: 12 },
  dot: {
    width: 28,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  dotActive: { backgroundColor: COLORS.background },
  mascotPlaceholder: {
    width: 90, height: 90,
    justifyContent: 'center', alignItems: 'center',
  },
  mascotEmoji: { fontSize: 60 },

  sheet: { flex: 1, backgroundColor: COLORS.surface, borderTopLeftRadius: 28, borderTopRightRadius: 28 },
  sheetContent: { padding: 20, paddingBottom: 40 },

  sectionLabel: {
    color: COLORS.text,
    fontFamily: FONTS.medium,
    fontSize: 15,
    marginBottom: 12,
  },

  themeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    gap: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  themeCardActive: { borderColor: COLORS.primary },
  themeIcon: {
    width: 44, height: 44,
    borderRadius: 10,
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

  accentSubtitle: {
    color: COLORS.textMuted,
    fontFamily: FONTS.regular,
    fontSize: 13,
    marginTop: -8,
    marginBottom: 16,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  colorSwatch: {
    width: 46, height: 46,
    borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
  },

  btnNext: {
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnNextText: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 16 },
  btnSkip: {
    backgroundColor: COLORS.card,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnSkipText: { color: COLORS.text, fontFamily: FONTS.semibold, fontSize: 16 },
});
