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
La première chose que j'ai faite avant de démarrer le projet, trouver sur quelles technologies je me reposerais.

En effet, je me suis posé les questions suivantes:

  * Le site web aura t'il besoin d'une base de données ?
  * Un site web reposant sur une SPA (Single page application).
  * L'Hébergement du website ?
  * L'ajout de la doc, statique ou dynamique ?
  * Comment gérer les dépendances ?

Après quelques heures de réflexions et de lecture d'exemple de docs, mais surtout un guidage sur une partie des technologies sur le travail attendu de **Romain Rouvoy**.

J'ai choisi:
    
  * Le déploiement d'un site `statique` sur github-pages.
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
Le plus simple étant fait, j'ai chercher comment interagir avec cette `map`, il suffit d'utilisé la méthode `addControl();`:

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

Cette première partie se conclue sur une réussite, cette carte restera sur la page principale jusqu'à très récemment (voir anciens commit).

---
### partie 3: Le Front-end  - **20hr**
---

Après avoir eu maîtrise de la carte, j'ai chercher un moyen de la mettre en valeur, grâce au front.

Néanmoins j'arrive vite à la conclusion qu'il est temps de trouver un moyen de préparé un style pour l'accueil de la bibliothèque, à l'heure où je commence cette partie, seul "pathDistance" est disponible sous forme de paquet `npm`.

Je me concentre donc sur deux points importants:
* Mise en place de la map précédente sur une page d'accueil.
* La documentation de `pathDistance` à la façon `turf.js`.

N'étant pas un bon UX/UI designer (et n'ayant pas le temps de partir "from scratch"), je cherche donc un template libre de droit sur lequel partir.

Très vite je tombe sur un template qui me donne des idées :
* https://github.com/amiechen/codrops-scribbler

Celui-ci sous licence MIT n'a aucune limitations, parfait pour notre projet.

Je remarque très rapidement, les limitations de celui-ci, au niveau de css, qui ne correspond pas vraiment à ce que nous voulons pour la partie documentation.

Une très grande partie de mon temps est donc consacré, à la réalisation d'un modèle CSS de turf.js, qui sera intégré à la section documentation.

Après de très longues heures de tests, de documentations et de bugs en tout genre, j'arrive à maquetter les premiers designs de la documentation.

![Maquette docs](./rendu/maquette.png)

J'entame un deuxième sprint pour la correction des bugs css, des flexbox qui bug, des titres aussi, etc...

J'ai maintenant deux, pages sur la première, je prend vite la décision d'afficher la map et dans les tabs et features, dans le premier les instructions "comment installer la paquet" et dans l'autre une description rapide du package. (d'autres choses sont toujours possible, bien sur).

Pour résumer, cette partie à surtout été consacré à la mise en place d'un premier front, les deux pages ont pas mal de dépendence, beaucoup de fichier js à inclure c'est pour ça que je vais avoir besoin de bundleliser tout ça.

---
### partie 4: Webpack - **25hr**
---

Avec la multiplication de fichiers `JS`, il devient laborieux de géré l'injection des différents fichiers `JS` dans notre `HTML`, de plus, il y a un risque d'importer plusieurs fois les bibliothèques, donc niveau performance, c'est pas top.

En effet, j'ai beaucoup de fichier `JS`, avec des rôles totalement différents, du `front-end`, `mapbox` en passant par des dépendances sur des fichiers `JS` à part, on si perd vite.

Il y a un outils magique qui s'appel `Webpack`, celui-ci nous permet une "bundlelisation" de quasiment n'importe quoi.

La première chose que je fais, c'est de consulter la doc officiel: 
* https://webpack.js.org/concepts/

Lorsque j'écris ce rendu, j'utilise `webpack 5`, celui-ci change pas mal de choses par rapport à `webpack 4`, j'ai donc mis beaucoup de temps à comprendre certains concepts.

Dans un premier temps, j'écris un fichier `JS` par chaque page:
* `index.js` contient les dépendances pour index.html
* `main_doc.js` contient les dépendances pour doc.html

Pour `index.js` par exemple:
```javascript
// MapBox Gl Example
import "./mapbox/map_list.js";

// indoor-frontend.js
import "./front-end/scribbler.js";

//import css
import "/assets/stylesheets/indoor-global.css";
import "/assets/stylesheets/indoor-landing.css";
```

Dans un second temps, dans un fichier `webpack.config.js`, j'indique les entrypoints en suivant la documentation.
```javascript
module.exports = {
    entry: { //Les fichiers d'entrée
      index:'./src/index.js',
      doc: './src/main_doc.js',
    },
    output: { // Les fichiers de sortie
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'docs'),
      clean: true, // Supprime les fichiers déjà présent dans docs avec regénération des nouveaux.
    },
    ...
}
```

En faisant cela, je génère deux fichiers bundlelisé dans un dossier `docs`:
* `index.bundle.js` issu de index.js
* `doc.bundle.js` issu de main_doc.js

Je n'ai plus qu'un importer ses deux fichiers `js` dans mes deux html, et rien d'autre à faire.

Une précision, il y a un concept de loaders, si on veut bundleliser autre chose que du js, ici j'importe des fichier css et svg, que je charge dans le `js`, grace aux loaders:
```javascript
module: {
    ...
    rules: [
    {
        test: /\.css$/i,
        use: ['style-loader','css-loader'],
    },
    {
        test: /\.svg/,
        use: {
        loader: "svg-url-loader",
        options: {},
        },
    }
```

Dans la documentation, il existe plusieurs modes, `production` et `development`, l'un minify tout nos fichiers, qui sont impossible à débugger en cas d'erreur, et l'autre comme son nom l'indique, sert au development avec des outils de débogage partout.

J'ai donc suivi la [documentation officiel](https://webpack.js.org/guides/production/), pour faire deux modes distinct avec `npm`:

Pour le mode development:
```bash
$ npm start watch
```

Pour le mode production:
```bash
$ npm start build
```

Pour resumé, la mise en place de webpack, n'est pas "user-friendly" et demande pas mal de temps et de tests, pour comprendre plusieurs concepts.

Je reviendrai dessus lorsque j'aborderai la génération de pages `HTML`. 

---
### partie 5: Génération des pages HTML - **15hr**
---

Jusqu'à maintenant, les pages `HTML` étaient écrites directement en brut, mais ajouté une nouvelle fonction/classe rendait les choses compliquées.

J'ai longtemps cherché, et j'ai trouvé la solution magique avec `webpack`. 
En effet existe un module `HtmlWebpackPlugin`, qui prend en paramètre un fichier [template `.ejs`](https://ejs.co/), et qui génère un fichier `.html` issu de ce template, et de ses différents paramètres.
* https://github.com/jantimon/html-webpack-plugin

Avant d'aborder le fonctionnement d'`ejs`, il faut savoir que je passe un fichier json en paramètre d'`HtmlWebpackPlugin`, le fichier `lib.json` contient toutes les informations des fonctions de la librairie `indoor-analytics`.

Donc dans notre fichier `webpack.config.js`, j'ajoute :
```javascript
...
const libJson = require('./src/data/lib.json');

module.exports = {
    ...
    plugins: [ // Un html-plugin pour chaque pages 
      new HtmlWebpackPlugin({
        inject: 'body', // l'endroit ou j'injecte mon bundle js 
        scriptLoading: 'blocking',
        chunks: ['index'], // Nom du bundle js
        template: './src/view/index.ejs', // Template .ejs pour la page
        templateParameters: {
          'json': libJson //L'endroit ou j'injecte mon json pour le template .ejs
        },
        filename: 'index.html', // Nom du fichier html généré.
      }),
      new HtmlWebpackPlugin({
        inject: 'body',
        scriptLoading: 'blocking',
        chunks: ['doc'],
        template: './src/view/doc.ejs',
        templateParameters: {
          'json': libJson,
        },
        filename: 'doc.html',
      })
    ],
    ...
};
```

Maintenant que nous savons, voyons comment `.ejs` fonctionne.

Grace aux balises, nous pouvons écrire du javascript dans notre `.ejs`:
* `<% %>` évalue du javascript
* `<%= %>` interprète le contenu d'une variable et la transforme en html.

Voici, un exemple avec la génération de paramètres:
```html
<!--Arguments section-->
<% if(json.data.params != null){ %>
    <h3 class="section__title">Arguments</h3>
    <table>
    <thead>
        <tr>
        <th>Arguments</th>
        <th>Type</th>
        <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <% json.data.params.forEach(function(a) { %>
        <tr>
        <td><%= a.arg %></td>
        <td><%= _.escape(a.type) %></td>
        <td><%= a.description %></td>
        </tr>
        <% }); %>
    </tbody>
    </table>
<%}%>
``` 

Dans le code ci-dessus, vous pouvez remarquez que nous avons accès, à notre fichier `json`, passé en paramètre du template.

Par exemple `<%= a.arg %>` interprète en `html`, le contenu de la variable arg.

Vous pouvez voir l'utilisation à l'excès des boucles `forEach`, qui permettent la génération de manière simple de notre fichier `html`, sans avoir à se préoccuper des balises `HTML` ou du `CSS`.

Cependant, je suis tombé sur un problème, en effet j'ai mis dans des fichiers `.ejs`, les "examples" et les "Algorithm Factorization", car ceux-ci sont assez long, les mettre directement dans le json poserai des problèmes en tout genres.

Normalement en syntaxe `ejs`, nous pouvons facilement importer des `partials`, de la manière suivante:
```html
<!-- example Section-->
<h3 class="section__title">Example</h3>
...
<code class="code code--block">
    <%- include('./partials/examples/pathDistance');  %>
</code>
...
```

Or `html-webpack-plugin` utilise `lodash` comme interpréteur pour nos fichiers `.ejs`, et celui-ci ne connaît pas `include`. Cette étape m'as pris énormément de temps pour trouver une solution, en effet l'astuce serait d'utiliser `require`, combiner à un loader html avec webpack.

Définition du loader pour nos fichiers `html` avec `html-loader`:
```javascript
module.exports = {
    ...
    module: {
      rules: [
        ...
        {
          test: /\.html$/,
          loader: 'html-loader'
        }
      ],
    },
};
```

Maintenant dans notre fichier `.ejs`, nous pouvons utilisé des requires avec des fichiers `html`.
```html
<!-- example Section-->
<h3 class="section__title">Example</h3>
...
<code class="code code--block">
    <%= require('./partials/examples/pathDistance.html').default  %>
</code>
...
```

Sauf que nous voulons faire ça dynamiquement, hors il est impossible d'injecter une variable dans un `require`, là aussi l'astuce consiste à faire croire au compilateur qu'il s'agit d'une constante.

```html
<!-- example Section-->
<h3 class="section__title">Example</h3>
...
<code class="code code--block">
    <%= require('./partials/examples/'+json.data.example+'.html').default  %>
</code>
...
```
Je procède de la même façon avec la section de l'algorithm Factorization.

Pour résumer, l'`ejs` est très pratique pour l'écriture d'`HTML`, mais peux rapidement des gros problèmes avec d'autres plugins, mais bien calibré celà est très puissant.

---
### partie 6: Structure du projet - **5hr**
---

Après avoir mis en place tout mes outils, pour la mise en place de la structure finale de notre website, je n'ai plus qu'à développer les dernières fonctionnalités pour nos cartes.

Plus d'information sur la structure actuelle sur le fichier `README.md`.

Nous avons vu la partie `view`, sur la partie 5, ici nous nous occuperons des autres fichiers présent dans `src`.

Commençons par `MapBox`, nous avons:
* `create_map.js` classe pour la creation d'une map `MapBox`.
* `ClusteringTreeMap` et `PathDistanceMap` sont des classes correspondantes à nos deux cartes. Dedans nous définissons le comportement de la classe, ainsi ClusteringTreeMap générera une carte utilisant la librairie `{ClusteringTreeMap}` et l'illustrera sur une carte.
* `map_list`, point névralgique, c'est ici que nous allons crée les instances de nos cartes.
```javascript
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
```

En effet, MapBox, permet d'avoir qu'une seule carte instanciée, donc je crée une variable globale `CurrentMap` qui contient qu'une seule instance à la fois.
Ainsi lorsque, dans mon front j'appellerai la fonction `newCurrentMap`, je remplacerai l'instance par la bonne carte.

Le dossier `data`, va lui contenir, les données `paths`, `zoi` et `center`, qui servirons à nos instances lors de la création de la carte (voir ci-dessus).

Le dossier `front-end`, va contenir,les fonctions qui permettent de géré le front (bouton, scrolling ...).

Pour résumer, le fichier `map_list` est le plus important, c'est ici que tout se met en place, pour généré les instances, et par conséquent nos cartes.

---
### partie 7: TODO - **?**
---

J'ajoute cette partie, pour permettre de faire un point sur ce qu'il reste à faire :
* Ajout de lien sur le type d'argument ...
* Chargement des cartes lors de scrolling et plus uniquement lors du clique
* Ajout d'un menu sur la MAP, à notre ClusteringMap 
* Modification du menu sur doc.html, avec une police plus petite pour les fonctions membre d'une classe. 


