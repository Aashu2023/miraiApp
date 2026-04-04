import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../../constants/theme';

const DESIGNATIONS = ['Manager', 'Sales Executive', 'Accountant', 'Supervisor', 'Other'];

export default function DelegateStep1() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '', lastName: '',
    phone: '', email: '',
    designation: '', employeeId: '',
  });
  const [designationOpen, setDesignationOpen] = useState(false);

  const update = (key: string, val: string) =>
    setForm(prev => ({ ...prev, [key]: val }));

  return (
    <SafeAreaView style={s.safe}>
      {/* Yellow Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Add Delegates</Text>
        <View style={s.headerRight}>
          <TouchableOpacity style={s.newArrivalBadge}>
            <Text style={s.newArrivalText}>✨ NEW{'\n'}arrival</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.iconBtn}>
            <Ionicons name="search" size={20} color={COLORS.background} />
          </TouchableOpacity>
          <TouchableOpacity style={s.iconBtn}>
            <Ionicons name="notifications-outline" size={20} color={COLORS.background} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={s.content} showsVerticalScrollIndicator={false}>
        {/* Step header */}
        <View style={s.stepHeader}>
          <View>
            <Text style={s.stepTitle}>Basic Information</Text>
            <Text style={s.stepSubtitle}>Enter delegate user details and select dealer</Text>
          </View>
          <View style={s.stepBadge}>
            <Text style={s.stepBadgeText}>Step 1 of 3</Text>
          </View>
        </View>

        {/* Form Card */}
        <View style={s.formCard}>
          {/* First + Last Name */}
          <View style={s.nameRow}>
            <View style={s.halfField}>
              <Text style={s.label}>First Name</Text>
              <TextInput
                style={s.input}
                placeholder="enter"
                placeholderTextColor={COLORS.textMuted}
                value={form.firstName}
                onChangeText={v => update('firstName', v)}
              />
            </View>
            <View style={s.halfField}>
              <Text style={s.label}>Last Name</Text>
              <TextInput
                style={s.input}
                placeholder="enter"
                placeholderTextColor={COLORS.textMuted}
                value={form.lastName}
                onChangeText={v => update('lastName', v)}
              />
            </View>
          </View>

          {/* Phone */}
          <Text style={s.label}>Phone Number</Text>
          <TextInput
            style={s.inputFull}
            placeholder="enter"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={v => update('phone', v)}
          />

          {/* Email */}
          <Text style={s.label}>Email Address</Text>
          <TextInput
            style={s.inputFull}
            placeholder="enter email"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={v => update('email', v)}
          />

          {/* Designation dropdown */}
          <Text style={s.label}>Designation</Text>
          <TouchableOpacity
            style={s.dropdown}
            onPress={() => setDesignationOpen(!designationOpen)}
          >
            <Text style={form.designation ? s.dropdownVal : s.dropdownPlaceholder}>
              {form.designation || 'Select'}
            </Text>
            <Ionicons name="chevron-down" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
          {designationOpen && (
            <View style={s.dropdownMenu}>
              {DESIGNATIONS.map(d => (
                <TouchableOpacity
                  key={d}
                  style={s.dropdownItem}
                  onPress={() => { update('designation', d); setDesignationOpen(false); }}
                >
                  <Text style={s.dropdownItemText}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Employee ID */}
          <Text style={s.label}>Employee ID</Text>
          <TextInput
            style={s.inputFull}
            placeholder="enter"
            placeholderTextColor={COLORS.textMuted}
            value={form.employeeId}
            onChangeText={v => update('employeeId', v)}
          />

          {/* Next Button */}
          <TouchableOpacity
            style={s.nextBtn}
            onPress={() => router.push('/settings/delegates/step2' as any)}
          >
            <Text style={s.nextBtnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.primary },
  header: {
    backgroundColor: COLORS.primary, flexDirection: 'row',
    alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 10,
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
    paddingHorizontal: 16, paddingTop: 20,
  },

  stepHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 20,
  },
  stepTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 22 },
  stepSubtitle: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 13, marginTop: 4 },
  stepBadge: {
    backgroundColor: 'rgba(255,193,7,0.2)', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 6,
    borderWidth: 1, borderColor: COLORS.primary,
  },
  stepBadgeText: { color: COLORS.primary, fontFamily: FONTS.bold, fontSize: 13 },

  formCard: {
    backgroundColor: COLORS.card, borderRadius: 16,
    padding: 16, marginBottom: 30,
  },

  nameRow: { flexDirection: 'row', gap: 12, marginBottom: 4 },
  halfField: { flex: 1 },

  label: {
    color: COLORS.text, fontFamily: FONTS.medium,
    fontSize: 14, marginBottom: 8, marginTop: 12,
  },
  input: {
    backgroundColor: COLORS.surface, borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 13,
    color: COLORS.text, fontFamily: FONTS.regular, fontSize: 14,
    borderWidth: 1, borderColor: COLORS.border,
  },
  inputFull: {
    backgroundColor: COLORS.surface, borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 13,
    color: COLORS.text, fontFamily: FONTS.regular, fontSize: 14,
    borderWidth: 1, borderColor: COLORS.border,
    marginBottom: 4,
  },

  dropdown: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: COLORS.surface, borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 14,
    borderWidth: 1, borderColor: COLORS.border, marginBottom: 4,
  },
  dropdownPlaceholder: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 14 },
  dropdownVal: { color: COLORS.text, fontFamily: FONTS.medium, fontSize: 14 },
  dropdownMenu: {
    backgroundColor: COLORS.card, borderRadius: 10,
    borderWidth: 1, borderColor: COLORS.border,
    marginBottom: 8, overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  dropdownItemText: { color: COLORS.text, fontFamily: FONTS.regular, fontSize: 14 },

  nextBtn: {
    backgroundColor: COLORS.primary, borderRadius: 12,
    paddingVertical: 16, alignItems: 'center', marginTop: 20,
  },
  nextBtnText: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 16 },
});
