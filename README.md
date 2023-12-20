# Google Location Autocomplete for React

`google-location-autocomplete-react` is a simple and reusable React component that leverages the Google Maps Places Autocomplete API. It allows for easy integration of Google's location autocomplete functionality into your React applications.

## Features

- Easy integration with React projects.
- Customizable styling using className prop.
- Utilizes Google Maps Places Autocomplete API.

## Installation

To install the component, run the following command in your project directory:

```bash
npm install google-location-autocomplete-react
```

## Usage

Here's a basic example of how to use the GoogleLocationAutocomplete component in your React application:

```jsx
import React from 'react';
import GoogleLocationAutocomplete from 'google-location-autocomplete-react';

function MyComponent() {
  return (
    <div>
      <GoogleLocationAutocomplete
        apiKey="YOUR_GOOGLE_API_KEY"
        className="your-custom-class"
      />
    </div>
  );
}

export default MyComponent;
```

Replace "YOUR_GOOGLE_API_KEY" with your actual Google API key. Apply any custom styling by replacing "your-custom-class" with your desired Tailwind CSS or custom CSS classes.

## Props

- `apiKey` (string): Your Google API key. Required
- `className` (string): Optional CSS classes for styling.

## Requirements

- React 17.0.0 or later.
- A valid Google API key with Google Maps JavaScript API and Places API enabled.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or create an issue for any enhancements, bug fixes, or feature requests.

## Support

If you encounter any problems or have any queries regarding the usage of this component, please open an issue on the GitHub repository.
**