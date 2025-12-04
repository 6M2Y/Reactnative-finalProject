import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { slides } from '../utils/slides';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }: any) => {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleDone = async () => {
    await AsyncStorage.setItem('onboardingShown', 'true');
    navigation.replace('AuthStack');
  };

  const handleNext = () => {
    if (index < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: index + 1 });
    } else {
      handleDone();
    }
  };

  const renderSlide = ({ item }: any) => (
    <View style={styles.slide}>
      <Image style={styles.image} source={item.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.desc}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      {index < slides.length - 1 && (
        <TouchableOpacity onPress={handleDone} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(_, i) => i.toString()}
        showsHorizontalScrollIndicator={false}
        onScroll={e => {
          const pageIndex = Math.round(
            e.nativeEvent.contentOffset.x /
              e.nativeEvent.layoutMeasurement.width,
          );
          setIndex(pageIndex);
        }}
      />

      {/* Pagination Dots */}
      <View style={styles.dotsContainer}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, i === index && styles.activeDot]} />
        ))}
      </View>

      {/* Next or Get Started */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {index === slides.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  slide: {
    width,
    alignItems: 'center',
    padding: 20,
  },

  image: {
    width: 280,
    height: 280,
    marginVertical: 20,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },

  desc: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#666',
  },

  // Skip button in top right corner
  skipBtn: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    fontSize: 16,
    color: '#666',
  },

  // pagination dots
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },

  dot: {
    height: 8,
    width: 8,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#4caf50',
    width: 20,
  },

  button: {
    backgroundColor: '#4caf50',
    marginHorizontal: 40,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OnboardingScreen;
