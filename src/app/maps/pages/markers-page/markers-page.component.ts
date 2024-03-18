import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LngLat, Map, Marker } from 'maplibre-gl';

interface markersAndColors {
  color: string,
  marker: Marker
}

interface PlainMarker {
  color: string;
  lngLat: number[]
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild("viewDiv")
  public divMap?: ElementRef;

  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-118.805, 34.027)

  public markers: markersAndColors[] = [];


  ngAfterViewInit(): void {
    const apiKey = environment.ARCGIS_KEY;
    const basemapEnum = "arcgis/streets";
    this.map = new Map({
      container: this.divMap?.nativeElement, // the id of the div element
      style: `https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles/${basemapEnum}?token=${apiKey}`,
      zoom: 13, // starting zoom
      center: this.currentLngLat // starting location [longitude, latitude]
    });

    /* Aqui cargo los marcadores desde el localstorage */
    this.readFromLocalStorage();

    //Con esto creamos un marcador personalizado para el mapa
    /* const markerHtml = document.createElement('div');
    markerHtml.innerHTML = "Vini"; */

    /* const marker = new Marker({
      color: "red",
      element: markerHtml
    })
      .setLngLat(this.currentLngLat)
      .addTo(this.map); */
  }

  createMarker() {

    if(!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lgnLat = this.map.getCenter();

    this.addMarker(lgnLat, color);

    /* Aquí guardo el marcador en el localstorage */
    this.saveToLocalStorage();
  }

  addMarker(lngLat: LngLat, color: string): void {
    if(!this.map) return;

    const marker = new Marker({
      color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);

      this.markers.push({
        color,
        marker
      });
    this.saveToLocalStorage();

    marker.on('dragend', () => {
      console.log(marker.getLngLat())
      this.saveToLocalStorage();
    });

  }

  deleteMarker(index: number): void {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage() {
    console.log("cambio el local")
    const plainMarkers: PlainMarker[] = this.markers.map( ({color, marker})=> {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));

  }

  readFromLocalStorage() {
    console.log("Ejecutado")
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString );

    plainMarkers.forEach(({color, lngLat}) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);

      this.addMarker(coords, color);
    })
   }

}
