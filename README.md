# Indoor Analytics Documentation Website

Website déployé à l'adresse suivante:

https://chapeaur0uge.github.io/indoor-analytics/

Github de la bibliothèque `indoor-analytics`:

https://github.com/indoor-analytics


## Technologies

* **FRONT-END**:
    * Le template `scribbler` pour le front-end.
    * L'API `MapBox GL` pour l'affichage de carte intéractives.
    * La bibliothèque `Turf.js` pour la manipulation d'object `GeoGSON`.
    * La bibliothèque `Indoor-Analytics` pour la présentation de celle-ci + démo.

* **DÉVELOPPEMENT**:
    * `Webpack v5` pour la bundlelisation de tout nos fichier css + html + js.
    * Le plugin `mini-css-extract-plugin` et `style-loader` pour une bundlelisation des fichiers CSS.
    * Le plugin `html-loader` et `html-webpack-plugin` pour la génération dynamique de nos pages web.
    * Le plugin `svg-url-loader` pour la bundlelisation des nos images SVG.

## Description :

* Tous les fichiers prêt au déploiement sur un serveur web se trouvent dans le dossier `docs`, ils sont bundleliser, il ne faut donc pas les modifiers.

* Un dossier `assets` contient le CSS et les autres assets pour notre website.
 
* Le dossier `src` contient tous les fichiers, prêt à être bundleliser, ce sont ces fichiers qu'il faut modifier.

-> Dans celui-ci se trouve :
* Un dossier `front-end`, fichiers `.js` contenant les fonctions relatives au front.
* Un dossier `view`, fichiers `.ejs` de nos pages web.
* Un dossier `mapbox`, tout nos fichiers pour la gestion des cartes interactives `mapbox`. 
* Un dossier `data`, contient le fichier `json` qui contient informations de nos packages.

## Installation :

-> Il faut qu'`npm` et `node` soit déjà installés.

-> Installation des dépendances:
```shell
npm install
```

-> Pour l'utilisation de `MapBox GL`, il faut absolument un token, pour une raison de sécurité, il ne sera jamais présent dans les fichiers `src` sur le git, il faut donc aller le générer sur le site `MapBox GL`. 

-> If faut maintenant ajouter le token 'MAPBOX-GL' dans un fichier `token.js`, présent dans le dossier `src/mapbox`:
```javascript
//In token.js
export const token = '<TOKEN>';
```

-> Nous pouvons maintenant bundle nos fichier avec la commande:
```shell
npm run build
```

## Commandes de bundlelisation:

```shell
// Pour build une seul fois
$ npm run build

// Pour build en temps réel
$ npm run watch
```

## Ajout d'une fonction et/ou classe 

Format des informations de nos fonctions et/ou classes dans le fichier `lib.json`:
* Si c'est une fonction, comme "pathDistance" par exemple.

```json
    "data": [
      {
        "name": "pathDistance", //Nom de la fonction :String
        "main_package":true, // Permet l'affichage ou non sur la page landing, seul les main_packages seront affichés. : Boolean 
        "pname": "path-distance", // Nom du package : String
        "description": "", // Description de la fonction : String
        "map":true, // Affichage ou non d'une map :Boolean
        "params": [ //Liste des arguments de la fonction
          {
            "arg": "referencePath", // Nom argument
            "type": "Feature <LineString>", // Type de l'argument
            "description": "the reference path" // Description de l'argument
          }
        ],
        "options": [ // Liste des options de la fonction
          {
            "arg": "", // Nom option : String
            "type": "", // Type de l'option :String
            "default": "", // Valeur par défault :String
            "description": "" // Description de l'option
          }
        ],
        "return": { // Le retour de la fonction
          "type": "ErrorVector", // Son type :String
          "description": "a vector projection on the reference path" // Sa description :String
        },
        "example": "pathDistance", // Nom du fichier de l'exemple, fichier se trouvant dans ./view/partials/examples/<nom_fichier_example>.html
        "af": "" // Nim du fichier qui contient la description de l'Algorithme Factorization, fichier se trouvant dans ./view/partials/af/<nom_fichier_example>.html
      }
```

* Si c'est une classe, comme "ClusteringTree" par example:

```json
    "data": [
      {
        "name": "ClusteringTree", //Nom de la classe :String
        "main_package":true, // Permet l'affichage ou non sur la page landing, seul les main_packages seront affichés. : Boolean 
        "pname": "multi-path", // Nom du package : String
        "description": "", // Description de la classe : String
        "map":true, // Affichage ou non d'une map :Boolean
        "constructor":{ 
          "params": [ //Liste des arguments du constructeur
            {
              "arg": "", // Nom argument
              "type": "", // Type de l'argument
              "description": "" // Description de l'argument
            }
          ]
        },
        "members": [ // Liste des attributs de la classe
          {
            "name": "", // Nom attribut :String
            "type": "", // Type de l'attribut :String
            "description": "" // Description de l'attribut :String
          }
        ],
        "methods":[ // Liste des methodes de la classe
          {
            "name": "extractAveragePaths()" // Nom de la méthode de la classe
          }
        ],
        "example": "pathDistance", // Nom du fichier de l'exemple, fichier se trouvant dans ./view/partials/examples/<nom_fichier_example>.html
        "af": "" // Nim du fichier qui contient la description de l'Algorithme Factorization, fichier se trouvant dans ./view/partials/af/<nom_fichier_example>.html
      }
```
* Il ne faut bien sur pas oublier de documenter, les méthodes des classes, pour ce faire il suffit d'utiliser le json à la suite du json de la classe (voir `lib.json`).

Ces données sont ensuite transmises à notre template `.ejs`.

---

## Tutoriel Ajout d'un package fictif.

Imaginons que j'ai un package npm que je vais appeler `random-path` qui se situe par exemple ici: `indoor-analytics/random-path`.

Dans ce package, j'ai la fonction `randomPath`, qui me renvoie un path aléatoire inclus dans une zoi.

1. Écriture des informations dans le fichier `lib.json`:
   ```javascript
   {
    "data": [
      ...
      {
        "name": "randomPath",
        "main_package":true,
        "fonction": true,
        "pname": "random-path",
        "map": true,
        "description": "Generate a random path in a zoi",
        "params": [
          {
            "arg": "zoi",
            "type": "Feature <Polygon>",
            "description": "Zone Of interest of a given place"
          }
        ],
        "options": null,
        "return": {
          "type": "Feature <LineString>",
          "description": "a random path"
        },
        "example": "randomPath",
        "af": null
      }
      ...
   ```

2. Dans `./partials/examples` ajout d'un fichier `randomPath.html` :

```html
import { randomPath } from '@indoor-analytics/random-path';<br>
<br>
const zoi = "euratechZoi";<br>
<br>                    
const path = randomPath(zoi);
<br>
``` 
3. Éventuellement je peux faire la même chose avec l'Algorithm Factorization dans `./view/partials/af`. (mais pas pour l'exemple)
4. Création de la carte (Falcultatif), ici dans le dossier `mapbox` je crée le fichier `randomPathMap.js`:
```javascript
import { token } from './token.js';
// Import fichier
import { randomPath } from '@indoor-analytics/random-path';

// MapBox js + css
import mapboxgl from '!mapbox-gl';
import Mapbox from './create_map.js';
import 'mapbox-gl/dist/mapbox-gl.css';

/** The token of mapboxgl API */
mapboxgl.accessToken = token;

/**
 * Class who represent a randomPathMap
 */
export default class RandomPathMap {
    /**
     * Constructor of randomPathMap
     * @param {object} {} - zoneOfInterest - centerPosition
     */
    constructor(
        { 
            zoi,
            center

        }){
        this._zoi = zoi,
        this._map = new Mapbox({
            id:'randomPath-map',
            style:'mapbox://styles/mapbox/light-v10',
            pos: center,
            zoom: 18
        }).getMap();

        /**
         * Get random path
         */
        this._path = randomPath(this._zoi);
        /**
         * When Map created, instant loaded
         */
        this._map.on('load', () => {
            // Source 
            this._map.addSource('path', {
                "type": "geojson",
                "data": this._path
            });
            // Draw line
            this._map.addLayer({
                'id': 'reference-l',
                'type': 'line',
                'source': 'path',
                'layout': {
                    'line-join': 'miter',
                    'line-cap': 'square'
                },
                'paint': {
                    'line-color': '#FE6A6B',
                    'line-width': 4
                }
            });
            //Draw point on line
            this._map.addLayer({
                'id': 'reference-p',
                'type': 'circle',
                'source': 'path',
                'paint': {
                    'circle-color': '#B94B4C',
                    'circle-radius': 5,
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
```

5. Ajout de cette map dans `map_list.js`:
```javascript
/*Import our library maps*/
import PathDistanceMap from './pathDistanceMap.js';
import ClusteringTreeMap from './ClusteringTreeMap.js'; 
import RandomPathMap from './randomPathMap.js'; // ----HERE----

/* Location for exemple*/
import { euratechPath1, euratechPath2, lilleFlanderWalkwayPaths } from '../data/paths';
import { euratechPos, lilleFlandreRailway } from '../data/centerPosition';
import { actualFlandersRailway, euratechZoi } from '../data/zones.js'; // ---HERE---

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
    }else if("randomPath" === arg){ // -----HERE--- 
        currentMap.remove(); // Removing old map
        currentMap = new RandomPathMap({
            zoi: euratechZoi,
            center: euratechPos
        }).getMap();
    }else{
        console.log("ERROR MAP NOT FOUND");
    }
}
``` 

6. Lancement du mode production
```bash
$ npm run build
```

7. Et voilà normalement, la génération est faite et la nouvelle map fonctionne.
