import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Powercard({ fund }: any) {
  const cardColor = fund.color || "#7B91B3";
  const hpPercent = Math.min((fund.nav / 2000) * 100, 100);

  return (
    <View style={[styles.card, { borderColor: cardColor }]}>
      <View style={styles.header}>
        <Text style={styles.categoryBadge}>{fund.type}</Text>
        <View style={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <Ionicons
              key={i}
              name="star"
              size={14}
              color={i < fund.rating ? "#FFD700" : "#2D3748"}
            />
          ))}
        </View>
      </View>

      <Text style={styles.name}>{fund.name}</Text>
      <Text style={styles.amc}>{fund.subtitle}</Text>

      {/* HP Bar (NAV) */}
      <View style={styles.statRow}>
        <View style={styles.labelGroup}>
          <Text style={styles.hpLabel}>HP</Text>
          <Text style={styles.navValue}>NAV {fund.nav}</Text>
        </View>
        <View style={styles.barBg}>
          <View
            style={[
              styles.barFill,
              { width: `${hpPercent}%`, backgroundColor: cardColor },
            ]}
          />
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{fund.returns_1y}%</Text>
          <Text style={styles.statLabel}>ATTACK (1Y)</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: "#FF4444" }]}>
            {fund.expenseRatio}%
          </Text>
          <Text style={styles.statLabel}>WEAKNESS (EXP)</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1A2634",
    borderRadius: 20,
    borderWidth: 2,
    padding: 30,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    height: "70%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  categoryBadge: {
    color: "#FFD700",
    paddingHorizontal: 8,
    borderRadius: 0,
    fontSize: 10,
    fontWeight: "bold",
    borderColor: "#FFD700",
    borderWidth: 1,
  },
  stars: { flexDirection: "row" },
  name: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  amc: { color: "#8EA3B8", fontSize: 12, marginBottom: 20 },
  statRow: { marginBottom: 20 },
  labelGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  hpLabel: { color: "#FFD700", fontWeight: "bold" },
  navValue: { color: "#FFF", fontSize: 12 },
  barBg: {
    height: 10,
    backgroundColor: "#0F1B2E",
    borderRadius: 5,
    overflow: "hidden",
  },
  barFill: { height: "100%" },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    paddingTop: 15,
  },
  statBox: { alignItems: "center", flex: 1 },
  statValue: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  statLabel: { color: "#8EA3B8", fontSize: 8, fontWeight: "bold" },
});
