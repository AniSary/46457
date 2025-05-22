import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../lib/supabase';
import { AuthContext } from './AuthContext';

export const PlacesContext = createContext();

export const PlacesProvider = ({ children }) => {
  const { session } = useContext(AuthContext);
  const [places, setPlaces] = useState([]);

  const addPlace = async (title, description, location) => {
    if (!session?.user) {
      console.log("⛔ Brak użytkownika — nie można zapisać miejsca");
      return;
    }

    const { error } = await supabase
      .from('places')
      .insert([
        {
          title,
          description,
          lat: location.lat,
          lng: location.lng,
          user_id: session.user.id,
        }
      ]);

    if (error) {
      console.log("❌ Błąd zapisu miejsca:", error.message);
      throw error;
    } else {
      console.log("✅ Miejsce dodane!");
    }
  };

  return (
    <PlacesContext.Provider value={{ places, addPlace }}>
      {children}
    </PlacesContext.Provider>
  );
};
