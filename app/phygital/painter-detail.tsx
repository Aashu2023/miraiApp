import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../constants/theme';

const PRODUCTS = [
  {
    id: '1',
    name: '20L Weatherbond 8 Quartz\nWBQ4/ WHT',
    amount: '₹100.00',
    schemeAmount: '₹0.00',
  },
  {
    id: '2',
    name: '30L Weatherbond 10 Quartz\nWBQ5/ WHT',
    amount: '₹150.00',
    schemeAmount: '₹0.00',
  },
  {
    id: '3',
    name: '50L Weatherbond 12 Quartz\nWBQ6/ WHT',
    amount: '₹200.00',
    schemeAmount: '₹0.00',
  },
  {
    id: '4',
    name: '10L Premium Emulsion\nPE10/ WHT',
    amount: '₹150.00',
    schemeAmount: '₹0.00',
  },
];

export default function PainterDetailScreen() {
  const router = useRouter();
  const { name, phone, date } = useLocalSearchParams<{
    name: string; phone: string; date: string;
  }>();

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
      <ScrollView style={s.content} showsVerticalScrollIndicator={false}>

        {/* Painter summary card */}
        <View style={s.painterCard}>
          <View style={s.painterCardTop}>
            <View>
              <Text style={s.painterCardLabel}>Painter Name</Text>
              <Text style={s.painterCardName}>{name || 'Raj Kumar'}</Text>
            </View>
            <TouchableOpacity style={s.docBtn}>
              <Ionicons name="document-text-outline" size={20} color={COLORS.background} />
            </TouchableOpacity>
          </View>

          <View style={s.painterAmountsRow}>
            <View style={s.painterAmountBox}>
              <Text style={s.painterAmountLabel}>Total Amount</Text>
              <Text style={s.painterAmountValue}>₹600.00</Text>
            </View>
            <View style={s.painterAmountBox}>
              <Text style={s.painterAmountLabel}>Total Scheme Amount</Text>
              <Text style={s.painterAmountValue}>₹0.00</Text>
            </View>
          </View>

          <Text style={s.dateText}>Date: <Text style={s.dateBold}>{date || 'Feb 01, 2025'}</Text></Text>
        </View>

        {/* Products section */}
        <Text style={s.productsTitle}>Products</Text>

        {PRODUCTS.map(product => (
          <View key={product.id} style={s.productCard}>
            <Text style={s.productName}>{product.name}</Text>
            <View style={s.productDivider} />
            <View style={s.productAmounts}>
              <View>
                <Text style={s.productAmountLabel}>Amount</Text>
                <Text style={s.productAmountValue}>{product.amount}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={s.productAmountLabel}>Scheme Amount</Text>
                <Text style={s.productAmountValue}>{product.schemeAmount}</Text>
              </View>
            </View>
          </View>
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>
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

  // Painter card
  painterCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 16, padding: 18, marginBottom: 24,
  },
  painterCardTop: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 16,
  },
  painterCardLabel: { color: COLORS.background, fontFamily: FONTS.regular, fontSize: 13, opacity: 0.8 },
  painterCardName: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 20, marginTop: 2 },
  docBtn: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  painterAmountsRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  painterAmountBox: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 10, padding: 12,
  },
  painterAmountLabel: { color: COLORS.background, fontFamily: FONTS.regular, fontSize: 12, opacity: 0.8, marginBottom: 6 },
  painterAmountValue: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 22 },
  dateText: { color: COLORS.background, fontFamily: FONTS.regular, fontSize: 13, opacity: 0.85 },
  dateBold: { fontFamily: FONTS.bold },

  // Products
  productsTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 20, marginBottom: 14 },
  productCard: {
    backgroundColor: COLORS.card, borderRadius: 14,
    padding: 16, marginBottom: 12,
  },
  productName: { color: COLORS.text, fontFamily: FONTS.semibold, fontSize: 15, marginBottom: 12 },
  productDivider: { height: 1, backgroundColor: COLORS.border, marginBottom: 12 },
  productAmounts: { flexDirection: 'row', justifyContent: 'space-between' },
  productAmountLabel: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 12, marginBottom: 4 },
  productAmountValue: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 18 },
});
