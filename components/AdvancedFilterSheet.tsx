import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

// ── Types ────────────────────────────────────────────────

export type FilterVariant = 'invoice' | 'purchase';

interface FilterState {
  amountMin: string;
  amountMax: string;
  startDate: string;
  endDate: string;
  // invoice filters
  status: string[];
  // purchase / dashboard filters
  segment: string[];
  category: string[];
}

interface AdvancedFilterSheetProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  variant: FilterVariant;
}

const INVOICE_STATUSES = ['Paid', 'Over Due', 'Pending'];
const SEGMENTS = ['Premium', 'Mid Range', 'Economy'];
const CATEGORIES = ['Interior', 'Exterior', 'Putty', 'Enamel'];

function MultiSelectPills({
  options, selected, onToggle,
}: { options: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <View style={p.row}>
      {options.map(opt => {
        const active = selected.includes(opt);
        return (
          <TouchableOpacity
            key={opt}
            style={[p.pill, active && p.pillActive]}
            onPress={() => onToggle(opt)}
          >
            <Text style={[p.pillText, active && p.pillTextActive]}>{opt}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const p = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  pill: {
    paddingHorizontal: 18, paddingVertical: 11,
    borderRadius: 10, backgroundColor: COLORS.card,
  },
  pillActive: { backgroundColor: 'rgba(255,193,7,0.2)', borderWidth: 1.5, borderColor: COLORS.primary },
  pillText: { color: COLORS.text, fontFamily: FONTS.medium, fontSize: 14 },
  pillTextActive: { color: COLORS.primary, fontFamily: FONTS.bold },
});

// ── Main Component ───────────────────────────────────────

export default function AdvancedFilterSheet({
  visible, onClose, onApply, variant,
}: AdvancedFilterSheetProps) {
  const [filters, setFilters] = useState<FilterState>({
    amountMin: '', amountMax: '',
    startDate: '', endDate: '',
    status: ['Paid'],
    segment: ['Premium'],
    category: ['Interior'],
  });

  const resetAll = () => setFilters({
    amountMin: '', amountMax: '',
    startDate: '', endDate: '',
    status: [], segment: [], category: [],
  });

  const toggleItem = (key: 'status' | 'segment' | 'category', val: string) => {
    setFilters(prev => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val],
      };
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={s.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity style={s.backdrop} onPress={onClose} activeOpacity={1} />

        <View style={s.sheet}>
          {/* Handle */}
          <View style={s.handle} />

          {/* Header */}
          <View style={s.sheetHeader}>
            <Text style={s.sheetTitle}>Advanced Filters</Text>
            <TouchableOpacity onPress={resetAll}>
              <Text style={s.resetText}>Reset All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Amount Range */}
            <Text style={s.fieldLabel}>Amount Range</Text>
            <View style={s.rangeRow}>
              <TextInput
                style={s.rangeInput}
                placeholder="Min"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="numeric"
                value={filters.amountMin}
                onChangeText={v => setFilters(prev => ({ ...prev, amountMin: v }))}
              />
              <TextInput
                style={s.rangeInput}
                placeholder="Max"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="numeric"
                value={filters.amountMax}
                onChangeText={v => setFilters(prev => ({ ...prev, amountMax: v }))}
              />
            </View>

            {/* Date Range */}
            <Text style={s.fieldLabel}>Date Range</Text>
            <View style={s.rangeRow}>
              <TouchableOpacity style={s.dateInput}>
                <Text style={s.dateInputText}>
                  {filters.startDate || 'Start Date'}
                </Text>
                <Ionicons name="calendar" size={18} color={COLORS.textMuted} />
              </TouchableOpacity>
              <TouchableOpacity style={s.dateInput}>
                <Text style={s.dateInputText}>
                  {filters.endDate || 'End Date'}
                </Text>
                <Ionicons name="calendar" size={18} color={COLORS.textMuted} />
              </TouchableOpacity>
            </View>

            {/* Invoice variant — Status */}
            {variant === 'invoice' && (
              <>
                <Text style={s.fieldLabel}>Status</Text>
                <MultiSelectPills
                  options={INVOICE_STATUSES}
                  selected={filters.status}
                  onToggle={v => toggleItem('status', v)}
                />
              </>
            )}

            {/* Purchase / Dashboard variant — Segment + Category */}
            {variant === 'purchase' && (
              <>
                <Text style={s.fieldLabel}>Product Segment</Text>
                <MultiSelectPills
                  options={SEGMENTS}
                  selected={filters.segment}
                  onToggle={v => toggleItem('segment', v)}
                />
                <Text style={[s.fieldLabel, { marginTop: 20 }]}>Product Category</Text>
                <MultiSelectPills
                  options={CATEGORIES}
                  selected={filters.category}
                  onToggle={v => toggleItem('category', v)}
                />
              </>
            )}

            {/* Apply Button */}
            <TouchableOpacity
              style={s.applyBtn}
              onPress={() => { onApply(filters); onClose(); }}
            >
              <Text style={s.applyBtnText}>Apply Filter</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },

  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: 20, paddingBottom: 36, paddingTop: 12,
    maxHeight: '80%',
  },
  handle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: COLORS.border,
    alignSelf: 'center', marginBottom: 16,
  },
  sheetHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 22,
  },
  sheetTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 20 },
  resetText: { color: COLORS.primary, fontFamily: FONTS.semibold, fontSize: 14 },

  fieldLabel: {
    color: COLORS.text, fontFamily: FONTS.semibold,
    fontSize: 15, marginBottom: 12,
  },
  rangeRow: { flexDirection: 'row', gap: 12, marginBottom: 22 },
  rangeInput: {
    flex: 1, backgroundColor: COLORS.card, borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 14,
    color: COLORS.text, fontFamily: FONTS.regular, fontSize: 15,
    borderWidth: 1, borderColor: COLORS.border,
  },
  dateInput: {
    flex: 1, backgroundColor: COLORS.card, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: COLORS.border,
  },
  dateInputText: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 14 },

  applyBtn: {
    backgroundColor: COLORS.primary, borderRadius: 28,
    paddingVertical: 16, alignItems: 'center',
    marginTop: 28,
  },
  applyBtnText: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 16 },
});
