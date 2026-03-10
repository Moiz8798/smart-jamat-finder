import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { BASE_URL } from "../../config"; // Centralized Config Import

export default function MosquesScreen() {
  const router = useRouter();
  const [nearbyMosques, setNearbyMosques] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: 24.9204,
    longitude: 67.101,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const getDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Using BASE_URL instead of hardcoded IP
        const response = await axios.get(`${BASE_URL}/api/mosques`, {
          timeout: 10000,
        });

        if (!isMounted) return;
        const realMosquesData = response.data;

        let { status } = await Location.requestForegroundPermissionsAsync();
        let userLat = 24.9204;
        let userLon = 67.101;

        if (status === "granted") {
          let loc = await Location.getCurrentPositionAsync({});
          userLat = loc.coords.latitude;
          userLon = loc.coords.longitude;

          setRegion({
            latitude: userLat,
            longitude: userLon,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });
        }

        const processed = realMosquesData
          .map((m: any) => {
            const dist = getDistance(userLat, userLon, m.lat, m.lon);
            return { ...m, dist: dist.toFixed(1) };
          })
          .sort((a: any, b: any) => parseFloat(a.dist) - parseFloat(b.dist));

        setNearbyMosques(processed);
      } catch (error: any) {
        if (!isMounted) return;
        console.error("Data Fetch Error: ", error.message);
        setNearbyMosques([]);
        alert(
          "Unable to connect to the server. Please check your network and try again.",
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#10B981" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 5 }}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.headerTitle}>Nearby Mosques</Text>
          <Text style={styles.headerSub}>
            {nearbyMosques.length} mosques from Database
          </Text>
        </View>
      </View>

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#10B981" />
          <Text style={{ marginTop: 10, color: "gray" }}>
            Loading from Database...
          </Text>
        </View>
      ) : (
        <>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={region}
            showsUserLocation={true}
          >
            {nearbyMosques.map((m, index) => (
              <Marker
                key={m._id}
                coordinate={{ latitude: m.lat, longitude: m.lon }}
                title={m.name}
                pinColor={index === 0 ? "green" : "red"}
              />
            ))}
          </MapView>

          <FlatList
            data={nearbyMosques}
            contentContainerStyle={{ padding: 15 }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[styles.card, index === 0 && styles.nearestCard]}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/mosque-details",
                    params: { ...item, timings: JSON.stringify(item.timings) },
                  })
                }
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.mosqueName}>{item.name}</Text>
                  <Text style={styles.distText}>{item.dist} km</Text>
                </View>
                <Text style={styles.addressText}>{item.location}</Text>
                <Text style={styles.viewDetails}>View Details</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  header: {
    backgroundColor: "#10B981",
    padding: 20,
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  headerSub: { color: "#D1FAE5", fontSize: 12 },
  map: { width: "100%", height: "35%" },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
  },
  nearestCard: { borderColor: "#10B981", borderWidth: 1.5 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  mosqueName: { fontWeight: "bold", fontSize: 16 },
  distText: { color: "#10B981", fontWeight: "bold" },
  addressText: { color: "gray", fontSize: 12, marginTop: 5, marginBottom: 10 },
  viewDetails: {
    color: "#10B981",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
});
