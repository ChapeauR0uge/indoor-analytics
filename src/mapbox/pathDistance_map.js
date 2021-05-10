import { token } from './token.js';

// MapBox js + css
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import Mapbox from './create_map.js';

/** The token of mapboxgl API */
mapboxgl.accessToken = token;

/**
 * Initialize a mapboxgl Map
 * @param {object} {} - container - style - center - zoom
 */
 const map = new Mapbox({
     id:'pathDistance-map',
     style:'mapbox://styles/mapbox/light-v10',
     pos: [3.020667, 50.633176],
     zoom: 18
    }).getMap();

map.addControl(new mapboxgl.NavigationControl()); /*Add navigation control*/



const referencePath = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [3.0206072330474854, 50.63329604535505],
            [3.020336329936981, 50.63318376106058],
            [3.0204543471336365, 50.63306297008071],
            [3.020596504211426, 50.63293792557036],
            [3.0208204686641693,50.63303064568133],
            [3.021000176668167, 50.632857964960806],
            [3.0212053656578064, 50.63294302943444],
            [3.0210819840431213, 50.63306126879709]
          ]
        }
      }
    ]
  };

const comparedPath = {
    "type": "Feature",
    "properties": {},
    "geometry": {
        "type": "LineString",
        "coordinates": [
        [3.020470440387726, 50.63340322556774],
        [3.0203819274902344,50.6333292202089],
        [3.020383268594742,50.6332790326004],
        [3.020399361848831,50.633225442383],
        [3.0203738808631897,50.633172702744346],
        [3.0204154551029205,50.6331250668908],
        [3.0205053091049194,50.63306041815525],
        [3.0206005275249477,50.6329821590406],
        [3.02072525024414,50.63297025003347],
        [3.020870089530945,50.63293537363811],
        [3.0209814012050624,50.63290049721687],
        [3.021102100610733,50.63287327657741],
        [3.021216094493866,50.63291070495258],
        [3.0211490392684937,50.63297280196384],
        [3.02111953496933,50.633049359809995],
        [3.0210980772972107,50.63306892457292]
        ]
    }
};

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