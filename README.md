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

* Tous les fichiers prêt au déploiement sur un serveur web se trouvent dans le dossier `public`, ils sont bundleliser, il ne faut donc pas les modifiers.

* Le dossier `src` contient tous les fichiers, prêt à être bundleliser, ce sont ces fichiers qu'il faut modifier.

## Installation :

-> Il faut qu'`npm` et `node` soit déjà installés.

-> Installation des dépendances:
```shell
npm install
```

-> Pour l'utilisation de `MapBox GL`, il faut absolument un token, pour une raison de sécurité, il ne sera jamais présent dans les fichiers `src` sur le git, il faut donc aller le générer sur le site `MapBox GL`. 

-> If faut maintenant ajouter le token dans un fichier `token.js`, présent dans le dossier `src/mapbox`:
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
```# indoor-analytics-pji.github.io
