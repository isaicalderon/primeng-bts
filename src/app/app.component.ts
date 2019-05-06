import { Component } from '@angular/core';
import {MessageService} from 'primeng/api';

import { MenuItem } from 'primeng/api';
//import { Car } from './entity/car.entity';
//import { CarService } from './services/carservice.services';
import { AlumnoService } from './services/alumno.service';
import { Alumno } from './entity/alumnos.entity';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService] // importante
})
export class AppComponent {
    menuNav: MenuItem[];
    menuBar: MenuItem[];
    
    //cars: Car[];
    alumnos: Alumno[];
    alumnoRes: Alumno;
    alumnoSend: Alumno;
    
    cols: any[];
    inputFiltro: any;
    dataSelect: Alumno;
    matricula: number;

    nombres: String;
    apePaterno: String;
    apeMaterno: String;


    displayAgregar: boolean = false;
    displayEditar: boolean = false;
    displayConfirm: boolean = false;
    
    disabledRow: boolean = true;
    clicked: boolean = true;

  

    
    showDialogAgregar(){
        this.displayAgregar = !this.displayAgregar;
    }

    showDialogEditar(){
      this.displayEditar = !this.displayEditar;
    }

    showDialogDeleteConfirm(){
      this.displayConfirm = !this.displayConfirm;
    }
    //constructor(private carService: CarService) { }
    constructor(private messageService: MessageService, private alumnoService: AlumnoService) {}
    
    onRowSelect() {
      this.disabledRow = false;
      this.matricula = this.dataSelect.matricula;
      this.nombres = this.dataSelect.nombres;
      this.apePaterno = this.dataSelect.apellidoPaterno;
      this.apeMaterno = this.dataSelect.apellidoMaterno;
      this.ngOnInit();
      console.log(this.matricula);
      
    }

    onRowUnselect(event) {
      this.disabledRow = true;
      this.ngOnInit();
    }

    clearFilters(dt) {
      dt.reset();
      this.inputFiltro = "";
    }

    funAgregarAlumno(){
      //showMessage('Se ha agregado correctamente el alumno MAT - Nom Ape')
        //console.log(this.nombres);
      this.alumnoSend = {
        nombres:this.nombres,
        apellidoPaterno: this.apePaterno, 
        apellidoMaterno:this.apeMaterno,
        creadoPor:"user",
        modificadoPor:"user"
      };
    
        console.log("agregando a: "+this.alumnoSend);

      this.alumnoService.guardarAlumno(this.alumnoSend)
        .subscribe(data => {
          //console.log('Se ha agregado correctamente el alumno '+(data as Alumno).matricula+' - '
          //+(data as Alumno).nombres+" "+(data as Alumno).apellidoPaterno+" "+(data as Alumno).apellidoMaterno);
          this.showDialogAgregar(); // cerramos el dialog
          //this.clearFilters("dt");
          this.showMessage('Se ha agregado correctamente el alumno '+(data as Alumno).matricula+' - '
            +(data as Alumno).nombres+" "+(data as Alumno).apellidoPaterno+" "+(data as Alumno).apellidoMaterno);
      });
        
    }

    funEliminarAlumno(){
      this.alumnoService.eliminarAlumno(this.matricula).subscribe();
      this.alumnoService.getAlumnosJson().then(alumnos => this.alumnos = alumnos);
      //this.sortJSON(this.alumnos, "fechaHoraCreacion", "desc");
      this.onRowSelect();
      this.showDialogDeleteConfirm();
      this.showMessage('Se ha eliminado correctamente al alumno '+this.dataSelect.matricula+' - '
        +this.dataSelect.nombres+" "+this.dataSelect.apellidoPaterno+" "+this.dataSelect.apellidoMaterno);

    }

    funEditarAlumno(){
     this.alumnoSend = {
        matricula:this.matricula,
        nombres:this.nombres,
        apellidoPaterno: this.apePaterno, 
        apellidoMaterno:this.apeMaterno,
        creadoPor:"user",
        modificadoPor:"user"
      };
      console.log("editar a: "+this.alumnoSend.nombres);

      this.alumnoService.updateAlumno(this.alumnoSend).subscribe();
      this.onRowSelect();
      this.showDialogEditar();
      this.showMessage('Se ha editado correctamente al alumno '+this.alumnoSend.matricula+' - '
        +this.alumnoSend.nombres+" "+this.alumnoSend.apellidoPaterno+" "+this.alumnoSend.apellidoMaterno);
      
    }

    showMessage(details) {
      this.messageService.add({
          key: 'msgToast',
          severity:'success', 
          summary:'Alumnos', 
          detail: details});
    }
    
    ngOnInit() {
        this.menuNav = [
            {icon:'pi pi-home'},
            {label:'Catálogo'},
            {label:'Alumnos'}
        ];
        this.menuBar = [
          {
              label: 'Opciones',
              items: [
                {
                  label: 'Agregar', 
                  icon: 'pi pi-fw pi-plus',
                  command: (onclick) => {
                    this.showDialogAgregar();
                  }
                },
                {
                  label: 'Editar', 
                  icon: 'pi pi-fw pi-plus',
                  disabled: this.disabledRow,
                  command: (onclick) => {
                    this.showDialogEditar();
                  }
                },
                {
                  label: 'Eliminar', 
                  icon: 'pi pi-fw pi-plus',
                  disabled: this.disabledRow,
                  command: (onclick) => {
                    if (!this.disabledRow){
                      this.showDialogDeleteConfirm();
                    }
                    
                  }
                }
              ]
          },
          {
            label:"Borrar filtros",
            icon:"pi pi-trash",
            command: (onclick) => {
              //this.clearFilters("dt");
            }
          } 
      ];

      this.cols = [
        { field: 'matricula', header: 'Matricula' },
        { field: 'nombres', header: 'Nombre' },
        { field: 'apellidoPaterno', header: 'Apellido Paterno' },
        { field: 'apellidoMaterno', header: 'Apellido Materno' }
      ];

      //this.carService.getCarsSmall().then(cars => this.cars = cars);
      this.alumnoService.getAlumnosJson().then(alumnos => this.alumnos = alumnos);
      //console.log(this.alumnos.forEach);
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
