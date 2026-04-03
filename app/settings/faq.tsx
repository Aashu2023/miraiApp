import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    LayoutAnimation,
    SafeAreaView, ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

const FAQS = [
  {
    q: 'How long does resolution take?',
    a: 'Most complaints are resolved within 3–5 business days. Complex issues may take up to 10 business days. You will receive updates via SMS and email.',
  },
  {
    q: 'Can I track my complaint status?',
    a: 'Yes! Go to Complaints from the More menu. Each complaint shows its current status — Active, Pending, or Resolved — along with the complaint ID.',
  },
  {
    q: "What if I'm not satisfied?",
    a: 'If you are not satisfied with the resolution, you can reopen the complaint or escalate it by contacting our support team directly at support@mirai.com.',
  },
  {
    q: 'How do I raise a new complaint?',
    a: 'Navigate to More → Complaints, then tap the + button in the top right. Fill in the complaint type, description and attach any supporting documents.',
  },
  {
    q: 'What are the business hours for support?',
    a: 'Our support team is available Monday to Saturday, 9 AM to 6 PM IST. For urgent issues, use the emergency contact: 1800-XXX-XXXX.',
  },
];

export default function FAQScreen() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (idx: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => (prev === idx ? null : idx));
  };

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>FAQ</Text>
      </View>

      <ScrollView style={s.content} showsVerticalScrollIndicator={false}>
        <Text style={s.sectionTitle}>Frequently Asked</Text>

        {FAQS.map((faq, idx) => {
          const isOpen = expanded === idx;
          return (
            <TouchableOpacity
              key={idx}
              style={[s.faqCard, isOpen && s.faqCardOpen]}
              onPress={() => toggle(idx)}
              activeOpacity={0.8}
            >
              <View style={s.faqRow}>
                <Text style={s.question}>{faq.q}</Text>
                <Ionicons
                  name={isOpen ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={COLORS.textMuted}
                />
              </View>
              {isOpen && (
                <Text style={s.answer}>{faq.a}</Text>
              )}
            </TouchableOpacity>
          );
        })}
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

  content: {
    flex: 1, backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: 16, paddingTop: 24,
  },

  sectionTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 22, marginBottom: 18 },

  faqCard: {
    backgroundColor: COLORS.card, borderRadius: 14,
    padding: 16, marginBottom: 10,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  faqCardOpen: { borderColor: COLORS.primary },

  faqRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', gap: 12,
  },
  question: { flex: 1, color: COLORS.text, fontFamily: FONTS.medium, fontSize: 15 },
  answer: {
    color: COLORS.textSecondary, fontFamily: FONTS.regular,
    fontSize: 14, lineHeight: 20, marginTop: 12,
  },
});
