import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../constants/theme';

// Generate daily data for a month
function generateDailyData(month: string) {
  const days = 28;
  return Array.from({ length: days }, (_, i) => ({
    date: `${month} ${String(i + 1).padStart(2, '0')}`,
    amount: i === 0 ? '₹ 0' : i % 5 === 0 ? `₹ ${(i * 125).toLocaleString('en-IN')}` : '₹ 0',
    creditNote: i === 0 || i % 5 !== 0 ? '-' : `₹ ${(i * 10).toLocaleString('en-IN')}`,
    hasData: i % 5 === 0 && i !== 0,
  }));
}

export default function DailyDetailScreen() {
  const router = useRouter();
  const { month } = useLocalSearchParams<{ month: string }>();
  const dailyData = generateDailyData(month || 'Feb');

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
        <View style={s.titleRow}>
          <Text style={s.screenTitle}>Redemption History</Text>
          <TouchableOpacity style={s.calendarBtn}>
            <Ionicons name="calendar-outline" size={20} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* Table header */}
        <View style={s.tableHeader}>
          <Text style={[s.headerCell, { flex: 1.4 }]}>Date</Text>
          <Text style={[s.headerCell, { flex: 1.6 }]}>Amount</Text>
          <Text style={[s.headerCell, { flex: 1.8 }]}>Credit Note</Text>
          <Text style={[s.headerCell, { flex: 1 }]}>Action</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {dailyData.map((row, idx) => (
            <TouchableOpacity
              key={row.date}
              style={[s.tableRow, idx % 2 === 0 && s.tableRowAlt]}
              onPress={() => {
                if (row.hasData) {
                  router.push({
                    pathname: '/phygital/transaction-detail' as any,
                    params: { date: row.date, name: 'Raj Kumar', phone: '6369540369' },
                  });
                }
              }}
              activeOpacity={row.hasData ? 0.7 : 1}
            >
              <Text style={[s.cell, { flex: 1.4 }]}>{row.date}</Text>
              <Text style={[s.cell, { flex: 1.6 }]}>{row.amount}</Text>
              <Text style={[s.cell, { flex: 1.8 }]}>{row.creditNote}</Text>
              <Text style={[s.viewLink, { flex: 1 }]}>View</Text>
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

  titleRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 16,
  },
  screenTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 22 },
  calendarBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: 'center', alignItems: 'center',
  },

  tableHeader: {
    flexDirection: 'row', backgroundColor: 'rgba(255,193,7,0.2)',
    borderRadius: 10, paddingVertical: 14, paddingHorizontal: 12,
    marginBottom: 6,
  },
  headerCell: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 13 },

  tableRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.card, borderRadius: 10,
    paddingVertical: 14, paddingHorizontal: 12, marginBottom: 6,
  },
  tableRowAlt: { backgroundColor: '#252525' },
  cell: { color: COLORS.text, fontFamily: FONTS.regular, fontSize: 14 },
  viewLink: { color: COLORS.primary, fontFamily: FONTS.semibold, fontSize: 14 },
});
