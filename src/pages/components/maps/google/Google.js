import React from 'react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import Widget from '../../../../components/Widget';

import s from './Google.module.scss';

const BasicMap = withScriptjs(withGoogleMap(() =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: parseFloat(-37.813179), lng: parseFloat(144.950259) }}
  >
    <Marker position={{ lat: -37.813179, lng: 144.950259 }} />
  </GoogleMap>,
));

class Maps extends React.Component {

  render() {
    return (
      <div>
        <h1  style={{color:"rgb(18, 20, 43)"}}  data-aos="fade-up"
     data-aos-duration="3000" className="page-title">
          Google <span className="fw-semi-bold">Maps</span>
        </h1>
        <Widget data-aos="fade-down"
     data-aos-duration="3000"
          title={<h4 style={{color:"rgb(18, 20, 43)"}}>Google Maps <small className="" style={{color:"#12142B"}}>Default and customized</small></h4>}
          collapse close

        >
          <div data-aos="fade-up"
     data-aos-duration="3000" className={s.MapContainer}>
            <BasicMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg"
              loadingElement={<div style={{ height: 'inherit', width: 'inherit' }} />}
              containerElement={<div style={{ height: 'inherit' }} />}
              mapElement={<div style={{ height: 'inherit' }} />}
            />
          </div>
        </Widget>
      </div>);
  }

}

export default Maps;
