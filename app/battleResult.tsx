import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

export default function Battle() {
    const params = useLocalSearchParams();
  
  const attribute = (params.attribute as string) || "return";
  const playerNav = (params.playerNav as string) || "Unknown Fund";
  const opponentNav = (params.opponentNav as string) || "Unknown Fund";

  
  const isPlayerWinner =  parseInt(playerNav) > parseInt(opponentNav) ? true : false;
  const resultColor = isPlayerWinner ? "#FFD700" : "#FF4444";
  
  const pVal = Math.floor(parseFloat(params.playerNav as string)) || 0;
  const oVal = Math.floor(parseFloat(params.opponentNav  as string)) || 0;
  
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
              <Text style={styles.mainCardTitle}>Apex Growth</Text>
              <Text style={styles.mainCardSubtitle}>Large Cap Equity</Text>

              <View style={styles.characterPlaceholder} />

              <View style={styles.mainProgressBar}>
                <View style={styles.mainProgressFill} />
              </View>
            </View>
          </View>
        </Shadow>



        {/* NAV Attribute Row */}
        <View style={[styles.comparisonCard, attribute === 'nav' && styles.activeAttrBorder]}>
          <Text style={styles.comparisonLabel}>1Y RETURN </Text>
          <View style={styles.comparisonValues}>
            <Text style={styles.valueLeft}>{attribute === 'nav' ? pVal : "---"}</Text>
            <Text style={styles.vsText}>VS</Text>
            <Text style={styles.valueRight}>{attribute === 'nav' ? oVal : "---"}</Text>
          </View>
          {attribute === 'nav' && (
            <View style={styles.resultIndicator}>
               <Text style={[styles.resultIndicatorText]}>{isPlayerWinner ? "WIN" : "LOSE"}</Text>
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
              <Text style={[styles.highlightLabel, attribute !== 'return' && { color: '#8EA3B8' }]}>NAV ₹</Text>
              {attribute === 'return' && <Ionicons name={isPlayerWinner ? "trophy" : "close-circle"} size={20} color={resultColor} />}
            </View>
            <View style={styles.highlightValues}>
              <Text style={styles.highlightValueWin}>{attribute === 'return' ? `${pVal}` : "--%"}</Text>
              {attribute === 'return' && (
                <View style={[styles.winBadge, { borderColor: resultColor }]}>
                  <Text style={[styles.winText, { color: resultColor }]}>{isPlayerWinner ? "WIN" : "LOSE"}</Text>
                </View>
              )}
              <Text style={styles.highlightValueLose}>{attribute === 'return' ? `${oVal}` : "--%"}</Text>
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

    

        {/* Debt Fund Card */}
        <View style={styles.debtCard}>
          <View style={styles.debtCardInner}>
            <View style={styles.debtBadge}>
              <Text style={styles.debtBadgeText}>DEBT</Text>
            </View>

            <View style={styles.debtCircle}>
              <Text style={styles.debtCircleTextTop}>DEBT</Text>
              <Text style={styles.debtCircleTextMain}>FUND</Text>
              <Text style={styles.debtCircleTextBottom}>SAFE WORK</Text>
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
    overflowY: "hidden",
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
    elevation: 0,
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
    width: "85%",
    backgroundColor: "#FFD700",
    borderRadius: 5,
  },
  comparisonCard: {
    width: "70%",
    backgroundColor: "#454545",
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    marginHorizontal: "auto",
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
    borderColor: "#FFD700",
    elevation: 0,
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
    color: "#FFD700",
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
    color: "#7b7777",
  },
  winBadge: {
    paddingHorizontal: 6,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#FFD700",
    backgroundColor: "#000000",
  },
  winText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFD700",
    letterSpacing: 1,
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
    height: 300,
  },
  debtCardInner: {
    backgroundColor: "#4b4a4a",
    width: "100%",
    height: "100%",
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignItems: "center",
    position: "relative",
  },
  debtBadge: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(144, 147, 151, 0.15)",
    borderColor: "#c0bdbd",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    position: "absolute",
    top: 10,
    right: 10,
  },

  debtBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#c0bdbd",
    letterSpacing: 1,
  },
  debtCircle: {
    width: 100,
    height: 100,
    borderRadius: 80,
    borderWidth: 5,
    borderColor: "#979696",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  debtCircleTextTop: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6e6e6e",
  },
  debtCircleTextMain: {
    fontSize: 22,
    fontWeight: "900",
    color: "#aeaeae",
  },
  debtCircleTextBottom: {
    fontSize: 5,
    fontWeight: "500",
    color: "#6e6e6e",
  },
});
