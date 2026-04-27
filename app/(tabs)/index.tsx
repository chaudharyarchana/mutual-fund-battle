import AssetCard from "@/components/AssetCard";
import { useFunds } from "@/hooks/useFunds";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  // limit 4 for frontend-side pagination
  const { funds, loading, error, refetch, loadMore, hasMore, refreshing } =
    useFunds(4);
  const [loadingMore, setLoadingMore] = useState(false);

  const leftColumnFunds = funds.filter((_, index) => index % 2 === 0);
  const rightColumnFunds = funds.filter((_, index) => index % 2 === 1);

  const handleLoadMore = () => {
    if (hasMore && !loadingMore && !loading) {
      setLoadingMore(true);
      loadMore();
      // Keep state active briefly to let the layout settle
      setTimeout(() => setLoadingMore(false), 1000);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.content}
        // This pushes the internal content up so the loader clears the bottom bar
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        // Higher throttle (16ms) makes scroll detection much more responsive
        scrollEventThrottle={16}
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          // Trigger 150px before the bottom to make it feel seamless
          const isCloseToBottom =
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 150;

          if (isCloseToBottom) {
            handleLoadMore();
          }
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
          <Text style={styles.subtitle}>
            {funds.length} ACTIVE ASSET{funds.length !== 1 ? "S" : ""}
          </Text>
        </View>

        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={15} color="#ffffff" />
        </TouchableOpacity>

        {funds.length === 0 && !loading ? (
          <Text style={styles.emptyText}>No funds available</Text>
        ) : (
          <>
            <View style={styles.grid}>
              <View style={styles.columnLeft}>
                {leftColumnFunds.map((fund) => (
                  <AssetCard key={fund.id} asset={fund} />
                ))}
              </View>
              <View style={styles.columnRight}>
                {rightColumnFunds.map((fund) => (
                  <AssetCard key={fund.id} asset={fund} />
                ))}
              </View>
            </View>

            {/* SPACED FOOTER SECTION */}
            <View style={styles.footerContainer}>
              {loadingMore ? (
                <View style={styles.loadMoreContainer}>
                  <ActivityIndicator size="small" color="#FFD700" />
                  <Text style={styles.loadMoreText}>Loading more...</Text>
                </View>
              ) : !hasMore && funds.length > 0 ? (
                <Text style={styles.endOfListText}>That's all the funds!</Text>
              ) : (
                // Maintain height even when not loading to prevent layout jumps
                <View style={{ height: 50 }} />
              )}
            </View>
          </>
        )}
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
  },
  scrollContent: {
    paddingHorizontal: 20,
    // CRITICAL: Padding must be greater than your bottom bar height (e.g., 140)
    paddingBottom: 140,
  },
  titleSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 40,
    fontWeight: "800",
    color: "#FFFFFF",
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
    zIndex: 10,
  },
  grid: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
  columnLeft: { width: "48%" },
  columnRight: { width: "48%", marginTop: 20 },
  footerContainer: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: 60,
  },
  loadMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  loadMoreText: { color: "#8EA3B8", fontSize: 14 },
  endOfListText: { color: "#5A6B7D", fontSize: 14, fontStyle: "italic" },
  emptyText: { color: "#FFFFFF", textAlign: "center", marginTop: 50 },
});
