import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

import './App.css';

const center = [7.762081916489769, 80.65858279000169];
// const positionKandy = [7.344505821309715, 80.62933056448098];
// const positionColombo = [6.924722191330576, 79.8600721708302];

const districtPositions = [
  { name: 'Kandy', position: [7.344505821309715, 80.62933056448098] },
  { name: 'Colombo', position: [6.924722191330576, 79.8600721708302] },
  { name: 'Batticaloa', position: [7.725428838692528, 81.69771966377748] },
  { name: 'Anuradhapura', position: [8.312103325422829, 80.4016659067846] },
  { name: 'Trincomalee', position: [8.587329701114093, 81.21488350955728] },
  { name: 'Galle', position: [6.0331443376714455, 80.21631494506686] },
  { name: 'Mullaitivu', position: [9.266898187430082, 80.81458651996] },
  { name: 'Kegalle', position: [7.251859304308899, 80.34605940053824] },
  { name: 'Matara', position: [5.951576934505497, 80.54600011635733] },
  { name: 'Vavuniya', position: [8.753873661987114, 80.49835718035175] },
  { name: 'Ratnapura', position: [6.705250147808733, 80.38443538225935] },
  { name: 'Monaragala', position: [6.890431644940554, 81.34514630709467] },
  { name: 'Badulla', position: [6.99326727102719, 81.05483759065311] },
  { name: 'Matale', position: [7.466990554907673, 80.62287418406251] },
  { name: 'Nuwara Eliya', position: [6.949333926498285, 80.78852105686494] },
  { name: 'Gampaha', position: [7.0831257117879804, 80.00887966991594] },
  { name: 'Kilinochchi', position: [9.379622441927102, 80.37675348691602] },
  { name: 'Ampara', position: [7.3005718816507725, 81.67394019270391] },
  { name: 'Polonnaruwa', position: [7.941249963671026, 81.01892307211213] },
  { name: 'Hambantota', position: [6.160651731755219, 81.10703702311253] },
  { name: 'Kurunegala', position: [7.482779832378108, 80.36080853441112] },
  { name: 'Puttalam', position: [8.039227604303017, 79.842002308453] },
  { name: 'Kalutara', position: [6.5842935417522765, 79.96249686981056] },
  { name: 'Mannar', position: [8.995349585431844, 79.88581031754181] },
  { name: 'Jaffna', position: [9.675689491608374, 80.03613210882942] },

  

  
];



// const customIcon = L.icon({
  
//   iconUrl: './mark.png',
//   iconSize: [40, 40],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
// });

export default function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [geoJSONData, setGeoJSONData] = useState(null);

  useEffect(() => {
    axios.get('https://api.maptiler.com/data/7a2e8f44-16af-429b-b62c-c3332ffba33f/features.json?key=vIkXdioF5LVFcmvw5yTi')
      .then(response => {
        setGeoJSONData(response.data);
      })
      .catch(error => {
        console.error('Error fetching GeoJSON data:', error);
      });

    axios.get('http://localhost:3030/weather')
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }, []);

  const geoJSONStyle = {
    fillColor: 'green',
    fillOpacity: 0.5,
    color: 'green',
    weight: 1,
  };

  const highlightFeature = (e) => {
    const layer = e.target;
    layer.setStyle({
      fillColor: 'darkgreen',
      fillOpacity: 0.7,
    });
  };

  const resetHighlight = (e) => {
    const layer = e.target;
    layer.setStyle({
      fillColor: 'green',
      fillOpacity: 0.5,
    });
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  };

  // const generatePopupContent = (district, weatherData) => {
  //   return (
  //     <div>
  //       <h3>{district}</h3>
  //       {weatherData.map(item => {
  //         if (item.district === district) {
  //           return (
  //             <div key={item._id}>
  //               <p>Temperature: {item.temperature}°C</p>
  //               <p>Humidity: {item.humidity}%</p>
  //               <p>Pressure: {item.pressure} hPa</p>
  //             </div>
  //           );
  //         } else {
  //           return null;
  //         }
  //       })}
  //     </div>
  //   );
  // };
  const getWeatherIcon = (weatherCondition) => {
    if (weatherCondition === 'sunny') {
      return L.icon({
        iconUrl: './sun.png',
        iconSize: [40, 40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });
    } else if (weatherCondition === 'rainy') {
      return L.icon({
        iconUrl: './mark.png',
        iconSize: [40, 40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });
    } else {
      return L.icon({
        iconUrl: './default.png',
        iconSize: [40, 40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });
    }
  };
  
  return (
    <div>
      <h1>Weather App</h1>

      <MapContainer
        center={center}
        zoom={8}
        style={{ width: '50vw', height: '90vh' }}
        dragging={true}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=vIkXdioF5LVFcmvw5yTi"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />

        {geoJSONData && (
          <GeoJSON data={geoJSONData} style={geoJSONStyle} onEachFeature={onEachFeature} />
        )}

        {districtPositions.map(({ name, position }) => {
                  const weatherInfo = weatherData.find(item => item.district === name);
                  const weatherCondition = weatherInfo ? weatherInfo.weatherCondition : '';

                  const customIcon = getWeatherIcon(weatherCondition);

                  return (
                    <Marker
                      key={name}
                      position={position}
                      icon={customIcon}
                      eventHandlers={{
                        mouseover: (e) => {
                          e.target.openPopup();
                        },
                        mouseout: (e) => {
                          e.target.closePopup();
                        },
                      }}
                    >
                      <Popup>
                        <h3>{name}</h3>
                        {weatherInfo && (
                          <div>
                            <p>Temperature: {weatherInfo.temperature}°C</p>
                            <p>Humidity: {weatherInfo.humidity}%</p>
                            <p>Pressure: {weatherInfo.pressure} hPa</p>
                          </div>
                        )}
                      </Popup>
                    </Marker>
                  );
                })}

        {/* <Marker position={positionKandy} icon={customIcon} 
        eventHandlers={{
                  mouseover: (e) => {
                    e.target.openPopup();
                  },
                  mouseout: (e) => {
                    e.target.closePopup();
                  },
              }}>
          <Popup>
          {generatePopupContent('Kandy', weatherData)}
          </Popup>
        </Marker>

        <Marker position={positionColombo} icon={customIcon} 
        eventHandlers={{
                  mouseover: (e) => {
                    e.target.openPopup();
                  },
                  mouseout: (e) => {
                    e.target.closePopup();
                  },
              }}>
          <Popup>
          {generatePopupContent('Colombo', weatherData)}
          </Popup>
        </Marker> */}



      </MapContainer>
    </div>
  );
}















// import React,{ useState, useEffect } from 'react'
// import {
//   MapContainer,
//   TileLayer,
//   Polygon,
//   Marker,
//   Popup
// } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css'
// import {statesData} from './data'
// import L from 'leaflet';
// import axios from 'axios';

// import './App.css';
// const center = [7.762081916489769, 80.65858279000169];
// const markerPosition = [7.344505821309715, 80.62933056448098];

// const customIcon = L.icon({
//   iconUrl: './sun.png', // URL to your custom marker icon image
//   iconSize: [70, 70], // Size of the icon in pixels
//   iconAnchor: [12, 41], // Anchor point of the icon relative to its top left corner
//   popupAnchor: [1, -34], // Anchor point for popups relative to the icon's center
   
// });


// export default function App () {
//   const [weatherData, setWeatherData] = useState([]);
  
//   useEffect(() => {
//     axios.get('http://localhost:3030/weather')
//       .then(response => {
//         setWeatherData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching weather data:', error);
//       });
//   }, []);

//   // const renderMarkers = () => {
//   //   return weatherData.map(item => (
//   //     <Marker key={item._id} position={[item.latitude, item.longitude]}>
//   //       <Popup>
//   //         <h3>{item.district}</h3>
//   //         <p>Temperature: {item.temperature}°C</p>
//   //         <p>Humidity: {item.humidity}%</p>
//   //         <p>Pressure: {item.pressure} hPa</p>
//   //       </Popup>
//   //     </Marker>
//   //   ));
//   // };
        
//   return (
    
//     <div>
      
//       <h1>Weather App</h1>
      
//     <MapContainer
//     center={center}
//       zoom={8}
//       style={{width: '50vw',height: '90vh'}}
//       dragging={false}
//       scrollWheelZoom={false}
//       zoomControl={false}
      
//     >
//       <TileLayer
//       url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=vIkXdioF5LVFcmvw5yTi"
//       attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
//       />
        
//       {
//         statesData.features.map((states)=> {
//           const coordinates = states.geometry.coordinates[0].map((item)=> [item[1], item[0]])
//           // return <Polygon
//           //   pathOptions={{
//           //     fillColor: '#FD8D3C',
//           //     fillOpacity: 0.7,
//           //     weight: 2,
//           //     opacity: 1,
//           //     dashArray: 3,
//           //     color: 'white',
//           //     zIndex: 1,
//           //   }}
//           //   positions={coordinates}
//           //   eventHandlers={{
//           //     mouseover: (e) => {
//           //       const layer = e.target;
//           //       layer.setStyle({
//           //         fillOpacity:0.7,
//           //         weight: 2,
//           //         dashArray: "",
//           //         color: "white",
//           //         fillColor: 'green'
//           //       })
//           //     },
//           //     mouseout: (e) =>{
//           //       const layer = e.target;
//           //         layer.setStyle({
//           //           fillOpacity:0.7,
//           //           weight: 2,
//           //           dashArray: "3",
//           //           color: "white",
//           //           fillColor: '#FD8D3C'
//           //         })
//           //     },
//           //     click: (e) => {

//           //     }
//           //   }}
//           // />
//         })
//       }
//       <Marker position={markerPosition} icon={customIcon}
//       eventHandlers={{
//         mouseover: (e) => {
//           e.target.openPopup();
//         },
//         mouseout: (e) => {
//           e.target.closePopup();
//         },
//     }}
//       >
//         <Popup>
//         <h3>Kandy</h3>
//     {weatherData.map(item => {
//       if (item.district === 'Kandy') {
//         return (
//           <div key={item._id}>
//             <p>Temperature: {item.temperature}°C</p>
//             <p>Humidity: {item.humidity}%</p>
//             <p>Pressure: {item.pressure} hPa</p>
//           </div>
//         );
//       } else {
//         return null;
//       }
//     })}
//         </Popup>
//       </Marker>
//     </MapContainer>
//     </div>
//   );
// }
