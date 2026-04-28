import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

export default function Battle() {
  const params = useLocalSearchParams();
  
  const attribute = (params.attribute as string) || "return";
  const playerNav = parseFloat(params.playerNav as string) || 0;
  const opponentNav = parseFloat(params.opponentNav as string) || 0;

  // Determine winner based on attribute type
  // For expense ratio, LOWER is better
  // For nav and return, HIGHER is better
  const isPlayerWinner = attribute === 'expense' 
    ? playerNav < opponentNav 
    : playerNav > opponentNav;
  
  const resultColor = isPlayerWinner ? "#FFD700" : "#FF4444";
  
  // Format values based on attribute
  const formatValue = (value: number, attr: string) => {
    if (attr === 'nav') return `₹${value.toFixed(2)}`;
    if (attr === 'return') return `${value.toFixed(2)}%`;
    if (attr === 'expense') return `${value.toFixed(2)}%`;
    return value.toString();
  };

  const getAttributeLabel = (attr: string) => {
    if (attr === 'nav') return 'NAV';
    if (attr === 'return') return '1Y RETURN';
    if (attr === 'expense') return 'EXPENSE RATIO';
    return attr.toUpperCase();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <Shadow
          distance={15}
          startColor={"rgba(255, 217, 0, 0.4)"}
          endColor={"rgba(255, 217, 0, 0)"}
          offset={[0, 0]}
          stretch={true}
          containerStyle={{ width: "100%", marginBottom: 30 }}
        >
          <View style={styles.mainCard}>
            <View style={styles.innerGlowWrapper}>
              <Shadow
                distance={140}
                startColor={"rgba(255, 217, 0, 0.6)"}
                endColor={"rgba(255, 217, 0, 0.01)"}
                offset={[0, -20]}
              >
                <View
                  style={{
                    width: 1,
                    height: 1,
                    backgroundColor: "transparent",
                  }}
                />
              </Shadow>
            </View>

            <View style={styles.mainCardContent}>
              <Text style={styles.mainCardTitle}>Battle Result</Text>
              <Text style={styles.mainCardSubtitle}>{getAttributeLabel(attribute)} Comparison</Text>

              <View style={styles.characterPlaceholder} />

              <View style={styles.mainProgressBar}>
                <View style={[
                  styles.mainProgressFill, 
                  { width: isPlayerWinner ? "85%" : "40%" }
                ]} />
              </View>
            </View>
          </View>
        </Shadow>

        {/* Main Battle Result Card - Shows selected attribute */}
        

        {/* NAV Comparison (if not the main attribute) */}
        {attribute !== 'nav' && (
          <View style={styles.comparisonCard}>
            <Text style={styles.comparisonLabel}>NAV</Text>
            <View style={styles.comparisonValues}>
              <Text style={styles.valueLeft}>₹{playerNav.toFixed(2)}</Text>
              <Text style={styles.vsText}>VS</Text>
              <Text style={styles.valueRight}>₹{opponentNav.toFixed(2)}</Text>
            </View>
          </View>
        )}

        {/* 1Y Return Comparison (if not the main attribute) */}
        {attribute !== 'return' && (
          <View style={styles.comparisonCard}>
            <Text style={styles.comparisonLabel}>1Y RETURN</Text>
            <View style={styles.comparisonValues}>
              <Text style={styles.valueLeft}>{playerNav.toFixed(2)}%</Text>
              <Text style={styles.vsText}>VS</Text>
              <Text style={styles.valueRight}>{opponentNav.toFixed(2)}%</Text>
            </View>
          </View>
        )}
        <Shadow
          distance={15}
          startColor={isPlayerWinner ? "rgba(255, 217, 0, 0.4)" : "rgba(255, 68, 68, 0.4)"}
          stretch={true}
          containerStyle={{ 
    alignSelf: 'center', marginBottom: 16 }}
        >
          <View style={[styles.highlightCard, { borderColor: resultColor }]}>
            <View style={styles.highlightHeader}>
              <Text style={[styles.highlightLabel, { color: resultColor }]}>
                {getAttributeLabel(attribute)}
              </Text>
              <Ionicons 
                name={isPlayerWinner ? "trophy" : "close-circle"} 
                size={20} 
                color={resultColor} 
              />
            </View>
            <View style={styles.highlightValues}>
              <Text style={[
                styles.highlightValueWin,
                !isPlayerWinner && { color: "#7b7777" }
              ]}>
                {formatValue(playerNav, attribute)}
              </Text>
              <View style={[styles.winBadge, { borderColor: resultColor }]}>
                <Text style={[styles.winText, { color: resultColor }]}>
                  {isPlayerWinner ? "WIN" : "LOSE"}
                </Text>
              </View>
              <Text style={[
                styles.highlightValueLose,
                isPlayerWinner && { color: "#7b7777" }
              ]}>
                {formatValue(opponentNav, attribute)}
              </Text>
            </View>
            {attribute === 'expense' && (
              <Text style={styles.helperText}>Lower is better</Text>
            )}
          </View>
        </Shadow>

        {/* Expense Ratio Comparison (if not the main attribute) */}
        {attribute !== 'expense' && (
          <View style={styles.comparisonCard}>
            <View style={styles.expenseHeader}>
              <Text style={styles.comparisonLabel}>EXPENSE RATIO</Text>
              <Ionicons name="shield" size={16} color="#8EA3B8" />
            </View>
            <View style={styles.comparisonValues}>
              <Text style={styles.valueLeft}>{playerNav.toFixed(2)}%</Text>
              <Text style={styles.vsText}>VS</Text>
              <Text style={styles.valueRight}>{opponentNav.toFixed(2)}%</Text>
            </View>
          </View>
        )}

        {/* Result Summary Card */}
        <View style={styles.debtCard}>
          <View style={styles.debtCardInner}>
            <View style={[styles.debtBadge, { 
              backgroundColor: isPlayerWinner ? "rgba(255, 217, 0, 0.15)" : "rgba(255, 68, 68, 0.15)",
              borderColor: resultColor
            }]}>
              <Text style={[styles.debtBadgeText, { color: resultColor }]}>
                {isPlayerWinner ? "VICTORY" : "DEFEAT"}
              </Text>
            </View>

            <View style={[styles.debtCircle, { borderColor: resultColor }]}>
              <Text style={[styles.debtCircleTextTop, { color: resultColor }]}>
                {isPlayerWinner ? "YOU" : "OPP"}
              </Text>
              <Text style={[styles.debtCircleTextMain, { color: resultColor }]}>
                {isPlayerWinner ? "WIN" : "LOSE"}
              </Text>
              <Text style={styles.debtCircleTextBottom}>
                {getAttributeLabel(attribute)}
              </Text>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>YOUR SCORE</Text>
                <Text style={[styles.statValue, isPlayerWinner && { color: "#FFD700" }]}>
                  {formatValue(playerNav, attribute)}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>OPP SCORE</Text>
                <Text style={[styles.statValue, !isPlayerWinner && { color: "#FF4444" }]}>
                  {formatValue(opponentNav, attribute)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d1f",
  },
  content: {
    flex: 1,
    paddingHorizontal: "17%",
  },
  mainCard: {
    backgroundColor: "#1d1d1f",
    borderWidth: 2,
    borderColor: "#FFD700",
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: "hidden",
  },
  innerGlowWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1,
  },
  mainCardContent: {
    padding: 24,
    height: 170,
    backgroundColor: "transparent",
  },
  mainCardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  mainCardSubtitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#8EA3B8",
  },
  characterPlaceholder: {
    height: 30,
    marginBottom: 24,
  },
  mainProgressBar: {
    height: 10,
    backgroundColor: "#2A3B52",
    borderRadius: 5,
    overflow: "hidden",
  },
  mainProgressFill: {
    height: "100%",
    backgroundColor: "#FFD700",
    borderRadius: 5,
  },
  comparisonCard: {
    backgroundColor: "#454545",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10, 
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#5a5a5a",
    maxWidth: "100%",
    alignSelf: 'center'
  },

  activeAttrBorder: {
    borderColor: "#FFD700",
    borderWidth: 2,
  },
  comparisonLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 2,
    textAlign: "center",
    marginBottom: 12,
  },
  comparisonValues: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 11,
  },
  valueLeft: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  vsText: {
    fontSize: 9,
    fontWeight: "600",
    color: "#898d91",
  },
  valueRight: {
    fontSize: 20,
    fontWeight: "800",
    color: "#ffffff",
  },
  highlightCard: {
    backgroundColor: "#454545",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderWidth: 3,
   
  },
  highlightHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  highlightLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
  },
  highlightValues: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  highlightValueWin: {
    fontSize: 25,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  highlightValueLose: {
    fontSize: 25,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  winBadge: {
    paddingHorizontal: 6,
    paddingVertical: 8,
    borderWidth: 1,
    backgroundColor: "#000000",
    marginHorizontal: 8,
  },
  winText: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
    fontStyle: "italic",
  },
  helperText: {
    fontSize: 9,
    color: "#8EA3B8",
    textAlign: "center",
    marginTop: 8,
    fontStyle: "italic",
  },
  expenseHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  debtCard: {
    width: "90%",
    marginHorizontal: "auto",
    backgroundColor: "#393838",
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    marginTop: 20,
    padding: 10,
  },
  debtCardInner: {
    backgroundColor: "#4b4a4a",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    position: "relative",
  },
  debtBadge: {
    alignSelf: "flex-end",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    position: "absolute",
    top: 10,
    right: 10,
    borderWidth: 1,
  },
  debtBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
  debtCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  debtCircleTextTop: {
    fontSize: 13,
    fontWeight: "600",
  },
  debtCircleTextMain: {
    fontSize: 22,
    fontWeight: "900",
  },
  debtCircleTextBottom: {
    fontSize: 8,
    fontWeight: "500",
    color: "#8EA3B8",
    textTransform: "uppercase",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 9,
    fontWeight: "600",
    color: "#8EA3B8",
    marginBottom: 6,
    letterSpacing: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  resultIndicator: {
    marginTop: 8,
    alignItems: "center",
  },
  resultIndicatorText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
});