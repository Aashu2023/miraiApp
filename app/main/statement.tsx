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

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const QUICK_SELECTS = [
  { label: 'Oct 2025', sub: '₹3,46,470' },
  { label: 'Sep 2025', sub: '₹12.8L' },
  { label: 'Q3 2025', sub: '₹45.8L', tag: 'Oct 2024' },
];

export default function StatementScreen() {
  const router = useRouter();
  const [periodType, setPeriodType] = useState<'Monthly' | 'Quarterly' | 'Custom'>('Monthly');
  const [selectedMonth, setSelectedMonth] = useState('November');
  const [selectedYear] = useState('2025');
  const [format, setFormat] = useState<'PDF' | 'Excel'>('PDF');

  return (
    <SafeAreaView style={styles.safe}>
      {/* Yellow Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Statement</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.newArrivalBadge}>
            <Text style={styles.newArrivalText}>✨ NEW{'\n'}arrival</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="search" size={20} color={COLORS.background} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={20} color={COLORS.background} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Account Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTopRow}>
            <View>
              <Text style={styles.summaryLabel}>Account Summary</Text>
              <Text style={styles.summaryName}>Rajesh Kumar Distributors</Text>
            </View>
            <View style={styles.docIcon}>
              <Ionicons name="document-text-outline" size={22} color={COLORS.background} />
            </View>
          </View>
          <View style={styles.summaryStats}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Total Outstanding</Text>
              <Text style={styles.statValue}>₹12.8L</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Last Statement</Text>
              <Text style={styles.statValue}>Oct 2024</Text>
            </View>
          </View>
          <Text style={styles.accountInfo}>
            Account ID: <Text style={styles.accountInfoBold}>RKD-2024-001</Text>
            {'   '}GST: <Text style={styles.accountInfoBold}>27AABCU9603R1ZM</Text>
          </Text>
        </View>

        {/* Generate New Statement */}
        <Text style={styles.sectionTitle}>Generate New Statement</Text>

        <View style={styles.formCard}>
          {/* Period Type */}
          <Text style={styles.fieldLabel}>Select Period Type</Text>
          <View style={styles.periodToggle}>
            {(['Monthly', 'Quarterly', 'Custom'] as const).map(p => (
              <TouchableOpacity
                key={p}
                style={[styles.periodBtn, periodType === p && styles.periodBtnActive]}
                onPress={() => setPeriodType(p)}
              >
                <Text style={[styles.periodBtnText, periodType === p && styles.periodBtnTextActive]}>
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Month + Year */}
          <View style={styles.dateRow}>
            <View style={styles.dateField}>
              <Text style={styles.fieldLabel}>Month</Text>
              <TouchableOpacity style={styles.dateInput}>
                <Text style={styles.dateInputText}>{selectedMonth}</Text>
                <Ionicons name="calendar-outline" size={18} color={COLORS.textMuted} />
              </TouchableOpacity>
            </View>
            <View style={styles.dateField}>
              <Text style={styles.fieldLabel}>Year</Text>
              <TouchableOpacity style={styles.dateInput}>
                <Text style={styles.dateInputText}>{selectedYear}</Text>
                <Ionicons name="calendar-outline" size={18} color={COLORS.textMuted} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Statement Format */}
          <Text style={styles.fieldLabel}>Statement Format</Text>
          <View style={styles.formatRow}>
            <TouchableOpacity
              style={[styles.formatBtn, format === 'PDF' && styles.formatBtnActive]}
              onPress={() => setFormat('PDF')}
            >
              <Ionicons name="document-outline" size={16}
                color={format === 'PDF' ? COLORS.background : COLORS.text} />
              <Text style={[styles.formatBtnText, format === 'PDF' && styles.formatBtnTextActive]}>
                PDF
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.formatBtn, format === 'Excel' && styles.formatBtnActive]}
              onPress={() => setFormat('Excel')}
            >
              <Ionicons name="grid-outline" size={16}
                color={format === 'Excel' ? COLORS.background : COLORS.text} />
              <Text style={[styles.formatBtnText, format === 'Excel' && styles.formatBtnTextActive]}>
                Excel
              </Text>
            </TouchableOpacity>
          </View>

          {/* Generate Button */}
          <TouchableOpacity style={styles.generateBtn}>
            <Ionicons name="download-outline" size={18} color={COLORS.background} />
            <Text style={styles.generateBtnText}>Generate & Download Statement</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Select */}
        <Text style={styles.sectionTitle}>Quick Select</Text>
        <View style={styles.quickRow}>
          {QUICK_SELECTS.map(q => (
            <TouchableOpacity key={q.label} style={styles.quickCard}>
              <Text style={styles.quickLabel}>{q.label}</Text>
              <Text style={styles.quickSub}>{q.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  newArrivalBadge: {
    backgroundColor: '#8B5CF6', borderRadius: 12,
    paddingHorizontal: 8, paddingVertical: 4,
  },
  newArrivalText: { color: '#fff', fontFamily: FONTS.bold, fontSize: 9, textAlign: 'center' },
  iconBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },

  content: { flex: 1, backgroundColor: COLORS.surface, padding: 16 },

  summaryCard: {
    borderRadius: 16, padding: 18, marginBottom: 24,
    backgroundColor: COLORS.primary,
  },
  summaryTopRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 14,
  },
  summaryLabel: { color: COLORS.background, fontFamily: FONTS.regular, fontSize: 13, opacity: 0.8 },
  summaryName: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 17 },
  docIcon: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  summaryStats: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  statBox: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 10, padding: 12,
  },
  statLabel: { color: COLORS.background, fontFamily: FONTS.regular, fontSize: 12, opacity: 0.8, marginBottom: 4 },
  statValue: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 20 },
  accountInfo: { color: COLORS.background, fontFamily: FONTS.regular, fontSize: 12, opacity: 0.8 },
  accountInfoBold: { fontFamily: FONTS.bold },

  sectionTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 20, marginBottom: 14 },

  formCard: {
    backgroundColor: COLORS.card, borderRadius: 16,
    padding: 16, marginBottom: 24,
  },
  fieldLabel: {
    color: COLORS.text, fontFamily: FONTS.medium,
    fontSize: 14, marginBottom: 10,
  },

  periodToggle: { flexDirection: 'row', gap: 8, marginBottom: 18 },
  periodBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 10,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    borderWidth: 1.5, borderColor: 'transparent',
  },
  periodBtnActive: { borderColor: COLORS.primary, backgroundColor: 'rgba(255,193,7,0.1)' },
  periodBtnText: { color: COLORS.textMuted, fontFamily: FONTS.medium, fontSize: 14 },
  periodBtnTextActive: { color: COLORS.primary, fontFamily: FONTS.bold },

  dateRow: { flexDirection: 'row', gap: 12, marginBottom: 18 },
  dateField: { flex: 1 },
  dateInput: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: COLORS.surface, borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 13,
    borderWidth: 1, borderColor: COLORS.border,
  },
  dateInputText: { color: COLORS.text, fontFamily: FONTS.medium, fontSize: 15 },

  formatRow: { flexDirection: 'row', gap: 12, marginBottom: 18 },
  formatBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8,
    backgroundColor: COLORS.surface, borderRadius: 10,
    paddingVertical: 13,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  formatBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  formatBtnText: { color: COLORS.text, fontFamily: FONTS.semibold, fontSize: 15 },
  formatBtnTextActive: { color: COLORS.background },

  generateBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, backgroundColor: COLORS.primary,
    borderRadius: 14, paddingVertical: 16,
  },
  generateBtnText: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 15 },

  quickRow: { flexDirection: 'row', gap: 10, paddingBottom: 30 },
  quickCard: {
    flex: 1, backgroundColor: COLORS.card,
    borderRadius: 12, padding: 14, alignItems: 'center',
  },
  quickLabel: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 14, marginBottom: 4 },
  quickSub: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 12 },
});
