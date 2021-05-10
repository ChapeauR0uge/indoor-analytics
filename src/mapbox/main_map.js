import * as turf from '@turf/turf';

import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import CustomButtonControl from './custom_control';
import { token } from './token';

import Mapbox from './create_map';

/** The token of mapboxgl API */
mapboxgl.accessToken = token;

/**
 * Initialize a mapboxgl Map
 * @param {object} {} - container - style - center - zoom
 */
const map = new Mapbox({style:"mapbox://styles/mapbox/satellite-v9"}).getMap();



/** Turf.js bbox of Lille */
const lille = [[3.0239012593,50.6145864059],[3.0237673476,50.6526978939],[3.0906135708,50.652792348],[3.0907474825,50.6146809365],[3.0239012593,50.6145864059]]

const current_markers=[];

/*--Event Handler--*/
/**
 * Add two random points en map
 * @param {*} event for onclick
 */
function addTwoRandomPoints(event){
    let geo_points = turf.randomPoint(2, {bbox: turf.bbox(turf.lineString(lille))});
    /*Add points to map*/
    geo_points.features.forEach(function(marker) {

        let m = new mapboxgl.Marker();

        // make a marker for each feature and add to the map
          m
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);

        // Save Marker for clear after
        current_markers.push(m);
    });
}

/**
 * Clear all points on the map
 * @param {*} event 
 */
function clear(event){
    current_markers.forEach(function(marker){
        marker.remove();
    });
}

const ctrlAddRandomPts = new CustomButtonControl({
    eventHandler: addTwoRandomPoints,
    className: "generate",
    title: "generate"
});

const ctrlClear = new CustomButtonControl({
    eventHandler: clear,
    className: "clear",
    title: "clear"
});

/* Add Controls to the Map */
map.addControl(new mapboxgl.NavigationControl()); /*Add navigation control*/
map.addControl(ctrlClear, "bottom-right");
map.addControl(ctrlAddRandomPts, "bottom-left");

export { addTwoRandomPoints, clear };