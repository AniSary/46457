import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { session } = useContext(AuthContext);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      Alert.alert('Błąd logowania', error.message);
    } else {
      console.log('✅ Zalogowano, czekamy na aktualizację sesji...');
    }
  };

  useEffect(() => {
    const currentSession = supabase.auth.session();
    console.log('🔁 Fallback session:', currentSession);
  }, [session]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logowanie</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Hasło"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="ZALOGUJ SIĘ" onPress={handleLogin} />

      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Nie masz konta? Zarejestruj się
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 15, fontSize: 16 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  link: { marginTop: 15, color: 'blue', textAlign: 'center' },
});
