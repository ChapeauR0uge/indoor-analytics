import { token } from './token.js';

// MapBox js + css
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import Mapbox from './create_map.js';
import { euratechPath1, euratechPath2 } from '../data/paths.js';
import { euratechPos } from '../data/centerPosition.js';

/** The token of mapboxgl API */
mapboxgl.accessToken = token;

/**
 * Initialize a mapboxgl Map
 * @param {object} {} - container - style - center - zoom
 */
 const map = new Mapbox({
     id:'pathDistance-map',
     style:'mapbox://styles/mapbox/light-v10',
     pos: euratechPos,
     zoom: 18
    }).getMap();

map.addControl(new mapboxgl.NavigationControl()); /*Add navigation control*/

/** Force css loading */
setTimeout(() => map.resize(), 0);


const referencePath = euratechPath1;

const comparedPath = euratechPath2;

/**
 * Draw Map on load
 */
map.on('load', function () {
    map.addSource('reference', {
        "type": "geojson",
        "data": referencePath
    });
    map.addSource('compared', {
        "type": "geojson",
        "data": comparedPath
    });

    map.addLayer({
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
    map.addLayer({
        'id': 'reference-p',
        'type': 'circle',
        'source': 'reference',
        'paint': {
            'circle-color': '#B94B4C',
            'circle-radius': 5,
        }
    });

    map.addLayer({
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
    map.addLayer({
        'id': 'compared-p',
        'type': 'circle',
        'source': 'compared',
        'paint': {
            'circle-color': '#B94B4C',
            'circle-radius': 4,
        }
    });

});