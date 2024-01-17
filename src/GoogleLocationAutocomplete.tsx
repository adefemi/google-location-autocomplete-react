import React, { useCallback, useEffect, useRef } from "react";

interface GoogleAutocompleteProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  apiKey: string;
  onPlaceSelected?: (place: google.maps.places.PlaceResult) => void;
}

declare global {
  interface Window {
    initAutocomplete?: () => void;
    google?: any;
  }
}

const GoogleLocationAutocomplete: React.FC<GoogleAutocompleteProps> = ({
  apiKey,
  onPlaceSelected,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const loadScript = () => {
    const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    if (!document.querySelector(`script[src="${url}"]`)) {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.onload = () => initializeAutocomplete();
    }
  };

  const initializeAutocomplete = () => {
    if (inputRef.current && window.google && !autocompleteRef.current) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current
      );
      autocompleteRef.current?.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        if (onPlaceSelected && place) {
          onPlaceSelected(place);
        }
      });
    }
  };

  useEffect(() => {
    loadScript();
  }, [apiKey]);

  useEffect(() => {
    if (inputRef.current && !autocompleteRef.current) {
      initializeAutocomplete();
    }
  }, [initializeAutocomplete]);

  return <input ref={inputRef} type="text" {...props} />;
};

export default GoogleLocationAutocomplete;
