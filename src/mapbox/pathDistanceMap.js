import { token } from './token.js';

// MapBox js + css
import mapboxgl from '!mapbox-gl';
import Mapbox from './create_map.js';
import 'mapbox-gl/dist/mapbox-gl.css';

/** The token of mapboxgl API */
mapboxgl.accessToken = token;

/**
 * Class who represent a PathDistanceMap
 */
export default class PathDistanceMap {
    /**
     * Constructor of PathDistanceMap
     * @param {object} {} - referencePath - comparedPath - centerPosition
     */
    constructor(
        { 
            referencePath,
            comparedPath,
            center

        }){
        this._refPath = referencePath,
        this._cmpPath = comparedPath,
        this._map = new Mapbox({
            id:'pathDistance-map',
            style:'mapbox://styles/mapbox/light-v10',
            pos: center,
            zoom: 18
        }).getMap();
        /**
         * When Map created, intant loaded
         */
        this._map.on('load', () => {
            this._map.addSource('reference', {
                "type": "geojson",
                "data": this._refPath
            });
            this._map.addSource('compared', {
                "type": "geojson",
                "data": this._cmpPath
            });
        
            this._map.addLayer({
                'id': 'reference-l',
                'type': 'line',
                'source': 'reference',
                'layout': {
                    'line-join': 'miter',
                    'line-cap': 'square'
                },
                'paint': {
                    'line-color': '#FE6A6B',
                    'line-width': 4
                }
            });
            this._map.addLayer({
                'id': 'reference-p',
                'type': 'circle',
                'source': 'reference',
                'paint': {
                    'circle-color': '#B94B4C',
                    'circle-radius': 5,
                }
            });
            this._map.addLayer({
                'id': 'compared-l',
                'type': 'line',
                'source': 'compared',
                'layout': {
                    'line-join': 'miter',
                    'line-cap': 'square'
                },
                'paint': {
                    'line-color': '#FE6A6B',
                    'line-width': 3,
                    'line-opacity': 0.7
                }
            });
            this._map.addLayer({
                'id': 'compared-p',
                'type': 'circle',
                'source': 'compared',
                'paint': {
                    'circle-color': '#B94B4C',
                    'circle-radius': 4,
                }
            });
        });
        /**
         * Add control
         */
        this._map.addControl(new mapboxgl.NavigationControl()); /*Add navigation control*/
        
        /** Force css loading */
        setTimeout(() => this._map.resize(), 0);
    }

    /**
     * Get Map object
     * @returns mapbox object
     */
    getMap() {
        return this._map;
    }
}