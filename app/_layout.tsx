import { Ionicons } from "@expo/vector-icons";
import { Slot } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

function CustomNavbar() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.navContainer, { paddingTop: insets.top + 10 }]}>
      {/* Profile Icon with the grey-ish border box style from the screen */}
      <TouchableOpacity style={styles.profileBox}>
        <View style={styles.innerProfile}>
          <Ionicons name="person" size={16} color="#A0AEC0" />
        </View>
      </TouchableOpacity>

      {/* Branded Text with Glow and Extra Slant */}
      <View style={styles.brandContainer}>
        <Text style={styles.brandText}>FUND POWERCARD</Text>
      </View>

      <TouchableOpacity>
        <Ionicons name="settings-sharp" size={24} color="#FFD700" />
      </TouchableOpacity>
    </View>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: "#0D1B2A" }}>
        <CustomNavbar />
        <Slot />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: "#0D1B2A",
    // Optional: add a very subtle bottom border if you want separation
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  brandContainer: {
    // This helps center the text precisely
    flex: 1,
    alignItems: "center",
  },
  brandText: {
    color: "#FFD700",
    fontSize: 18, // Slightly larger for impact
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    // The "Glow" effect
    textShadowColor: "rgba(255, 215, 0, 0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  profileBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Muted background
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  innerProfile: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#2D3748",
    justifyContent: "center",
    alignItems: "center",
  },
});
