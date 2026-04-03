import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

export default function HelpScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Help</Text>
      </View>

      <View style={s.content}>
        <Text style={s.sectionTitle}>Need Help?</Text>

        {/* Contact Support */}
        <TouchableOpacity style={s.menuCard}>
          <View style={s.menuIcon}>
            <Ionicons name="headset-outline" size={22} color={COLORS.text} />
          </View>
          <View style={s.menuText}>
            <Text style={s.menuLabel}>Contact Support</Text>
            <Text style={s.menuSub}>Speak to our team</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
        </TouchableOpacity>

        {/* Policy Guidelines */}
        <TouchableOpacity style={s.menuCard}>
          <View style={s.menuIcon}>
            <Ionicons name="document-text-outline" size={22} color={COLORS.text} />
          </View>
          <View style={s.menuText}>
            <Text style={s.menuLabel}>Policy Guidelines</Text>
            <Text style={s.menuSub}>Complaint resolution policy</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
        </TouchableOpacity>

        {/* Immediate Help Card */}
        <View style={s.immediateCard}>
          <View style={s.immediateTop}>
            <View style={s.immediateIcon}>
              <Ionicons name="headset-outline" size={26} color={COLORS.textMuted} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.immediateTitle}>Need Immediate Help?</Text>
              <Text style={s.immediateDesc}>
                Our support team is available Monday to Saturday, 9 AM to 6 PM
              </Text>
            </View>
          </View>

          <View style={s.btnRow}>
            <TouchableOpacity style={s.callBtn}>
              <Ionicons name="call" size={16} color={COLORS.background} />
              <Text style={s.callBtnText}>Call Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.chatBtn}>
              <Ionicons name="chatbubble-outline" size={16} color={COLORS.text} />
              <Text style={s.chatBtnText}>Live Chat</Text>
            </TouchableOpacity>
          </View>

          <View style={s.contactRow}>
            <View style={s.contactItem}>
              <Ionicons name="mail-outline" size={14} color={COLORS.textMuted} />
              <Text style={s.contactText}>support@mirai.com</Text>
            </View>
            <View style={s.contactItem}>
              <Ionicons name="call-outline" size={14} color={COLORS.textMuted} />
              <Text style={s.contactText}>1800-XXX-XXXX</Text>
            </View>
          </View>
        </View>
      </View>
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

  content: {
    flex: 1, backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 20,
  },

  sectionTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 22, marginBottom: 18 },

  menuCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: COLORS.card, borderRadius: 14,
    padding: 16, marginBottom: 12,
  },
  menuIcon: {
    width: 44, height: 44, borderRadius: 10,
    backgroundColor: COLORS.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  menuText: { flex: 1 },
  menuLabel: { color: COLORS.text, fontFamily: FONTS.semibold, fontSize: 15 },
  menuSub: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 13, marginTop: 2 },

  immediateCard: {
    backgroundColor: COLORS.card, borderRadius: 14, padding: 16, marginTop: 4,
  },
  immediateTop: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  immediateIcon: {
    width: 50, height: 50, borderRadius: 25,
    backgroundColor: COLORS.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  immediateTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 16, marginBottom: 4 },
  immediateDesc: { color: COLORS.textSecondary, fontFamily: FONTS.regular, fontSize: 13, lineHeight: 18 },

  btnRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  callBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8,
    backgroundColor: COLORS.primary, borderRadius: 10, paddingVertical: 13,
  },
  callBtnText: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 15 },
  chatBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8,
    backgroundColor: COLORS.surface, borderRadius: 10, paddingVertical: 13,
  },
  chatBtnText: { color: COLORS.text, fontFamily: FONTS.semibold, fontSize: 15 },

  contactRow: { flexDirection: 'row', justifyContent: 'space-between' },
  contactItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  contactText: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 13 },
});
