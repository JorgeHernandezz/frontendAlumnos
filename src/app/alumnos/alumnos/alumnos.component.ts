import { TableModule } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../model/Alumno';
import { AlumnoService } from '../../service/alumno.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-alumnos',
  standalone:true,
  imports:[CommonModule,FormsModule, TableModule],
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  titulo: string = 'Lista de alumnos';
  losAlumnos: Alumno[] = [];

  constructor(private alumnoService: AlumnoService) {}

  ngOnInit() {
    this.obtenerAlumnos();
  }

  obtenerAlumnos() {
    this.alumnoService.getAllAlumnos().subscribe(
      alumnos => {
        this.losAlumnos = alumnos;
      },
      error => {
        console.error('Error al obtener alumnos', error);
      }
    );
  }
}
