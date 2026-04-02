import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

const ACTIVE_SCHEMES = [
  {
    id: '1',
    tier: 'Premium',
    name: 'Winter Mega Sale',
    desc: '15% cashback on bulk orders',
    progress: 72,
    remaining: '₹28,000 more to Gold tier',
    validUntil: '31 Dec 2024',
    daysLeft: 18,
    gradient: ['#F97316', '#EF4444'],
  },
  {
    id: '2',
    tier: 'Premium',
    name: 'Winter Mega Sale',
    desc: '15% cashback on bulk orders',
    progress: 72,
    remaining: '₹28,000 more to Gold tier',
    validUntil: '31 Dec 2024',
    daysLeft: 18,
    gradient: ['#F97316', '#EF4444'],
  },
  {
    id: '3',
    tier: 'Standard',
    name: 'Year End Bonus',
    desc: '10% extra on interior paints',
    progress: 45,
    remaining: '₹55,000 more to Silver tier',
    validUntil: '31 Dec 2024',
    daysLeft: 18,
    gradient: ['#3B82F6', '#8B5CF6'],
  },
];

const EXPIRED_SCHEMES = [
  {
    id: 'e1',
    tier: 'Standard',
    name: 'Monsoon Offer',
    desc: '8% cashback on exterior paints',
    progress: 100,
    remaining: 'Completed',
    validUntil: '30 Sep 2024',
    daysLeft: 0,
    gradient: ['#64748B', '#475569'],
  },
];

export default function SchemeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Active' | 'Expired'>('Active');
  const [search, setSearch] = useState('');

  const schemes = activeTab === 'Active' ? ACTIVE_SCHEMES : EXPIRED_SCHEMES;
  const filtered = schemes.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Yellow Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scheme</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.newProductBadge}>
            <Text style={styles.newProductText}>🎁 NEW{'\n'}product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="search" size={20} color={COLORS.background} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={20} color={COLORS.background} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {/* Tab Toggle */}
        <View style={styles.tabToggle}>
          {(['Active', 'Expired'] as const).map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.toggleBtn, activeTab === tab && styles.toggleBtnActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.toggleText, activeTab === tab && styles.toggleTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Search + Filter */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={16} color={COLORS.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by Scheme"
              placeholderTextColor={COLORS.textMuted}
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="swap-vertical" size={18} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="funnel-outline" size={18} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* Scheme Cards */}
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          {filtered.map(scheme => (
            <View key={scheme.id} style={styles.schemeCard}>
              {/* Gradient-like Header */}
              <View style={[styles.schemeHeader, { backgroundColor: scheme.gradient[0] }]}>
                <View style={styles.schemeHeaderOverlay} />

                <View style={styles.schemeTopRow}>
                  <View style={styles.tierBadge}>
                    <Text style={styles.tierText}>{scheme.tier}</Text>
                  </View>
                  <Ionicons name="gift-outline" size={22} color="#fff" />
                </View>

                <Text style={styles.schemeName}>{scheme.name}</Text>
                <Text style={styles.schemeDesc}>{scheme.desc}</Text>

                {/* Progress */}
                <View style={styles.progressSection}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>Your Progress</Text>
                    <Text style={styles.progressPct}>{scheme.progress}%</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${scheme.progress}%` }]} />
                  </View>
                  <Text style={styles.progressRemaining}>{scheme.remaining}</Text>
                </View>

                {/* Footer */}
                <View style={styles.schemeFooter}>
                  <Text style={styles.validText}>Valid until: {scheme.validUntil}</Text>
                  {scheme.daysLeft > 0 && (
                    <Text style={styles.daysLeft}>{scheme.daysLeft} days left</Text>
                  )}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.primary },
  header: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, gap: 10,
  },
  backBtn: { padding: 4 },
  headerTitle: { flex: 1, color: COLORS.background, fontFamily: FONTS.bold, fontSize: 20 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  newProductBadge: {
    backgroundColor: '#8B5CF6', borderRadius: 12,
    paddingHorizontal: 8, paddingVertical: 4,
  },
  newProductText: { color: '#fff', fontFamily: FONTS.bold, fontSize: 9, textAlign: 'center' },
  iconBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },

  content: { flex: 1, backgroundColor: COLORS.surface, paddingTop: 16 },

  tabToggle: {
    flexDirection: 'row', backgroundColor: COLORS.card,
    borderRadius: 14, marginHorizontal: 16, padding: 4, marginBottom: 14,
  },
  toggleBtn: { flex: 1, paddingVertical: 11, borderRadius: 10, alignItems: 'center' },
  toggleBtnActive: { backgroundColor: COLORS.primary },
  toggleText: { color: COLORS.textMuted, fontFamily: FONTS.semibold, fontSize: 15 },
  toggleTextActive: { color: COLORS.background },

  searchRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, gap: 8, marginBottom: 14,
  },
  searchBox: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.card, borderRadius: 24,
    paddingHorizontal: 14, paddingVertical: 10, gap: 8,
  },
  searchInput: { flex: 1, color: COLORS.text, fontFamily: FONTS.regular, fontSize: 14 },
  actionBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: COLORS.card, justifyContent: 'center', alignItems: 'center',
  },

  scroll: { flex: 1, paddingHorizontal: 16 },

  schemeCard: { marginBottom: 14, borderRadius: 18, overflow: 'hidden' },
  schemeHeader: { padding: 18 },
  schemeHeaderOverlay: {
    position: 'absolute', top: 0, right: 0, bottom: 0,
    width: '40%',
    backgroundColor: 'rgba(239,68,68,0.3)',
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
  },

  schemeTopRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 10,
  },
  tierBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4,
  },
  tierText: { color: '#fff', fontFamily: FONTS.bold, fontSize: 12 },

  schemeName: { color: '#fff', fontFamily: FONTS.bold, fontSize: 22, marginBottom: 4 },
  schemeDesc: { color: 'rgba(255,255,255,0.85)', fontFamily: FONTS.regular, fontSize: 14, marginBottom: 16 },

  progressSection: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12, padding: 12, marginBottom: 14,
  },
  progressHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 8,
  },
  progressLabel: { color: 'rgba(255,255,255,0.85)', fontFamily: FONTS.medium, fontSize: 13 },
  progressPct: { color: '#fff', fontFamily: FONTS.bold, fontSize: 15 },
  progressBar: {
    height: 6, backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3, marginBottom: 8, overflow: 'hidden',
  },
  progressFill: {
    height: '100%', backgroundColor: '#fff', borderRadius: 3,
  },
  progressRemaining: { color: 'rgba(255,255,255,0.75)', fontFamily: FONTS.regular, fontSize: 12 },

  schemeFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  validText: { color: 'rgba(255,255,255,0.8)', fontFamily: FONTS.regular, fontSize: 13 },
  daysLeft: { color: '#fff', fontFamily: FONTS.bold, fontSize: 14 },
});
