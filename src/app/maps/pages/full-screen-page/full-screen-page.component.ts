import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as maplibregl from 'maplibre-gl';
import { environment } from "../../../../environments/environment"

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild("viewDiv")
  public divMap?: ElementRef;


  ngAfterViewInit(): void {
    const apiKey = environment.ARCGIS_KEY;
    const basemapEnum = "arcgis/streets";
    const map = new maplibregl.Map({
      container: this.divMap?.nativeElement, // the id of the div element
      style: `https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles/${basemapEnum}?token=${apiKey}`,
      zoom: 12, // starting zoom
      center: [-118.805, 34.027] // starting location [longitude, latitude]
    });
  }

}
