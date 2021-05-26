import { token } from './token.js';

// MapBox js + css
import mapboxgl from '!mapbox-gl';
import Mapbox from './create_map.js';
import 'mapbox-gl/dist/mapbox-gl.css';

/** The token of mapboxgl API */
mapboxgl.accessToken = token;

/**
 * Class who represent a ClusteringTreeMap 
 * TODO: Real classes, here just for test now
 */
export default class ClusteringTreeMap {
    /**
     * Constructor of PathDistanceMap
     * @param {object} {} - centerPosition
     */
    constructor(
        { 
            center

        }){
        this._map = new Mapbox({
            id:'ClusteringTree-map',
            style:'mapbox://styles/mapbox/light-v10',
            pos: center,
            zoom: 18
        }).getMap();
        
        /** Add control */
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