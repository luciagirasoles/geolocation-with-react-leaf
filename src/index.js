import React from "react";
import { render } from "react-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { css } from "emotion";
const container = css`
  height: 400px;
  width: 100%;
`;
// const position = [this.state.lat, this.state.lng];
function SimpleExample() {
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);
  const initialZoom = 10;

  React.useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(({ coords }) => {
      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, [setLatitude, setLongitude]);

  const position = [latitude, longitude];
  return (
    <Map center={position} zoom={initialZoom}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </Map>
  );
}

render(
  <SimpleExample className={container} />,
  document.getElementById("root")
);
