/* Class for Creating New Control in mapbox GL - Follow the official Documentation   */
// Control implemented as ES6 class
/**
 * Class who reprensent a mapboxgl custom control
 */
export default class CustomButtonControl {
    constructor({ className='', eventHandler=null, title='' }){
        this._className = className;
        this._eventHandler = eventHandler;
        this._title = title;
    }
    onAdd(map) {
        this._map = map;
        this._btn = document.createElement('button');
        this._btn.className = "mapboxgl-ctrl-icon" + ' ' + this._className;
        this._btn.title = this._title;
        this._btn.textContent = this._title;
        this._btn.type = "button";
        this._btn.onclick = this._eventHandler;

        this._container = document.createElement("div");
        this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
        this._container.appendChild(this._btn);

        return this._container;
    }
     
    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}