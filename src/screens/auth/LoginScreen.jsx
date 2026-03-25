import React, { useContext, useState } from 'react';
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
import { Formik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../../context/AuthContext';
import LoadingModal from '../../components/common/LoadingModal';
// import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleLogin = async (values) => {
    setIsLoading(true);
    const email = values.email.trim();
    const password = values.password;

    if (email !== "testing@mail.com") {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Email is incorrect 👎',
        position: 'top',
        visibilityTime: 4000,
      });
      return;
    }

    if (password !== "123456") {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Password is incorrect 👎',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    // Successful login
    Toast.show({
      type: 'success',
      text1: 'Login Successful',
      text2: `Welcome back, ${email}!`,
      position: 'top',
      visibilityTime: 2000,
    });

    await login("123456789875");
    setIsLoading(false);
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

      {/* Header text */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Welcome back!
        </Text>
        <Text style={styles.subtitle}>
          Glad to see you, Again!
        </Text>
      </View>

      {/* Formik form */}
      <Formik
        initialValues={{ email: 'testing@mail.com', password: '123456' }}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            {/* Email */}
            <TextInput
              style={[styles.input, { marginBottom: 8 }]}
              placeholder="Enter email"
              placeholderTextColor="#666"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            {/* Password */}
            <View style={[styles.passwordWrapper, { marginBottom: 8 }]}>
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                placeholderTextColor="#666"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
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
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {/* Remember + Forgot */}
            <View style={styles.options}>
              <TouchableOpacity
                style={styles.rememberRow}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View style={[styles.checkbox, rememberMe && styles.checked]}>
                  {rememberMe && <Icon name="check" size={16} color="#000" />}
                </View>
                <Text style={styles.rememberText}>Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgot}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleSubmit}
            >
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>

            {/* Apple Button - iOS only */}
            {/* {Platform.OS === 'ios' && (
                <AppleButton
                  buttonStyle={AppleButton.Style.WHITE}
                  buttonType={AppleButton.Type.CONTINUE}
                  style={styles.appleBtn}
                  onPress={handleAppleSignIn}
                />
              )}
            */}

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Don't have an account?{' '}
                <Text
                  style={styles.register}
                  onPress={() => navigation.navigate('Register')}
                >
                  Register Now
                </Text>
              </Text>
            </View>
          </View>
        )}
      </Formik>

      <LoadingModal
        visible={isLoading}
        title="Signing you in..."
        subtitle="Please wait a moment"
      />  
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
    marginBottom: 60,
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    position: 'absolute',
    right: 12,
    top: 1.5,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 25,
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
    fontSize: 15,
  },
  forgot: {
    color: '#CDFF00',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 10,
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
  errorText: {
    color: '#FF4D4D',
    fontSize: 14,
    marginBottom: 10
  },
});

export default LoginScreen