import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../constants/theme';

const TRANSACTIONS = [
  {
    id: '1',
    name: 'Raj Kumar',
    phone: '6369540369',
    scannedAmount: '₹500.00',
    handlingFee: '₹25.00',
    totalAmount: '₹525.00',
  },
  {
    id: '2',
    name: 'Anita Sharma',
    phone: '9876543210',
    scannedAmount: '₹750.00',
    handlingFee: '₹30.00',
    totalAmount: '₹780.00',
  },
  {
    id: '3',
    name: 'Vikram Singh',
    phone: '5551234567',
    scannedAmount: '₹1000.00',
    handlingFee: '₹40.00',
    totalAmount: '₹1040.00',
  },
];

export default function TransactionDetailScreen() {
  const router = useRouter();
  const { date } = useLocalSearchParams<{ date: string }>();

  return (
    <SafeAreaView style={s.safe}>
      {/* Yellow Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Phygital</Text>
      </View>

      {/* Dark sheet */}
      <View style={s.content}>
        <Text style={s.dateTitle}>{date || 'Feb 01, 2025'}</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {TRANSACTIONS.map(tx => (
            <TouchableOpacity
              key={tx.id}
              style={s.txCard}
              onPress={() => router.push({
                pathname: '/phygital/painter-detail' as any,
                params: { name: tx.name, phone: tx.phone, date: date || 'Feb 01, 2025' },
              })}
            >
              {/* Painter info */}
              <View style={s.painterRow}>
                <View style={s.avatar}>
                  <Ionicons name="person" size={22} color={COLORS.textMuted} />
                </View>
                <View>
                  <Text style={s.painterName}>{tx.name}</Text>
                  <Text style={s.painterPhone}>{tx.phone}</Text>
                </View>
              </View>

              <View style={s.divider} />

              {/* Amounts */}
              <View style={s.amountsRow}>
                <View style={s.amountBlock}>
                  <Text style={s.amountLabel}>Scanned Amount</Text>
                  <Text style={s.amountValue}>{tx.scannedAmount}</Text>
                </View>
                <View style={s.amountBlock}>
                  <Text style={s.amountLabel}>Handlin Fee</Text>
                  <Text style={s.amountValue}>{tx.handlingFee}</Text>
                </View>
                <View style={s.amountBlock}>
                  <Text style={s.amountLabel}>Total Amount</Text>
                  <Text style={s.amountValue}>{tx.totalAmount}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
    padding: 16,
  },

  dateTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 22, marginBottom: 16 },

  txCard: {
    backgroundColor: COLORS.card, borderRadius: 14,
    padding: 16, marginBottom: 12,
  },
  painterRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  avatar: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: COLORS.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  painterName: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 16 },
  painterPhone: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 13 },
  divider: { height: 1, backgroundColor: COLORS.border, marginBottom: 14 },

  amountsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  amountBlock: { alignItems: 'flex-start' },
  amountLabel: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 11, marginBottom: 4 },
  amountValue: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 15 },
});
