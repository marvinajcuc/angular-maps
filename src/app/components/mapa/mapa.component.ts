import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import {MatSnackBar} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  drawing: boolean = false;
  textoBoton: String = 'Dibujar';
  marcadores: Marcador[] = [];
  puntos: Marcador[] = [];
  polygon: google.maps.Polygon ;

  lat = 14.6103837;
  lng = -90.515654;

  paths = [
  ];


  constructor(public snackBar: MatSnackBar,
              public dialog: MatDialog) {

    // const nuevoMarcador = new Marcador(14.6103837, -90.515654);
    // this.marcadores.push(nuevoMarcador);
    if (localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
      this.drawPolygon();
      // this.drawPolyline();
    }

  }

  ngOnInit() {
  }
  agregarMarcador(evento) {
    console.log('evento=', evento);
    const coords: { lat: number, lng: number} = evento.coords;
    const nuevoMarcador = new Marcador(coords.lat, coords.lng);
    if ( this.drawing ) {
      this.puntos.push(nuevoMarcador);
    } else {
      this.marcadores.push(nuevoMarcador);
    }
    this.guardarStorage();
    this.snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000});
    if (this.marcadores.length === 2) {
      const mark1 = new google.maps.LatLng(this.marcadores[0].lat, this.marcadores[0].lng);
      const mark2 = new google.maps.LatLng(this.marcadores[1].lat, this.marcadores[1].lng);
      const  distanceInKm = google.maps.geometry.spherical.computeDistanceBetween(mark1, mark2) / 1000;
      console.log('distance in km:' , distanceInKm);
    }
    this.drawPolygon();
    //this.drawPolyline();

    // if (this.marcadores.length === 2) {
    //   const polyLine = new google.maps.Polyline();
    //   polyLine.setPath(this.paths);
    //   console.log('polyline', polyLine);
    //   const point = this.getPointAtDistance(polyLine, 10);
    //   const coords2: { lat: number, lng: number} = point;
    //   console.log('point', point);
    //   const nuevoMarcador2 = new Marcador(coords2.lat, coords2.lng);
    //   this.marcadores.push(nuevoMarcador2);
    //   this.guardarStorage();
    // }
  }
  agregarMarcador2(evento) {
    console.log('evento=', evento);
    const coords: { lat: number, lng: number} = evento.latLng;
    const nuevoMarcador = new Marcador(coords.lat, coords.lng);
    if ( this.drawing ) {
      this.puntos.push(nuevoMarcador);
    } else {
      this.marcadores.push(nuevoMarcador);
    }
    this.guardarStorage();
    this.snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000});
    if (this.marcadores.length === 2) {
      const mark1 = new google.maps.LatLng(this.marcadores[0].lat, this.marcadores[0].lng);
      const mark2 = new google.maps.LatLng(this.marcadores[1].lat, this.marcadores[1].lng);
      const  distanceInKm = google.maps.geometry.spherical.computeDistanceBetween(mark1, mark2) / 1000;
      console.log('distance in km:' , distanceInKm);
    }
    this.drawPolygon();
    //this.drawPolyline();

    // if (this.marcadores.length === 2) {
    //   const polyLine = new google.maps.Polyline();
    //   polyLine.setPath(this.paths);
    //   console.log('polyline', polyLine);
    //   const point = this.getPointAtDistance(polyLine, 10);
    //   const coords2: { lat: number, lng: number} = point;
    //   console.log('point', point);
    //   const nuevoMarcador2 = new Marcador(coords2.lat, coords2.lng);
    //   this.marcadores.push(nuevoMarcador2);
    //   this.guardarStorage();
    // }
  }

  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

  borrarMarcador(i: number) {
    this.marcadores.splice(i, 1);
    this.guardarStorage();
    this.snackBar.open('Marcador borrado', 'Cerrar', { duration: 3000});
    this.drawPolygon();
    //this.drawPolyline();
  }
  editarMarcador(marcador: Marcador) {
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {titulo: marcador.titulo, descripcion: marcador.descripcion}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if ( !result) {
        return;
      }
      marcador.titulo = result.titulo;
      marcador.descripcion = result.descripcion;
      this.guardarStorage();
      this.snackBar.open('Marcador Actualizado', 'Cerrar', { duration: 3000});
    });
  }
  drawPolygon() {
    this.paths = [];
    const x = this.paths;
      this.puntos.forEach(function(e) {
        x.push({lat: e.lat, lng: e.lng});
      });
      // this.polygon = new google.maps.Polygon({paths: this.paths});
      // this.polygon.setPaths(this.paths);
  }
  drawPolyline() {
    this.paths = [];
    const x = this.paths;
      this.marcadores.forEach(function(e) {
        x.push({lat: e.lat, lng: e.lng});
      });
  }
  drawingPolygon() {
    this.drawing = !this.drawing;
    if ( this.drawing ) {
      this.textoBoton = 'Dibujando...';
    } else {
      this.textoBoton = 'Dibujar';
    }
  }
  getPointAtDistance(polyLine: google.maps.Polyline, distance: number):google.maps.LatLng {
    let currentDist=distance;
    let point1 = polyLine.getPath()[0];
    let point2 = polyLine.getPath()[1];
    for (int i=0; i < distance; i++) {
      let middlePoint = google.maps.geometry.spherical.interpolate(point1, point2, 0.5); // midpoint
      
    }
  }
  getMiddlePoint(from: google.maps.LatLng, to: google.maps.LatLng) {
    console.log('from:', from.lat, ',' , from.lng);
    console.log('to:', to.lat, ',' , to.lng);
    return google.maps.geometry.spherical.interpolate(from, to, 0.5); // midpoint
  }
  comprobarUbicacion() {
    this.polygon = new google.maps.Polygon({paths: this.paths});
      // this.polygon.setPaths(this.paths);
    const containsLocation = google.maps.geometry.poly.containsLocation(
        new google.maps.LatLng(this.marcadores[0].lat, this.marcadores[0].lng), this.polygon);
    console.log('containslocation=', containsLocation);
    const isLocationOnEdge = google.maps.geometry.poly.isLocationOnEdge(
        new google.maps.LatLng(this.marcadores[0].lat, this.marcadores[0].lng), this.polygon, 0.002);
    console.log('islocationonedge=', isLocationOnEdge);
    console.log('polygon:', this.polygon);
    const middlePoint= google.maps.geometry.spherical.interpolate(new google.maps.LatLng(this.puntos[0].lat,this.puntos[0].lng), new google.maps.LatLng(this.puntos[1].lat,this.puntos[1].lng), 0.5);
    //const middlePoint = this.getMiddlePoint(new google.maps.LatLng(this.puntos[0].lat,this.puntos[0].lng), new google.maps.LatLng(this.puntos[1].lat,this.puntos[1].lng));
    console.log(middlePoint);
    const nuevoMarcador = new Marcador(middlePoint.lat(), middlePoint.lng());
    this.marcadores.push(nuevoMarcador);
    this.guardarStorage();
  }
}
