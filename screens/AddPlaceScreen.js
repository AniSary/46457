import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { PlacesContext } from '../context/PlacesContext';
import { useNavigation } from '@react-navigation/native';

export default function AddPlaceScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addPlace } = useContext(PlacesContext);
  const navigation = useNavigation();

  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Uzupełnij wszystkie pola');
      return;
    }

    const mockLocation = {
      lat: 37.4217937,
      lng: -122.083922, // <- для примера, ты можешь вставить свои координаты
    };

    try {
      await addPlace(title, description, mockLocation);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Błąd dodawania miejsca', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tytuł:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Nazwa miejsca"
      />

      <Text style={styles.label}>Opis:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Opis miejsca"
      />

      <Button title="Zapisz miejsce" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    paddingVertical: 5,
    fontSize: 16,
  },
});
