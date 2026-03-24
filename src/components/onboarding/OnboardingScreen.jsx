import React, { useState, useRef } from 'react';
import { View, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent, StatusBar } from 'react-native';
import OnboardingSlide from './OnboardingSlide';
import { setHasSeenOnboarding } from '../../services/storage';
import { useNavigation } from '@react-navigation/native';
import onboarding1 from "../../assets/images/onboarding1.png"
import onboarding2 from "../../assets/images/onboarding2.jpg"
import onboarding3 from "../../assets/images/onboarding3.jpg"
import onboarding4 from "../../assets/images/onboarding4.jpg"

const { width } = Dimensions.get('window');

const slides = [
  {
    title: "Your Face Knows Your Health",
    subtitle: "A quick 30-second face scan every day gives you real health insights!",
    isFaceScan: true,
    background: onboarding1
  },
  {
    title: "Home Workout",
    subtitle: "Simple, easy and effective exercise at your home.",
    background: onboarding2
  },
  {
    title: "Get Better Result Today!",
    subtitle: "You don't have to do more, just do the right thing!",
    background: onboarding3
  },
  {
    title: "Start your Fitness Journey",
    subtitle: "Enter the verification code we just sent on your email address.",
    background: onboarding4,
    isLast: true,
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const goToNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      // Last slide → finish onboarding
      setHasSeenOnboarding().then(() => {
        navigation.replace('Login'); // ya 'Auth' stack
      });
    }
  };

  const skipOnboarding = async () => {
    await setHasSeenOnboarding();
    navigation.replace('AuthStack', {
      screen: 'Login',
    });
  };

  const onScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <OnboardingSlide
            title={item.title}
            subtitle={item.subtitle}
            backgroundImage={item.background}
            isLast={item.isLast}
            isFaceScan={item.isFaceScan}
            onNext={goToNext}
            onSkip={skipOnboarding}
            currentIndex={currentIndex}
            totalSlides={slides.length}
            setHasSeenOnboarding={setHasSeenOnboarding}
          />
        )}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
}