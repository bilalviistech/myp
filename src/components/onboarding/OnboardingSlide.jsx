import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function OnboardingSlide({
  title,
  subtitle,
  backgroundImage,
  isLast = false,
  onNext,
  onSkip,
  currentIndex,
  totalSlides,
  setHasSeenOnboarding,
}) {
  const navigation = useNavigation();
  const registerloginHandler = async (name) => {
    await setHasSeenOnboarding();
    navigation.replace('AuthStack', { screen: name }); 
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <LinearGradient
        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {!isLast && (
            <TouchableOpacity onPress={onSkip} style={{ flex: 1 }}>
              <Text style={{ color: '#232222', fontSize: 20, fontWeight: '600', textAlign: "right" }}>Skip</Text>
            </TouchableOpacity>
          )}

          {/* Content */}
          <View style={{ textAlign: "center", flex: 1, justifyContent: 'flex-end' }}>
            <Text style={[styles.title, isLast ? { textAlign: 'start', marginHorizontal: 0 } : {}]}>{title}</Text>
            {subtitle && <Text style={[styles.subtitle, isLast ? { textAlign: 'start', marginHorizontal: 0, marginBottom: 10 } : {}]}>{subtitle}</Text>}
          </View>

          {
            !isLast && (
              <View style={styles.dotsContainer}>
                {Array.from({ length: totalSlides - 1 }).map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      i === currentIndex ? { backgroundColor: '#CDFF00' } : { backgroundColor: 'white' },
                    ]}
                  />
                ))}
              </View>
            )
          }

          {/* Button bottom */}
          {
            !isLast ? (
              <TouchableOpacity
                style={[styles.button, isLast ? { backgroundColor: '#CDFF00' } : { backgroundColor: '#CDFF00' }]}
                onPress={onNext}
              >
                <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>
                  {isLast ? 'Get Started' : 'Next'}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={{ justifyContent: 'flex-end' }}>
                <TouchableOpacity style={{ marginVertical: 6, paddingVertical: 16, borderRadius: 15, alignItems: 'center', marginTop: 20, backgroundColor: '#CDFF00', fontSize: "15px" }} onPress={() => registerloginHandler('Login')}>
                  <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>
                    Login
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginVertical: 6, paddingVertical: 16, borderRadius: 15, alignItems: 'center', backgroundColor: '#FFFFFF' }}
                  onPress={() => registerloginHandler('Register')}
                >
                  <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            )
          }
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width, height },
  container: { flex: 1, justifyContent: 'space-between', paddingVertical: 60, marginHorizontal: 25 },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: { width: 22, height: 3, borderRadius: 2, marginHorizontal: 2 },
  skipButton: { alignSelf: 'flex-end' },
  content: { flex: 1, justifyContent: 'center', backgroundColor: "blue" },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: "Gabarito",
    marginHorizontal: 50,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
    marginHorizontal: 48
  },
  button: {
    marginVertical: 20,
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
});