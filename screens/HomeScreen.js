import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

export default function HomeScreen() {
  const { session, signOut } = useContext(AuthContext);
  const navigation = useNavigation();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchPlaces();
    }
  }, [session]);

  const fetchPlaces = async () => {
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      Alert.alert('Błąd', error.message);
    } else {
      setPlaces(data);
    }
  };

  const handleDelete = async (placeId) => {
    const { error } = await supabase
      .from('places')
      .delete()
      .eq('id', placeId)
      .eq('user_id', session.user.id); // безопасность: только свои

    if (error) {
      Alert.alert('Błąd usuwania', error.message);
    } else {
      setPlaces((prev) => prev.filter((p) => p.id !== placeId));
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.placeItem}
      onPress={() => navigation.navigate('PlaceDetails', { placeId: item.id })}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.description}</Text>
      <Button title="Usuń" onPress={() => handleDelete(item.id)} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Cześć, {session?.user?.email}</Text>

      <Button title="Dodaj miejsce" onPress={() => navigation.navigate('AddPlace')} />
      <Button title="Wyloguj się" onPress={signOut} color="crimson" />

      {places.length === 0 ? (
        <Text style={styles.empty}>Brak miejsc.</Text>
      ) : (
        <FlatList
          data={places}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  placeItem: {
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginTop: 10,
  },
  title: { fontWeight: 'bold', fontSize: 16 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 5 },
  empty: { textAlign: 'center', marginTop: 20, fontSize: 16 },
  welcome: { fontSize: 18, fontWeight: '500', marginBottom: 10 },
});
