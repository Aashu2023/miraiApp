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

type NotifType = 'order' | 'scheme' | 'dispatch';

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  desc: string;
  time: string;
  badge: string;
  action: string;
  route: string;
  read: boolean;
}

const NOTIFICATIONS: { section: string; count: number; items: Notification[] }[] = [
  {
    section: 'Today',
    count: 3,
    items: [
      {
        id: '1', type: 'order',
        title: 'New Order Placed',
        desc: 'Order #ORD-2025-1247',
        time: '5 hours ago',
        badge: 'Premium Segment',
        action: 'View Order',
        route: '/main/purchase',
        read: false,
      },
      {
        id: '2', type: 'scheme',
        title: 'New Scheme',
        desc: 'Winter Mega Sale 2025 - Extra 15% discount on emulsions',
        time: '6 hours ago',
        badge: 'Valid till 25 Jan',
        action: 'View Scheme',
        route: '/main/scheme',
        read: false,
      },
      {
        id: '3', type: 'dispatch',
        title: 'Order Dispatched',
        desc: 'Order #ORD-2025-1238 has been Dispatched',
        time: '6 hours ago',
        badge: 'Expected : 21 Jan',
        action: 'Track Order',
        route: '/main/purchase',
        read: false,
      },
    ],
  },
  {
    section: 'Yesterday',
    count: 3,
    items: [
      {
        id: '4', type: 'order',
        title: 'New Order Placed',
        desc: 'Order #ORD-2025-1247',
        time: '5 hours ago',
        badge: 'Premium Segment',
        action: 'View Order',
        route: '/main/purchase',
        read: true,
      },
      {
        id: '5', type: 'scheme',
        title: 'New Order Placed',
        desc: 'Winter Mega Sale 2025 - Extra 15% discount on emulsions',
        time: '6 hours ago',
        badge: 'Valid till 25 Jan',
        action: 'View Scheme',
        route: '/main/scheme',
        read: true,
      },
      {
        id: '6', type: 'order',
        title: 'Payment Received',
        desc: 'Payment of ₹1,25,340 received for INV-2025-0343',
        time: '8 hours ago',
        badge: 'INV-2025-0343',
        action: 'View Invoice',
        route: '/main/invoice',
        read: true,
      },
    ],
  },
];

const ICON_MAP: Record<NotifType, { icon: string; bg: string }> = {
  order:    { icon: 'document-text-outline', bg: '#2A2A3A' },
  scheme:   { icon: 'gift-outline',          bg: '#2A2A3A' },
  dispatch: { icon: 'car-outline',           bg: '#2A2A3A' },
};

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={s.safe}>
      {/* Yellow Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Notifications</Text>
      </View>

      {/* Dark sheet */}
      <ScrollView style={s.content} showsVerticalScrollIndicator={false}>
        {NOTIFICATIONS.map(group => (
          <View key={group.section}>
            {/* Section header */}
            <View style={s.sectionRow}>
              <Text style={s.sectionTitle}>{group.section}</Text>
              <Text style={s.sectionCount}>{group.count} notifications</Text>
            </View>

            {group.items.map(notif => {
              const meta = ICON_MAP[notif.type];
              return (
                <View
                  key={notif.id}
                  style={[s.card, notif.read && s.cardRead]}
                >
                  {/* Icon */}
                  <View style={[s.iconBox, { backgroundColor: meta.bg }]}>
                    <Ionicons name={meta.icon as any} size={22} color={COLORS.text} />
                  </View>

                  {/* Content */}
                  <View style={s.cardBody}>
                    <View style={s.cardTopRow}>
                      <Text style={s.cardTitle}>{notif.title}</Text>
                      <View style={s.timeRow}>
                        <Ionicons name="time-outline" size={12} color={COLORS.textMuted} />
                        <Text style={s.timeText}>{notif.time}</Text>
                      </View>
                    </View>

                    <Text style={s.cardDesc}>{notif.desc}</Text>

                    <View style={s.cardFooter}>
                      <View style={s.badgePill}>
                        <Text style={s.badgeText}>{notif.badge}</Text>
                      </View>
                      <TouchableOpacity
                        style={s.actionRow}
                        onPress={() => router.push(notif.route as any)}
                      >
                        <Text style={s.actionText}>{notif.action}</Text>
                        <Ionicons name="chevron-forward" size={14} color={COLORS.primary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ))}
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
    paddingTop: 20, paddingHorizontal: 16,
  },

  sectionRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },
  sectionTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 20 },
  sectionCount: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 13 },

  card: {
    flexDirection: 'row', gap: 12,
    backgroundColor: COLORS.card,
    borderRadius: 14, padding: 14,
    marginBottom: 10,
  },
  cardRead: { opacity: 0.7 },

  iconBox: {
    width: 46, height: 46, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
    flexShrink: 0,
  },

  cardBody: { flex: 1 },
  cardTopRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 4,
  },
  cardTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 15, flex: 1 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginLeft: 8 },
  timeText: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 11 },

  cardDesc: {
    color: COLORS.textSecondary, fontFamily: FONTS.regular,
    fontSize: 13, lineHeight: 18, marginBottom: 10,
  },

  cardFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  badgePill: {
    backgroundColor: COLORS.surface, borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  badgeText: { color: COLORS.text, fontFamily: FONTS.medium, fontSize: 12 },

  actionRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  actionText: { color: COLORS.primary, fontFamily: FONTS.semibold, fontSize: 13 },
});
