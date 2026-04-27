import { StyleSheet, Text, View } from "react-native";

const AssetCard = ({ asset }: any) => {
  return (
    <View
      style={[
        styles.card,
        asset.type === "EQUITY" && styles.cardEquity,
        asset.type === "DEBT" && styles.cardDebt,
        asset.type === "HYBRID" && styles.cardHybrid,
      ]}
    >
      {/* Type Badge */}
      <View
        style={[
          styles.badge,
          asset.type === "EQUITY" && styles.badgeEquity,
          asset.type === "DEBT" && styles.badgeDebt,
          asset.type === "HYBRID" && styles.badgeDebt,
        ]}
      >
        <Text
          style={[
            styles.badgeText,
            asset.type === "EQUITY" && styles.badgeEquityText,
            asset.type === "DEBT" && styles.badgeDebtText,
            asset.type === "HYBRID" && styles.badgeDebtText,
          ]}
        >
          {asset.type}
        </Text>
      </View>

      {/* Character Icon Placeholder */}
      <View style={styles.iconPlaceholder}>
        {/* <Text style={styles.iconEmoji}>{asset.icon}</Text> */}
      </View>

      {/* Fund Name */}
      <Text style={styles.fundName} numberOfLines={1} ellipsizeMode="tail">
        {asset.name}
      </Text>
      <Text style={styles.fundSubtitle}>{asset.subtitle}</Text>

      {/* Metric */}
      <View style={styles.metricSection}>
        <Text style={styles.metricLabel}>{asset.metric}</Text>
        <Text
          style={[
            styles.metricValue,
            asset.value.startsWith("+") && styles.metricPositive,
          ]}
        >
          {asset.value}
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${asset.progress * 100}%` },
            asset.type === "EQUITY" && styles.progressEquity,
            asset.type === "DEBT" && styles.progressDebt,
            asset.type === "HYBRID" && styles.progressHybrid,
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#1A2432",
    borderRadius: 5,
    padding: 16,
    marginBottom: 0,
    borderWidth: 1,
    minHeight: 220,
  },
  cardEquity: {
    borderColor: "#FFD700",
  },
  cardDebt: {
    borderColor: "#7B91B3",
  },
  cardHybrid: {
    borderColor: "#5A7C9E",
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 12,
    borderWidth: 1,
  },
  badgeEquity: {
    backgroundColor: "rgba(138, 174, 44, 0.15)",
    borderColor: "#FFD700",
  },
  badgeDebt: {
    backgroundColor: "rgba(123, 145, 179, 0.15)",
    borderColor: "#7B91B3",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "500",
    letterSpacing: 1,
    paddingVertical: 5,
  },
  badgeEquityText: {
    color: "#FFD700",
  },
  badgeDebtText: {
    color: "#7B91B3",
  },
  iconPlaceholder: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  iconEmoji: {
    fontSize: 50,
  },
  fundName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
    overflow: "hidden",
  },
  fundSubtitle: {
    fontSize: 11,
    fontWeight: "600",
    color: "#8EA3B8",
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  metricSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    color: "#8EA3B8",
    fontWeight: "500",
  },
  metricValue: {
    fontSize: 11,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  metricPositive: {
    color: "#FFD700",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#2A3B52",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressEquity: {
    backgroundColor: "#FFD700",
  },
  progressDebt: {
    backgroundColor: "#7B91B3",
  },
  progressHybrid: {
    backgroundColor: "#5A7C9E",
  },
});

export default AssetCard;
