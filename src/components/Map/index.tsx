/* eslint-disable react-hooks/exhaustive-deps */
import { Wrapper } from '@googlemaps/react-wrapper';
import React, { useEffect, useRef, useState } from 'react';
import { Sidebar } from './Sidebar';
import mapInfo from '../../assets/mail/map-info.json';
import { Distributor } from 'types/distributors';

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
  lng: number,
  coordinatesArray: {
    lat: number;
    lng: number;
    id: string;
    region?: string;
    city: string;
    state: string;
  }[],
) {
  let nearestCoordinate;
  let nearestDistance = Infinity;

  for (let i = 0; i < coordinatesArray.length; i++) {
    const currentCoordinate = coordinatesArray[i];
    const distance = getDistance(lat, lng, currentCoordinate.lat, currentCoordinate.lng);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestCoordinate = currentCoordinate;
    }
  }

  return nearestCoordinate;
}

interface MapCompProps {
  latitude: number;
  longitude: number;
}

const MapComp = ({
  setMarkerIds,
  latitude,
  longitude,
  locatesInfo,
}: MapCompProps & {
  setMarkerIds: React.Dispatch<React.SetStateAction<string[]>>;
  locatesInfo: Distributor[];
}) => {
  const ref = useRef(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (ref.current && !map && locatesInfo.length) {
      const googleMap = new google.maps.Map(ref.current, {
        zoomControl: true,
        panControl: true,
        center: {
          lat: locatesInfo[0].lat - 20,
          lng: locatesInfo[0].lng,
        },
        zoom: 3,
      });

      locatesInfo.forEach((coordinate) => {
        const contentString = mapInfo
          .join('')
          .replace(
            '{shop}',
            coordinate.company ? coordinate.company : coordinate.distributor,
          )
          .replace('{distributor}', coordinate.company ? coordinate.distributor : '')
          .replace('{phone1}', coordinate.phone.toString().split('/')[0])
          .replace('{phone2}', coordinate.phone.toString().split('/')[1] || '')
          .replace('{email}', coordinate.email)
          .replace(
            '{locale}',
            `${`${coordinate.region ? coordinate.region : coordinate.city}, ${
              coordinate.state
            }, ${coordinate.country}`}`,
          )
          .replace('{postal_code}', coordinate.postalCode);

        const infowindow = new google.maps.InfoWindow({
          content: contentString,
          ariaLabel: `${`${coordinate.region ? coordinate.region : coordinate.city}, ${
            coordinate.state
          }, ${coordinate.country}`}`,
        });

        const marker = new google.maps.Marker({
          position: { lat: coordinate.lat, lng: coordinate.lng },
          map: googleMap,
        });

        marker.addListener('click', () => {
          infowindow.open({
            anchor: marker,
            map,
          });
        });
      });

      setMap(googleMap);
    }
  }, [ref, map]);

  useEffect(() => {
    if (!map) return;
    const nearestCoordinate = findNearestCoordinate(latitude, longitude, locatesInfo);
    if (!nearestCoordinate) return;

    map.setCenter({ lat: nearestCoordinate.lat, lng: nearestCoordinate.lng });
    map.setZoom(15);

    setMarkerIds(
      locatesInfo
        .filter(({ city, region, state }) =>
          nearestCoordinate.region
            ? region === nearestCoordinate.region && state === nearestCoordinate.state
            : city === nearestCoordinate.city && state === nearestCoordinate.state,
        )
        .map(({ id }) => id),
    );
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
  locatesInfo,
}: MapCompProps & {
  postalCodeSubmitted?: string;
  setPostalCodeSubmitted: (v: string | undefined) => void;
  setLatitude: (v: number) => void;
  setLongitude: (v: number) => void;
  hasError: boolean;
  locatesInfo: Distributor[];
}) => {
  const [markerIds, setMarkerIds] = useState<string[]>([]);

  useEffect(() => {
    setMarkerIds([]);
  }, [hasError]);

  return (
    <div className="relative w-full h-full">
      <Wrapper apiKey={process.env.NEXT_PUBLIC_MAP_KEY!}>
        <MapComp
          latitude={latitude}
          longitude={longitude}
          setMarkerIds={setMarkerIds}
          locatesInfo={locatesInfo}
        />
      </Wrapper>
      <Sidebar
        markerIds={markerIds}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        setMarkerIds={setMarkerIds}
        setPostalCodeSubmitted={setPostalCodeSubmitted}
        postalCodeSubmitted={postalCodeSubmitted}
        hasError={hasError}
        locatesInfo={locatesInfo}
      />
    </div>
  );
};
