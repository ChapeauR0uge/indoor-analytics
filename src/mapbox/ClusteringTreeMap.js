import { token } from './token.js';

// MapBox js + css
import mapboxgl from '!mapbox-gl';
import Mapbox from './create_map.js';
import 'mapbox-gl/dist/mapbox-gl.css';

// import ClusteringTree
import { ClusteringTree , ClusteringTreeNode } from '@indoor-analytics/multi-path';

/** The token of mapboxgl API */
mapboxgl.accessToken = token;

/**
 * Class who represent a ClusteringTreeMap 
 * 
 */
export default class ClusteringTreeMap {
    /**
     * Constructor of PathDistanceMap
     * @param {object} {} - zoneOfInterest - paths - centerPosition
     */
    constructor(
        { 
            zoi,
            paths,
            center

        }){
            this._zoi = zoi;
            this._paths = paths;
            this._map = new Mapbox({
                id:'ClusteringTree-map',
                style:'mapbox://styles/mapbox/light-v10',
                pos: center,
                zoom: 17
            }).getMap();

            // Create tmap
            let tmap = ClusteringTree.create(this._zoi, this._paths,0);
            
            //Export Feature collection
            const feature = tmap.toFeatureCollection(true, true);

            console.log(feature);

            /** Add control */
            this._map.addControl(new mapboxgl.NavigationControl()); /*Add navigation control*/
            
            /** Force css loading */
            setTimeout(() => this._map.resize(), 0);

            this._map.on('load', () => {
                this._map.addSource('tree', {
                    "type": "geojson",
                    "data": feature
                });

                // Draw zoi
                this._map.addLayer({
                    'id': 'outline-zoi',
                    'type': 'line',
                    'source': 'tree',
                    'layout': {},
                    'paint': {
                        'line-color': '#FE6A6B',
                        'line-width': 2,
                        'line-opacity': 0.5
                    },
                    'filter': ['==', '$type', 'Polygon']
                });

                // Draw Average Paths
                this._map.addLayer({
                    'id': 'average-line',
                    'type': 'line',
                    'source': 'tree',
                    'layout': {},
                    'paint': {
                        'line-color': '#B94B4C',
                        'line-width': 1
                    },
                    'filter': ['==', '$type', 'LineString']
                });
                
            });
        }

    /**
     * Get Map object
     * @returns mapbox object
     */
    getMap() {
        return this._map;
    }
}