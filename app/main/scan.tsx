import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Animated, Easing,
  SafeAreaView,
  StyleSheet,
  Text, TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

export default function ScanScreen() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const scanAnim = new Animated.Value(0);

  // Animate the scan line up and down
  useEffect(() => {
    if (scanning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanAnim, {
            toValue: 1, duration: 1800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scanAnim, {
            toValue: 0, duration: 1800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [scanning]);

  const scanLineY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 240],
  });

  // Simulate a QR scan after 2.5 seconds of "scanning"
  const handleStartScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
      // Navigate to Phygital dashboard after short delay
      setTimeout(() => {
        router.push('/phygital/dashboard' as any);
      }, 600);
    }, 2500);
  };

  return (
    <SafeAreaView style={s.safe}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Phygital</Text>
      </View>

      {/* Scanner area */}
      <View style={s.scanArea}>
        {/* Corner brackets */}
        <View style={s.frame}>
          {/* Top-left */}
          <View style={[s.corner, s.cornerTL]} />
          {/* Top-right */}
          <View style={[s.corner, s.cornerTR]} />
          {/* Bottom-left */}
          <View style={[s.corner, s.cornerBL]} />
          {/* Bottom-right */}
          <View style={[s.corner, s.cornerBR]} />

          {/* Camera viewfinder (simulated) */}
          <View style={s.viewfinder}>
            {scanned ? (
              <View style={s.successOverlay}>
                <Ionicons name="checkmark-circle" size={60} color="#22C55E" />
                <Text style={s.successText}>QR Scanned!</Text>
              </View>
            ) : scanning ? (
              <>
                {/* Animated scan line */}
                <Animated.View
                  style={[
                    s.scanLine,
                    { transform: [{ translateY: scanLineY }] },
                  ]}
                />
                <Text style={s.scanningText}>Scanning...</Text>
              </>
            ) : (
              <View style={s.idlePlaceholder}>
                <Ionicons name="qr-code-outline" size={60} color="rgba(255,255,255,0.3)" />
                <Text style={s.idleText}>Align QR code within frame</Text>
              </View>
            )}
          </View>
        </View>

        {/* Instruction */}
        {!scanned && (
          <Text style={s.instruction}>
            {scanning
              ? 'Hold steady while scanning...'
              : 'Point your camera at the Nippon Paint QR code'}
          </Text>
        )}
      </View>

      {/* Bottom buttons */}
      <View style={s.bottomBtns}>
        <TouchableOpacity
          style={s.cancelBtn}
          onPress={() => router.back()}
        >
          <Text style={s.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.nextBtn, scanning && s.nextBtnDisabled]}
          onPress={handleStartScan}
          disabled={scanning || scanned}
        >
          <Text style={s.nextBtnText}>
            {scanning ? 'Scanning...' : scanned ? 'Opening...' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const FRAME_SIZE = 260;

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0D0D0D' },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14, gap: 12,
  },
  backBtn: { padding: 4 },
  headerTitle: { color: '#fff', fontFamily: FONTS.bold, fontSize: 20 },

  scanArea: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
  },

  frame: {
    width: FRAME_SIZE + 40,
    height: FRAME_SIZE + 40,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Corner brackets
  corner: {
    position: 'absolute',
    width: 36, height: 36,
    borderColor: '#fff',
  },
  cornerTL: { top: 0, left: 0, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 8 },
  cornerTR: { top: 0, right: 0, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 8 },
  cornerBL: { bottom: 0, left: 0, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 8 },
  cornerBR: { bottom: 0, right: 0, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 8 },

  viewfinder: {
    width: FRAME_SIZE, height: FRAME_SIZE,
    backgroundColor: 'rgba(60,60,60,0.85)',
    borderRadius: 16, overflow: 'hidden',
    justifyContent: 'center', alignItems: 'center',
  },

  // Scan line
  scanLine: {
    position: 'absolute',
    left: 0, right: 0, height: 2,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 4,
  },
  scanningText: {
    position: 'absolute', bottom: 16,
    color: COLORS.primary, fontFamily: FONTS.semibold, fontSize: 14,
  },

  // Idle state
  idlePlaceholder: { alignItems: 'center', gap: 12 },
  idleText: {
    color: 'rgba(255,255,255,0.45)',
    fontFamily: FONTS.regular, fontSize: 13, textAlign: 'center',
    paddingHorizontal: 20,
  },

  // Success
  successOverlay: { alignItems: 'center', gap: 10 },
  successText: { color: '#22C55E', fontFamily: FONTS.bold, fontSize: 18 },

  instruction: {
    color: 'rgba(255,255,255,0.5)',
    fontFamily: FONTS.regular, fontSize: 14,
    textAlign: 'center', marginTop: 28,
    paddingHorizontal: 40,
  },

  // Buttons
  bottomBtns: {
    flexDirection: 'row', gap: 12,
    paddingHorizontal: 20, paddingBottom: 36, paddingTop: 16,
  },
  cancelBtn: {
    flex: 1, backgroundColor: '#2A2A2A',
    borderRadius: 14, paddingVertical: 16, alignItems: 'center',
  },
  cancelBtnText: { color: '#fff', fontFamily: FONTS.semibold, fontSize: 16 },
  nextBtn: {
    flex: 1.6, backgroundColor: COLORS.primary,
    borderRadius: 14, paddingVertical: 16, alignItems: 'center',
  },
  nextBtnDisabled: { opacity: 0.6 },
  nextBtnText: { color: '#000', fontFamily: FONTS.bold, fontSize: 16 },
});
