import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../../constants/theme';

type PermKey = 'view' | 'edit' | 'export';

interface SubModule {
  key: string;
  label: string;
  enabled: boolean;
  perms: Record<PermKey, boolean>;
}

interface Module {
  key: string;
  label: string;
  desc: string;
  expanded: boolean;
  subModules: SubModule[];
}

const INITIAL_MODULES: Module[] = [
  {
    key: 'sales',
    label: 'Sales & Analytics',
    desc: 'Dashboard, reports, and analytics',
    expanded: true,
    subModules: [
      { key: 'sales_dash', label: 'Sales Dashboard',    enabled: true,  perms: { view: true,  edit: false, export: true } },
      { key: 'analytics',  label: 'Analytics & Reports',enabled: true,  perms: { view: true,  edit: false, export: true } },
      { key: 'forecast',   label: 'Sales Forecasting',  enabled: false, perms: { view: false, edit: false, export: false } },
    ],
  },
  {
    key: 'finance',
    label: 'Finance & Invoicing',
    desc: 'Invoices, payments and transactions',
    expanded: true,
    subModules: [
      { key: 'invoices',  label: 'Invoices',               enabled: true,  perms: { view: true,  edit: false, export: true } },
      { key: 'payments',  label: 'Payments & Transactions', enabled: true,  perms: { view: true,  edit: false, export: true } },
      { key: 'fin_rep',   label: 'Financial Reports',       enabled: false, perms: { view: false, edit: false, export: false } },
      { key: 'credit',    label: 'Credit & Debit Note',     enabled: false, perms: { view: false, edit: false, export: false } },
      { key: 'tax',       label: 'Tax & Compliance',        enabled: false, perms: { view: false, edit: false, export: false } },
    ],
  },
  {
    key: 'orders',
    label: 'Orders & Purchases',
    desc: 'Purchase orders and tracking',
    expanded: false,
    subModules: [
      { key: 'orders_view', label: 'Order History',  enabled: true,  perms: { view: true,  edit: false, export: false } },
      { key: 'purchase',    label: 'Purchases',      enabled: false, perms: { view: false, edit: false, export: false } },
    ],
  },
];

function Checkbox({
  checked, onPress, color,
}: { checked: boolean; onPress: () => void; color?: string }) {
  return (
    <TouchableOpacity
      style={[chk.box, checked && { backgroundColor: color || COLORS.primary, borderColor: color || COLORS.primary }]}
      onPress={onPress}
    >
      {checked && <Ionicons name="checkmark" size={12} color="#000" />}
    </TouchableOpacity>
  );
}

const chk = StyleSheet.create({
  box: {
    width: 20, height: 20, borderRadius: 4,
    borderWidth: 1.5, borderColor: COLORS.border,
    justifyContent: 'center', alignItems: 'center',
  },
});

export default function DelegateStep2() {
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>(INITIAL_MODULES);

  const toggleExpand = (modKey: string) => {
    setModules(prev => prev.map(m =>
      m.key === modKey ? { ...m, expanded: !m.expanded } : m
    ));
  };

  const toggleSubModule = (modKey: string, subKey: string) => {
    setModules(prev => prev.map(m => {
      if (m.key !== modKey) return m;
      return {
        ...m, subModules: m.subModules.map(sub => {
          if (sub.key !== subKey) return sub;
          const newEnabled = !sub.enabled;
          return {
            ...sub, enabled: newEnabled,
            perms: newEnabled
              ? { view: true, edit: false, export: true }
              : { view: false, edit: false, export: false },
          };
        }),
      };
    }));
  };

  const togglePerm = (modKey: string, subKey: string, perm: PermKey) => {
    setModules(prev => prev.map(m => {
      if (m.key !== modKey) return m;
      return {
        ...m, subModules: m.subModules.map(sub => {
          if (sub.key !== subKey) return sub;
          return { ...sub, perms: { ...sub.perms, [perm]: !sub.perms[perm] } };
        }),
      };
    }));
  };

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
          <View style={{ flex: 1 }}>
            <Text style={s.stepTitle}>Module-Wise Access Control</Text>
            <Text style={s.stepSubtitle}>Fine-tune permissions for each module and feature</Text>
          </View>
          <View style={s.stepBadge}>
            <Text style={s.stepBadgeText}>Step 2 of 3</Text>
          </View>
        </View>

        {modules.map(mod => (
          <View key={mod.key} style={s.moduleBlock}>
            {/* Module Header */}
            <TouchableOpacity
              style={s.moduleHeader}
              onPress={() => toggleExpand(mod.key)}
            >
              <View style={s.moduleIconBox}>
                <Ionicons name="bar-chart-outline" size={18} color={COLORS.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.moduleTitle}>{mod.label}</Text>
                <Text style={s.moduleDesc}>{mod.desc}</Text>
              </View>
              <Ionicons
                name={mod.expanded ? 'chevron-up' : 'chevron-down'}
                size={20} color={COLORS.text}
              />
            </TouchableOpacity>

            {/* Sub-modules */}
            {mod.expanded && mod.subModules.map((sub, idx) => (
              <View
                key={sub.key}
                style={[
                  s.subRow,
                  idx < mod.subModules.length - 1 && s.subRowBorder,
                ]}
              >
                {/* Module toggle checkbox */}
                <Checkbox
                  checked={sub.enabled}
                  onPress={() => toggleSubModule(mod.key, sub.key)}
                />
                <Text style={[s.subLabel, !sub.enabled && s.subLabelDisabled]}>
                  {sub.label}
                </Text>

                {/* Permissions */}
                <View style={s.permsRow}>
                  {(['view', 'edit', 'export'] as PermKey[]).map(perm => (
                    <View key={perm} style={s.permItem}>
                      <Checkbox
                        checked={sub.perms[perm]}
                        onPress={() => sub.enabled && togglePerm(mod.key, sub.key, perm)}
                      />
                      <Text style={s.permLabel}>{perm.charAt(0).toUpperCase() + perm.slice(1)}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        ))}

        {/* Save Button */}
        <TouchableOpacity style={s.nextBtn} onPress={() => router.back()}>
          <Text style={s.nextBtnText}>Save & Continue</Text>
        </TouchableOpacity>
        <View style={{ height: 30 }} />
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

  content: { flex: 1, backgroundColor: COLORS.surface, paddingHorizontal: 16, paddingTop: 20 },

  stepHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 20, gap: 12,
  },
  stepTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 20 },
  stepSubtitle: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 13, marginTop: 4 },
  stepBadge: {
    backgroundColor: 'rgba(139,92,246,0.2)', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6,
    borderWidth: 1, borderColor: '#8B5CF6',
  },
  stepBadgeText: { color: '#8B5CF6', fontFamily: FONTS.bold, fontSize: 12 },

  moduleBlock: {
    backgroundColor: COLORS.card, borderRadius: 14,
    marginBottom: 12, overflow: 'hidden',
  },
  moduleHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: 'rgba(255,193,7,0.12)',
    paddingHorizontal: 14, paddingVertical: 14,
  },
  moduleIconBox: {
    width: 36, height: 36, borderRadius: 8,
    backgroundColor: 'rgba(255,193,7,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  moduleTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 15 },
  moduleDesc: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 12, marginTop: 2 },

  subRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 14, gap: 10,
    backgroundColor: COLORS.card,
  },
  subRowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  subLabel: { color: COLORS.text, fontFamily: FONTS.medium, fontSize: 13, flex: 1 },
  subLabelDisabled: { color: COLORS.textMuted },

  permsRow: { flexDirection: 'row', gap: 10 },
  permItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  permLabel: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 11 },

  nextBtn: {
    backgroundColor: COLORS.primary, borderRadius: 12,
    paddingVertical: 16, alignItems: 'center', marginTop: 8,
  },
  nextBtnText: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 16 },
});
