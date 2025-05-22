import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { PlacesContext } from '../context/PlacesContext';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { places } = useContext(PlacesContext);
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.placeItem}
      onPress={() => navigation.navigate('PlaceDetails', { placeId: item.id })}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {places.length === 0 ? (
        <Text style={styles.empty}>Brak zapisanych miejsc.</Text>
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
  container: {
    flex: 1,
    padding: 20,
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#666',
  },
  placeItem: {
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});
