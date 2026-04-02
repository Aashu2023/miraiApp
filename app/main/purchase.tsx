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

const ORDERS = [
  {
    id: 'ORD-2025-1156',
    date: '15 Nov 2025',
    time: '10:30 AM',
    value: '₹13,45,670',
    volume: '2,568L',
    expanded: false,
  },
  {
    id: 'ORD-2025-1157',
    date: '16 Nov 2025',
    time: '11:15 AM',
    value: '₹7,89,320',
    volume: '1,234L',
    expanded: false,
  },
  {
    id: 'ORD-2025-1158',
    date: '17 Nov 2025',
    time: '3:00 PM',
    value: '₹4,20,000',
    volume: '980L',
    expanded: false,
  },
  {
    id: 'ORD-2025-1159',
    date: '18 Nov 2025',
    time: '9:00 AM',
    value: '₹6,50,000',
    volume: '1,450L',
    expanded: false,
  },
];

export default function PurchaseScreen() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = ORDERS.filter(o =>
    o.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Yellow Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Purchase</Text>
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

      <View style={styles.content}>
        {/* Search Row */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={16} color={COLORS.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by Order No..."
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

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <View>
              <Text style={styles.summaryLabel}>Total Purchase Value</Text>
              <Text style={styles.summaryValue}>₹45.8L</Text>
              <Text style={styles.summarySubLabel}>Year to Date Performance</Text>
            </View>
            <View style={styles.growthBadge}>
              <Text style={styles.growthText}>+12.5%</Text>
            </View>
          </View>
          <Text style={styles.vsText}>vs Last Period</Text>
        </View>

        {/* Orders List */}
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today</Text>
            <Text style={styles.sectionCount}>18 Orders</Text>
          </View>

          {filtered.map(order => {
            const isExpanded = expanded === order.id;
            return (
              <View key={order.id} style={styles.orderCard}>
                <TouchableOpacity
                  style={styles.orderTop}
                  onPress={() => setExpanded(isExpanded ? null : order.id)}
                >
                  <Text style={styles.orderId}>{order.id}</Text>
                  <View style={[styles.chevronBtn, isExpanded && styles.chevronBtnActive]}>
                    <Ionicons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={18}
                      color={COLORS.text}
                    />
                  </View>
                </TouchableOpacity>

                {/* Date + Time */}
                <View style={styles.dateRow}>
                  <View style={styles.dateBadge}>
                    <Ionicons name="calendar-outline" size={13} color={COLORS.textSecondary} />
                    <Text style={styles.dateText}>{order.date}</Text>
                  </View>
                  <View style={styles.dateBadge}>
                    <Ionicons name="time-outline" size={13} color={COLORS.textSecondary} />
                    <Text style={styles.dateText}>{order.time}</Text>
                  </View>
                </View>

                {/* Value + Volume */}
                <View style={styles.metricsRow}>
                  <View>
                    <Text style={styles.metricLabel}>Total Value</Text>
                    <Text style={styles.metricValue}>{order.value}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.metricLabel}>Total Volume</Text>
                    <Text style={styles.metricValueVolume}>{order.volume}</Text>
                  </View>
                </View>

                {/* Expanded Detail */}
                {isExpanded && (
                  <View style={styles.expandedSection}>
                    <View style={styles.divider} />
                    <View style={styles.expandedRow}>
                      <View style={styles.expandedItem}>
                        <Text style={styles.expandedLabel}>Products</Text>
                        <Text style={styles.expandedValue}>8 Items</Text>
                      </View>
                      <View style={styles.expandedItem}>
                        <Text style={styles.expandedLabel}>Status</Text>
                        <Text style={[styles.expandedValue, { color: '#22C55E' }]}>Delivered</Text>
                      </View>
                      <View style={styles.expandedItem}>
                        <Text style={styles.expandedLabel}>Invoice</Text>
                        <Text style={styles.expandedValue}>INV-0342</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.viewDetailBtn}>
                      <Text style={styles.viewDetailText}>View Full Details</Text>
                      <Ionicons name="arrow-forward" size={14} color={COLORS.primary} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
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

  content: { flex: 1, backgroundColor: COLORS.surface, paddingTop: 16 },

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
    backgroundColor: COLORS.card,
    justifyContent: 'center', alignItems: 'center',
  },

  summaryCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 16, marginHorizontal: 16,
    padding: 18, marginBottom: 16,
  },
  summaryTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  summaryLabel: { color: COLORS.background, fontFamily: FONTS.medium, fontSize: 14, opacity: 0.85 },
  summaryValue: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 34 },
  summarySubLabel: { color: COLORS.background, fontFamily: FONTS.regular, fontSize: 12, opacity: 0.7 },
  growthBadge: {
    backgroundColor: '#22C55E', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 5,
  },
  growthText: { color: '#fff', fontFamily: FONTS.bold, fontSize: 14 },
  vsText: { color: COLORS.background, fontFamily: FONTS.regular, fontSize: 12, opacity: 0.7, marginTop: 2 },

  scroll: { flex: 1, paddingHorizontal: 16 },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },
  sectionTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 20 },
  sectionCount: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 14 },

  orderCard: {
    backgroundColor: COLORS.card, borderRadius: 14,
    padding: 16, marginBottom: 12,
  },
  orderTop: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 10,
  },
  orderId: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 16 },
  chevronBtn: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: COLORS.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  chevronBtnActive: { backgroundColor: COLORS.primary },

  dateRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  dateBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: COLORS.surface, borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 5,
  },
  dateText: { color: COLORS.textSecondary, fontFamily: FONTS.regular, fontSize: 13 },

  metricsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  metricLabel: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 12, marginBottom: 2 },
  metricValue: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 22 },
  metricValueVolume: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 22 },

  divider: { height: 1, backgroundColor: COLORS.border, marginBottom: 12 },
  expandedSection: { marginTop: 12 },
  expandedRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  expandedItem: {},
  expandedLabel: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 12, marginBottom: 2 },
  expandedValue: { color: COLORS.text, fontFamily: FONTS.semibold, fontSize: 14 },
  viewDetailBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, borderWidth: 1, borderColor: COLORS.primary,
    borderRadius: 8, paddingVertical: 9,
  },
  viewDetailText: { color: COLORS.primary, fontFamily: FONTS.semibold, fontSize: 14 },
});
