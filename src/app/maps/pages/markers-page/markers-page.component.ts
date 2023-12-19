import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LngLat, Map, Marker } from 'maplibre-gl';

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild("viewDiv")
  public divMap?: ElementRef;

  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-118.805, 34.027)


  ngAfterViewInit(): void {
    const apiKey = environment.ARCGIS_KEY;
    const basemapEnum = "arcgis/streets";
    this.map = new Map({
      container: this.divMap?.nativeElement, // the id of the div element
      style: `https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles/${basemapEnum}?token=${apiKey}`,
      zoom: 13, // starting zoom
      center: this.currentLngLat // starting location [longitude, latitude]
    });

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
  }

  addMarker(lngLat: LngLat, color: string): void {
    if(!this.map) return;

    const marker = new Marker({
      color,
      draggable: true,
    })
      .setLngLat(this.currentLngLat)
      .addTo(this.map);

  }
}
