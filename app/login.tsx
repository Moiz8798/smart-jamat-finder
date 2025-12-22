import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // 1. Log the data (optional debug)
    console.log('Login pressed', { email, password });

    // 2. NAVIGATE TO HOME (TABS)
    // This points to the "(tabs)" folder. Because you renamed home_screen.tsx 
    // to index.tsx inside that folder, this will load your Home Screen automatically.
    router.replace('/(tabs)');
  };

  
  const handleCreateAccount = () => {
    router.push('/signup');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Ionicons name="business" size={48} color="white" />
          </View>
        </View>

        {/* Welcome Text */}
        <Text style={styles.welcomeTitle}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Sign in to continue to Smart Jamat Finder
        </Text>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="your.email@example.com"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <Pressable
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color="#666"
              />
            </Pressable>
          </View>
        </View>


        {/* Login Button */}
        <Pressable
          onPress={handleLogin}
          style={({ pressed }) => [
            styles.loginButton,
            pressed && { opacity: 0.85 },
          ]}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>

        {/* Create Account */}
        <View style={styles.createAccountContainer}>
          <Text style={styles.createAccountText}>
            Don't have an account?
          </Text>

          <Pressable
            onPress={handleCreateAccount}
            style={({ hovered, pressed }) => [
              styles.createAccountButton,
              (hovered || pressed) && styles.createAccountButtonHover,
            ]}
          >
            {({ hovered, pressed }) => (
              <Text
                style={[
                  styles.createAccountLink,
                  (hovered || pressed) && styles.createAccountLinkHover,
                ]}
              >
                Create Account
              </Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoBox: {
    width: 96,
    height: 96,
    backgroundColor: '#10B981',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1F2937',
  },
  eyeIcon: {
    paddingHorizontal: 16,
  },
  loginButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  createAccountContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  createAccountText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
  },
  createAccountButton: {
    paddingHorizontal: 120,
    paddingVertical: 10,
    borderRadius: 12,
    borderColor:'#6B7280',
    borderWidth:0.3,
  },
  createAccountButtonHover: {
    backgroundColor: '#60A5FA'
  },
  createAccountLink: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
  },
  createAccountLinkHover: {
    color: '#FFFFFF',
  },
});