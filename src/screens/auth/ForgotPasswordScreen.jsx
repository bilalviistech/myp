import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    const handleForgotPassword = () => {
        // console.warn('Resend code to:', email);
        navigation.navigate('ForgotPasswordCode')
    };
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

            {/* Back Button */}
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={32} color="#CDFF00" />
            </TouchableOpacity>

            {/* Title */}
            <View style={styles.header}>
                <Text style={styles.title}>
                    Forgot Password?
                </Text>
                <Text style={styles.subtitle}>
                    Don't worry! It occurs. Please enter the email address linked with your account.
                </Text>
            </View>

            <View style={styles.form}>
                <TextInput
                    style={[styles.input, { marginBottom: 16 }]}
                    placeholder="Email"
                    placeholderTextColor="#666"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />

                {/* Login Button */}
                <TouchableOpacity style={{ paddingVertical: 16, borderRadius: 15, alignItems: 'center', backgroundColor: '#CDFF00', fontSize: "15px" }} onPress={handleForgotPassword}>
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>
                        Send Code
                    </Text>
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
    header: {
        marginTop: 120,
        marginBottom: 30,
        marginHorizontal: 5,
    },
    title: {
        fontSize: 35,
        fontWeight: '900',
        color: '#fff',
        lineHeight: 38
    },
    subtitle: {
        fontSize: 14,
        color: '#fff',
        marginTop: 8,
    },
    highlight: {
        color: '#CDFF00',
    },
    form: {
        marginHorizontal: 5,
        flex: 1,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#F4F4F4',
        borderRadius: 15,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#666',
    },
});

export default ForgotPasswordScreen