import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  name: string,
  route: string
}

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  public menuItems: MenuItem[]= [
    {route: "/maps/fullscreen", name: "FullScreen"},
    {route: "/maps/zoom-range", name: "Zoom-Range"},
    {route: "/maps/markers", name: "Markers"},
    {route: "/maps/properties", name: "House"},
    {route: "/alone", name: "Alone page"},
  ]
}
