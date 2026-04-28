import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, 
        tabBarActiveTintColor: "#FFD700",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          backgroundColor: "#0D1B2A",
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 20,
        },
      }}
    >
      <Tabs.Screen
        name="index" 
        options={{
          title: "DECK",
          tabBarIcon: ({ color }) => (
            <Ionicons name="copy" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="battle" 
        options={{
          title: "BATTLE",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="sword-cross"
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="vault" 
        options={{
          title: "VAULT",
          tabBarIcon: ({ color }) => (
            <Ionicons name="archive" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
