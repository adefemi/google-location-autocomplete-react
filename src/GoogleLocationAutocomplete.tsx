import React, { useEffect, useRef } from "react";

interface GoogleAutocompleteProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  apiKey: string;
}

declare global {
  interface Window {
    initAutocomplete?: () => void;
  }
}

const GoogleLocationAutocomplete: React.FC<GoogleAutocompleteProps> = ({
  apiKey,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const initAutocomplete = () => {
    if (inputRef.current) {
      new window.google.maps.places.Autocomplete(inputRef.current);
    }
  };

  useEffect(() => {
    if (window.google && window.initAutocomplete) {
      window.initAutocomplete();
      return;
    }

    window.initAutocomplete = initAutocomplete;
    const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initAutocomplete`;

    if (!document.querySelector(`script[src="${url}"]`)) {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    return () => {
      delete window.initAutocomplete;
    };
  }, [apiKey]);

  return <input ref={inputRef} type="text" {...props} />;
};

export default GoogleLocationAutocomplete;
