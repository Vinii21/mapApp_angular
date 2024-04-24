import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'maplibre-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  @ViewChild("map")
  public divMap?: ElementRef;
  @Input() lngLat?: [number, number];

  ngAfterViewInit() {
    if ( !this.divMap?.nativeElement) throw 'Map Div not found';
    if ( !this.lngLat ) throw 'LngLat can´t be null';

    const apiKey = environment.ARCGIS_KEY;
    const basemapEnum = "arcgis/streets";
    const map = new Map({
      container: this.divMap?.nativeElement, // the id of the div element
      style: `https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles/${basemapEnum}?token=${apiKey}`,
      zoom: 13, // starting zoom
      center: this.lngLat, // starting location [longitude, latitude]
      interactive: false,
      attributionControl: false
    });;

    new Marker()
      .setLngLat(this.lngLat)
      .addTo(map)

  }
}
