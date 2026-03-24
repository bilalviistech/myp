import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { getHasSeenOnboarding, removeHasSeenOnboarding } from '../services/storage';
import OnboardingScreen from '../components/onboarding/OnboardingScreen';

const RootStack = createNativeStackNavigator();

export default function RootNavigator() {
  const { userToken, isLoading } = useContext(AuthContext);
  const [hasChecked, setHasChecked] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        // await removeHasSeenOnboarding()
        const hasSeen = await getHasSeenOnboarding();
        setShowOnboarding(!hasSeen);
      } catch (e) {
        console.warn('Onboarding check failed', e);
        setShowOnboarding(true); // safe fallback
      } finally {
        setHasChecked(true);
      }
    };

    bootstrapAsync();
  }, []);

  if (!hasChecked || isLoading) {
    return null; // ya <SplashScreen /> bana lo (simple logo + loading)
  }
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {showOnboarding && (
          <RootStack.Screen
            name="Onboarding"
            component={OnboardingScreen}
          />
        )}
        {userToken ? (
          <RootStack.Screen name="AppStack" component={AppStack} />
        ) : (
          <RootStack.Screen name="AuthStack" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}