import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

const COMPLAINTS = [
  {
    id: 'CMP-2024-156',
    type: 'Credit Note Issue',
    status: 'Pending',
    statusColor: '#F97316',
    statusBg: 'rgba(249,115,22,0.15)',
    date: '12 Nov 2025',
    title: 'Credit Note Discrepancy',
    desc: 'Credit note amount for invoice INV-2024-0338 shows ₹45,000 but actual return value was ₹52,000. Requesting correction and reissue of credit note.',
    invoiceRef: 'INV-2024-0338',
  },
  {
    id: 'CMP-2024-157',
    type: 'Invoice Adjustment',
    status: 'Active',
    statusColor: '#22C55E',
    statusBg: 'rgba(34,197,94,0.15)',
    date: '15 Nov 2025',
    title: 'Invoice Discrepancy',
    desc: 'Adjustment requested for invoice INV-2024-0340 where the payment received differs from the expected amount due to a discount not applied.',
    invoiceRef: null,
  },
  {
    id: 'CMP-2024-155',
    type: 'Delivery Issue',
    status: 'Resolved',
    statusColor: '#3B82F6',
    statusBg: 'rgba(59,130,246,0.15)',
    date: '10 Nov 2025',
    title: 'Short Delivery',
    desc: 'Order ORD-2024-1142 was delivered with 3 cans missing from the total of 24 cans ordered.',
    invoiceRef: 'ORD-2024-1142',
  },
];

const COMPLAINT_TYPES = [
  'Credit Note Issue',
  'Invoice Adjustment',
  'Delivery Issue',
  'Payment Discrepancy',
  'Product Quality',
  'Other',
];

type FilterType = 'All' | 'Active' | 'Pending' | 'Resolved';

function RaiseComplaintModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [typeOpen, setTypeOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [invoiceRef, setInvoiceRef] = useState('');
  const [description, setDescription] = useState('');
  const [notify, setNotify] = useState(true);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.modalSheet}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Raise New Complaint</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Complaint Type */}
            <Text style={styles.fieldLabel}>
              Complaint Type<Text style={{ color: '#EF4444' }}>*</Text>
            </Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setTypeOpen(!typeOpen)}
            >
              <Text style={selectedType ? styles.dropdownValue : styles.dropdownPlaceholder}>
                {selectedType || 'Select complaint type'}
              </Text>
              <Ionicons name="chevron-down" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
            {typeOpen && (
              <View style={styles.dropdownMenu}>
                {COMPLAINT_TYPES.map(t => (
                  <TouchableOpacity
                    key={t}
                    style={styles.dropdownItem}
                    onPress={() => { setSelectedType(t); setTypeOpen(false); }}
                  >
                    <Text style={styles.dropdownItemText}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Invoice / Order Number */}
            <Text style={[styles.fieldLabel, { marginTop: 16 }]}>
              Related Invoice/Order Number
            </Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., INV-2024-0342 or ORD-2024-892"
              placeholderTextColor={COLORS.textMuted}
              value={invoiceRef}
              onChangeText={setInvoiceRef}
            />

            {/* Description */}
            <Text style={[styles.fieldLabel, { marginTop: 16 }]}>
              Complaint Description<Text style={{ color: '#EF4444' }}>*</Text>
            </Text>
            <TextInput
              style={styles.textArea}
              placeholder="Please provide detailed information about your complaint..."
              placeholderTextColor={COLORS.textMuted}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
            <Text style={styles.charHint}>Minimum 20 characters required</Text>

            {/* Attach Documents */}
            <Text style={[styles.fieldLabel, { marginTop: 16 }]}>
              Attach Supporting Documents
            </Text>
            <TouchableOpacity style={styles.uploadBox}>
              <Ionicons name="cloud-upload-outline" size={36} color={COLORS.textMuted} />
              <Text style={styles.uploadText}>Click to upload or drag and drop</Text>
              <Text style={styles.uploadHint}>PDF, JPG, PNG up to 5MB</Text>
            </TouchableOpacity>

            {/* Notification Toggle */}
            <TouchableOpacity
              style={styles.notifyRow}
              onPress={() => setNotify(!notify)}
            >
              <View style={[styles.checkbox, notify && styles.checkboxActive]}>
                {notify && <Ionicons name="checkmark" size={13} color="#fff" />}
              </View>
              <Text style={styles.notifyText}>
                Send me email and SMS notifications about this complaint
              </Text>
            </TouchableOpacity>

            {/* Buttons */}
            <View style={styles.modalBtnRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                <Ionicons name="close" size={16} color={COLORS.text} />
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitBtn}>
                <Ionicons name="send-outline" size={16} color={COLORS.background} />
                <Text style={styles.submitBtnText}>Submit Complaint</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default function ComplaintsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>('All');
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const filtered = COMPLAINTS.filter(c => {
    const matchFilter = filter === 'All' || c.status === filter;
    const matchSearch = c.type.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const FILTERS: FilterType[] = ['All', 'Active', 'Pending', 'Resolved'];

  return (
    <SafeAreaView style={styles.safe}>
      {/* Yellow Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complaints</Text>
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
        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[
            { label: 'Active', count: 3, icon: 'information-circle', iconColor: '#3B82F6' },
            { label: 'Pending', count: 5, icon: 'time', iconColor: '#F97316' },
            { label: 'Resolved', count: 28, icon: 'checkmark-circle', iconColor: '#22C55E' },
          ].map(s => (
            <View key={s.label} style={styles.statCard}>
              <View style={styles.statCardTop}>
                <Text style={styles.statCardLabel}>{s.label}</Text>
                <Ionicons name={s.icon as any} size={18} color={s.iconColor} />
              </View>
              <Text style={styles.statCardCount}>{s.count}</Text>
            </View>
          ))}
        </View>

        {/* Search + Add */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={16} color={COLORS.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search complaints..."
              placeholderTextColor={COLORS.textMuted}
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity style={styles.filterIconBtn}>
            <Ionicons name="funnel-outline" size={18} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add" size={22} color={COLORS.background} />
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterTabRow}>
          {FILTERS.map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.filterTab, filter === f && styles.filterTabActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterTabText, filter === f && styles.filterTabTextActive]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Complaint Cards */}
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          {filtered.map(c => (
            <View key={c.id} style={styles.complaintCard}>
              {/* Card Header */}
              <View style={styles.complaintHeader}>
                <Text style={styles.complaintType}>{c.type}</Text>
                <View style={[styles.statusBadge, { backgroundColor: c.statusBg }]}>
                  <Text style={[styles.statusText, { color: c.statusColor }]}>{c.status}</Text>
                </View>
              </View>

              {/* Date + ID */}
              <View style={styles.metaRow}>
                <View style={styles.metaBadge}>
                  <Ionicons name="calendar-outline" size={12} color={COLORS.textMuted} />
                  <Text style={styles.metaText}>{c.date}</Text>
                </View>
                <View style={styles.metaBadge}>
                  <Text style={styles.metaText}>{c.id}</Text>
                </View>
              </View>

              {/* Title + Desc */}
              <Text style={styles.complaintTitle}>{c.title}</Text>
              <Text style={styles.complaintDesc} numberOfLines={3}>{c.desc}</Text>

              {/* Invoice Ref */}
              {c.invoiceRef && (
                <View style={styles.invoiceRefBadge}>
                  <Ionicons name="document-text-outline" size={13} color={COLORS.textMuted} />
                  <Text style={styles.invoiceRefText}>{c.invoiceRef}</Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Raise Complaint Modal */}
      <RaiseComplaintModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
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

  statsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginBottom: 14 },
  statCard: {
    flex: 1, backgroundColor: COLORS.card,
    borderRadius: 12, padding: 12,
  },
  statCardTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  statCardLabel: { color: COLORS.textMuted, fontFamily: FONTS.medium, fontSize: 13 },
  statCardCount: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 26 },

  searchRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, gap: 8, marginBottom: 12,
  },
  searchBox: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.card, borderRadius: 24,
    paddingHorizontal: 14, paddingVertical: 10, gap: 8,
  },
  searchInput: { flex: 1, color: COLORS.text, fontFamily: FONTS.regular, fontSize: 14 },
  filterIconBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: COLORS.card,
    justifyContent: 'center', alignItems: 'center',
  },
  addBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center',
  },

  filterTabRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 12, marginHorizontal: 16,
    padding: 4, marginBottom: 14,
  },
  filterTab: { flex: 1, paddingVertical: 9, borderRadius: 8, alignItems: 'center' },
  filterTabActive: { backgroundColor: COLORS.primary },
  filterTabText: { color: COLORS.textMuted, fontFamily: FONTS.medium, fontSize: 13 },
  filterTabTextActive: { color: COLORS.background, fontFamily: FONTS.bold },

  scroll: { flex: 1, paddingHorizontal: 16 },

  complaintCard: {
    backgroundColor: COLORS.card, borderRadius: 14,
    padding: 16, marginBottom: 12,
  },
  complaintHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 10,
  },
  complaintType: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 16 },
  statusBadge: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  statusText: { fontFamily: FONTS.semibold, fontSize: 13 },

  metaRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  metaBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: COLORS.surface, borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 5,
  },
  metaText: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 12 },

  complaintTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 14, marginBottom: 6 },
  complaintDesc: { color: COLORS.textSecondary, fontFamily: FONTS.regular, fontSize: 13, lineHeight: 20, marginBottom: 10 },

  invoiceRefBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: COLORS.surface, borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  invoiceRefText: { color: COLORS.textMuted, fontFamily: FONTS.medium, fontSize: 13 },

  // Modal
  modalOverlay: {
    flex: 1, justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalSheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 20, maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 20,
  },
  modalTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 20 },
  closeBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: COLORS.card,
    justifyContent: 'center', alignItems: 'center',
  },

  fieldLabel: { color: COLORS.text, fontFamily: FONTS.medium, fontSize: 14, marginBottom: 8 },

  dropdown: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: COLORS.card, borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 14,
    borderWidth: 1, borderColor: COLORS.border,
  },
  dropdownPlaceholder: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 15 },
  dropdownValue: { color: COLORS.text, fontFamily: FONTS.medium, fontSize: 15 },
  dropdownMenu: {
    backgroundColor: COLORS.card, borderRadius: 12,
    marginTop: 4, borderWidth: 1, borderColor: COLORS.border,
    overflow: 'hidden',
  },
  dropdownItem: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  dropdownItemText: { color: COLORS.text, fontFamily: FONTS.regular, fontSize: 14 },

  input: {
    backgroundColor: COLORS.card, borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 14,
    color: COLORS.text, fontFamily: FONTS.regular, fontSize: 15,
    borderWidth: 1, borderColor: COLORS.border,
  },
  textArea: {
    backgroundColor: COLORS.card, borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 14,
    color: COLORS.text, fontFamily: FONTS.regular, fontSize: 15,
    borderWidth: 1, borderColor: COLORS.border,
    minHeight: 120,
  },
  charHint: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 12, marginTop: 6 },

  uploadBox: {
    borderWidth: 1.5, borderColor: COLORS.border, borderStyle: 'dashed',
    borderRadius: 12, padding: 24,
    alignItems: 'center', gap: 8, marginBottom: 16,
  },
  uploadText: { color: COLORS.text, fontFamily: FONTS.medium, fontSize: 14 },
  uploadHint: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 12 },

  notifyRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    gap: 12, marginBottom: 20,
  },
  checkbox: {
    width: 22, height: 22, borderRadius: 6,
    borderWidth: 2, borderColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center',
    marginTop: 1,
  },
  checkboxActive: { backgroundColor: COLORS.primary },
  notifyText: { flex: 1, color: COLORS.text, fontFamily: FONTS.regular, fontSize: 14, lineHeight: 20 },

  modalBtnRow: { flexDirection: 'row', gap: 10, paddingBottom: 10 },
  cancelBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 6,
    backgroundColor: COLORS.card, borderRadius: 12,
    paddingVertical: 15,
  },
  cancelBtnText: { color: COLORS.text, fontFamily: FONTS.semibold, fontSize: 15 },
  submitBtn: {
    flex: 1.5, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 6,
    backgroundColor: COLORS.primary, borderRadius: 12,
    paddingVertical: 15,
  },
  submitBtnText: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 15 },
});
