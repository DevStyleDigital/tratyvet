/* eslint-disable react-hooks/exhaustive-deps */
import { Wrapper } from '@googlemaps/react-wrapper';
import React, { useEffect, useRef, useState } from 'react';
import locatesInfo from '@root/locates-info.json';
import Image from 'next/image';
import { Sidebar } from './Sidebar';

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Raio médio da Terra em quilômetros
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

function findNearestCoordinate(
  lat: number,
  lon: number,
  coordinatesArray: { lat: number; lon: number; id: string }[],
) {
  let nearestCoordinate;
  let nearestDistance = Infinity;

  for (let i = 0; i < coordinatesArray.length; i++) {
    const currentCoordinate = coordinatesArray[i];
    const distance = getDistance(lat, lon, currentCoordinate.lat, currentCoordinate.lon);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestCoordinate = currentCoordinate;
    }
  }

  return nearestCoordinate;
}

const coordinatesArray = locatesInfo.map(({ id, lat, lon }) => ({ id, lat, lon }));

interface MapCompProps {
  latitude: number;
  longitude: number;
}

const MapComp = ({
  setMarkerIds,
  latitude,
  longitude,
}: MapCompProps & {
  setMarkerIds: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const ref = useRef(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (ref.current && !map) {
      const googleMap = new google.maps.Map(ref.current, {
        zoomControl: true,
        panControl: true,
        center: {
          lat: coordinatesArray[0].lat - 20,
          lng: coordinatesArray[0].lon,
        },
        zoom: 3,
      });

      coordinatesArray.forEach((coordinate) => {
        new google.maps.Marker({
          position: { lat: coordinate.lat, lng: coordinate.lon },
          map: googleMap,
        });
      });

      setMap(googleMap);
    }
  }, [ref, map]);

  useEffect(() => {
    if (!map) return;
    const nearestCoordinate = findNearestCoordinate(
      latitude,
      longitude,
      coordinatesArray,
    );
    if (nearestCoordinate) {
      map.setCenter({ lat: nearestCoordinate.lat, lng: nearestCoordinate.lon });
      map.setZoom(15);

      setMarkerIds([nearestCoordinate.id]);
    }
  }, [latitude, longitude]);

  return <div ref={ref} className="w-full h-full relative" />;
};

export const Map = ({
  hasError,
  latitude,
  longitude,
  setLatitude,
  setLongitude,
  postalCodeSubmitted,
  setPostalCodeSubmitted,
}: MapCompProps & {
  postalCodeSubmitted?: string;
  setPostalCodeSubmitted: (v: string | undefined) => void;
  setLatitude: (v: number) => void;
  setLongitude: (v: number) => void;
  hasError: boolean;
}) => {
  const [markerIds, setMarkerIds] = useState<string[]>([]);

  useEffect(() => {
    setMarkerIds([]);
  }, [hasError]);

  return (
    <div className="relative w-full h-full">
      <Wrapper apiKey={process.env.NEXT_PUBLIC_MAP_KEY!}>
        <MapComp latitude={latitude} longitude={longitude} setMarkerIds={setMarkerIds} />
      </Wrapper>
      <Sidebar
        markerIds={markerIds}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        setMarkerIds={setMarkerIds}
        setPostalCodeSubmitted={setPostalCodeSubmitted}
        postalCodeSubmitted={postalCodeSubmitted}
        hasError={hasError}
      />
    </div>
  );
};
