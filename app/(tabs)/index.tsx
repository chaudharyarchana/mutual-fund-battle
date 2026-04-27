import AssetCard from "@/components/AssetCard";
import { useFunds } from "@/hooks/useFunds";
import { useSearch } from "@/hooks/useSearch";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const router = useRouter();
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { funds, loading, loadMore, hasMore, refreshing, refetch } =
    useFunds(4);
  const { searchResults, isSearching } = useSearch(searchQuery);

  const leftColumnFunds = funds.filter((_, index) => index % 2 === 0);
  const rightColumnFunds = funds.filter((_, index) => index % 2 === 1);

  const closeSearch = () => {
    setSearchQuery("");
    setSearchModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          const isCloseToBottom =
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 150;
          if (isCloseToBottom && hasMore && !loading) loadMore();
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refetch}
            tintColor="#FFD700"
          />
        }
      >
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>My Deck</Text>
          <Text style={styles.subtitle}>{funds.length} ACTIVE ASSETS</Text>
        </View>

        {/* Existing search button triggers the modal */}
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => setSearchModalVisible(true)}
        >
          <Ionicons name="search" size={15} color="#ffffff" />
        </TouchableOpacity>

        <View style={styles.grid}>
          <View style={styles.columnLeft}>
            {leftColumnFunds.map((fund) => (
              <AssetCard
                key={fund.id}
                asset={fund}
                onPress={() =>
                  router.push({
                    pathname: "/details",
                    params: { amfi_code: fund.id },
                  })
                }
              />
            ))}
          </View>
          <View style={styles.columnRight}>
            {rightColumnFunds.map((fund) => (
              <AssetCard
                key={fund.id}
                asset={fund}
                onPress={() =>
                  router.push({
                    pathname: "/details",
                    params: { amfi_code: fund.id },
                  })
                }
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Requirement: Search screen as per task table [cite: 28] */}
      <Modal
        animationType="fade"
        visible={searchModalVisible}
        onRequestClose={closeSearch}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeSearch} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TextInput
              autoFocus
              style={styles.modalSearchInput}
              placeholder="Search funds..."
              placeholderTextColor="#8EA3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {isSearching ? (
            <ActivityIndicator style={{ marginTop: 20 }} color="#FFD700" />
          ) : (
            <FlatList
              data={searchResults}
              keyExtractor={(_, idx) => idx.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.searchResultItem}
                  onPress={() => {
                    closeSearch();
                    // Requirement: Tapping a result navigates to card detail
                    router.push({
                      pathname: "/details",
                      params: { amfi_code: item.id },
                    });
                  }}
                >
                  <Text style={styles.resultTitle}>{item.name}</Text>
                  <Text style={styles.resultSubtitle}>{item.subtitle}</Text>
                </TouchableOpacity>
              )}
              // Requirement: Empty state for empty deck/search [cite: 46]
              ListEmptyComponent={() =>
                searchQuery.length > 1 ? (
                  <Text style={styles.emptyText}>
                    No funds found for "{searchQuery}"
                  </Text>
                ) : null
              }
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F1B2E" },
  content: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 140 },
  titleSection: { marginTop: 10, marginBottom: 20 },
  mainTitle: { fontSize: 40, fontWeight: "800", color: "#FFFFFF" },
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
    zIndex: 10,
  },
  grid: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
  columnLeft: { width: "48%" },
  columnRight: { width: "48%", marginTop: 20 },

  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#0F1B2E",
    paddingHorizontal: 20,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  backButton: { marginRight: 15 },
  modalSearchInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#1E293B",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "#FFFFFF",
    fontSize: 16,
  },
  searchResultItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
  },
  resultTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  resultSubtitle: { color: "#8EA3B8", fontSize: 12, marginTop: 4 },
  emptyText: { color: "#8EA3B8", textAlign: "center", marginTop: 40 },
});
