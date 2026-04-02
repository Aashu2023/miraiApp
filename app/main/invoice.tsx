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

const INVOICES = [
  {
    id: 'INV-2025-0342',
    status: 'Overdue',
    date: '15 Nov 2025',
    time: '10:30 AM',
    amount: '₹3,45,670',
    payment: '-',
    paymentColor: COLORS.textMuted,
    product: 'Premium Exterior',
    items: '8 items • 2,450L',
    orderId: 'ORD-2024-1156',
    cardBg: '#2D1A1A',
    statusBg: '#EF4444',
    statusColor: '#fff',
  },
  {
    id: 'INV-2025-0343',
    status: 'Paid',
    date: '16 Nov 2025',
    time: '11:00 AM',
    amount: '₹1,25,340',
    payment: '14 Nov 2025',
    paymentColor: '#22C55E',
    product: 'Classic Interior',
    items: '5 items • 1,150L',
    orderId: 'ORD-2024-1157',
    cardBg: COLORS.card,
    statusBg: '#22C55E',
    statusColor: '#fff',
  },
  {
    id: 'INV-2025-0344',
    status: 'Pending',
    date: '17 Nov 2025',
    time: '09:15 AM',
    amount: '₹2,80,000',
    payment: '-',
    paymentColor: COLORS.textMuted,
    product: 'Eco-Friendly Urban',
    items: '6 items • 1,800L',
    orderId: 'ORD-2024-1158',
    cardBg: COLORS.card,
    statusBg: '#F97316',
    statusColor: '#fff',
  },
];

export default function InvoiceScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filtered = INVOICES.filter(inv =>
    inv.id.toLowerCase().includes(search.toLowerCase()) ||
    inv.product.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Yellow Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invoice</Text>
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

      {/* Dark Content */}
      <View style={styles.content}>
        {/* Search + Actions Row */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={16} color={COLORS.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by Invoice No..."
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
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="download-outline" size={18} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          {/* Month Header */}
          <View style={styles.monthRow}>
            <Text style={styles.monthTitle}>November 2025</Text>
            <Text style={styles.monthCount}>18 invoices</Text>
          </View>

          {filtered.map(inv => (
            <View key={inv.id} style={[styles.invoiceCard, { backgroundColor: inv.cardBg }]}>
              {/* Top Row */}
              <View style={styles.cardTopRow}>
                <Text style={styles.invoiceId}>{inv.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: inv.statusBg }]}>
                  <Text style={[styles.statusText, { color: inv.statusColor }]}>{inv.status}</Text>
                </View>
              </View>

              {/* Date + Time */}
              <View style={styles.dateRow}>
                <View style={styles.dateBadge}>
                  <Ionicons name="calendar-outline" size={13} color={COLORS.textSecondary} />
                  <Text style={styles.dateText}>{inv.date}</Text>
                </View>
                <View style={styles.dateBadge}>
                  <Ionicons name="time-outline" size={13} color={COLORS.textSecondary} />
                  <Text style={styles.dateText}>{inv.time}</Text>
                </View>
              </View>

              {/* Amount + Payment */}
              <View style={styles.amountRow}>
                <View>
                  <Text style={styles.amountLabel}>Invoice Amount</Text>
                  <Text style={styles.amountValue}>{inv.amount}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.amountLabel}>Payment</Text>
                  <Text style={[styles.paymentValue, { color: inv.paymentColor }]}>
                    {inv.payment}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Product + Order */}
              <View style={styles.productRow}>
                <View style={styles.productIcon}>
                  <Ionicons name="color-palette-outline" size={18} color={COLORS.textMuted} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.productName}>{inv.product}</Text>
                  <Text style={styles.productItems}>{inv.items}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.orderLabel}>Order ID</Text>
                  <Text style={styles.orderId}>{inv.orderId}</Text>
                </View>
              </View>

              {/* Buttons */}
              <View style={styles.btnRow}>
                <TouchableOpacity style={styles.viewBtn}>
                  <Ionicons name="eye-outline" size={16} color={COLORS.text} />
                  <Text style={styles.viewBtnText}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.downloadBtn}>
                  <Ionicons name="download-outline" size={16} color={COLORS.background} />
                  <Text style={styles.downloadBtnText}>Download PDF</Text>
                </TouchableOpacity>
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

  content: {
    flex: 1, backgroundColor: COLORS.surface,
    paddingTop: 16,
  },

  searchRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, gap: 8, marginBottom: 16,
  },
  searchBox: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.card, borderRadius: 24,
    paddingHorizontal: 14, paddingVertical: 10, gap: 8,
  },
  searchInput: {
    flex: 1, color: COLORS.text,
    fontFamily: FONTS.regular, fontSize: 14,
  },
  actionBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: 'center', alignItems: 'center',
  },

  scroll: { flex: 1, paddingHorizontal: 16 },

  monthRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 14,
  },
  monthTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 20 },
  monthCount: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 14 },

  invoiceCard: {
    borderRadius: 16, padding: 16, marginBottom: 14,
  },

  cardTopRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 10,
  },
  invoiceId: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 16 },
  statusBadge: {
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4,
  },
  statusText: { fontFamily: FONTS.semibold, fontSize: 13 },

  dateRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  dateBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5,
  },
  dateText: { color: COLORS.textSecondary, fontFamily: FONTS.regular, fontSize: 13 },

  amountRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-end', marginBottom: 12,
  },
  amountLabel: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 12, marginBottom: 2 },
  amountValue: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 26 },
  paymentValue: { fontFamily: FONTS.semibold, fontSize: 15 },

  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.08)', marginBottom: 12 },

  productRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  productIcon: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.07)',
    justifyContent: 'center', alignItems: 'center',
  },
  productName: { color: COLORS.text, fontFamily: FONTS.semibold, fontSize: 14 },
  productItems: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 12 },
  orderLabel: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 12 },
  orderId: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 14 },

  btnRow: { flexDirection: 'row', gap: 10 },
  viewBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10, paddingVertical: 12,
  },
  viewBtnText: { color: COLORS.text, fontFamily: FONTS.semibold, fontSize: 14 },
  downloadBtn: {
    flex: 1.4, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 10, paddingVertical: 12,
  },
  downloadBtnText: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 14 },
});
