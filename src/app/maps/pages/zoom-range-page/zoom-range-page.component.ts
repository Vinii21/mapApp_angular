import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LngLat, Map } from 'maplibre-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild("viewDiv")
  public divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-118.805, 34.027)


  ngAfterViewInit(): void {
    const apiKey = environment.ARCGIS_KEY;
    const basemapEnum = "arcgis/streets";
    this.map = new Map({
      container: this.divMap?.nativeElement, // the id of the div element
      style: `https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles/${basemapEnum}?token=${apiKey}`,
      zoom: this.zoom, // starting zoom
      center: this.currentLngLat // starting location [longitude, latitude]
    });

    this.mapListener();
  }

  mapListener():void {
    if(!this.map) throw "Mapa no existe!"

    this.map.on("zoom", (ev)=>{
      this.zoom = this.map!.getZoom();
    });

    this.map.on("move", ()=>{
      this.currentLngLat = this.map!.getCenter();
    })
  }

  zoomIn():void {
    this.map?.zoomIn();
  }

  zoomOut():void {
    this.map?.zoomOut();
  }

  zoomChanged(value: string): void {
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

}
