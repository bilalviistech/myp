import React, { useContext } from 'react'
import { StatusBar, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../../context/AuthContext';

const HomeScreen = () => {
    const { logout } = useContext(AuthContext);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
            <View>
                <Text style={{ color: "white" }}>This is home.</Text>
            </View>

            <TouchableOpacity onPress={logout}>
                <Text style={{ color: "white", backgroundColor: "red", textAlign: "center" }}>
                    Logout
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingHorizontal: 24,
    },
});

export default HomeScreen