import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../constants/theme';

const { width } = Dimensions.get('window');

// ── Sample data ───────────────────────────────────────────
const TODAY_REDEMPTIONS = [
  {
    id: '1',
    name: 'Raj Kumar',
    phone: '9876543210',
    amount: '₹240',
    date: '14 Nov 2025',
  },
  {
    id: '2',
    name: 'Anita Sharma',
    phone: '9876543211',
    amount: '₹180',
    date: '14 Nov 2025',
  },
];

const MONTHLY_HISTORY = [
  { month: 'Jan', scanned: '₹3,650',  total: '₹3,849' },
  { month: 'Feb', scanned: '₹7,550',  total: '₹7,949' },
  { month: 'Mar', scanned: '₹65,156', total: '₹69,655' },
  { month: 'Apr', scanned: '₹4,681',  total: '₹4,856' },
  { month: 'May', scanned: '₹12,345', total: '₹13,000' },
  { month: 'Jun', scanned: '₹8,900',  total: '₹9,200' },
  { month: 'Jul', scanned: '₹15,500', total: '₹16,200' },
  { month: 'Aug', scanned: '₹10,250', total: '₹10,750' },
  { month: 'Sep', scanned: '₹9,750',  total: '₹10,300' },
  { month: 'Oct', scanned: '₹11,200', total: '₹11,800' },
  { month: 'Nov', scanned: '₹4,440',  total: '₹4,620' },
];

// ── Dashboard Tab ────────────────────────────────────────
function DashboardTab() {
  const router = useRouter();
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      {/* Business Stats Cards */}
      <View style={s.statsRow}>
        <View style={s.statCard}>
          <Text style={s.statLabel}>CN Received Value</Text>
          <Text style={s.statValue}>₹ 0</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statLabel}>Total Value Scanned</Text>
          <Text style={s.statValue}>₹ 440</Text>
        </View>
      </View>

      {/* Today's Redemption */}
      <View style={s.sectionRow}>
        <Text style={s.sectionTitle}>Today's Redemption</Text>
        <TouchableOpacity onPress={() => router.push('/phygital/history' as any)}>
          <Text style={s.historyLink}>History</Text>
        </TouchableOpacity>
      </View>

      {TODAY_REDEMPTIONS.map(item => (
        <TouchableOpacity
          key={item.id}
          style={s.redemptionCard}
          onPress={() => router.push({
            pathname: '/phygital/transaction-detail' as any,
            params: { name: item.name, phone: item.phone, date: item.date },
          })}
        >
          {/* Painter avatar + info */}
          <View style={s.painterRow}>
            <View style={s.painterAvatar}>
              <Ionicons name="person" size={22} color={COLORS.textMuted} />
            </View>
            <View>
              <Text style={s.painterName}>{item.name}</Text>
              <Text style={s.painterPhone}>{item.phone}</Text>
            </View>
          </View>

          <View style={s.divider} />

          <View style={s.redemptionBottom}>
            <View>
              <Text style={s.redemptionLabel}>Amount</Text>
              <Text style={s.redemptionAmount}>{item.amount}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={s.redemptionLabel}>Redemption Date</Text>
              <Text style={s.redemptionDate}>{item.date}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

// ── History Tab ──────────────────────────────────────────
function HistoryTab() {
  const router = useRouter();
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      {/* Period picker */}
      <View style={s.periodRow}>
        <Text style={s.sectionTitle}>Redemption History</Text>
        <TouchableOpacity style={s.periodPicker}>
          <Text style={s.periodText}>YTD</Text>
          <Ionicons name="chevron-down" size={14} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Table header */}
      <View style={s.tableHeader}>
        <Text style={[s.tableHeaderCell, { flex: 1.2 }]}>Month</Text>
        <Text style={[s.tableHeaderCell, { flex: 1.8 }]}>Scanned{'\n'}Amount</Text>
        <Text style={[s.tableHeaderCell, { flex: 1.8 }]}>Total{'\n'}Amount</Text>
        <Text style={[s.tableHeaderCell, { flex: 1 }]}>Action</Text>
      </View>

      {MONTHLY_HISTORY.map((row, idx) => (
        <TouchableOpacity
          key={row.month}
          style={[s.tableRow, idx % 2 === 0 && s.tableRowAlt]}
          onPress={() => router.push({
            pathname: '/phygital/daily-detail' as any,
            params: { month: row.month },
          })}
        >
          <Text style={[s.tableCell, { flex: 1.2 }]}>{row.month}</Text>
          <Text style={[s.tableCell, { flex: 1.8 }]}>{row.scanned}</Text>
          <Text style={[s.tableCell, { flex: 1.8 }]}>{row.total}</Text>
          <TouchableOpacity style={{ flex: 1 }}>
            <Text style={s.viewLink}>View</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

// ── Main Screen ──────────────────────────────────────────
export default function PhygitalDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'history'>('dashboard');
  const [period, setPeriod] = useState('YTD');

  return (
    <SafeAreaView style={s.safe}>
      {/* Yellow Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.background} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={s.headerGreeting}>Hello, Hiday!</Text>
          <Text style={s.headerSub}>Menu {'>'} Phygital</Text>
        </View>
        <TouchableOpacity style={s.iconBtn}>
          <Ionicons name="search" size={20} color={COLORS.background} />
        </TouchableOpacity>
        <TouchableOpacity style={s.iconBtn}>
          <Ionicons name="notifications-outline" size={20} color={COLORS.background} />
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View style={s.bannerContainer}>
        <View style={s.banner}>
          <Text style={s.bannerText}>STRONGEST{'\n'}TOUGHEST{'\n'}HARDEST</Text>
        </View>
        <View style={s.bannerDots}>
          <View style={[s.bannerDot, s.bannerDotActive]} />
          <View style={s.bannerDot} />
          <View style={s.bannerDot} />
        </View>
      </View>

      {/* Dark sheet */}
      <View style={s.content}>
        {/* Tab toggle */}
        <View style={s.tabToggle}>
          <TouchableOpacity
            style={[s.toggleBtn, activeTab === 'dashboard' && s.toggleBtnActive]}
            onPress={() => setActiveTab('dashboard')}
          >
            <Text style={[s.toggleText, activeTab === 'dashboard' && s.toggleTextActive]}>
              Dashboard
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.toggleBtn, activeTab === 'history' && s.toggleBtnActive]}
            onPress={() => setActiveTab('history')}
          >
            <Text style={[s.toggleText, activeTab === 'history' && s.toggleTextActive]}>
              History
            </Text>
          </TouchableOpacity>
        </View>

        {/* YTD picker (dashboard tab only) */}
        {activeTab === 'dashboard' && (
          <View style={s.businessHeader}>
            <Text style={s.sectionTitle}>My Business</Text>
            <TouchableOpacity style={s.periodPicker}>
              <Text style={s.periodText}>{period}</Text>
              <Ionicons name="chevron-down" size={14} color={COLORS.text} />
            </TouchableOpacity>
          </View>
        )}

        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          {activeTab === 'dashboard' ? <DashboardTab /> : <HistoryTab />}
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.primary },

  header: {
    backgroundColor: COLORS.primary, flexDirection: 'row',
    alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, gap: 10,
  },
  backBtn: { padding: 4 },
  headerGreeting: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 16 },
  headerSub: { color: COLORS.background, fontFamily: FONTS.regular, fontSize: 12, opacity: 0.8 },
  iconBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },

  bannerContainer: { backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingBottom: 8 },
  banner: {
    height: 120, backgroundColor: '#1a1a2e',
    borderRadius: 14, justifyContent: 'center', paddingHorizontal: 20,
  },
  bannerText: { color: COLORS.primary, fontFamily: FONTS.bold, fontSize: 20, lineHeight: 26 },
  bannerDots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 8 },
  bannerDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(0,0,0,0.25)' },
  bannerDotActive: { backgroundColor: COLORS.background, width: 20 },

  content: {
    flex: 1, backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingTop: 16,
  },

  tabToggle: {
    flexDirection: 'row', backgroundColor: COLORS.card,
    borderRadius: 12, marginHorizontal: 16, padding: 4, marginBottom: 16,
  },
  toggleBtn: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  toggleBtnActive: { backgroundColor: COLORS.primary },
  toggleText: { color: COLORS.textMuted, fontFamily: FONTS.semibold, fontSize: 14 },
  toggleTextActive: { color: COLORS.background, fontFamily: FONTS.bold },

  businessHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 16, marginBottom: 12,
  },

  sectionTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 18 },
  sectionRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },
  historyLink: { color: COLORS.primary, fontFamily: FONTS.semibold, fontSize: 14 },

  periodRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 14,
  },
  periodPicker: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: COLORS.card, borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  periodText: { color: COLORS.text, fontFamily: FONTS.medium, fontSize: 13 },

  // Stats
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  statCard: {
    flex: 1, backgroundColor: 'rgba(255,193,7,0.15)',
    borderRadius: 14, padding: 16,
    borderWidth: 1, borderColor: 'rgba(255,193,7,0.3)',
  },
  statLabel: { color: COLORS.textMuted, fontFamily: FONTS.medium, fontSize: 13, marginBottom: 8 },
  statValue: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 28 },

  // Redemption card
  redemptionCard: {
    backgroundColor: COLORS.card, borderRadius: 14,
    padding: 16, marginBottom: 12,
  },
  painterRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  painterAvatar: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: COLORS.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  painterName: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 16 },
  painterPhone: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 13 },
  divider: { height: 1, backgroundColor: COLORS.border, marginBottom: 12 },
  redemptionBottom: { flexDirection: 'row', justifyContent: 'space-between' },
  redemptionLabel: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 12, marginBottom: 4 },
  redemptionAmount: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 24 },
  redemptionDate: { color: '#22C55E', fontFamily: FONTS.semibold, fontSize: 14 },

  // Table
  tableHeader: {
    flexDirection: 'row', backgroundColor: 'rgba(255,193,7,0.2)',
    borderRadius: 10, paddingVertical: 12, paddingHorizontal: 14,
    marginBottom: 6,
  },
  tableHeaderCell: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 13 },
  tableRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.card, borderRadius: 10,
    paddingVertical: 14, paddingHorizontal: 14, marginBottom: 6,
  },
  tableRowAlt: { backgroundColor: '#252525' },
  tableCell: { color: COLORS.text, fontFamily: FONTS.regular, fontSize: 14 },
  viewLink: { color: COLORS.primary, fontFamily: FONTS.semibold, fontSize: 14 },
});
