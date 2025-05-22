import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from '../lib/supabase';

export default function ProfileScreen({ navigation }) {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Błąd', error.message);
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <Button title="Wyloguj się" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});
