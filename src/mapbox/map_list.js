/*Import our library maps*/
import PathDistanceMap from './pathDistanceMap.js';
import ClusteringTreeMap from './ClusteringTreeMap.js'; // TODO: Just for test now

/* Location for exemple*/
import { euratechPath1, euratechPath2 } from '../data/paths';
import { euratechPos, lillePos } from '../data/centerPosition';

/*Default loading, because PathDistance Map always first to load in both pages*/
let currentMap = new PathDistanceMap({
    referencePath: euratechPath1,
    comparedPath: euratechPath2,
    center: euratechPos
}).getMap();

export function removeMap() {
    currentMap.remove();
}

/** Change the current Map */
export function newCurrentMap(arg) {
    if("pathDistance" === arg){
        currentMap = new PathDistanceMap({
            referencePath: euratechPath1,
            comparedPath: euratechPath2,
            center: euratechPos
        }).getMap();
    }else if("ClusteringTree" === arg){
        currentMap = new ClusteringTreeMap({
            center: lillePos
        }).getMap();
    }else{
        console.log("ERROR MAP NOT FOUND");
    }
}

