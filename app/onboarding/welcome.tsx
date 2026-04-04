import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, Dimensions, FlatList, Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Hi, welcome to mirai',
    subtitle: 'Where Your Business Meets Tomorrow.',
    mascotEmoji: '👋🎨',
    mascotBg: '#1a0a00',
    activeIndex: 0,
  },
  {
    id: '2',
    title: 'Everything You\nNeed, One Place',
    subtitle: 'Track purchases, payments, credit and debit notes in real time.',
    mascotEmoji: '💰📋',
    mascotBg: '#0a0a1a',
    activeIndex: 1,
  },
  {
    id: '3',
    title: 'Make Informed\nDecisions with Real-\nTime Business Visibility',
    subtitle: 'Clear insights help you act faster and plan better.',
    mascotEmoji: '📊📈',
    mascotBg: '#001a0a',
    activeIndex: 2,
  },
  {
    id: '4',
    title: "You're All Set!",
    subtitle: 'To manage the future of your business with Mirai',
    mascotEmoji: '✅🎉',
    mascotBg: '#0a1a00',
    activeIndex: 3,
    isLast: true,
  },
];

function MascotIllustration({ emoji, index }: { emoji: string; index: number }) {
  // Each slide shows a different decorative illustration using emoji + icons
  const illustrations = [
    // Slide 1 — waving mascot
    <View key="1" style={il.container}>
      <View style={il.glowOrange} />
      <View style={il.glowBlue} />
      <Text style={il.mainEmoji}>🤖</Text>
      <View style={il.badge}>
        <Text style={il.badgeText}>NIPPON PAINT</Text>
      </View>
    </View>,
    // Slide 2 — finance mascot
    <View key="2" style={il.container}>
      <View style={il.glowOrange} />
      <View style={[il.floatCard, { top: 80, left: 20 }]}>
        <Ionicons name="checkmark-circle" size={16} color="#22C55E" />
        <Text style={il.floatCardText}>DEBIT NOTE  ✓ $00.00</Text>
      </View>
      <View style={[il.floatCard, { top: 180, left: 10 }]}>
        <Ionicons name="checkmark-circle" size={16} color="#22C55E" />
        <Text style={il.floatCardText}>CREDIT NOTE  ✓ $00.00</Text>
      </View>
      <Text style={[il.mainEmoji, { fontSize: 90 }]}>🤖</Text>
      <Text style={il.moneyEmoji}>💵💵</Text>
    </View>,
    // Slide 3 — analytics mascot
    <View key="3" style={il.container}>
      <View style={il.glowOrange} />
      <View style={[il.floatCard, { top: 60, left: 10 }]}>
        <Text style={{ fontSize: 40 }}>📊</Text>
      </View>
      <View style={[il.floatCard, { top: 160, left: 60 }]}>
        <Text style={{ fontSize: 36 }}>📈</Text>
      </View>
      <View style={[il.floatCard, { top: 40, left: 160 }]}>
        <Ionicons name="mail" size={22} color="#EF4444" />
        <View style={il.alertDot} />
      </View>
      <Text style={[il.mainEmoji, { marginLeft: 60 }]}>🤖</Text>
    </View>,
    // Slide 4 — all set mascot
    <View key="4" style={il.container}>
      <View style={il.glowOrange} />
      <View style={il.glowBlue} />
      <Text style={{ fontSize: 80, marginTop: 20 }}>✅</Text>
      <Text style={[il.mainEmoji, { fontSize: 100 }]}>🤖</Text>
    </View>,
  ];
  return illustrations[index] || illustrations[0];
}

export default function WelcomeScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const goNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(prev => prev + 1);
    } else {
      router.push('/onboarding/language');
    }
  };

  const skip = () => router.push('/onboarding/language');

  const isLast = currentIndex === SLIDES.length - 1;

  return (
    <SafeAreaView style={s.safe}>
      {/* Nippon Paint logo top-right */}
      <View style={s.logoRow}>
        <View style={s.nipponLogo}>
          <View style={s.nipponBox}>
            <Text style={s.nipponN}>n</Text>
          </View>
          <View>
            <Text style={s.nipponText}>NIPPON{'\n'}PAINT</Text>
            <Text style={s.nipponTagline}>Inspired by you</Text>
          </View>
        </View>
      </View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onMomentumScrollEnd={e => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(idx);
        }}
        renderItem={({ item, index }) => (
          <View style={[s.slide, { width }]}>
            {/* MIRAI logo */}
            <View style={s.miraiLogo}>
              <View style={s.miraiM}>
                <Text style={s.miraiMText}>m</Text>
                <View style={s.miraiCrown}>
                  <Text style={{ fontSize: 14 }}>👑</Text>
                </View>
              </View>
              <Text style={s.miraiIRAI}>IRAI</Text>
            </View>

            {/* Illustration */}
            <View style={s.illustrationArea}>
              <MascotIllustration emoji={item.mascotEmoji} index={index} />
            </View>
          </View>
        )}
        style={s.flatList}
      />

      {/* Bottom content */}
      <View style={s.bottom}>
        <Text style={s.title}>{SLIDES[currentIndex].title}</Text>
        <Text style={s.subtitle}>{SLIDES[currentIndex].subtitle}</Text>

        {/* Step dots */}
        <View style={s.dotsRow}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                s.dot,
                i === currentIndex ? s.dotActive : s.dotInactive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={s.nextBtn} onPress={goNext}>
          <Text style={s.nextBtnText}>{isLast ? 'Get Started' : 'Next'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.skipBtn} onPress={skip}>
          <Text style={s.skipBtnText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const il = StyleSheet.create({
  container: {
    width: '100%', height: '100%',
    alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  glowOrange: {
    position: 'absolute', width: 200, height: 200,
    borderRadius: 100, backgroundColor: 'rgba(251,146,60,0.25)',
    bottom: 20, left: 60,
  },
  glowBlue: {
    position: 'absolute', width: 160, height: 160,
    borderRadius: 80, backgroundColor: 'rgba(59,130,246,0.2)',
    top: 10, right: 20,
  },
  mainEmoji: { fontSize: 110, zIndex: 2 },
  moneyEmoji: { fontSize: 40, position: 'absolute', bottom: 10, left: 20 },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4,
    marginTop: -10,
  },
  badgeText: { color: '#fff', fontSize: 11, fontFamily: FONTS.bold },
  floatCard: {
    position: 'absolute',
    backgroundColor: 'rgba(30,30,40,0.85)',
    borderRadius: 10, padding: 8,
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  floatCardText: { color: '#fff', fontSize: 11, fontFamily: FONTS.medium },
  alertDot: {
    position: 'absolute', top: -3, right: -3,
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: '#EF4444',
  },
});

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0D0500' },

  logoRow: {
    position: 'absolute', top: 50, right: 16, zIndex: 10,
  },
  nipponLogo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  nipponBox: {
    width: 32, height: 32, borderRadius: 4,
    backgroundColor: '#EF4444',
    justifyContent: 'center', alignItems: 'center',
  },
  nipponN: { color: '#fff', fontFamily: FONTS.bold, fontSize: 18 },
  nipponText: { color: '#fff', fontFamily: FONTS.bold, fontSize: 11, lineHeight: 14 },
  nipponTagline: { color: COLORS.primary, fontFamily: FONTS.regular, fontSize: 9 },

  flatList: { flex: 1 },
  slide: { height: height * 0.55, justifyContent: 'flex-end', paddingBottom: 0 },

  miraiLogo: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', paddingTop: 60, marginBottom: 16,
  },
  miraiM: { position: 'relative', marginRight: 2 },
  miraiMText: {
    color: '#EF4444', fontFamily: FONTS.bold, fontSize: 52,
    lineHeight: 56,
  },
  miraiCrown: { position: 'absolute', top: -10, left: 8 },
  miraiIRAI: { color: '#fff', fontFamily: FONTS.bold, fontSize: 52, lineHeight: 56 },

  illustrationArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottom: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    backgroundColor: '#0D0500',
  },
  title: {
    color: '#fff', fontFamily: FONTS.bold,
    fontSize: 28, lineHeight: 36, marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.65)',
    fontFamily: FONTS.regular, fontSize: 15,
    lineHeight: 22, marginBottom: 20,
  },
  dotsRow: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  dot: { height: 4, borderRadius: 2 },
  dotActive: { width: 32, backgroundColor: COLORS.primary },
  dotInactive: { width: 20, backgroundColor: 'rgba(255,255,255,0.25)' },

  nextBtn: {
    backgroundColor: COLORS.primary, borderRadius: 28,
    paddingVertical: 16, alignItems: 'center', marginBottom: 12,
  },
  nextBtnText: { color: '#000', fontFamily: FONTS.bold, fontSize: 16 },
  skipBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 28,
    paddingVertical: 16, alignItems: 'center',
  },
  skipBtnText: { color: '#fff', fontFamily: FONTS.semibold, fontSize: 16 },
});
