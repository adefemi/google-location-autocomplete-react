import React, { useEffect, useRef } from "react";

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

  const initAutocomplete = () => {
    if (inputRef.current && window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current
      );
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (onPlaceSelected) {
          onPlaceSelected(place);
        }
      });
    }
  };

  const loadScript = () => {
    window.initAutocomplete = initAutocomplete;
    const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initAutocomplete`;
    if (!document.querySelector(`script[src="${url}"]`)) {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  };

  useEffect(() => {
    loadScript();

    return () => {
      delete window.initAutocomplete;
    };
  }, [apiKey]);

  return <input ref={inputRef} type="text" {...props} />;
};

export default GoogleLocationAutocomplete;
