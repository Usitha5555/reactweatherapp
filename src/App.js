import React,{ useState, useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker 
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import {statesData} from './data'
import L from 'leaflet';
import axios from 'axios';

import './App.css';
const center = [7.762081916489769, 80.65858279000169];
const markerPosition = [7.344505821309715, 80.62933056448098];

const customIcon = L.icon({
  iconUrl: './mark.png', // URL to your custom marker icon image
  iconSize: [70, 70], // Size of the icon in pixels
  iconAnchor: [12, 41], // Anchor point of the icon relative to its top left corner
  popupAnchor: [1, -34], // Anchor point for popups relative to the icon's center
});


export default function App () {
        
  return (
    <div>
      
    
    <MapContainer
    center={center}
      zoom={8}
      style={{width: '50vw',height: '90vh'}}
    >
      <TileLayer
      url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=vIkXdioF5LVFcmvw5yTi"
      attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
        
      {
        statesData.features.map((states)=> {
          const coordinates = states.geometry.coordinates[0].map((item)=> [item[1], item[0]])
          return <Polygon
            pathOptions={{
              fillColor: '#FD8D3C',
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: 'white'
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity:0.7,
                  weight: 2,
                  dashArray: "",
                  color: "white",
                  fillColor: 'green'
                })
              },
              mouseout: (e) =>{
                const layer = e.target;
                  layer.setStyle({
                    fillOpacity:0.7,
                    weight: 2,
                    dashArray: "3",
                    color: "white",
                    fillColor: '#FD8D3C'
                  })
              },
              click: (e) => {

              }
            }}
          />
        })
      }
      <Marker position={markerPosition} icon={customIcon}></Marker>
    </MapContainer>
    </div>
  );
}
