import { FormsModule } from '@angular/forms';
import { Alumno } from './../../model/Alumno';
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alumnos-form',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, InputNumberModule, HttpClientModule, CommonModule],
  templateUrl: './alumnos-form.component.html',
  styleUrl: './alumnos-form.component.css'
})
export class AlumnosFormComponent {
  alumno: Alumno = {
    nombre: '',
    paterno: '',
    materno: '',
    email: ''
  };
  apiUrl = 'https://backendalumnosspringboot-jorgehdz.onrender.com/apiUsuario/usuarios';
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(private http: HttpClient) {}


  agregarAlumno() {
    if (!this.validateEmail(this.alumno.email)) {
      this.mensajeError = 'El formato del correo electrónico no es válido.';
      return;
    }
  
    let alumnoParaEnviar: Alumno = { ...this.alumno };
    
    
    if (alumnoParaEnviar.idusuario === undefined) {
      delete alumnoParaEnviar.idusuario;
    }
    delete alumnoParaEnviar.idusuario;
    console.log('Datos que se enviarán al servidor (agregarAlumno):', alumnoParaEnviar);
    this.http.post(this.apiUrl, alumnoParaEnviar, { responseType: 'text' }).subscribe(
      (response) => {
        console.log('Respuesta del servidor (agregarAlumno):', response);
        if (response && response.includes && response.includes('Se insertó correctamente')) {
          this.mensajeExito = 'Alumno agregado correctamente.';
          this.mensajeError = '';
          this.resetForm();
        } else {
          this.mensajeError = 'Error al agregar alumno: ' + response;
          this.mensajeExito = '';
        }
      },
      (error) => {
        this.mensajeError = this.extractErrorMessage(error); 
        this.mensajeExito = '';
  
        // Imprimir detalles completos del error en la consola
        console.error('Error en la solicitud POST:', error);
      }
    );
  }
  private extractErrorMessage(error: any): string {
    let errorMessage = 'Error en la solicitud POST: ';
    if (error && error.error && typeof error.error === 'string') {
      errorMessage += error.error;
    } else if (error && error.message) {
      errorMessage += error.message;
    } else {
      errorMessage += 'Error desconocido';
    }
    return errorMessage;
  }


  actualizarAlumno() {

    if (!this.validateEmail(this.alumno.email)) {
      this.mensajeError = 'El formato del correo electrónico no es válido.';
      return;
    }

    const id = this.alumno.idusuario;
    if (id) {
      this.http.put(`${this.apiUrl}/${id}`, this.alumno, { responseType: 'text' }).subscribe(
        (response) => {
          // Verificar si la respuesta contiene el mensaje esperado
          if (response.includes('Se actualizó correctamente')) {
            this.mensajeExito = 'Datos actualizados correctamente.';
            this.mensajeError = '';
          } else {
            this.mensajeError = 'Error al actualizar los datos del alumno: ' + response;
            this.mensajeExito = '';
          }
        },
        (error) => {
          this.mensajeError = 'Error al actualizar los datos del alumno.';
          this.mensajeExito = '';
          console.error('Error:', error);
        }
      );
    } else {
      this.mensajeError = 'No se ha especificado un ID válido para actualizar.';
      this.mensajeExito = '';
    }
  }

  cargarDatos() {
    const id = this.alumno.idusuario;
    if (id) {
      this.http.get<Alumno>(`${this.apiUrl}/${id}`).subscribe(
        (data) => {
          if (data) {
            this.alumno = data;
            this.mensajeExito = 'Datos cargados correctamente.';
            this.mensajeError = '';
          } else {
            this.mensajeError = 'No se encontró ningún alumno con ese ID.';
            this.mensajeExito = '';
          }
        },
        (error) => {
          this.mensajeError = 'No se encontró ningún alumno con ese ID.';
          this.mensajeExito = '';
          console.error('Error:', error);
        }
      );
    } else {
      this.mensajeError = 'No se encontró ningún alumno con ese ID.';
      this.mensajeExito = '';
    }
  }

  eliminarAlumno() {
    const id = this.alumno.idusuario;
    if (id) {
      if (confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
        this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }).subscribe(
          (response) => {
            // Verificar si la respuesta contiene el mensaje esperado
            if (response.includes('Se eliminó correctamente')) {
              this.mensajeExito = 'Alumno eliminado correctamente.';
              this.mensajeError = '';
              this.resetForm();
            } else {
              this.mensajeError = 'Error al eliminar alumno: ' + response;
              this.mensajeExito = '';
            }
          },
          (error) => {
            this.mensajeError = 'Error al eliminar alumno.';
            this.mensajeExito = '';
            console.error('Error en la solicitud DELETE:', error);
          }
        );
      }
    } else {
      this.mensajeError = 'No se ha especificado un ID válido para eliminar.';
      this.mensajeExito = '';
    }
  }
  


  
  resetForm() {
    this.alumno = {
      nombre: '',
      paterno: '',
      materno: '',
      email: ''
    };
  }



  private validateEmail(email: string): boolean {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }


}