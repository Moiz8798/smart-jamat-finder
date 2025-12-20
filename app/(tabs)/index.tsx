import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router'; // Import Router to Navigate

export default function HomeScreen() {
  const router = useRouter(); // Initialize Router
  const [currentDate, setCurrentDate] = useState('');

  // Setup Date
  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(date.toLocaleDateString('en-US', options));
  }, []);

  const PRAYER_TIMES = [
    { name: 'Fajr', time: '05:30 AM', status: 'passed' },
    { name: 'Zuhr', time: '01:15 PM', status: 'passed' },
    { name: 'Asr', time: '04:45 PM', status: 'upcoming', timeLeft: '2h 15m' },
    { name: 'Maghrib', time: '06:30 PM', status: 'upcoming', timeLeft: '4h 00m' },
    { name: 'Isha', time: '08:00 PM', status: 'upcoming', timeLeft: '5h 30m' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* 1. HEADER SECTION */}
      <LinearGradient
        colors={['#10B981', '#059669']}
        style={styles.headerContainer}
      >
        <SafeAreaView>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.appTitle}>Smart Jamat Finder</Text>
              <Text style={styles.dateText}>{currentDate}</Text>
              
              <View style={styles.locationContainer}>
                <Feather name="map-pin" size={14} color="#D1FAE5" />
                <Text style={styles.locationText}>  Karachi, Pakistan</Text>
              </View>
            </View>

            {/* 2. SETTINGS BUTTON (Wired Up) */}
            <TouchableOpacity 
              onPress={() => router.push('/settings')} 
              style={styles.iconButton}
            >
              <Feather name="settings" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* 3. SCROLLABLE CONTENT */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.sectionHeader}>
          <Feather name="clock" size={20} color="#10B981" />
          <Text style={styles.sectionTitle}>  Today's Prayer Times</Text>
        </View>

        {/* Prayer Cards */}
        {PRAYER_TIMES.map((prayer, index) => (
          <View key={index} style={[
            styles.prayerCard, 
            prayer.status === 'upcoming' && styles.activeCard 
          ]}>
            <View>
              <Text style={styles.prayerName}>{prayer.name}</Text>
              <Text style={styles.prayerTime}>{prayer.time}</Text>
            </View>
            {prayer.status === 'passed' ? (
              <Text style={styles.passedText}>Passed</Text>
            ) : (
              <Text style={styles.timeLeftText}>{prayer.timeLeft}</Text>
            )}
          </View>
        ))}

      </ScrollView>

      {/* 4. BOTTOM ACTION BUTTON (Wired Up) */}
      <View style={styles.footerContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/mosques')} // Navigates to Mosques Tab
        >
          <Feather name="search" size={20} color="white" style={{ marginRight: 8 }} />
          <Text style={styles.actionButtonText}>Find Nearby Mosques</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  headerContainer: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#D1FAE5',
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  locationText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  iconButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Space for the bottom button
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  prayerCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  activeCard: {
    backgroundColor: '#ECFDF5', // Light green bg for upcoming
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  prayerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  prayerTime: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  passedText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  timeLeftText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '700',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 20, // Moves it up from the very bottom
    left: 20,
    right: 20,
  },
  actionButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});