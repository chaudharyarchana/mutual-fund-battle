import Powercard from "@/components/PowerCard";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
// Note: If you have a chart library like react-native-wagmi-charts or
// react-native-chart-kit, you would use it for the sparkline.

export default function Details() {
  const { amfi_code } = useLocalSearchParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [history, setHistory] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const spin = useSharedValue(0);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        // Fetch Fund Details
        const detailRes = await fetch(
          `https://mfdata.in/api/v1/schemes/${amfi_code}`,
        );
        const detailJson = await detailRes.json();

        // Fetch Historical NAV for Sparkline
        const historyRes = await fetch(
          `https://mfdata.in/api/v1/schemes/${amfi_code}/nav`,
        );
        const historyJson = await historyRes.json();

        setData(detailJson.data);
        setHistory(historyJson.data || []);
      } catch (error) {
        console.error("Error fetching fund details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [amfi_code]);

  const handleFlip = () => {
    spin.value = withTiming(spin.value === 0 ? 1 : 0, { duration: 600 });
  };

  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${interpolate(spin.value, [0, 1], [0, 180])}deg` }],
  }));

  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateY: `${interpolate(spin.value, [0, 1], [180, 360])}deg` },
    ],
  }));

  if (loading || !data) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Fetching Power Stats...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button to return to Deck  */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#FFD700" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1}
        onPress={handleFlip}
        style={styles.flipContainer}
      >
        {/* Front Side: Visual Centerpiece Card [cite: 34, 48] */}
        <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
          <Powercard
            fund={{
              ...data,
              type: data?.category?.toUpperCase() || "EQUITY",
              rating: data.morningstar || 0,
              expenseRatio: data?.expense_ratio || "N/A",
              returns_1y: data?.returns?.return_1y || "0.0",
              color: getCategoryColor(data?.category),
            }}
          />
        </Animated.View>

        {/* Back Side: Metadata & Sparkline  */}
        <Animated.View
          style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.backContent}
          >
            <Text style={styles.backTitle}>HISTORICAL ANALYSIS</Text>

            <View style={styles.chartContainer}>
              <Text style={styles.metaLabel}>30-DAY NAV SPARKLINE</Text>
              {/* If using a library, replace this View with <LineChart /> */}
              <View style={styles.sparklinePlaceholder}>
                <Ionicons
                  name="trending-up"
                  size={40}
                  color="rgba(255, 215, 0, 0.2)"
                />
                <Text style={styles.chartStatus}>
                  {history.length > 0 ? "Data Loaded" : "No History Available"}
                </Text>
              </View>
            </View>

            <View style={styles.metaGrid}>
              <MetaItem
                label="1Y RANK"
                value={`#${data?.returns?.rank_1y || "N/A"}`}
              />
              <MetaItem
                label="PE RATIO"
                value={data?.ratios?.valuation?.pe_ratio || "N/A"}
              />
              <MetaItem
                label="BETA"
                value={data?.ratios?.risk?.beta || "N/A"}
              />
              <MetaItem label="BENCHMARK" value={data?.benchmark || "N/A"} />
              <MetaItem
                label="AUM"
                value={data?.aum ? `₹${(data.aum / 1e7).toFixed(2)}Cr` : "N/A"}
              />
              <MetaItem label="RISK" value={data?.risk_label || "N/A"} />
            </View>

            <Text style={styles.tapText}>TAP TO FLIP BACK</Text>
          </ScrollView>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const MetaItem = ({ label, value }: any) => (
  <View style={styles.metaItem}>
    <Text style={styles.metaLabel}>{label}</Text>
    <Text style={styles.metaValue}>{value}</Text>
  </View>
);

const getCategoryColor = (category: string) => {
  const cat = category?.toLowerCase() || "";
  if (cat.includes("equity")) return "#F0A726"; // Warm
  if (cat.includes("debt")) return "#7B91B3"; // Cool
  return "#5A7C9E"; // Neutral
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1B2A",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  center: {
    flex: 1,
    backgroundColor: "#0D1B2A",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#8EA3B8",
    marginTop: 10,
    fontWeight: "600",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButtonText: {
    color: "#FFD700",
    fontWeight: "bold",
    marginLeft: 8,
    letterSpacing: 1,
  },
  flipContainer: {
    width: "100%",
    height: Dimensions.get("window").height * 0.7,
  },
  flipCard: {
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    position: "absolute",
  },
  flipCardBack: {
    backgroundColor: "#1A2634",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FFD700",
    padding: 20,
  },
  backContent: { alignItems: "center", paddingBottom: 20 },
  backTitle: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 20,
    letterSpacing: 2,
  },
  metaGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  metaItem: {
    width: "48%",
    backgroundColor: "#0D1B2A",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#2A3B52",
  },
  metaLabel: {
    color: "#8EA3B8",
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  metaValue: { color: "#FFF", fontSize: 14, fontWeight: "900", marginTop: 5 },
  chartContainer: {
    height: 180,
    width: "100%",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sparklinePlaceholder: {
    height: 120,
    width: "100%",
    backgroundColor: "#0D1B2A",
    borderRadius: 12,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#2A3B52",
    justifyContent: "center",
    alignItems: "center",
  },
  chartStatus: { color: "#5A6B7D", fontSize: 12, marginTop: 8 },
  tapText: {
    color: "#5A6B7D",
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 20,
    letterSpacing: 2,
  },
});
