import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const date = "Saturday, February 14, 2026";

  // Check login status on load
  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        router.replace("/login"); // Agar token nahi hai to login bhej do
      }
    };
    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#10B981" barStyle="light-content" />

      {/* 1. Header Section matching Image 1 */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appTitle}>Smart Jamat Finder</Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/(tabs)/settings")}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* 2. Location Bar */}
      <View style={styles.locationBar}>
        <Ionicons
          name="location-sharp"
          size={18}
          color="white"
          style={{ opacity: 0.8 }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.locLabel}>Current Location</Text>
          <Text style={styles.locText}>Peshawar, Pakistan</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Ionicons name="time-outline" size={20} color="#10B981" />
          <Text style={styles.sectionTitle}> Today's Prayer Times</Text>
        </View>

        <PrayerCard name="Fajr" time="05:30 AM" status="Passed" />
        <PrayerCard name="Zuhr" time="01:15 PM" status="Passed" />
        <PrayerCard name="Asr" time="04:45 PM" status="2h 15m" highlight />
        <PrayerCard name="Maghrib" time="06:30 PM" status="4h 00m" />
        <PrayerCard name="Isha" time="08:00 PM" status="5h 30m" />

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* 4. Find Button matching Image 1 */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.findButton}
          onPress={() => router.push("/(tabs)/mosques")}
        >
          <Ionicons
            name="search"
            size={20}
            color="white"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.btnText}>Find Nearby Mosques</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const PrayerCard = ({ name, time, status, highlight }: any) => (
  <View style={[styles.card, highlight && styles.activeCard]}>
    <View>
      <Text style={styles.prayerName}>{name}</Text>
      <Text style={styles.prayerTime}>{time}</Text>
    </View>
    <Text
      style={[
        styles.status,
        highlight && { color: "#10B981", fontWeight: "bold" },
      ]}
    >
      {status}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  header: {
    backgroundColor: "#10B981",
    padding: 20,
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appTitle: { color: "white", fontSize: 20, fontWeight: "bold" },
  dateText: { color: "#D1FAE5", fontSize: 13, marginTop: 2 },
  locationBar: {
    backgroundColor: "#059669",
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  locLabel: { color: "#A7F3D0", fontSize: 10 },
  locText: { color: "white", fontWeight: "600", fontSize: 14 },
  content: { padding: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
    marginLeft: 5,
  },
  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
  },
  activeCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#10B981",
    backgroundColor: "#ECFDF5",
  },
  prayerName: { fontSize: 16, fontWeight: "bold", color: "#374151" },
  prayerTime: { color: "#6B7280", marginTop: 2, fontSize: 13 },
  status: { color: "#9CA3AF", fontSize: 13 },
  bottomContainer: { position: "absolute", bottom: 20, left: 20, right: 20 },
  findButton: {
    backgroundColor: "#10B981",
    padding: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  btnText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
