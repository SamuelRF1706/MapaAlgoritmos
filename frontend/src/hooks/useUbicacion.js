import { useState, useEffect } from "react";

export const useUbicacion = () => {
  const [ubicacion, setUbicacion] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocalización no soportada");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUbicacion({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (err) => {
        setError("No se pudo obtener la ubicación");
      }
    );
  }, []);

  return { ubicacion, error };
};