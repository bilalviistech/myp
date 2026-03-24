import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NewPasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordTwo, setPasswordTwo] = useState('');
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  const navigation = useNavigation();

  const handleResetPassword = () => {
    navigation.navigate('PasswordChanged')
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      {/* Back arrow - top left */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={32} color="#CDFF00" />
      </TouchableOpacity>

      {/* Header text */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Enter new Password
        </Text>
        <Text style={styles.subtitle}>
          Please enter a new password
        </Text>
      </View>

      {/* Inputs */}
      <View style={styles.form}>
        <View style={[styles.passwordWrapper, {marginBottom: 16}]}>
          <TextInput
            style={styles.input}
            placeholder="Enter new Password"
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
            placeholder="Confirm Password"
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

        {/* Login Button */}
        <TouchableOpacity style={{ marginTop: 20, paddingVertical: 16, borderRadius: 15, alignItems: 'center', backgroundColor: '#CDFF00', fontSize: "15px" }} onPress={handleResetPassword}>
          <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>
            Reset Password
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
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 38
  },
    subtitle: {
        fontSize: 14,
        color: '#fff',
        marginTop: 8,
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
    marginBottom: 50,
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

export default NewPasswordScreen