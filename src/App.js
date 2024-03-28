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
      
    
    
    </div>
  );
}
