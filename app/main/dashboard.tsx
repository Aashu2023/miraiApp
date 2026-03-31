import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

const { width } = Dimensions.get('window');

// ─── Product Tab ──────────────────────────────────────────
function ProductTab() {
  const products = [
    {
      name: 'Premium Exterior Apex 20L',
      tags: ['Premium', 'Exterior'],
      value: '₹8.5L', valuePct: '+18.6%',
      volume: '5,450 L', volumePct: '+16.7%',
      growth: '+24%',
    },
    {
      name: 'Eco-Friendly Urban 15L',
      tags: ['Eco-Friendly', 'Urban'],
      value: '₹5.2L', valuePct: '+12.1%',
      volume: '3,100 L', volumePct: '+9.3%',
      growth: '+15%',
    },
    {
      name: 'Interior Smooth Finish 10L',
      tags: ['Mid Range', 'Interior'],
      value: '₹3.8L', valuePct: '+8.4%',
      volume: '2,200 L', volumePct: '+6.1%',
      growth: '+10%',
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.summaryLabel}>Total Product Value</Text>
            <Text style={styles.summaryValue}>₹45.8L</Text>
            <Text style={styles.summarySubLabel}>Year to Date Performance</Text>
          </View>
          <View style={styles.growthBadge}>
            <Text style={styles.growthText}>+12.5%</Text>
          </View>
        </View>
        <Text style={styles.growthVs}>vs Last Period</Text>
        <View style={styles.summaryStats}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Volume</Text>
            <Text style={styles.statValue}>32,600 L</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>SKU Count</Text>
            <Text style={styles.statValue}>48 Items</Text>
          </View>
        </View>
      </View>

      {/* List Header */}
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>All Products (150)</Text>
        <View style={styles.listActions}>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="swap-vertical" size={18} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="funnel-outline" size={18} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="download-outline" size={18} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={16} color={COLORS.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Product name, SKU..."
          placeholderTextColor={COLORS.textMuted}
        />
      </View>

      {/* Product Cards */}
      {products.map(p => (
        <View key={p.name} style={styles.productCard}>
          <Text style={styles.productName}>{p.name}</Text>
          <View style={styles.tagRow}>
            {p.tags.map(tag => (
              <View key={tag} style={styles.tag}>
                <Ionicons name="pricetag-outline" size={12} color={COLORS.textMuted} />
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <View style={styles.divider} />
          <View style={styles.metricsRow}>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Value</Text>
              <Text style={styles.metricValue}>{p.value}</Text>
              <Text style={styles.metricPct}>{p.valuePct}</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Volume</Text>
              <Text style={styles.metricValue}>{p.volume}</Text>
              <Text style={styles.metricPct}>{p.volumePct}</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Growth</Text>
              <Text style={[styles.metricValue, { color: '#22C55E' }]}>{p.growth}</Text>
              <Text style={styles.metricPct}>Vs Last year</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

// ─── Donut Chart (SVG-free, CSS-border trick) ─────────────
function DonutChart({ segments, total }: { segments: { pct: number; color: string; label: string }[]; total: string }) {
  const size = width - 80;
  const cx = size / 2, cy = size / 2, r = size * 0.38;

  // Draw segments as arc paths via border approach (simplified visual)
  let startAngle = -90;
  const paths = segments.map(seg => {
    const angle = (seg.pct / 100) * 360;
    const endAngle = startAngle + angle;
    const toRad = (d: number) => (d * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));
    const y2 = cy + r * Math.sin(toRad(endAngle));
    const largeArc = angle > 180 ? 1 : 0;
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    const midAngle = startAngle + angle / 2;
    const lx = cx + (r * 0.68) * Math.cos(toRad(midAngle));
    const ly = cy + (r * 0.68) * Math.sin(toRad(midAngle));
    startAngle = endAngle;
    return { path, color: seg.color, label: seg.label, lx, ly, pct: seg.pct };
  });

  return (
    <View style={[styles.donutContainer, { width: size, height: size }]}>
      {/* Simple visual representation using nested views */}
      <View style={styles.donutOuter}>
        {segments.map((seg, i) => (
          <View key={i} style={[styles.donutSegment, { 
            backgroundColor: seg.color, 
            flex: seg.pct 
          }]} />
        ))}
      </View>
      <View style={styles.donutHole}>
        <Text style={styles.donutTotal}>{total}</Text>
        <Text style={styles.donutTotalLabel}>Total</Text>
      </View>
      {/* Labels overlay */}
      {segments.map((seg, i) => (
        <View key={i} style={styles.donutLabel}>
          <Text style={styles.donutLabelText}>{seg.label}</Text>
          <Text style={styles.donutLabelPct}>{seg.pct}%</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Segment Tab ──────────────────────────────────────────
function SegmentTab() {
  const segments = [
    { label: 'Economy', pct: 33.3, color: COLORS.primary },
    { label: 'Mid Range', pct: 38.2, color: '#22C55E' },
    { label: 'Premium', pct: 28.5, color: '#8B5CF6' },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Segment-Wise</Text>
        <View style={styles.listActions}>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="swap-vertical" size={18} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="funnel-outline" size={18} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="download-outline" size={18} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Donut Chart Visual */}
      <View style={styles.chartCard}>
        <View style={styles.simpleDonut}>
          <View style={styles.donutRing}>
            {segments.map((seg, i) => (
              <View
                key={i}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  borderRadius: 100,
                  borderWidth: 40,
                  borderColor: 'transparent',
                  borderTopColor: seg.color,
                  transform: [{ rotate: `${i * 120}deg` }],
                }}
              />
            ))}
          </View>
          <View style={styles.donutCenter}>
            <Text style={styles.donutCenterValue}>₹45.8L</Text>
            <Text style={styles.donutCenterLabel}>Total</Text>
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          {segments.map(seg => (
            <View key={seg.label} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: seg.color }]} />
              <Text style={styles.legendLabel}>{seg.label}</Text>
              <Text style={styles.legendPct}>{seg.pct}%</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Segment Cards */}
      {[
        { icon: '👑', title: 'Premium Segment', sub: 'High-end quality range', value: '₹15.2L', volume: '9,830L', contrib: '33.3%', volPct: '30.1%', color: '#8B5CF6' },
        { icon: '🏷️', title: 'Mid Range Segment', sub: 'Balanced performance', value: '₹17.5L', volume: '12,470L', contrib: '38.2%', volPct: '38.2%', color: '#22C55E' },
        { icon: '💰', title: 'Economy Segment', sub: 'Value for money', value: '₹13.1L', volume: '10,300L', contrib: '28.5%', volPct: '31.7%', color: COLORS.primary },
      ].map(seg => (
        <View key={seg.title} style={styles.segmentCard}>
          <View style={styles.segmentHeader}>
            <View style={[styles.segmentIcon, { backgroundColor: COLORS.card }]}>
              <Text style={{ fontSize: 20 }}>{seg.icon}</Text>
            </View>
            <View>
              <Text style={styles.segmentTitle}>{seg.title}</Text>
              <Text style={styles.segmentSub}>{seg.sub}</Text>
            </View>
          </View>
          <View style={styles.segmentMetrics}>
            <View>
              <Text style={styles.metricLabel}>Value</Text>
              <Text style={styles.metricValue}>{seg.value}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <View style={[styles.dot, { backgroundColor: seg.color }]} />
                <Text style={styles.metricPct}>{seg.contrib} contribution</Text>
              </View>
            </View>
            <View>
              <Text style={styles.metricLabel}>Volume</Text>
              <Text style={styles.metricValue}>{seg.volume}</Text>
              <Text style={styles.metricPct}>{seg.volPct} of total</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

// ─── Category Tab ─────────────────────────────────────────
function CategoryTab() {
  const categories = [
    { label: 'Exterior', pct: 42.5, color: '#3B82F6' },
    { label: 'Interior', pct: 31.8, color: '#22C55E' },
    { label: 'Enamel', pct: 16.2, color: '#8B5CF6' },
    { label: 'Putty', pct: 9.5, color: '#F97316' },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Category-Wise</Text>
        <View style={styles.listActions}>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="swap-vertical" size={18} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="funnel-outline" size={18} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="download-outline" size={18} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.chartCard}>
        <View style={styles.simpleDonut}>
          <View style={styles.donutRing}>
            {categories.map((cat, i) => (
              <View
                key={i}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  borderRadius: 100,
                  borderWidth: 40,
                  borderColor: 'transparent',
                  borderTopColor: cat.color,
                  transform: [{ rotate: `${i * 90}deg` }],
                }}
              />
            ))}
          </View>
          <View style={styles.donutCenter}>
            <Text style={styles.donutCenterValue}>4</Text>
            <Text style={styles.donutCenterLabel}>Categories</Text>
          </View>
        </View>

        <View style={styles.legend}>
          {categories.map(cat => (
            <View key={cat.label} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: cat.color }]} />
              <Text style={styles.legendLabel}>{cat.label}</Text>
              <Text style={styles.legendPct}>{cat.pct}%</Text>
            </View>
          ))}
        </View>
      </View>

      {[
        { icon: '🎨', title: 'Exterior Paints', sub: 'Weather-resistant range', value: '₹19.5L', volume: '13,850L', contrib: '28.5%', volPct: '33.3%', color: '#F59E0B' },
        { icon: '🏠', title: 'Interior Paints', sub: 'Indoor premium finish', value: '₹14.6L', volume: '10,400L', contrib: '31.8%', volPct: '31.9%', color: '#22C55E' },
        { icon: '🖌️', title: 'Enamel Paints', sub: 'Durable enamel formula', value: '₹7.4L', volume: '5,300L', contrib: '16.2%', volPct: '16.2%', color: '#8B5CF6' },
        { icon: '🪣', title: 'Putty', sub: 'Wall preparation', value: '₹4.3L', volume: '3,050L', contrib: '9.5%', volPct: '9.3%', color: '#F97316' },
      ].map(cat => (
        <View key={cat.title} style={styles.segmentCard}>
          <View style={styles.segmentHeader}>
            <View style={[styles.segmentIcon, { backgroundColor: COLORS.card }]}>
              <Text style={{ fontSize: 20 }}>{cat.icon}</Text>
            </View>
            <View>
              <Text style={styles.segmentTitle}>{cat.title}</Text>
              <Text style={styles.segmentSub}>{cat.sub}</Text>
            </View>
          </View>
          <View style={styles.segmentMetrics}>
            <View>
              <Text style={styles.metricLabel}>Value</Text>
              <Text style={styles.metricValue}>{cat.value}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <View style={[styles.dot, { backgroundColor: cat.color }]} />
                <Text style={styles.metricPct}>{cat.contrib} contribution</Text>
              </View>
            </View>
            <View>
              <Text style={styles.metricLabel}>Volume</Text>
              <Text style={styles.metricValue}>{cat.volume}</Text>
              <Text style={styles.metricPct}>{cat.volPct} of total</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

// ─── Dashboard Screen ─────────────────────────────────────
export default function DashboardScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'product' | 'segment' | 'category'>('product');

  return (
    <SafeAreaView style={styles.safe}>
      {/* Yellow Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={{ fontSize: 10, color: '#fff', fontFamily: FONTS.bold }}>✨NEW{'\n'}arrival</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtnSmall}>
            <Ionicons name="search" size={20} color={COLORS.background} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtnSmall}>
            <Ionicons name="notifications-outline" size={20} color={COLORS.background} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Tab Switcher */}
        <View style={styles.tabRow}>
          {(['product', 'segment', 'category'] as const).map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          {activeTab === 'product' && <ProductTab />}
          {activeTab === 'segment' && <SegmentTab />}
          {activeTab === 'category' && <CategoryTab />}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.primary },
  header: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, gap: 12,
  },
  backBtn: { padding: 4 },
  headerTitle: { flex: 1, color: COLORS.background, fontFamily: FONTS.bold, fontSize: 20 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconBtn: {
    backgroundColor: '#8B5CF6', borderRadius: 12,
    paddingHorizontal: 8, paddingVertical: 4,
  },
  iconBtnSmall: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },

  content: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 0,
    paddingTop: 16,
  },

  tabRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 4,
    marginBottom: 16,
  },
  tab: { flex: 1, paddingVertical: 9, borderRadius: 8, alignItems: 'center' },
  tabActive: { backgroundColor: COLORS.primary },
  tabText: { color: COLORS.textMuted, fontFamily: FONTS.medium, fontSize: 14 },
  tabTextActive: { color: COLORS.background, fontFamily: FONTS.semibold },

  // Summary
  summaryCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 16, padding: 18, marginBottom: 16,
  },
  summaryTop: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 },
  summaryLabel: { color: COLORS.background, fontFamily: FONTS.medium, fontSize: 14, opacity: 0.85 },
  summaryValue: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 36 },
  summarySubLabel: { color: COLORS.background, fontFamily: FONTS.regular, fontSize: 12, opacity: 0.7 },
  growthBadge: {
    backgroundColor: '#22C55E', borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  growthText: { color: '#fff', fontFamily: FONTS.bold, fontSize: 14 },
  growthVs: { color: COLORS.background, fontFamily: FONTS.regular, fontSize: 12, opacity: 0.7, marginBottom: 12 },
  summaryStats: {
    flexDirection: 'row', gap: 12,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 10, padding: 12,
  },
  statBox: { flex: 1 },
  statLabel: { color: COLORS.background, fontFamily: FONTS.regular, fontSize: 12, opacity: 0.7 },
  statValue: { color: COLORS.background, fontFamily: FONTS.bold, fontSize: 16 },

  // List
  listHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 12,
  },
  listTitle: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 18 },
  listActions: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: COLORS.card,
    justifyContent: 'center', alignItems: 'center',
  },

  searchBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.card, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 10, gap: 8, marginBottom: 12,
  },
  searchInput: {
    flex: 1, color: COLORS.text, fontFamily: FONTS.regular, fontSize: 14,
  },

  productCard: {
    backgroundColor: COLORS.card, borderRadius: 14, padding: 16, marginBottom: 12,
  },
  productName: { color: COLORS.text, fontFamily: FONTS.semibold, fontSize: 15, marginBottom: 8 },
  tagRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  tag: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: COLORS.surface, borderRadius: 6,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  tagText: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 12 },
  divider: { height: 1, backgroundColor: COLORS.border, marginBottom: 10 },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metric: {},
  metricLabel: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 12 },
  metricValue: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 16 },
  metricPct: { color: '#22C55E', fontFamily: FONTS.medium, fontSize: 12 },

  // Donut
  chartCard: {
    backgroundColor: COLORS.card, borderRadius: 14, padding: 20,
    marginBottom: 16, alignItems: 'center',
  },
  simpleDonut: {
    width: 200, height: 200,
    justifyContent: 'center', alignItems: 'center', marginBottom: 16,
  },
  donutRing: {
    position: 'absolute', width: 200, height: 200,
    borderRadius: 100, overflow: 'hidden',
    borderWidth: 40, borderColor: COLORS.surface,
  },
  donutCenter: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: COLORS.card,
    justifyContent: 'center', alignItems: 'center',
  },
  donutCenterValue: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 20 },
  donutCenterLabel: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 12 },

  legend: { width: '100%' },
  legendItem: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6,
  },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendLabel: { flex: 1, color: COLORS.text, fontFamily: FONTS.medium, fontSize: 14 },
  legendPct: { color: COLORS.textMuted, fontFamily: FONTS.medium, fontSize: 14 },

  // Segment cards
  segmentCard: {
    backgroundColor: COLORS.card, borderRadius: 14, padding: 16, marginBottom: 12,
  },
  segmentHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  segmentIcon: {
    width: 44, height: 44, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
  },
  segmentTitle: { color: COLORS.text, fontFamily: FONTS.semibold, fontSize: 15 },
  segmentSub: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 12 },
  segmentMetrics: { flexDirection: 'row', justifyContent: 'space-between' },
  dot: { width: 8, height: 8, borderRadius: 4 },

  // Donut (old unused)
  donutContainer: { position: 'relative', justifyContent: 'center', alignItems: 'center' },
  donutOuter: { flexDirection: 'row', width: 200, height: 200, borderRadius: 100, overflow: 'hidden' },
  donutSegment: { height: '100%' },
  donutHole: {
    position: 'absolute', width: 100, height: 100, borderRadius: 50,
    backgroundColor: COLORS.card, justifyContent: 'center', alignItems: 'center',
  },
  donutTotal: { color: COLORS.text, fontFamily: FONTS.bold, fontSize: 14 },
  donutTotalLabel: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 10 },
  donutLabel: { position: 'absolute' },
  donutLabelText: { color: COLORS.text, fontFamily: FONTS.medium, fontSize: 11 },
  donutLabelPct: { color: COLORS.textMuted, fontFamily: FONTS.regular, fontSize: 10 },
});
