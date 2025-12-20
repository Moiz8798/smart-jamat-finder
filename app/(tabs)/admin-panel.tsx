import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { usePrayerTimings } from './PrayerTimingsContext';

export default function AdminPanel() {
  const router = useRouter();
  const { timings, setTimings } = usePrayerTimings();

  const handleSave = () => {
    Alert.alert('Success', 'Timings updated successfully');
    router.back();
  };

  const normalPrayers = ['Fajr', 'Zuhr', 'Asr', 'Maghrib', 'Isha'];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#10B981', '#059669']} style={styles.header}>
        <SafeAreaView>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={22} color="white" />
          </TouchableOpacity>

          <Text style={styles.title}>Admin Panel</Text>
          <Text style={styles.subtitle}>Update Mosque Timings</Text>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>

        {/* 🔹 DAILY PRAYERS */}
        <Text style={styles.sectionTitle}>Daily Prayer Timings</Text>

        {normalPrayers.map((key) => (
          <View key={key} style={styles.field}>
            <Text style={styles.label}>{key}</Text>
            <TextInput
              value={timings[key as keyof typeof timings]}
              onChangeText={(text) =>
                setTimings({ ...timings, [key]: text })
              }
              placeholder="e.g. 05:30 AM"
              style={styles.input}
            />
          </View>
        ))}

        {/* 🔸 JUMMAH SECTION */}
        <Text style={styles.sectionTitle}>Friday Jummah</Text>

        <View style={styles.jummahField}>
          <Text style={styles.jummahLabel}>Jummah Prayer Time</Text>
          <TextInput
            value={timings.Jummah}
            onChangeText={(text) =>
              setTimings({ ...timings, Jummah: text })
            }
            placeholder="e.g. 01:45 PM"
            style={styles.jummahInput}
          />
        </View>

        {/* 💾 SAVE BUTTON */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>💾 Save Timings</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },

  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 6,
  },

  subtitle: {
    color: '#D1FAE5',
    marginTop: 2,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 10,
    marginTop: 12,
  },

  field: {
    marginBottom: 14,
  },

  label: {
    fontWeight: '600',
    marginBottom: 6,
    color: '#374151',
  },

  input: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  jummahField: {
    backgroundColor: '#ECFDF5',
    padding: 14,
    borderRadius: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
    marginBottom: 20,
  },

  jummahLabel: {
    fontWeight: '700',
    marginBottom: 8,
    color: '#065F46',
  },

  jummahInput: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },

  saveBtn: {
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  saveText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },

  cancel: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 16,
    fontSize: 14,
  },
});
