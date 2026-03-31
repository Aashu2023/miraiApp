import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

const LANGUAGES = [
  { id: 'uk-en', label: 'UK – English', flag: '🇬🇧' },
  { id: 'egypt', label: 'Egypt', flag: '🇪🇬' },
  { id: 'gabon', label: 'Gabon', flag: '🇬🇦' },
  { id: 'ghana', label: 'Ghana', flag: '🇬🇭' },
  { id: 'china', label: 'China', flag: '🇨🇳' },
  { id: 'india', label: 'India', flag: '🇮🇳' },
  { id: 'uae', label: 'UAE', flag: '🇦🇪' },
  { id: 'nigeria', label: 'Nigeria', flag: '🇳🇬' },
  { id: 'kenya', label: 'Kenya', flag: '🇰🇪' },
];

export default function LanguageScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState('uk-en');
  const [search, setSearch] = useState('');

  const filtered = LANGUAGES.filter(l =>
    l.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedLang = LANGUAGES.find(l => l.id === selected)!;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Yellow Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>Choose Your{'\n'}Language</Text>
            <Text style={styles.subtitle}>
              Select your preferred language for the{'\n'}best experience
            </Text>
            {/* Step dots */}
            <View style={styles.dots}>
              <View style={[styles.dot, styles.dotActive]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
          {/* Mascot placeholder */}
          <View style={styles.mascotPlaceholder}>
            <Text style={styles.mascotEmoji}>🎨</Text>
          </View>
        </View>
      </View>

      {/* Dark Bottom Sheet */}
      <View style={styles.sheet}>
        {/* Selected */}
        <Text style={styles.sectionLabel}>You Selected</Text>
        <View style={styles.selectedCard}>
          <Text style={styles.flagLarge}>{selectedLang.flag}</Text>
          <Text style={styles.selectedText}>{selectedLang.label}</Text>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={16} color={COLORS.background} />
          </View>
        </View>

        <Text style={styles.sectionLabel}>All Languages</Text>

        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={COLORS.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={COLORS.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* List */}
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          style={styles.list}
          showsVerticalScrollIndicator
          renderItem={({ item }) => {
            const isSelected = item.id === selected;
            return (
              <TouchableOpacity
                style={[styles.langRow, isSelected && styles.langRowActive]}
                onPress={() => setSelected(item.id)}
              >
                <Text style={styles.flagSmall}>{item.flag}</Text>
                <Text style={[styles.langLabel, isSelected && styles.langLabelActive]}>
                  {item.label}
                </Text>
                {isSelected && (
                  <View style={styles.checkCircle}>
                    <Ionicons name="checkmark" size={14} color={COLORS.background} />
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
        />

        {/* Buttons */}
        <TouchableOpacity
          style={styles.btnNext}
          onPress={() => router.push('/onboarding/theme')}
        >
          <Text style={styles.btnNextText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnSkip}
          onPress={() => router.replace('/main/home')}
        >
          <Text style={styles.btnSkipText}>Skip</Text>
        </TouchableOpacity>
      </View>
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
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mascotEmoji: { fontSize: 60 },

  sheet: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  sectionLabel: {
    color: COLORS.text,
    fontFamily: FONTS.medium,
    fontSize: 15,
    marginBottom: 10,
  },
  selectedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  flagLarge: { fontSize: 28, marginRight: 12 },
  selectedText: {
    flex: 1,
    color: COLORS.text,
    fontFamily: FONTS.semibold,
    fontSize: 16,
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 4,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: COLORS.text,
    fontFamily: FONTS.regular,
    fontSize: 15,
  },
  list: { flex: 1, marginTop: 4 },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  langRowActive: { backgroundColor: 'rgba(255,193,7,0.1)', borderRadius: 8 },
  flagSmall: { fontSize: 22, marginRight: 12 },
  langLabel: {
    flex: 1,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    fontSize: 15,
  },
  langLabelActive: { color: COLORS.text, fontFamily: FONTS.semibold },

  btnNext: {
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  btnNextText: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 16 },
  btnSkip: {
    backgroundColor: COLORS.card,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  btnSkipText: { color: COLORS.text, fontFamily: FONTS.semibold, fontSize: 16 },
});
