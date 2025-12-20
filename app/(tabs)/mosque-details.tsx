import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Linking,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePrayerTimings } from './PrayerTimingsContext';

export default function MosqueDetails() {
  const router = useRouter();
  const { name, location, distance } = useLocalSearchParams();
  const { timings } = usePrayerTimings();

  const handleDirections = () => {
    const query = encodeURIComponent(location as string);
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${query}`
    );
  };

  const handleReminder = () => {
    Alert.alert('Reminder', 'Reminder feature coming soon');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#10B981', '#059669']} style={styles.header}>
        <SafeAreaView>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>

          <Text style={styles.title}>{name}</Text>
          <Text style={styles.sub}>
            {location} • {distance} away
          </Text>
        </SafeAreaView>
      </LinearGradient>

      {/* ACTION BUTTONS */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.directionBtn} onPress={handleDirections}>
          <Feather name="navigation" size={18} color="white" />
          <Text style={styles.directionText}>Get Directions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reminderBtn} onPress={handleReminder}>
          <Feather name="bell" size={18} color="#10B981" />
          <Text style={styles.reminderText}>Set Reminder</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Today's Jamat Timings</Text>

        {/* ✅ Normal Prayer Timings */}
        {Object.entries(timings)
          .filter(([key]) => key !== 'Jummah')
          .map(([key, value]) => (
            <View key={key} style={styles.timingRow}>
              <Text style={styles.prayerName}>{key}</Text>
              <Text style={styles.prayerTime}>{value}</Text>
            </View>
          ))}

        {/* ✅ Jummah Special Card */}
        <Text style={styles.sectionTitle}>Friday Jummah</Text>

        <View style={styles.jummahCard}>
          <Text style={styles.jummahText}>Jummah Prayer</Text>
          <Text style={styles.jummahTime}>{timings.Jummah}</Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push('/admin-login')}
          style={styles.adminBtn}
        >
          <Text style={styles.adminText}>
            Mosque Admin? Update Timings
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  /* ===== HEADER ===== */
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40, // ✅ space for action buttons
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 12,
  },

  sub: {
    color: '#D1FAE5',
    marginTop: 4,
    fontSize: 14,
  },

  /* ===== ACTION BUTTONS ===== */
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#F3F4F6',
  },

  directionBtn: {
    flex: 1,
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  directionText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },

  reminderBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  reminderText: {
    color: '#10B981',
    fontWeight: '700',
    fontSize: 15,
  },

  /* ===== CONTENT ===== */
  content: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 10,
    color: '#1F2937',
  },

  timingRow: {
    backgroundColor: '#ECFDF5',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },

  prayerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#065F46',
  },

  prayerTime: {
    fontSize: 15,
    fontWeight: '700',
    color: '#10B981',
  },

  /* ===== JUMMAH ===== */
  jummahCard: {
    backgroundColor: '#DCFCE7',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
  },

  jummahText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#065F46',
  },

  jummahTime: {
    fontSize: 16,
    fontWeight: '800',
    color: '#047857',
  },

  /* ===== ADMIN LINK ===== */
  adminBtn: {
    marginTop: 20,
    alignItems: 'center',
  },

  adminText: {
    color: '#10B981',
    fontWeight: '600',
    fontSize: 14,
  },
});

