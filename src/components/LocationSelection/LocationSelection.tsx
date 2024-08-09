"use client";
import React, { useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import LocationInput from "./LocationInput";
import ActionButtons from "./ActionButtons";
import { validateCord } from "@/lib/queries/validateCord";
import { updateGefence } from "@/lib/actions/updateGefence";

const LocationSelection: React.FC = () => {
  const [location, setLocation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(
    null
  );

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

          // Validate the new location coordinates
          validateCord(clickedLocation.lat(), clickedLocation.lng()).then(
            (result) => {
              if (result?.data) {
                updateGefence(
                  result.data.matchedGeofence?.geofence_id ||
                    result.data.default_address.geofence.geofence_id
                );
              }
            }
          );
        }
      });
    }
  };

  useEffect(() => {
    // Check if the dialog has been opened before
    const hasOpened = localStorage.getItem("hasOpenedDialog");
    if (!hasOpened) {
      setIsOpen(true);
    }

    // Fetch and store the geofence_id for the default location
    validateCord().then((result) => {
      if (result?.data?.default_address?.geofence) {
        updateGefence(result.data.default_address.geofence.geofence_id);

        // Initialize the map with the default coordinates
        const defaultLatitude = parseFloat(
          result.data.default_address.latitude
        );
        const defaultLongitude = parseFloat(
          result.data.default_address.longitude
        );
        initMap(defaultLatitude, defaultLongitude);
      }
    });

    if (window.google && !map) {
      // If Google Maps is already loaded and the map is not yet initialized
      validateCord().then((result) => {
        if (result?.data?.default_address?.geofence) {
          const defaultLatitude = parseFloat(
            result.data.default_address.latitude
          );
          const defaultLongitude = parseFloat(
            result.data.default_address.longitude
          );
          initMap(defaultLatitude, defaultLongitude);
        }
      });
    }
  }, []);

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

            // Validate the located coordinates
            validateCord(pos.lat, pos.lng).then((result) => {
              if (result?.data) {
                updateGefence(
                  result.data.matchedGeofence?.geofence_id ||
                    result.data.default_address.geofence.geofence_id
                );
              }
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

            // Validate the new location coordinates
            validateCord(newLocation.lat(), newLocation.lng()).then(
              (result) => {
                if (result?.data) {
                  updateGefence(
                    result.data.matchedGeofence?.geofence_id ||
                      result.data.default_address.geofence.geofence_id
                  );
                }
              }
            );
          } else {
            console.error("Error fetching place details:", status);
          }
        }
      );
    }
  };

  const handleConfirmLocation = () => {
    if (markerRef.current) {
      const confirmedLocation = markerRef.current.getPosition();
      console.log("Confirmed location:", confirmedLocation?.toString());
      localStorage.setItem("hasOpenedDialog", "true");

      setIsOpen(false);
    } else {
      alert("Please select a location before confirming.");
    }
  };

  const handleSkip = () => {
    console.log("User skipped location selection.");
    localStorage.setItem("hasOpenedDialog", "true");

    setIsOpen(false);
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsOpen(false)}
      >
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
            >
              <Dialog.Panel className="w-[1358px] h-[807px] bg-white rounded-xl overflow-hidden relative">
                <div
                  ref={mapRef}
                  id="map"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="bg-white py-4 flex flex-col items-center justify-center absolute top-0 w-full">
                  <h1 className="self-center text-xl md:text-3xl font-bold text-zinc-950">
                    Choose your location
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
