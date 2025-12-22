// app/index.tsx (Fully Updated & Error-Free Version)
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Find Nearby Mosques',
    subtitle: 'Discover mosques around you with accurate locations and directions',
    image: require('../assets/images/onboarding1.png'),
  },
  {
    id: '2',
    title: 'Live Jamat Timings',
    subtitle: 'Get real-time prayer times and never miss a Jamat again',
    image: require('../assets/images/onboarding2.png'),
  },
  {
    id: '3',
    title: 'Smart Recommendations',
    subtitle: 'Receive personalized notifications for prayer times and nearby mosques',
    image: require('../assets/images/onboarding3.png'),
  },
];

export default function Onboarding() {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const next = () => {
    if (index < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: index + 1 });
    } else {
      router.replace('/login');
    }
  };

  const previous = () => {
    if (index > 0) {
      flatListRef.current?.scrollToIndex({ index: index - 1 });
    }
  };

  return (
    <View style={styles.container}>
      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={e => {
          const slideIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setIndex(slideIndex);
        }}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        )}
      />

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              index === i ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.bottomContainer}>
        <View style={styles.navButtons}>
          {/* Previous Button - Only show when index > 0 */}
          {index > 0 ? (
            <Pressable
              onPress={previous}
              style={({ pressed }) => [
                styles.prevButton,
                pressed && { backgroundColor: '#BFDBFE' }, // Darker blue on press
                pressed && { transform: [{ scale: 0.95 }] }, // Slight shrink effect
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Text style={styles.prevText}>‹ Previous</Text>
            </Pressable>
          ) : (
            // Placeholder to maintain layout symmetry (no shift)
            <View style={{ minWidth: 120 }} />
          )}

          {/* Next / Get Started Button */}
          <Pressable
            onPress={next}
            style={({ pressed }) => [
              styles.nextButton,
              pressed && { backgroundColor: '#059669' }, // Darker green on press
              pressed && { transform: [{ scale: 0.95 }] },
              { opacity: pressed ? 0.9 : 1 },
            ]}
          >
            <Text style={styles.nextText}>
              {index === slides.length - 1 ? 'Get Started' : 'Next ›'}
            </Text>
          </Pressable>
        </View>

        {/* Skip Button */}
        <Pressable
          onPress={() => router.replace('/login')}
          style={({ pressed }) => ({
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.15,
    paddingHorizontal: 40,
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    resizeMode: 'contain',
    marginBottom: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  inactiveDot: {
    backgroundColor: '#D1FAE5',
  },
  activeDot: {
    width: 30,
    backgroundColor: '#10B981',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  prevButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    backgroundColor: '#DBEAFE',
  },
  prevText: {
    color: '#1D4ED8',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  skipText: {
    color: '#1D4ED8',
    fontSize: 16,
    fontWeight: '500',
  },
});