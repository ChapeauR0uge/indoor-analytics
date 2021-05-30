/*Import our library maps*/
import PathDistanceMap from './pathDistanceMap.js';
import ClusteringTreeMap from './ClusteringTreeMap.js'; 

/* Location for exemple*/
import { euratechPath1, euratechPath2, lilleFlanderWalkwayPaths } from '../data/paths';
import { euratechPos, lilleFlandreRailway } from '../data/centerPosition';
import { actualFlandersRailway } from '../data/zones.js';

/*Default loading, because PathDistance Map always first to load in both pages*/
let currentMap = new PathDistanceMap({
    referencePath: euratechPath1,
    comparedPath: euratechPath2,
    center: euratechPos
}).getMap();


/** Change the current Map */
export function newCurrentMap(arg) {
    if("pathDistance" === arg){
        currentMap.remove(); // Removing old map
        currentMap = new PathDistanceMap({
            referencePath: euratechPath1,
            comparedPath: euratechPath2,
            center: euratechPos
        }).getMap();
    }else if("ClusteringTree" === arg){
        currentMap.remove(); // Removing old map
        currentMap = new ClusteringTreeMap({
            zoi: actualFlandersRailway,
            paths: lilleFlanderWalkwayPaths,
            center: lilleFlandreRailway
        }).getMap();
    }else{
        console.log("ERROR MAP NOT FOUND");
    }
}

