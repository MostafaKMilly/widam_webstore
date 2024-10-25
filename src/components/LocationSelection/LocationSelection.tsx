"use client";
import React, { useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import LocationInput from "./LocationInput";
import ActionButtons from "./ActionButtons";
import { validateCord } from "@/lib/queries/validateCord";
import { updateGefence } from "@/lib/actions/updateGefence";
import { useStore } from "zustand";
import { getUser } from "@/lib/api/profile";
import { useDictionary } from "@/lib/hooks/useDictionary";

interface LocationSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation?: (latitude: string, longitude: string) => void;
  initialLocation?: {
    latitude: string;
    longitude: string;
  };
}

const LocationSelection: React.FC<LocationSelectionProps> = ({
  isOpen,
  onClose,
  onSelectLocation,
  initialLocation,
}) => {
  const [location, setLocation] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const markerRef = useRef<google.maps.Marker | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(
    null
  );
  const [selectedGeofenceId, setSelectedGeofenceId] = useState<string | null>(
    null
  );
  const { data: user, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getUser(),
  });

  const updateGefenceMutation = useMutation({
    mutationFn: (geofenceId: string) => updateGefence(geofenceId),
    onSuccess: () => {
      console.log("Geofence updated successfully");
      onClose();
    },
    onError: (error) => {
      console.error("Error updating geofence:", error);
      alert("Failed to update geofence. Please try again.");
    },
  });

  const initMap = (latitude: number, longitude: number) => {
    if (mapRef.current) {
      const googleMap = new google.maps.Map(mapRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
        zoomControl: false,
        streetViewControl: false,
      });

      setMap(googleMap);

      markerRef.current = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: googleMap,
      });

      placesServiceRef.current = new google.maps.places.PlacesService(
        googleMap
      );

      googleMap.addListener("click", (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const clickedLocation = event.latLng;
          googleMap.setCenter(clickedLocation);

          if (markerRef.current) {
            markerRef.current.setPosition(clickedLocation);
          } else {
            markerRef.current = new google.maps.Marker({
              position: clickedLocation,
              map: googleMap,
            });
          }

          validateCord(clickedLocation.lat(), clickedLocation.lng())
            .then((result) => {
              if (result?.data) {
                const geofenceId =
                  result.data.matchedGeofence?.geofence_id ||
                  result.data.default_address.geofence.geofence_id;
                setSelectedGeofenceId(geofenceId);
              }
            })
            .catch((error) => {
              console.error("Error validating coordinates:", error);
            });
        }
      });
    }
  };

  const loadMap = async () => {
    if (!mapRef.current) {
      console.error("Map container ref is not available");
      return;
    }

    if (!window.google) {
      console.error("Google Maps script not loaded");
      return;
    }

    try {
      const result = await validateCord();
      if (result?.data?.default_address?.geofence) {
        const geofenceId = result.data.default_address.geofence.geofence_id;
        setSelectedGeofenceId(geofenceId);

        const defaultLatitude = parseFloat(
          result.data.default_address.latitude ||
            initialLocation?.latitude ||
            "0"
        );
        const defaultLongitude = parseFloat(
          result.data.default_address.longitude ||
            initialLocation?.longitude ||
            "0"
        );

        if (!map) {
          initMap(defaultLatitude, defaultLongitude);
        } else {
          map.setCenter({ lat: defaultLatitude, lng: defaultLongitude });
          if (markerRef.current) {
            markerRef.current.setPosition({
              lat: defaultLatitude,
              lng: defaultLongitude,
            });
          } else {
            markerRef.current = new google.maps.Marker({
              position: { lat: defaultLatitude, lng: defaultLongitude },
              map: map,
            });
          }
        }
      } else {
        console.warn("No geofence data available");
      }
    } catch (error) {
      console.error("Error loading map:", error);
    }
  };

  useEffect(() => {
    if (!isOpen && map) {
      google.maps.event.clearInstanceListeners(map);
      setMap(null);
    }
  }, [isOpen]);

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          if (map) {
            map.setCenter(pos);

            if (markerRef.current) {
              markerRef.current.setPosition(pos);
            } else {
              markerRef.current = new google.maps.Marker({
                position: pos,
                map: map,
              });
            }

            validateCord(pos.lat, pos.lng)
              .then((result) => {
                if (result?.data) {
                  const geofenceId =
                    result.data.matchedGeofence?.geofence_id ||
                    result.data.default_address.geofence.geofence_id;
                  setSelectedGeofenceId(geofenceId);
                }
              })
              .catch((error) => {
                console.error("Error validating coordinates:", error);
              });
          } else {
            console.error("Map is not initialized yet.");
          }
        },
        (error) => {
          console.error("Error fetching geolocation:", error.message);
          alert(
            "Geolocation failed. Please make sure location services are enabled."
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSelectLocation = (placeId: string) => {
    if (placesServiceRef.current && map) {
      placesServiceRef.current.getDetails(
        { placeId },
        (
          place: google.maps.places.PlaceResult | null,
          status: google.maps.places.PlacesServiceStatus
        ) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            place?.geometry?.location
          ) {
            const newLocation = place.geometry.location;
            map.setCenter(newLocation);

            if (markerRef.current) {
              markerRef.current.setPosition(newLocation);
            } else {
              markerRef.current = new google.maps.Marker({
                position: newLocation,
                map: map,
              });
            }

            validateCord(newLocation.lat(), newLocation.lng())
              .then((result) => {
                if (result?.data) {
                  const geofenceId =
                    result.data.matchedGeofence?.geofence_id ||
                    result.data.default_address.geofence.geofence_id;
                  setSelectedGeofenceId(geofenceId);
                }
              })
              .catch((error) => {
                console.error("Error validating coordinates:", error);
              });
          } else {
            console.error("Error fetching place details:", status);
          }
        }
      );
    }
  };

  const { dictionary } = useDictionary();

  const handleConfirmLocation = async () => {
    if (markerRef.current) {
      const confirmedLocation = markerRef.current.getPosition();
      console.log("Confirmed location:", confirmedLocation?.toString());

      if (confirmedLocation) {
        const latitude = confirmedLocation.lat();
        const longitude = confirmedLocation.lng();

        onSelectLocation?.(latitude.toString(), longitude.toString());

        if (selectedGeofenceId && !user?.data) {
          await updateGefenceMutation.mutateAsync(selectedGeofenceId);
        }
      }
    } else {
      alert("Please select a location before confirming.");
    }
  };

  const handleSkip = () => {
    console.log("User skipped location selection.");
    localStorage.setItem("hasOpenedDialog", "true");
    onClose();
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              afterEnter={() => {
                loadMap();
              }}
            >
              <Dialog.Panel className="w-[1358px] h-[807px] bg-white rounded-xl overflow-hidden relative">
                <div
                  ref={mapRef}
                  id="map"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="bg-white py-4 flex flex-col items-center justify-center absolute top-0 w-full">
                  <h1 className="self-center text-xl md:text-3xl font-bold text-zinc-950">
                    {dictionary.choose_your_location}
                  </h1>
                </div>
                <div className="p-6 flex flex-col h-full">
                  <LocationInput
                    location={location}
                    onLocationChange={setLocation}
                    onSelectLocation={handleSelectLocation}
                  />
                  <div className="mt-auto">
                    <ActionButtons
                      onLocateMe={handleLocateMe}
                      onConfirmLocation={handleConfirmLocation}
                      onSkip={handleSkip}
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LocationSelection;
