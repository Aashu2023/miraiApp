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

// ── Edit Modal ──────────────────────────────────────────────────────────
function EditModal({
  visible, title, fields, onClose, onSave,
}: {
  visible: boolean;
  title: string;
  fields: { label: string; value: string; key: string }[];
  onClose: () => void;
  onSave: (data: Record<string, string>) => void;
}) {
  const [form, setForm] = useState<Record<string, string>>(
    Object.fromEntries(fields.map(f => [f.key, f.value]))
  );

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={m.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={m.sheet}>
          {/* Handle */}
          <View style={m.handle} />

          {/* Header */}
          <View style={m.header}>
            <Text style={m.title}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={m.closeBtn}>
              <Ionicons name="close" size={20} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {fields.map(f => (
              <View key={f.key} style={m.fieldBlock}>
                <Text style={m.fieldLabel}>{f.label}</Text>
                <TextInput
                  style={m.input}
                  value={form[f.key]}
                  onChangeText={v => setForm(prev => ({ ...prev, [f.key]: v }))}
                  placeholderTextColor={COLORS.textMuted}
                  multiline={f.label === 'Address'}
                  numberOfLines={f.label === 'Address' ? 3 : 1}
                />
              </View>
            ))}

            <View style={m.btnRow}>
              <TouchableOpacity style={m.cancelBtn} onPress={onClose}>
                <Text style={m.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={m.saveBtn}
                onPress={() => { onSave(form); onClose(); }}
              >
                <Text style={m.saveText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const m = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 20, paddingBottom: 36, maxHeight: '85%',
  },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: COLORS.border, alignSelf: 'center', marginBottom: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 20 },
  closeBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: COLORS.card, justifyContent: 'center', alignItems: 'center' },
  fieldBlock: { marginBottom: 16 },
  fieldLabel: { color: COLORS.text, fontFamily: FONTS.medium, fontSize: 14, marginBottom: 8 },
  input: {
    backgroundColor: COLORS.card, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 13,
    color: COLORS.text, fontFamily: FONTS.regular, fontSize: 15,
    borderWidth: 1, borderColor: COLORS.border,
  },
  btnRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
  cancelBtn: { flex: 1, backgroundColor: COLORS.card, borderRadius: 12, paddingVertical: 15, alignItems: 'center' },
  cancelText: { color: COLORS.text, fontFamily: FONTS.semibold, fontSize: 15 },
  saveBtn: { flex: 1, backgroundColor: COLORS.primary, borderRadius: 12, paddingVertical: 15, alignItems: 'center' },
  saveText: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 15 },
});

// ── Main Screen ─────────────────────────────────────────────────────────
export default function AccountScreen() {
  const router = useRouter();

  // Editable state
  const [business, setBusiness] = useState({
    businessName: 'Branch 1 – North Division',
    gstin: '29XYZAB5678G2H6',
    registrationDate: '15 Jan 2023',
    accountType: 'Branch Account',
  });

  const [contact, setContact] = useState({
    primaryContact: 'Hiday',
    phone: '+91 98765 43210',
    email: 'hiday@branch1.com',
    address: '123 North Avenue, Andheri West, Mumbai, Maharashtra 400053',
  });

  const [delegates, setDelegates] = useState<{ name: string; role: string }[]>([]);

  // Modal visibility
  const [editBusiness, setEditBusiness] = useState(false);
  const [editContact, setEditContact] = useState(false);
  const [addDelegate, setAddDelegate] = useState(false);
  const [delegateName, setDelegateName] = useState('');
  const [delegateRole, setDelegateRole] = useState('');

  const businessFields = [
    { label: 'Business Name',     key: 'businessName',     value: business.businessName },
    { label: 'GSTIN',             key: 'gstin',            value: business.gstin },
    { label: 'Registration Date', key: 'registrationDate', value: business.registrationDate },
    { label: 'Account Type',      key: 'accountType',      value: business.accountType },
  ];

  const contactFields = [
    { label: 'Primary Contact', key: 'primaryContact', value: contact.primaryContact },
    { label: 'Phone',           key: 'phone',          value: contact.phone },
    { label: 'Email',           key: 'email',          value: contact.email },
    { label: 'Address',         key: 'address',        value: contact.address },
  ];

  const businessRows = [
    { label: 'Business Name',     value: business.businessName },
    { label: 'GSTIN',             value: business.gstin },
    { label: 'Registration Date', value: business.registrationDate },
    { label: 'Account Type',      value: business.accountType },
  ];

  const contactRows = [
    { label: 'Primary Contact', value: contact.primaryContact },
    { label: 'Phone',           value: contact.phone },
    { label: 'Email',           value: contact.email },
    { label: 'Address',         value: contact.address },
  ];

  return (
    <SafeAreaView style={s.safe}>
      {/* Yellow Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Account</Text>
      </View>

      {/* Avatar overlapping header / sheet boundary */}
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
        <View style={{ height: 50 }} />
        <Text style={s.name}>{contact.primaryContact}</Text>
        <Text style={s.phone}>{contact.phone}</Text>

        {/* ── Business Details ── */}
        <View style={s.sectionRow}>
          <Text style={s.sectionTitle}>Business Details</Text>
          {/* ← WIRED: opens edit modal */}
          <TouchableOpacity onPress={() => setEditBusiness(true)}>
            <Text style={s.editBtn}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={s.infoCard}>
          {businessRows.map((row, idx) => (
            <View key={row.label} style={[s.infoRow, idx < businessRows.length - 1 && s.infoRowBorder]}>
              <Text style={s.infoLabel}>{row.label}</Text>
              <Text style={s.infoValue}>{row.value}</Text>
            </View>
          ))}
        </View>

        {/* ── Contact Information ── */}
        <View style={s.sectionRow}>
          <Text style={s.sectionTitle}>Contact Information</Text>
          {/* ← WIRED: opens edit modal */}
          <TouchableOpacity onPress={() => setEditContact(true)}>
            <Text style={s.editBtn}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={s.infoCard}>
          {contactRows.map((row, idx) => (
            <View key={row.label} style={[s.infoRow, idx < contactRows.length - 1 && s.infoRowBorder]}>
              <Text style={s.infoLabel}>{row.label}</Text>
              <Text style={s.infoValue}>{row.value}</Text>
            </View>
          ))}
        </View>

        {/* ── Delegates ── */}
        <View style={s.sectionRow}>
          <Text style={s.sectionTitle}>Delegates</Text>
          {/* ← WIRED: opens add delegate modal */}
          <TouchableOpacity onPress={() => setAddDelegate(true)}>
            <Text style={s.editBtn}>Add</Text>
          </TouchableOpacity>
        </View>

        {delegates.length === 0 ? (
          <TouchableOpacity style={s.emptyDelegates} onPress={() => setAddDelegate(true)}>
            <Ionicons name="person-add-outline" size={28} color={COLORS.textMuted} />
            <Text style={s.emptyDelegatesText}>No delegates added yet</Text>
            <Text style={s.emptyDelegatesSub}>Tap "Add" to grant access to team members</Text>
          </TouchableOpacity>
        ) : (
          <View style={s.infoCard}>
            {delegates.map((d, idx) => (
              <View key={idx} style={[s.infoRow, idx < delegates.length - 1 && s.infoRowBorder]}>
                <View style={s.delegateAvatar}>
                  <Text style={s.delegateInitial}>{d.name[0]}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={s.infoValue}>{d.name}</Text>
                  <Text style={s.infoLabel}>{d.role}</Text>
                </View>
                <TouchableOpacity onPress={() => setDelegates(prev => prev.filter((_, i) => i !== idx))}>
                  <Ionicons name="trash-outline" size={18} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ── Edit Business Modal ── */}
      <EditModal
        visible={editBusiness}
        title="Edit Business Details"
        fields={businessFields}
        onClose={() => setEditBusiness(false)}
        onSave={(data) => setBusiness({
          businessName: data.businessName,
          gstin: data.gstin,
          registrationDate: data.registrationDate,
          accountType: data.accountType,
        })}
      />

      {/* ── Edit Contact Modal ── */}
      <EditModal
        visible={editContact}
        title="Edit Contact Information"
        fields={contactFields}
        onClose={() => setEditContact(false)}
        onSave={(data) => setContact({
          primaryContact: data.primaryContact,
          phone: data.phone,
          email: data.email,
          address: data.address,
        })}
      />

      {/* ── Add Delegate Modal ── */}
      <Modal visible={addDelegate} animationType="slide" transparent onRequestClose={() => setAddDelegate(false)}>
        <KeyboardAvoidingView
          style={m.overlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={m.sheet}>
            <View style={m.handle} />
            <View style={m.header}>
              <Text style={m.title}>Add Delegate</Text>
              <TouchableOpacity onPress={() => setAddDelegate(false)} style={m.closeBtn}>
                <Ionicons name="close" size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <View style={m.fieldBlock}>
              <Text style={m.fieldLabel}>Full Name</Text>
              <TextInput
                style={m.input}
                placeholder="Enter full name"
                placeholderTextColor={COLORS.textMuted}
                value={delegateName}
                onChangeText={setDelegateName}
              />
            </View>
            <View style={m.fieldBlock}>
              <Text style={m.fieldLabel}>Role / Designation</Text>
              <TextInput
                style={m.input}
                placeholder="e.g. Sales Manager"
                placeholderTextColor={COLORS.textMuted}
                value={delegateRole}
                onChangeText={setDelegateRole}
              />
            </View>

            <TouchableOpacity
              style={s.addDelegateFullBtn}
              onPress={() => {
                if (!delegateName.trim()) return;
                setDelegates(prev => [...prev, { name: delegateName.trim(), role: delegateRole.trim() || 'Delegate' }]);
                setDelegateName('');
                setDelegateRole('');
                setAddDelegate(false);
              }}
            >
              <Ionicons name="person-add-outline" size={18} color={COLORS.background} />
              <Text style={s.addDelegateFullBtnText}>Add Delegate</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={s.fullViewDelegatesBtn}
              onPress={() => {
                setAddDelegate(false);
                router.push('/settings/delegates/step1' as any);
              }}
            >
              <Text style={s.fullViewDelegatesBtnText}>Full Setup (Step-by-step) →</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.primary },
  header: { backgroundColor: COLORS.primary, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  backBtn: { padding: 4 },
  headerTitle: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 20 },

  avatarWrapper: { backgroundColor: COLORS.primary, alignItems: 'center', zIndex: 10, marginBottom: -50 },
  avatarOuter: { position: 'relative' },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.card, justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: COLORS.primary },
  cameraBtn: { position: 'absolute', bottom: 4, right: 4, width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: COLORS.surface },

  content: { flex: 1, backgroundColor: COLORS.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 16 },

  name: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 22, textAlign: 'center', marginBottom: 4 },
  phone: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 15, textAlign: 'center', marginBottom: 24 },

  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 17 },
  editBtn: { color: COLORS.primary, fontFamily: FONTS.semibold, fontSize: 14 },

  infoCard: { backgroundColor: COLORS.card, borderRadius: 14, paddingHorizontal: 16, marginBottom: 22, overflow: 'hidden' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingVertical: 14 },
  infoRowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  infoLabel: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 14, flex: 1 },
  infoValue: { color: COLORS.text, fontFamily: FONTS.semibold, fontSize: 14, flex: 1.2, textAlign: 'right' },

  emptyDelegates: { backgroundColor: COLORS.card, borderRadius: 14, padding: 24, alignItems: 'center', gap: 8, marginBottom: 22 },
  emptyDelegatesText: { color: COLORS.text, fontFamily: FONTS.semibold, fontSize: 15 },
  emptyDelegatesSub: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 13, textAlign: 'center' },

  delegateAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  delegateInitial: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 16 },

  addDelegateFullBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: COLORS.primary, borderRadius: 12, paddingVertical: 15, marginBottom: 10 },
  addDelegateFullBtnText: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 15 },
  fullViewDelegatesBtn: { alignItems: 'center', paddingVertical: 12 },
  fullViewDelegatesBtnText: { color: COLORS.primary, fontFamily: FONTS.semibold, fontSize: 14 },
});
