# Indoor Analytics Documentation Website


## Technologies

* **FRONT-END**:
    * Le template `scribbler` pour le front-end.
    * L'API `MapBox GL` pour l'affichage de carte intéractives.
    * La bibliothèque `Turf.js` pour la manipulation d'object `GeoGSON`.
    * La bibliothèque `Indoor-Analytics` pour la présentation de celle-ci + démo.

* **DEVELOPPEMENT**:
    * `Webpack v5` pour la bundlelisation de tout nos fichier css + html + js.
    * Le plugin `css-loader` et `style-loader` pour une bundlelisation des fichiers CSS.

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

## Ajout d'une fonction 

Format des informations de nos fonctions :

```json
    "data": [
      {
        "name": "pathDistance", //Nom de la fonction 
        "pname": "path-distance", // Nom du package
        "description": "", // Description de la fonction,
        "params": [ //Liste des arguments de la fonction
          {
            "arg": "referencePath", // Nom argument
            "type": "Feature <LineString>", // Type de l'argument
            "description": "the reference path" // Description de l'argument
          },
          {
            "arg": "comparedPath",
            "type": "Feature <LineString>",
            "description": "the compared path"
          }
        ],
        "return": { // Le retour de la fonction
          "type": "ErrorVector", // Son type
          "description": "a vector projection on the reference path", // Sa description
          "example": {} // L'exmple d'utilisation de la fonction
        }
      }
```

Ces données sont ensuites transmises à notre template `.ejs`.