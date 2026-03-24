import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgotPasswordCodeScreen = () => {
    // navigation, route
    const navigation = useNavigation();
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]);

    // Email from previous screen (route.params se aa sakta hai)
    //   const email = route?.params?.email || 'hello@gmail.com';
    const email = 'hello@gmail.com';

    const handleOtpChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Auto focus next input
        if (text && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto submit jab last digit enter ho
        if (text && index === 3) {
            handleVerify();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        const code = otp.join('');
        if (code.length === 4) {
            // console.warn('Verifying OTP:', code);
            navigation.navigate('NewPassword')
        }
    };

    const handleResend = () => {
        alert("Resend the code.")
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

            {/* Back Button */}
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={32} color="#CDFF00" />
            </TouchableOpacity>

            {/* Header text */}
            <View style={styles.header}>
                <Text style={styles.title}>
                    Enter Code
                </Text>
                <Text style={styles.subtitle}>
                    Enter code we’ve sent to your inbox
                </Text>
                <Text style={styles.emailText}>{email}</Text>
            </View>

            {/* OTP Inputs */}
            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        style={styles.otpInput}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handleOtpChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        autoFocus={index === 0}
                        selectTextOnFocus
                    />
                ))}
            </View>

            <TouchableOpacity style={{ paddingVertical: 16, borderRadius: 15, alignItems: 'center', backgroundColor: '#CDFF00', fontSize: "15px" }} onPress={handleVerify}>
                <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>
                    Verify
                </Text>
            </TouchableOpacity>

            {/* Resend Code */}
            <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Didn't received code? </Text>
                <TouchableOpacity onPress={handleResend}>
                    <Text style={styles.resendLink}>Resend</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingHorizontal: 24,
    },
    backBtn: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        borderColor: "#CDFF00",
        borderWidth: 1,
        borderRadius: 13,
        padding: 5,
        marginHorizontal: 5
    },
    backIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#A855F7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginTop: 120,
        marginBottom: 30,
        marginHorizontal: 5,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#fff',
        lineHeight: 38
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        marginTop: 8,
    },
    highlight: {
        color: '#CDFF00',
    },
    emailText: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '500',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 50,
    },
    otpInput: {
        width: 75,
        height: 68,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#333',
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#666',
    },
    verifyButton: {
        backgroundColor: '#00FF88',
        borderRadius: 50,
        paddingVertical: 18,
        alignItems: 'center',
        marginBottom: 40,
    },
    verifyText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    },
    resendText: {
        color: '#fff',
        fontSize: 15,
    },
    resendLink: {
        color: '#CDFF00',
        fontSize: 15,
        fontWeight: '600',
    },
});

export default ForgotPasswordCodeScreen