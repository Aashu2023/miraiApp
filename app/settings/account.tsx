import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

const BUSINESS = [
  { label: 'Business Name',     value: 'Branch 1 – North Division' },
  { label: 'GSTIN',             value: '29XYZAB5678G2H6' },
  { label: 'Registration Date', value: '15 Jan 2023' },
  { label: 'Account Type',      value: 'Branch Account' },
];

const CONTACT = [
  { label: 'Primary Contact', value: 'Hiday' },
  { label: 'Phone',           value: '+91 98765 43210' },
  { label: 'Email',           value: 'hiday@branch1.com' },
  { label: 'Address',         value: '123 North Avenue, Andheri West, Mumbai, Maharashtra 400053' },
];

export default function AccountScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={s.safe}>
      {/* Yellow Header with avatar overlap */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Account</Text>
      </View>

      {/* Avatar centred — sits between header and sheet */}
      <View style={s.avatarWrapper}>
        <View style={s.avatarOuter}>
          <View style={s.avatar}>
            <Ionicons name="person" size={42} color={COLORS.textMuted} />
          </View>
          <TouchableOpacity style={s.cameraBtn}>
            <Ionicons name="camera" size={14} color={COLORS.background} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={s.content} showsVerticalScrollIndicator={false}>
        {/* spacer for avatar overlap */}
        <View style={{ height: 50 }} />

        <Text style={s.name}>Hiday</Text>
        <Text style={s.phone}>+91 98765 43210</Text>

        {/* Business Details */}
        <View style={s.sectionRow}>
          <Text style={s.sectionTitle}>Business Details</Text>
          <TouchableOpacity><Text style={s.editBtn}>Edit</Text></TouchableOpacity>
        </View>
        <View style={s.infoCard}>
          {BUSINESS.map((row, idx) => (
            <View key={row.label} style={[s.infoRow, idx < BUSINESS.length - 1 && s.infoRowBorder]}>
              <Text style={s.infoLabel}>{row.label}</Text>
              <Text style={s.infoValue}>{row.value}</Text>
            </View>
          ))}
        </View>

        {/* Contact Information */}
        <View style={s.sectionRow}>
          <Text style={s.sectionTitle}>Contact Information</Text>
          <TouchableOpacity><Text style={s.editBtn}>Edit</Text></TouchableOpacity>
        </View>
        <View style={s.infoCard}>
          {CONTACT.map((row, idx) => (
            <View key={row.label} style={[s.infoRow, idx < CONTACT.length - 1 && s.infoRowBorder]}>
              <Text style={s.infoLabel}>{row.label}</Text>
              <Text style={s.infoValue}>{row.value}</Text>
            </View>
          ))}
        </View>

        {/* Delegates */}
        <View style={s.sectionRow}>
          <Text style={s.sectionTitle}>Delegates</Text>
          <TouchableOpacity><Text style={s.editBtn}>Add</Text></TouchableOpacity>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.primary },
  header: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14, gap: 12,
  },
  backBtn: { padding: 4 },
  headerTitle: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 20 },

  avatarWrapper: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    zIndex: 10,
    marginBottom: -50,
  },
  avatarOuter: { position: 'relative' },
  avatar: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: COLORS.card,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 4, borderColor: COLORS.primary,
  },
  cameraBtn: {
    position: 'absolute', bottom: 4, right: 4,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: COLORS.surface,
  },

  content: {
    flex: 1, backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: 16, paddingTop: 0,
  },

  name: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 22, textAlign: 'center', marginBottom: 4 },
  phone: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 15, textAlign: 'center', marginBottom: 24 },

  sectionRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 10,
  },
  sectionTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 17 },
  editBtn: { color: COLORS.primary, fontFamily: FONTS.semibold, fontSize: 14 },

  infoCard: {
    backgroundColor: COLORS.card, borderRadius: 14,
    paddingHorizontal: 16, marginBottom: 22, overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', paddingVertical: 14,
  },
  infoRowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  infoLabel: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 14, flex: 1 },
  infoValue: {
    color: COLORS.text, fontFamily: FONTS.semibold, fontSize: 14,
    flex: 1.2, textAlign: 'right',
  },
});
