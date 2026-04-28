import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

function CustomNavbar() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.navContainer, { paddingTop: insets.top + 10 }]}>
      <TouchableOpacity style={styles.profileBox}>
        <View style={styles.innerProfile}>
          <Ionicons name="person" size={16} color="#A0AEC0" />
        </View>
      </TouchableOpacity>

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

        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#0D1B2A" },
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="details"
            options={{
              presentation: "card",
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="battleResult"
            options={{
              presentation: "card",
              animation: "slide_from_bottom",
            }}
          />
        </Stack>
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
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  brandContainer: {
    flex: 1,
    alignItems: "center",
  },
  brandText: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    textShadowColor: "rgba(255, 215, 0, 0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  profileBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
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
