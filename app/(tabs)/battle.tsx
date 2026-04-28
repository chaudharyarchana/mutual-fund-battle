import { getSavedDeck } from "@/hooks/storageService";
import { useFunds } from "@/hooks/useFunds";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BattleSelection() {
  const router = useRouter();
  const [myDeck, setMyDeck] = useState<any[]>([]);
  const [selectedMyCard, setSelectedMyCard] = useState<any>(null);
  const [selectedOpponent, setSelectedOpponent] = useState<any>(null);
  const [selectedAttribute, setSelectedAttribute] = useState<string>("return");

  const attributes = [
    { id: "nav", label: "NAV", icon: "cash-outline" },
    { id: "return", label: "1Y RETURN", icon: "trending-up-outline" },
    { id: "expense", label: "EXPENSE RATIO", icon: "shield-checkmark-outline" },
  ];

  const { funds: marketFunds } = useFunds(1);

  useEffect(() => {
    loadDeck();
  }, []);

  const loadDeck = async () => {
    const cards = await getSavedDeck();
    setMyDeck(cards);
  };

  const startBattle = () => {
    if (selectedMyCard && selectedOpponent) {
      router.push({
        pathname: "/battleResult",
        params: { 
          playerAmfi: selectedMyCard.id,
          opponentAmfi: selectedOpponent.id,
          attribute: selectedAttribute
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CHOOSE YOUR FIGHTER</Text>

      <View style={styles.selectionRow}>
        <View style={styles.slot}>
          <Text style={styles.slotLabel}>YOUR CARD</Text>
          <TouchableOpacity 
            style={[styles.cardPicker, selectedMyCard && styles.activePicker]}
            onPress={() => setSelectedMyCard(null)} 
          >
            {selectedMyCard ? (
              <Text style={styles.pickerText}>{selectedMyCard.name}</Text>
            ) : (
              <Ionicons name="add" size={40} color="#2A3B52" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>VS</Text>
        </View>

        <View style={styles.slot}>
          <Text style={styles.slotLabel}>OPPONENT</Text>
          <TouchableOpacity 
            style={[styles.cardPicker, selectedOpponent && styles.activePicker]}
          >
            {selectedOpponent ? (
              <Text style={styles.pickerText}>{selectedOpponent.name}</Text>
            ) : (
              <Ionicons name="help" size={40} color="#2A3B52" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.attributeSection}>
        <Text style={styles.sectionTitle}>CHOOSE BATTLE ATTRIBUTE</Text>
        <View style={styles.attributeGrid}>
          {attributes.map((attr) => (
            <TouchableOpacity
              key={attr.id}
              style={[
                styles.attributeCard,
                selectedAttribute === attr.id && styles.selectedAttributeCard,
              ]}
              onPress={() => setSelectedAttribute(attr.id)}
            >
              <Ionicons 
                name={attr.icon as any} 
                size={20} 
                color={selectedAttribute === attr.id ? "#0D1B2A" : "#FFD700"} 
              />
              <Text style={[
                styles.attributeLabel,
                selectedAttribute === attr.id && styles.selectedAttributeLabel
              ]}>
                {attr.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>SELECT FROM VAULT</Text>
        <FlatList
          data={myDeck}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.miniCard, selectedMyCard?.id === item.id && styles.selectedBorder]}
              onPress={() => setSelectedMyCard(item)}
            >
              <Text style={styles.miniCardText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>SELECT OPPONENT (MARKET)</Text>
        <FlatList
          data={marketFunds}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.miniCard, selectedOpponent?.id === item.id && styles.selectedBorder]}
              onPress={() => setSelectedOpponent(item)}
            >
              <Text style={styles.miniCardText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity 
        style={[styles.battleButton, (!selectedMyCard || !selectedOpponent) && styles.disabledButton]}
        onPress={startBattle}
        disabled={!selectedMyCard || !selectedOpponent}
      >
        <Text style={styles.battleButtonText}>ENTER BATTLE ARENA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D1B2A", padding: 20 },
  title: { color: "#FFD700", fontSize: 24, fontWeight: "900", textAlign: "center", marginTop: 40, letterSpacing: 2 },
  selectionRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 30 },
  slot: { width: "40%", alignItems: "center" },
  slotLabel: { color: "#8EA3B8", fontSize: 10, fontWeight: "bold", marginBottom: 10 },
  cardPicker: { width: "100%", height: 120, backgroundColor: "#1A2634", borderRadius: 15, borderWidth: 2, borderColor: "#2A3B52", justifyContent: "center", alignItems: "center", padding: 10 },
  activePicker: { borderColor: "#FFD700" },
  pickerText: { color: "#FFF", fontSize: 12, fontWeight: "bold", textAlign: "center" },
  vsContainer: { width: "15%", alignItems: "center" },
  vsText: { color: "#FFD700", fontSize: 28, fontWeight: "900", fontStyle: "italic" },
  attributeSection: { marginBottom: 30 },
  attributeGrid: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  attributeCard: { flex: 1, backgroundColor: "#1A2634", padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#FFD700", alignItems: "center", gap: 5 },
  selectedAttributeCard: { backgroundColor: "#FFD700" },
  attributeLabel: { color: "#FFD700", fontSize: 8, fontWeight: "900", textAlign: "center" },
  selectedAttributeLabel: { color: "#0D1B2A" },
  listSection: { marginBottom: 20 },
  sectionTitle: { color: "#8EA3B8", fontSize: 12, fontWeight: "bold", marginBottom: 15 },
  miniCard: { width: 120, height: 60, backgroundColor: "#1E293B", borderRadius: 10, marginRight: 10, padding: 10, justifyContent: "center" },
  miniCardText: { color: "#FFF", fontSize: 10, fontWeight: "bold" },
  selectedBorder: { borderWidth: 2, borderColor: "#FFD700" },
  battleButton: { backgroundColor: "#FFD700", padding: 20, borderRadius: 15, alignItems: "center", marginTop: "auto", marginBottom: 20 },
  disabledButton: { backgroundColor: "#2A3B52", opacity: 0.5 },
  battleButtonText: { color: "#0D1B2A", fontWeight: "900", letterSpacing: 1 },
});