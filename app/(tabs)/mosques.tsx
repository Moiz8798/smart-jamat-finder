import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

interface MosqueData {
  id: string;
  name: string;
  distance: string;
  location: string;
  nextPrayer: string;
}

const MOSQUES_DATA: MosqueData[] = [
  {
    id: '1',
    name: 'Masjid Al-Noor',
    distance: '0.5 km',
    location: 'Block 15, Gulistan-e-Johar',
    nextPrayer: 'Asr - 4:45 PM',
  },
  {
    id: '2',
    name: 'Jamia Masjid Baitul Mukarram',
    distance: '1.2 km',
    location: 'Gulshan-e-Iqbal',
    nextPrayer: 'Asr - 4:50 PM',
  },
  {
    id: '3',
    name: 'Masjid Bilal',
    distance: '1.8 km',
    location: 'Buffer Zone',
    nextPrayer: 'Asr - 4:45 PM',
  },
  {
    id: '4',
    name: 'Masjid-e-Tooba',
    distance: '2.3 km',
    location: 'Defence Housing Authority',
    nextPrayer: 'Asr - 5:00 PM',
  },
  {
    id: '5',
    name: 'Grand Jamia Masjid',
    distance: '3.1 km',
    location: 'Bahria Town',
    nextPrayer: 'Asr - 4:55 PM',
  },
];

export default function MosquesScreen() {
  const router = useRouter();

  const renderMosqueCard = ({ item }: { item: MosqueData }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.mosqueName}>{item.name}</Text>
        <Text style={styles.distanceText}>{item.distance}</Text>
      </View>

      <View style={styles.infoRow}>
        <Feather name="map-pin" size={14} color="#6B7280" />
        <Text style={styles.infoText}>{item.location}</Text>
      </View>

      <View style={styles.infoRow}>
        <Feather name="clock" size={14} color="#10B981" />
        <Text style={styles.prayerText}>{item.nextPrayer}</Text>
      </View>

      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() =>
          router.push({
            pathname: '/mosque-details',
            params: {
              name: item.name,
              location: item.location,
              distance: item.distance,
            },
          })
        }
      >
        <Feather name="navigation" size={16} color="#10B981" />
        <Text style={styles.detailsButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <LinearGradient colors={['#10B981', '#059669']} style={styles.header}>
        <SafeAreaView>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()}>
              <Feather name="arrow-left" size={24} color="white" />
            </TouchableOpacity>

            <View>
              <Text style={styles.headerTitle}>Nearby Mosques</Text>
              <Text style={styles.headerSubtitle}>5 mosques found</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <FlatList
        data={MOSQUES_DATA}
        renderItem={renderMosqueCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: {
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  headerSubtitle: { fontSize: 14, color: '#D1FAE5' },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  mosqueName: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  distanceText: { color: '#10B981', fontWeight: '600' },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 6 },
  infoText: { color: '#6B7280' },
  prayerText: { fontWeight: '500' },
  detailsButton: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#10B981',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ECFDF5',
  },
  detailsButtonText: { color: '#10B981', fontWeight: '600' },
});
