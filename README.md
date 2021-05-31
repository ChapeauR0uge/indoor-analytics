# Indoor Analytics Documentation Website

Réaliser dans le cadre du PJI 2021 du Master Informatique de l'Université de Lille.

Website deployé à l'adresse suivante:

https://chapeaur0uge.github.io/indoor-analytics/

Github de la bibliothèque `indoor-analytics`:

https://github.com/indoor-analytics


## Technologies

* **FRONT-END**:
    * Le template `scribbler` pour le front-end.
    * L'API `MapBox GL` pour l'affichage de carte intéractives.
    * La bibliothèque `Turf.js` pour la manipulation d'object `GeoGSON`.
    * La bibliothèque `Indoor-Analytics` pour la présentation de celle-ci + démo.

* **DEVELOPPEMENT**:
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
            "name": "extractAveragePaths()" // Nom de la methode de la classe
          }
        ],
        "example": "pathDistance", // Nom du fichier de l'exemple, fichier se trouvant dans ./view/partials/examples/<nom_fichier_example>.html
        "af": "" // Nim du fichier qui contient la description de l'Algorithme Factorization, fichier se trouvant dans ./view/partials/af/<nom_fichier_example>.html
      }
```
* Il ne faut bien sur pas oublier de documenter, les méthodes des classes, pour ce faire il suffit d'utiliser le json à la suite du json de la classe (voir `lib.json`).

Ces données sont ensuites transmises à notre template `.ejs`.