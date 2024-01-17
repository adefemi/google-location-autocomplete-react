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

  const loadScript = (url: string) => {
    if (!document.querySelector(`script[src="${url}"]`)) {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  };

  const initializeAutocomplete = useCallback(() => {
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
  }, [onPlaceSelected]);

  useEffect(() => {
    window.initAutocomplete = initializeAutocomplete;
    const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initAutocomplete`;
    loadScript(url);

    return () => {
      delete window.initAutocomplete;
    };
  }, [apiKey, initializeAutocomplete]);

  useEffect(() => {
    const handleFocus = () => {
      initializeAutocomplete();
    };

    const input = inputRef.current;
    input?.addEventListener("focus", handleFocus);

    return () => {
      input?.removeEventListener("focus", handleFocus);
    };
  }, [initializeAutocomplete]);

  return <input ref={inputRef} type="text" {...props} />;
};

export default GoogleLocationAutocomplete;
