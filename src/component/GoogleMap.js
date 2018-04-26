import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, withScriptjs } from "react-google-maps"

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const SimpleMap = withScriptjs(withGoogleMap((props) => {
    return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
            <Marker position={{ lat: -34.397, lng: 150.644 }} />

        </GoogleMap>
    );
}));

export default SimpleMap;