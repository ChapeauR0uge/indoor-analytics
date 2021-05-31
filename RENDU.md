# Indoor Analytics Documentation Website

Rendu du PJI 2021, concernant la documentation de la bibliothèque `indoor-analytics`.

* https://github.com/indoor-analytics/

Le site est actuellement déployé sur `github-pages`:

* https://chapeaur0uge.github.io/indoor-analytics/

Par **Denis Barlet** sous la supervision de **Rémy Raes** et **Romain Rouvoy**.

## Roadmap
---
### partie 1: prélude - **5hr**
---
La première chose que j'ai faite avant de demarrer le projet, trouver sur quelles technologies je me reposerais.

En effet, je me suis posé les questions suivantes:

    * Le site web aura t'il besoin d'une base de données ?
    * Un site web reposant sur une SPA (Single page application).
    * L'Hebergement du website ?
    * L'ajout de la doc, statique ou dynamique ?
    * Comment gérer les dépendances ?

Après quelques heures de reflexions et de lecture d'exemple de docs, mais surtout un guidage sur une partie des technologies sur le travail attendu de **Romain Rouvoy**.

J'ai choisi:
    
    * Le deploiement d'un site `statique` sur github-pages.
    * L'utilisation de `mapbox-gl` pour les exemples de fonctions de la bibliothèque.
    * `Turf.js` pour une utilisation avec `mapbox-gl`. 
    * Deux pages, une pour la "vitrine", l'autre pour la documentation pure.

J'ai donc une idée plus ou moins claire de ce que je veux atteindre comme objectif à la fin.

---
### partie 2: MAPBOX-GL - **15hr**
---
Le premier travail qui m'a été demander par **Romain Rouvoy** est la mise en place d'une carte avec un bouton generate pour placer quelques marqueurs sur celle-ci.

La première chose est la consultation de la documentation officiel de mapbox:
* https://docs.mapbox.com/mapbox-gl-js/api/#quickstart

Je comprends vite comment déployer une carte, pour celà j'ai besoin de deux choses:

* Un "entrypoint" dans un fichier html.
    ```html
    <div id="map">
        <!-- MAP WILL BE INJECTED HERE-->
    </div>
    ```

* Du code JS pour l'instanciation de la map, (ici dans un fichier JS à part).
    ```javascript
    import mapboxgl from 'mapbox-gl';

    // public token from Mapbox-gl
    mapboxgl.accessToken =""
    const map = new mapboxgl.Map({
        container: 'map', // ID div
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
    ```
Le plus simple étant fait, j'ai chercher comment interéagir avec cette `map`, il suffit d'utilisé la méthode `addControl();`:

```javascript
map.addControl(new mapboxgl.NavigationControl()); /*Add navigation control*/
```

Maintenant que je sais ça, je crée un bouton `generate` sous forme d'icône sur la carte, mais avant celà je crée une classe `CustomButtonControl`.

Celle-ci me permet de crée des boutons custom sur la carte (voir premiers commits pour le code).

Je peux maintenant injecter ce bouton sur la carte:
```javascript
const ctrlAddRandomPts = new CustomButtonControl({
    eventHandler: addTwoRandomPoints,
    className: "generate",
    title: "generate"
});

map.addControl(ctrlAddRandomPts, "bottom-left");
```

Mais il faut que je place des marqueurs aléatoirement sur la carte en appuyant sur celui-ci, lors du clique :
```javascript
function addTwoRandomPoints(event){
    let geo_points = turf.randomPoint(2, {bbox: turf.bbox(turf.lineString(lille))});
    /*Add points to map*/
    geo_points.features.forEach(function(marker) {

        let m = new mapboxgl.Marker();

        // make a marker for each feature and add to the map
          m
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);

        // Save Marker for clear after
        current_markers.push(m);
    });
}
```

Remarquons que j'utilise `turf.js`, le site étant bien documenté, je n'ai eu aucun problèmes de compréhension.

Je fais la même chose en implémentant un bouton clear, qui va supprimer tout les marqueurs, sur la carte.

Pour résumer, lorsque que j'appuis sur le bouton `generate`, deux marqueurs sont placé aléatoirement sur la `carte` dans la zone de Lille (bbox turf).

Lorsque que j'appuis sur `clear`, tout les marqueurs sont supprimés.

Cette première partie se conclue sur une reussite, cette carte restera sur la page principale jusqu'à très recement (voir anciens commit).

