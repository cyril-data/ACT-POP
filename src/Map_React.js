const { Map: LeafletMap, TileLayer, Marker, Popup } = ReactLeaflet;

class SimpleExample extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 46.79942865121552,
      lng: 2.9865881441615505,
      zoom: 6
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <LeafletMap center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </LeafletMap>
    );
  }
}

export default SimpleExample;
