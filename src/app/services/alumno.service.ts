import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from '../entity/alumnos.entity';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': ' *'
    
    /*'Authorization': 'my-auth-token'*/
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
    utrTmp = 'assets/DataAlumnos.json';

    urlGuardarAlumno = "";

    getAlumnosJson(){
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
        const url = "http://"+this.server+":8085/ServiciosAlumnos/servicios/alumnoServicio/modificarAlumno?";
        this.http.put(url, alumno);

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

}