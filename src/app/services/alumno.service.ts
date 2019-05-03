import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from '../entity/alumnos.entity';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, PUT',
    'Access-Control-Allow-Origin': '*',
    'Content-Type':  'application/json'
    //'Authorization': 'my-auth-token'
  })
};
const header = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
@Injectable({
    providedIn: 'root'
})
export class AlumnoService{
    constructor(private http: HttpClient){}
    server = "localhost";
    //registrar: boolean = false;
    
    url1 = "http://"+this.server+":8085/ServiciosAlumnos/servicios/alumnoServicio/obtenerTodosAlumnos?";
    //utrTmp = 'assets/DataAlumnos.json';

    urlGuardarAlumno = "";
    
    getAlumnosJson(){
        //httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Origin', '*');
        /*const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('Access-Control-Allow-Origin', '*');
*/
        return this.http.get(this.url1, httpOptions)
            .toPromise()
            .then(res => <Alumno[]> (res as any)) // fix bug (res as any).data
            .then(data => {return this.sortJSON(data, "fechaHoraCreacion", "desc");} ) 
    }

    srvGuardarAlumnoJson(nombres, apePaterno, apeMaterno, creadoPor){
        this.urlGuardarAlumno = "http://"+this.server+":8085/ServiciosAlumnos/servicios/alumnoServicio/guardarAlumno?nombres="+nombres+"&apePaterno="
        +apePaterno+"&apeMaterno="+apeMaterno+"&creadoPor="+creadoPor;

        return this.http.get(this.urlGuardarAlumno)
            /*.toPromise()
            .then(res => <Alumno> (res as any)) // fix bug (res as any).data
            .then(data => {return data;} ) */
    }

    updateAlumno(alumno: Alumno) {
        console.log("servicio 1");
        const url = "http://"+this.server+":8085/ServiciosAlumnos/servicios/alumnoServicio/modificarAlumno";
        this.http.put(url, alumno, header).pipe(
            catchError(this.handleError)
        );

    }

    eliminarAlumno(id: number): Observable<{}>{
        const url = "http://"+this.server+":8085/ServiciosAlumnos/servicios/alumnoServicio/eliminarAlumno?matricula="+id;
        return this.http.delete(url);
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