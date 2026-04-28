import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.75;

export default function SavedCard({ asset, onPress, onLongPress }: any) {
  const isEquity = asset?.category?.toLowerCase().includes("equity");
  const themeColor = isEquity ? "#FFD706" : "#7B91B3";
  const returnVal = asset?.returns_1y || "+0.0%";

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.card, { borderColor: themeColor }]}
    >
      <View style={styles.cardInner}>
        <View style={[styles.badge, { borderColor: themeColor, backgroundColor: `${themeColor}26` }]}>
          <Text style={[styles.badgeText, { color: themeColor },  ]}>
            {asset?.category?.toUpperCase() || "DEBT"}
          </Text>
        </View>

        <View style={styles.imageContainer}>
          <View style={styles.stackEffect}>
            <Ionicons name="copy-outline" size={60} color="rgba(255,255,255,0.2)" />
          </View>
          <Text style={styles.imageLabel}>
            {asset?.category?.toUpperCase() || "DEBT"} FUND
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.fundName} numberOfLines={1}>
            {asset?.name || "Global Tech Growth"}
          </Text>
          <Text style={styles.fundSubtitle}>
            {asset?.subtitle || "Class A • VGTX"}
          </Text>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statHeader}>
            <Text style={styles.statLabel}>1Y Return</Text>
            <Text style={[styles.statValue, { color: themeColor }]}>
              {returnVal.startsWith("+") ? returnVal : `+${returnVal}%`}
            </Text>
          </View>
          <View style={styles.progressBarBg}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: "85%", backgroundColor: themeColor }
              ]} 
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: 400,
    backgroundColor: "#1A2634",
    borderRadius: 10,
    borderWidth: 2,
    padding: 15,
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  cardInner: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    borderStyle: "dashed",
    borderRadius: 15,
    padding: 10,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical:10,
    borderWidth: 1,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  stackEffect: {
    width: 120,
    height: 120,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  imageLabel: {
    color: "rgba(255,255,255,0.1)",
    fontSize: 10,
    fontWeight: "800",
    marginTop: 15,
    letterSpacing: 2,
  },
  infoSection: {
    marginBottom: 25,
  },
  fundName: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
  },
  fundSubtitle: {
    color: "#8EA3B8",
    fontSize: 12,
    marginTop: 5,
  },
  statsSection: {
    width: "100%",
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 8,
  },
  statLabel: {
    color: "#8EA3B8",
    fontSize: 12,
    fontWeight: "600",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "900",
  },
  progressBarBg: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
});