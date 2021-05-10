/* Class for Creating New Control in mapbox GL - Follow the official Documentation   */
// Control implemented as ES6 class

import mapboxgl from 'mapbox-gl';

/**
 * Class who represent a mapboxgl MAP
 */
 export default class Mapbox {
    constructor(
        { 
            id = 'map', 
            style = 'mapbox://styles/mapbox/streets-v11', 
            pos = [3.057256, 50.62925], // Starting Map position
            zoom = 12 
        }){
        this._id = id;
        this._style = style;
        this._pos = pos;
        this._zoom = zoom;
        this._map = new mapboxgl.Map({
            container: id,
            style: style,
            center: pos,
            zoom: zoom,
            trackResize: true 
        });
    }
    getMap() {
        return this._map;
    }
}