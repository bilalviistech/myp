import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import Sticker from "../../assets/images/Sticker.png";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PasswordChangedScreen({ navigation }) {
    const handleBackToLogin = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <View style={styles.content}>
        {/* Success Icon - Neon Green Circle with Check */}
        <View style={styles.iconContainer}>
            <Image
                source={Sticker}
                style={{
                    width: 150,
                    height: 150,
                    resizeMode: 'cover'
                }}
            />
        </View>

        <View style={styles.header}>
            <Text style={styles.title}>
                Password Changed!
            </Text>
            <Text style={styles.subtitle}>
                Your password has been changed successfully.
            </Text>
        </View>

        {/* Back to Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleBackToLogin}>
          <Text style={styles.buttonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    content: {
        alignItems: 'center',
        width: '100%',
    },
    iconContainer: {
        marginBottom: 50,
    },
    circle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#00FF88',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginBottom: 60,
        marginHorizontal: 5,
    },
    title: {
        fontSize: 33,
        fontWeight: '900',
        color: '#fff',
        lineHeight: 38,
        textAlign: "center"
    },
    subtitle: {
        fontSize: 14,
        color: '#fff',
        textAlign: "center",
        marginHorizontal: 25,
    },
    button: {
        backgroundColor: '#CDFF00',
        borderRadius: 15,
        paddingVertical: 16,
        width: '100%',
        alignItems: 'center'
    },
    buttonText: {
        color: '#000',
        fontSize: 15,
        fontWeight: 'bold',
    },
});