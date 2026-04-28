import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

export default function BattleResult() {
  const params = useLocalSearchParams();
  
  const attribute = (params.attribute as string) || "return";
  const playerName = (params.playerName as string) || "Unknown Fund";
  const playerCategory = (params.playerCategory as string) || "Equity";
  
  const pVal = parseFloat(params.playerVal as string) || 0;
  const oVal = parseFloat(params.opponentVal as string) || 0;

  const isPlayerWinner = attribute === 'expense' ? pVal < oVal : pVal > oVal;
  const resultColor = isPlayerWinner ? "#FFD700" : "#FF4444";

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        {/* Main Player Card */}
        <Shadow
          distance={15}
          startColor={isPlayerWinner ? "rgba(255, 217, 0, 0.4)" : "rgba(255, 68, 68, 0.4)"}
          stretch={true}
          containerStyle={{ width: "100%", marginBottom: 30 }}
        >
          <View style={[styles.mainCard, { borderColor: resultColor }]}>
            <View style={styles.mainCardContent}>
              <Text style={styles.mainCardTitle}>{playerName}</Text>
              <Text style={styles.mainCardSubtitle}>{playerCategory}</Text>
              <View style={styles.characterPlaceholder} />
              <View style={styles.mainProgressBar}>
                <View style={[styles.mainProgressFill, { backgroundColor: resultColor }]} />
              </View>
            </View>
          </View>
        </Shadow>

        {/* NAV Attribute Row */}
        <View style={[styles.comparisonCard, attribute === 'nav' && styles.activeAttrBorder]}>
          <Text style={styles.comparisonLabel}>NAV ₹</Text>
          <View style={styles.comparisonValues}>
            <Text style={styles.valueLeft}>{attribute === 'nav' ? pVal : "---"}</Text>
            <Text style={styles.vsText}>VS</Text>
            <Text style={styles.valueRight}>{attribute === 'nav' ? oVal : "---"}</Text>
          </View>
          {attribute === 'nav' && (
            <View style={styles.resultIndicator}>
               <Text style={[styles.resultIndicatorText, { color: resultColor }]}>{isPlayerWinner ? "WIN" : "LOSE"}</Text>
            </View>
          )}
        </View>

        {/* 1Y RETURN Highlight Card (Winner logic only if selected) */}
        <Shadow
          distance={attribute === 'return' ? 15 : 0}
          startColor={isPlayerWinner ? "rgba(255, 217, 0, 0.4)" : "rgba(255, 68, 68, 0.4)"}
          stretch={true}
          containerStyle={{ width: "80%", marginHorizontal: "auto", marginBottom: 16 }}
        >
          <View style={[
            styles.highlightCard, 
            attribute !== 'return' && { borderColor: '#454545', shadowOpacity: 0 },
            attribute === 'return' && { borderColor: resultColor }
          ]}>
            <View style={styles.highlightHeader}>
              <Text style={[styles.highlightLabel, attribute !== 'return' && { color: '#8EA3B8' }]}>1Y RETURN</Text>
              {attribute === 'return' && <Ionicons name={isPlayerWinner ? "trophy" : "close-circle"} size={20} color={resultColor} />}
            </View>
            <View style={styles.highlightValues}>
              <Text style={styles.highlightValueWin}>{attribute === 'return' ? `${pVal}%` : "--%"}</Text>
              {attribute === 'return' && (
                <View style={[styles.winBadge, { borderColor: resultColor }]}>
                  <Text style={[styles.winText, { color: resultColor }]}>{isPlayerWinner ? "WIN" : "LOSE"}</Text>
                </View>
              )}
              <Text style={styles.highlightValueLose}>{attribute === 'return' ? `${oVal}%` : "--%"}</Text>
            </View>
          </View>
        </Shadow>

        {/* Expense Ratio Row */}
        <View style={[styles.comparisonCard, attribute === 'expense' && styles.activeAttrBorder]}>
          <View style={styles.expenseHeader}>
            <Text style={styles.comparisonLabel}>EXP RATIO</Text>
            <Ionicons name="shield" size={16} color="#8EA3B8" />
          </View>
          <View style={styles.comparisonValues}>
            <Text style={styles.valueLeft}>{attribute === 'expense' ? `${pVal}%` : "--%"}</Text>
            <Text style={styles.vsText}>VS</Text>
            <Text style={styles.valueRight}>{attribute === 'expense' ? `${oVal}%` : "--%"}</Text>
          </View>
        </View>

        {/* Opponent Identity Card */}
        <View style={styles.debtCard}>
          <View style={styles.debtCardInner}>
            <View style={styles.debtBadge}>
              <Text style={styles.debtBadgeText}>OPPONENT</Text>
            </View>
            <View style={styles.debtCircle}>
              <Text style={styles.debtCircleTextMain}>VS</Text>
            </View>
            <Text style={styles.oppName}>{params.opponentName}</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1d1d1f" },
  content: { flex: 1, paddingHorizontal: "10%" },
  mainCard: {
    backgroundColor: "#1d1d1f",
    borderWidth: 2,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: "hidden",
  },
  mainCardContent: { padding: 24, height: 170 },
  mainCardTitle: { fontSize: 20, fontWeight: "800", color: "#FFFFFF", marginBottom: 8 },
  mainCardSubtitle: { fontSize: 13, fontWeight: "500", color: "#8EA3B8" },
  characterPlaceholder: { height: 30 },
  mainProgressBar: { height: 10, backgroundColor: "#2A3B52", borderRadius: 5 },
  mainProgressFill: { height: "100%", width: "85%", borderRadius: 5 },
  comparisonCard: {
    width: "75%",
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#454545",
    marginHorizontal: "auto",
  },
  activeAttrBorder: { borderColor: "#FFD700" },
  comparisonLabel: { fontSize: 10, fontWeight: "700", color: "#ffffff", letterSpacing: 2, textAlign: "center", marginBottom: 12 },
  comparisonValues: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 11 },
  valueLeft: { fontSize: 20, fontWeight: "800", color: "#FFFFFF" },
  vsText: { fontSize: 9, fontWeight: "600", color: "#898d91" },
  valueRight: { fontSize: 20, fontWeight: "800", color: "#ffffff" },
  highlightCard: { backgroundColor: "#2a2a2a", borderRadius: 8, paddingHorizontal: 20, paddingVertical: 14, borderWidth: 3 },
  highlightHeader: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 16 },
  highlightLabel: { fontSize: 12, fontWeight: "700", color: "#FFD700", letterSpacing: 2 },
  highlightValues: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 5 },
  highlightValueWin: { fontSize: 25, fontWeight: "800", color: "#FFFFFF" },
  highlightValueLose: { fontSize: 25, fontWeight: "800", color: "#7b7777" },
  winBadge: { paddingHorizontal: 6, paddingVertical: 4, borderWidth: 1, backgroundColor: "#000" },
  winText: { fontSize: 12, fontWeight: "600", fontStyle: "italic" },
  expenseHeader: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6, marginBottom: 12 },
  resultIndicator: { alignItems: 'center', marginTop: 5 },
  resultIndicatorText: { fontSize: 10, fontWeight: '900', fontStyle: 'italic' },
  debtCard: { width: "100%", backgroundColor: "#262626", borderRadius: 8, borderWidth: 1, borderColor: '#333', marginTop: 20, height: 180 },
  debtCardInner: { flex: 1, padding: 20, alignItems: "center" },
  debtBadge: { alignSelf: "flex-end", backgroundColor: "rgba(255,255,255,0.05)", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  debtBadgeText: { fontSize: 10, fontWeight: "700", color: "#8EA3B8" },
  debtCircle: { width: 60, height: 60, borderRadius: 30, borderWidth: 3, borderColor: "#444", justifyContent: "center", alignItems: "center", marginTop: 10 },
  debtCircleTextMain: { fontSize: 18, fontWeight: "900", color: "#444" },
  oppName: { color: "#FFF", fontSize: 14, fontWeight: "700", marginTop: 10 },
});