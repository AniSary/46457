import React, { useState, useEffect, createContext } from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PlacesContext = createContext();

export const PlacesProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    loadPlacesFromStorage();
  }, []);

  useEffect(() => {
    savePlacesToStorage(places);
  }, [places]);

  const addPlace = (title, description, location) => {
    const newPlace = {
      id: uuid.v4(),
      title,
      description,
      location,
      date: new Date().toISOString(),
    };
    setPlaces((current) => [newPlace, ...current]);
  };

  const savePlacesToStorage = async (places) => {
    try {
      const jsonValue = JSON.stringify(places);
      await AsyncStorage.setItem('places', jsonValue);
    } catch (e) {
      console.log('❌ Błąd zapisu do AsyncStorage:', e);
    }
  };

  const loadPlacesFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('places');
      if (jsonValue !== null) {
        setPlaces(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log('❌ Błąd odczytu z AsyncStorage:', e);
    }
  };

  return (
    <PlacesContext.Provider value={{ places, addPlace }}>
      {children}
    </PlacesContext.Provider>
  );
};
