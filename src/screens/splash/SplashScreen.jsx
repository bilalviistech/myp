import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Animated,
    Easing,
    Dimensions,
    Image
} from 'react-native';
import bodymy from '../../assets/images/bodymy.png'

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.6)).current;
    const ringRotate = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const loadingAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Entrance Animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 6,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();

        // Outer Ring Rotation (slow & smooth)
        Animated.loop(
            Animated.timing(ringRotate, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        // Inner Pulse Animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.15,
                    duration: 1400,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1400,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Smooth Loading Bar
        Animated.loop(
            Animated.timing(loadingAnim, {
                toValue: 1,
                duration: 1600,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            })
        ).start();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />

            <Animated.View
                style={
                    {
                        alignItems: 'center',
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    }
                }
            >

                {/* Main Logo Container with Pulse */}
                <Animated.View
                    style={[
                        styles.logoContainer,
                        { transform: [{ scale: pulseAnim }] },
                    ]}
                >
                    <Image
                        source={bodymy}
                        style={{ width: width * 0.9, height: height * 0.1 }}
                    />
                </Animated.View>
            </Animated.View>

            {/* Bottom Branding */}
            {/* <Text style={styles.version}>v1.0 • Premium Fitness</Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    logoContainer: {
        width: 180,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    version: {
        position: 'absolute',
        bottom: 50,
        color: '#444',
        fontSize: 12,
        letterSpacing: 1,
    },
});