import AssetCard from "@/components/AssestCard";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const assets = [
    {
      id: 1,
      type: "EQUITY",
      name: "Vanguard 5...",
      subtitle: "S&P 500 INDEX",
      metric: "YTD Return",
      value: "+14.2%",
      progress: 0.7,
      color: "#F0A726",
      icon: "👦🏻",
    },
    {
      id: 2,
      type: "DEBT",
      name: "Fidelity Bond",
      subtitle: "TOTAL RETURN",
      metric: "Yield",
      value: "4.8%",
      progress: 0.5,
      color: "#7B91B3",
      icon: "👨🏻",
    },
    {
      id: 3,
      type: "HYBRID",
      name: "Balanced A...",
      subtitle: "MULTI-ASSET",
      metric: "1Y Growth",
      value: "+8.5%",
      progress: 0.6,
      color: "#5A7C9E",
      icon: "🛡️",
    },
    {
      id: 4,
      type: "EQUITY",
      name: "QQQ Trust",
      subtitle: "TECH FOCUS",
      metric: "YTD Return",
      value: "+22.1%",
      progress: 0.85,
      color: "#F0A726",
      icon: "🦊",
    },
  ];

  const leftColumnAssets = assets.filter((_, index) => index % 2 === 0);
  const rightColumnAssets = assets.filter((_, index) => index % 2 === 1);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>My Deck</Text>
          <Text style={styles.subtitle}>4 ACTIVE ASSETS</Text>
        </View>

        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={15} color="#ffffff" />
        </TouchableOpacity>

        <View style={styles.grid}>
          <View style={styles.columnLeft}>
            {leftColumnAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </View>

          <View style={styles.columnRight}>
            {rightColumnAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1B2E",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 40,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 2,
  },
  searchButton: {
    position: "absolute",
    right: 20,
    top: 50,
    width: 40,
    height: 40,
    backgroundColor: "#3b3c3e",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A3B52",
  },
  grid: {
    flexDirection: "row",
    marginTop: 20,
    paddingBottom: 100,
    justifyContent: "space-between",
  },
  columnLeft: {
    width: "48%",
  },
  columnRight: {
    width: "48%",
    marginTop: 20,
  },
});
