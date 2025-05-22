import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PlacesContext } from '../context/PlacesContext';

export default function PlaceDetailsScreen({ route }) {
  const { placeId } = route.params;
  const { places } = useContext(PlacesContext);

  const place = places.find((p) => p.id === placeId);

  if (!place) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Nie znaleziono miejsca.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{place.title}</Text>
      <Text style={styles.text}>Opis: {place.description || 'brak'}</Text>
      <Text style={styles.text}>Szerokość: {place.location.lat}</Text>
      <Text style={styles.text}>Długość: {place.location.lng}</Text>
      <Text style={styles.text}>Data dodania: {new Date(place.date).toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  error: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
  },
});
