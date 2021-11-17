import React, { FC, useEffect } from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";

export interface IGooglePlacesAutocompleteProps {
  readonly isClearable?: boolean;
  readonly isDisabled?: boolean;
  readonly onBlur?: (e: any) => any;
  readonly onChange?: (e: any) => any;
  readonly onCoordsChange?: (lat: number, lng: number) => void;
  readonly onKeyDown?: (e: any) => any;
  readonly placeholder?: string;
  readonly value?: any;
}

const PlacesAutocomplete: FC<IGooglePlacesAutocompleteProps> = ({
  isClearable,
  isDisabled,
  onBlur,
  onChange,
  onCoordsChange,
  onKeyDown,
  placeholder,
  value,
}) => {
  useEffect(() => {
    if (value && onCoordsChange) {
      geocodeByAddress((value as any)?.label)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => onCoordsChange(lat, lng));
    }
  }, [value?.label]);

  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey={process.env.REACT_APP_MAPS_KEY}
        selectProps={{
          value,
          isClearable,
          isDisabled,
          onChange,
          onBlur,
          placeholder,
          onKeyDown,
        }}
      />
    </div>
  );
};

export default PlacesAutocomplete;
