// alumno.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../model/Alumno';


@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private apiUrl = 'http://localhost:8080/apiUsuario/usuarios';

  constructor(private http: HttpClient) { }

  getAllAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl);
  }

  addAlumno(alumno: Alumno): Observable<any> {
    return this.http.post<any>(this.apiUrl, alumno);
  }

  
}
