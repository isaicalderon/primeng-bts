import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from '../entity/alumnos.entity';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
/*
const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, PUT',
    'Access-Control-Allow-Origin': '*',
    'Content-Type':  'application/json'
    //'Authorization': 'my-auth-token'
  })
};
*/AnimationEvent
const header = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
@Injectable(/*{providedIn: 'root'}*/)
export class AlumnoService{
    constructor(private http: HttpClient){}
    //server = "localhost";
    
    urlObtenerTodos   = "/ServiciosAlumnos/servicios/alumnoServicio/obtenerTodosAlumnos?";
    urlGuardarAlumno  = "/ServiciosAlumnos/servicios/alumnoServicio/guardarAlumno";
    urlEliminar       = "/ServiciosAlumnos/servicios/alumnoServicio/eliminarAlumno?matricula=";
    urlUpdate         = "/ServiciosAlumnos/servicios/alumnoServicio/modificarAlumno?";

    getAlumnosJson(){
      return this.http.get(this.urlObtenerTodos)
            .toPromise()
            .then(res => <Alumno[]> (res as any)) // fix bug (res as any).data
            .then(data => {return this.sortJSON(data, "fechaHoraCreacion", "desc");} ) 
    }

    guardarAlumno(alumno:Alumno){
        return this.http.post(this.urlGuardarAlumno, alumno, header)
            /*.toPromise()
            .then(res => <Alumno> (res as any)) // fix bug (res as any).data
            .then(data => {return this.sortJSON(data, "fechaHoraCreacion", "desc");} ) */
    }

    updateAlumno(alumno: Alumno): Observable<Alumno> {
        return this.http.put<Alumno>(this.urlUpdate, alumno, header)
        .pipe(
            catchError(this.handleError)
        );
        
    }

    eliminarAlumno(id: number): Observable<{}>{
      return this.http.delete(this.urlEliminar+id);
    }

    sortJSON(data, key, orden) {
        return data.sort(function (a, b) {
            var x = a[key],
            y = b[key];
    
            if (orden === 'asc') {
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            }
    
            if (orden === 'desc') {
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            }
        });
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
      };

}