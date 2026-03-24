import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordTwo, setPasswordTwo] = useState('');
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('VerifyEmail')
  };

  // const handleAppleSignIn = async () => {
  //   try {
  //     const response = await appleAuth.performRequest({
  //       requestedOperation: appleAuth.Operation.LOGIN,
  //       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //     });
  //     console.log('Apple success:', response);
  //     // Backend pe token bhejo
  //   } catch (error) {
  //     if (error.code === appleAuth.Error.CANCELED) {
  //       console.log('User cancelled');
  //     } else {
  //       console.error(error);
  //     }
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back arrow - top left */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={32} color="#CDFF00" />
          </TouchableOpacity>

          {/* Header text */}
          <View style={styles.header}>
            <Text style={styles.title}>
              Hello!
            </Text>
            <Text style={styles.subtitle}>
              Register to get started.
            </Text>
          </View>

          {/* Inputs */}
          <View style={styles.form}>
            <TextInput
              style={[styles.input, { marginBottom: 16 }]}
              placeholder="Username"
              placeholderTextColor="#666"
              value={name}
              onChangeText={setName}
              autoCapitalize="none"
            />

            <TextInput
              style={[styles.input, { marginBottom: 16 }]}
              placeholder="Email"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            <View style={[styles.passwordWrapper, { marginBottom: 16 }]}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eye}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={24}
                  color="#888"
                />
              </TouchableOpacity>
            </View>

            <View style={[styles.passwordWrapper]}>
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                placeholderTextColor="#666"
                value={passwordTwo}
                onChangeText={setPasswordTwo}
                secureTextEntry={!showPasswordTwo}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eye}
                onPress={() => setShowPasswordTwo(!showPasswordTwo)}
              >
                <Icon
                  name={showPasswordTwo ? 'eye' : 'eye-off'}
                  size={24}
                  color="#888"
                />
              </TouchableOpacity>
            </View>

            {/* Remember + Forgot */}
            <View style={[styles.options]}>
              <TouchableOpacity
                style={styles.rememberRow}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View style={[styles.checkbox, rememberMe && styles.checked]}>
                  {rememberMe && <Icon name="check" size={16} color="#000" />}
                </View>
                <Text style={styles.rememberText}>I agree to Terms and Privacy Policy</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={{ paddingVertical: 16, borderRadius: 15, alignItems: 'center', backgroundColor: '#CDFF00', fontSize: "15px" }} onPress={handleLogin}>
              <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>
                Sign Up
              </Text>
            </TouchableOpacity>

            {/* Apple Button - iOS only */}
            {/* {Platform.OS === 'ios' && (
              <AppleButton
                buttonStyle={AppleButton.Style.WHITE}
                buttonType={AppleButton.Type.CONTINUE}
                style={styles.appleBtn}
                onPress={handleAppleSignIn}
              />
            )} */}

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Already have an account?{' '}
                <Text
                  style={styles.register}
                  onPress={() => navigation.navigate('Login')}
                >
                  Login Now
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    top: 27,
    left: 6,
    zIndex: 10,
    borderColor: "#CDFF00",
    borderWidth: 1,
    borderRadius: 13,
    padding: 5,
  },
  header: {
    marginTop: 100,
    marginBottom: 30,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#CDFF00',
    lineHeight: 38
  },
  subtitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: "Gabarito",
    lineHeight: 38
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
  passwordWrapper: {
    position: 'relative',
  },
  eye: {
    position: 'absolute',
    right: 12,
    top: 1.5,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: '#888',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#CDFF00',
    borderColor: '#CDFF00',
  },
  rememberText: {
    color: '#ddd',
    fontSize: 14,
  },
  forgot: {
    color: '#CDFF00',
    fontSize: 15,
    fontWeight: '600',
  },
  loginBtn: {
    backgroundColor: '#CDFF00',
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 24
  },
  btnText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  appleBtn: {
    height: 54,
    marginBottom: 40,
  },
  footer: {
    justifyContent: "flex-end",
    flex: 1,
    alignItems: 'center',
    marginBottom: 25,
  },
  footerText: {
    color: '#888',
    fontSize: 17,
  },
  register: {
    color: '#CDFF00',
    fontWeight: 'bold',
  },
});

export default RegisterScreen