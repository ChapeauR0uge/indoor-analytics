import { token } from './token.js';

// MapBox js + css
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import Mapbox from './create_map.js';
import { lillePos } from '../data/centerPosition.js';

/** The token of mapboxgl API */
mapboxgl.accessToken = token;

if(document.getElementById('ClusteringTree-map')){
    /**
     * Initialize a mapboxgl Map
     * @param {object} {} - container - style - center - zoom
     */
    const map = new Mapbox({
        id:'ClusteringTree-map',
        style:'mapbox://styles/mapbox/light-v10',
        pos: lillePos,
        zoom: 18
    }).getMap();

    map.addControl(new mapboxgl.NavigationControl()); /*Add navigation control*/

    /** Force css loading */
    setTimeout(() => map.resize(), 0);
}