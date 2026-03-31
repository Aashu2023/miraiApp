import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

const { width } = Dimensions.get('window');

const QUICK_LINKS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'tv-outline' },
  { id: 'invoice', label: 'Invoice', icon: 'document-text-outline' },
  { id: 'complaints', label: 'Complaints', icon: 'headset-outline' },
  { id: 'statement', label: 'Statement', icon: 'card-outline' },
];

function MyBusinessTab() {
  const router = useRouter();
  const [period, setPeriod] = useState('YTD');

  const businessCards = [
    { label: 'Purchase', value: '₹1,00,000' },
    { label: 'Payment', value: '₹1,00,000' },
    { label: 'Credit Note', value: '₹1,00,000' },
    { label: 'Debit Note', value: '₹1,00,000' },
  ];

  return (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My Business</Text>
        <TouchableOpacity style={styles.periodPicker}>
          <Text style={styles.periodText}>{period}</Text>
          <Ionicons name="chevron-down" size={16} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardsGrid}>
        {businessCards.map(card => (
          <View key={card.label} style={styles.businessCard}>
            <View style={styles.cardTopRow}>
              <Text style={styles.cardLabel}>{card.label}</Text>
              <TouchableOpacity>
                <Ionicons name="open-outline" size={16} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardValue}>{card.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function MyAccountsTab() {
  return (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Outstanding</Text>
      <View style={styles.outstandingCard}>
        <View style={styles.outstandingTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.outstandingLabel}>Total Outstanding</Text>
            <Text style={styles.outstandingValue}>₹12.8L</Text>
            <Text style={styles.outstandingDate}>As of 19 Nov 2025, 11:30 AM</Text>
          </View>
          <View style={styles.payIcon}>
            <Ionicons name="cash-outline" size={24} color={COLORS.text} />
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.outstandingRow}>
          {[
            { label: 'Overdue', value: '₹4.2L', color: '#EF4444' },
            { label: 'Due Soon', value: '₹3.5L', color: '#F97316' },
            { label: 'Not Due', value: '₹5.1L', color: '#22C55E' },
          ].map(item => (
            <View key={item.label} style={styles.outstandingCol}>
              <Text style={styles.outstandingColLabel}>{item.label}</Text>
              <Text style={[styles.outstandingColValue, { color: item.color }]}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Over Due</Text>
      {/* Overdue items would go here */}
      <View style={styles.overdueCard}>
        <Text style={styles.overdueHint}>Overdue invoices will appear here</Text>
      </View>
    </ScrollView>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'business' | 'accounts'>('business');

  return (
    <SafeAreaView style={styles.safe}>
      {/* Yellow Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={22} color={COLORS.surface} />
            </View>
            <View>
              <Text style={styles.greeting}>Hello, Hiday!</Text>
              <Text style={styles.subGreeting}>Have a good day</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.newArrivalBadge}>
              <Text style={styles.newArrivalText}>✨ NEW{'\n'}arrival</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="search" size={22} color={COLORS.background} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={22} color={COLORS.background} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Banner */}
      <View style={styles.bannerContainer}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>STRONGEST{'\n'}TOUGHEST{'\n'}HARDEST</Text>
        </View>
        <View style={styles.bannerDots}>
          <View style={[styles.bannerDot, styles.bannerDotActive]} />
          <View style={styles.bannerDot} />
          <View style={styles.bannerDot} />
        </View>
      </View>

      {/* Dark Content Area */}
      <View style={styles.content}>
        {/* Quick Links */}
        <View style={styles.quickLinks}>
          {QUICK_LINKS.map(link => (
            <TouchableOpacity
              key={link.id}
              style={styles.quickLink}
              onPress={() => {
                if (link.id === 'dashboard') router.push('/(main)/dashboard');
              }}
            >
              <View style={styles.quickLinkIcon}>
                <Ionicons name={link.icon as any} size={24} color={COLORS.text} />
              </View>
              <Text style={styles.quickLinkLabel}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Toggle */}
        <View style={styles.tabToggle}>
          <TouchableOpacity
            style={[styles.toggleBtn, activeTab === 'business' && styles.toggleBtnActive]}
            onPress={() => setActiveTab('business')}
          >
            <Text style={[styles.toggleText, activeTab === 'business' && styles.toggleTextActive]}>
              My Business
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, activeTab === 'accounts' && styles.toggleBtnActive]}
            onPress={() => setActiveTab('accounts')}
          >
            <Text style={[styles.toggleText, activeTab === 'accounts' && styles.toggleTextActive]}>
              My Accounts
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'business' ? <MyBusinessTab /> : <MyAccountsTab />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.primary },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  greeting: { fontFamily: FONTS.bold, fontSize: 16, color: COLORS.background },
  subGreeting: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.background, opacity: 0.8 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  newArrivalBadge: {
    backgroundColor: '#8B5CF6',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  newArrivalText: { color: '#fff', fontFamily: FONTS.bold, fontSize: 9, textAlign: 'center' },
  iconBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },

  bannerContainer: { backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingBottom: 8 },
  banner: {
    height: 140,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  bannerText: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: 22,
    lineHeight: 28,
  },
  bannerDots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 8 },
  bannerDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(0,0,0,0.25)' },
  bannerDotActive: { backgroundColor: COLORS.background, width: 20 },

  content: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 20,
  },

  quickLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  quickLink: { alignItems: 'center', gap: 6 },
  quickLinkIcon: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: COLORS.card,
    justifyContent: 'center', alignItems: 'center',
  },
  quickLinkLabel: { color: COLORS.text, fontFamily: FONTS.medium, fontSize: 12 },

  tabToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    marginHorizontal: 16,
    padding: 4,
    marginBottom: 16,
  },
  toggleBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  toggleBtnActive: { backgroundColor: COLORS.primary },
  toggleText: { fontFamily: FONTS.semibold, fontSize: 14, color: COLORS.textMuted },
  toggleTextActive: { color: COLORS.background },

  tabContent: { flex: 1, paddingHorizontal: 16 },

  sectionHeader: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 12,
  },
  sectionTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 18 },
  periodPicker: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: COLORS.card, borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 6,
  },
  periodText: { color: COLORS.text, fontFamily: FONTS.medium, fontSize: 13 },

  cardsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingBottom: 20 },
  businessCard: {
    width: (width - 32 - 12) / 2,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
  },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  cardLabel: { color: COLORS.textSecondary, fontFamily: FONTS.medium, fontSize: 13 },
  cardValue: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 22 },

  outstandingCard: {
    backgroundColor: COLORS.card, borderRadius: 14, padding: 16, marginBottom: 8,
  },
  outstandingTop: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  outstandingLabel: { color: COLORS.textSecondary, fontFamily: FONTS.medium, fontSize: 13 },
  outstandingValue: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 32, marginVertical: 4 },
  outstandingDate: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 12 },
  payIcon: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: COLORS.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  divider: { height: 1, backgroundColor: COLORS.border, marginBottom: 12 },
  outstandingRow: { flexDirection: 'row', justifyContent: 'space-between' },
  outstandingCol: { alignItems: 'flex-start' },
  outstandingColLabel: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 12, marginBottom: 4 },
  outstandingColValue: { fontFamily: FONTS.bold, fontSize: 18 },

  overdueCard: {
    backgroundColor: COLORS.card, borderRadius: 14, padding: 20,
    alignItems: 'center',
  },
  overdueHint: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 14 },
});
