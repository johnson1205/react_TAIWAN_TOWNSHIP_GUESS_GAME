import './App.css';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Map, GeoJSON } from 'react-leaflet/GeoJSON'
import mapdata from "./geo.json"
import { color } from 'd3';


function App() {
  //./TOWN_MOI_1120317.json
  /*
  const geoEvent = (mapdata.features, layer) => {

  };
  */
  /*
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      */
  const {useState} = React;
  let [isBingoWaiting, setIsBingoWaiting] = useState(0);
  let [selectedTownName, setSelectedTownName] = useState();
  let [randomQuetion, setRandomQuetion] = useState();
  let [score, setScore] = useState(0);

  useEffect(()=>{
    const keys = Object.keys(mapdata.features);
    const randIndex = Math.floor(Math.random() * keys.length);
    setRandomQuetion(randomQuetion=mapdata.features[randIndex].properties.TOWNNAME);
  },[]);
  
  const bingoAction = () => {
    const keys = Object.keys(mapdata.features);
    const randIndex = Math.floor(Math.random() * keys.length);
    setRandomQuetion(randomQuetion=mapdata.features[randIndex].properties.TOWNNAME);
    setScore(score=score+1);
    setSelectedTownName(selectedTownName="");
    setIsBingoWaiting(isBingoWaiting=0);
  }
  
  const mapFeature=(country, layer)=>{
    layer.on({
      mouseover: (e) => {
        e.target.setStyle({
          fillOpacity: 0.5,
        });
      },
      mouseout: (e) => {
        e.target.setStyle({
          fillOpacity: 1,
        });
      },
      click: (e) => {
        if((randomQuetion===e.sourceTarget.feature.properties.TOWNNAME)&&(isBingoWaiting===0)){
          setSelectedTownName(selectedTownName=e.sourceTarget.feature.properties.TOWNNAME);
          setIsBingoWaiting(isBingoWaiting=1);
          setTimeout(bingoAction,1000);
        }
        else if(isBingoWaiting===0){
          setSelectedTownName(selectedTownName=e.sourceTarget.feature.properties.TOWNNAME);
        }
      }
      
    });
  }
  const mapStyle={
    weight: 1,
    fillOpacity: 1,
    fillColor: "rgb(128, 206, 197)",
    color: "rgb(230,230,230)",
  };

  const mapBound =[
    [26.504979796639104, 116.100698791452],
    [20.67667721806277, 125.49054604625438],
  ]

  return (
    <div className='container'>
      <MapContainer center={[23.6, 120.9738819]} zoom={7} minZoom={7} maxBounds={mapBound}>
      <GeoJSON style={mapStyle} data={mapdata} onEachFeature={mapFeature}></GeoJSON>
      </MapContainer>
      <div className='right' align="center" style={{backgroundColor: isBingoWaiting? "rgb(67, 247, 67)": "rgba(204, 204, 204, 0.457)"}}>
        <div className='upper'>題目：{randomQuetion}</div>
        <div className='middle'>所選擇的區域：{selectedTownName}</div>
        <div className='score'>分數：<b>{score}</b></div>
      </div>
    </div>
  ); 
}

export default App;
