import SavedCard from "@/components/SavedCard";
import { getSavedDeck, removeFromDeck } from "@/hooks/storageService";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";

export default function Vault() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const [savedDeck, setSavedDeck] = useState<any[]>([]);

  useEffect(() => {
    if (isFocused) {
      loadDeck();
    }
  }, [isFocused]);

  const loadDeck = async () => {
    const cards = await getSavedDeck();
    setSavedDeck(cards);
  };

  const handleRemove = (id: string) => {
    Alert.alert("Remove Card", "Are you sure you want to delete this card?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          const updated = await removeFromDeck(id);
          setSavedDeck(updated);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>My Deck</Text>
        <Text style={styles.statsText}>
          {savedDeck.length} ACTIVE ASSETS • ${ (savedDeck.length * 28500).toLocaleString() } TOTAL VALUE
        </Text>
      </View>

      <FlatList
        data={savedDeck}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={280} 
       renderItem={({ item }) => (
        <SavedCard
        asset={item}
        onPress={() => router.push({ pathname: "/details", params: { amfi_code: item.id } })}
        onLongPress={() => handleRemove(item.id)}
        />
)}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="card-outline" size={60} color="#2A3B52" />
            <Text style={styles.emptyText}>Your Vault is empty</Text>
            <Text style={styles.emptySubtext}>Long press cards in the Market to collect them</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1B2A",
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 25,
  },
  mainTitle: {
    fontSize: 42,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -1,
  },
  statsText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 1.5,
    marginTop: 5,
    textTransform: "uppercase",
  },
  listContent: {
    paddingLeft: 25,
    paddingRight: 50,
    marginTop: 40,
  },
  cardWrapper: {
    marginRight: 20,
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    marginTop: -100,
  },
  emptyText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
  },
  emptySubtext: {
    color: "#5A6B7D",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 40,
  },
  deleteIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    opacity: 0.6,
  },
  deleteText: {
    color: "#8EA3B8",
    fontSize: 10,
    marginLeft: 5,
    fontWeight: "600",
  },
});