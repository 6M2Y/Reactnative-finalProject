import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

// Fireworks animation component for task completion celebration
export const FireworksAnim = ({ show }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const lottieRef = useRef(null);

  useEffect(() => {
    if (show) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        lottieRef.current?.play();

        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }).start();
        }, 2500);
      });
    }
  }, [show]);

  if (!show) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <LottieView
        ref={lottieRef}
        source={require('../../assets/animations/fireworks.json')}
        loop={false}
        autoPlay={false}
        style={styles.animation}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    elevation: 100, // IMPORTANT ON ANDROID
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});
