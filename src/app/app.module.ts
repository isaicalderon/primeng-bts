import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuItem} from 'primeng/api';
// import { MenuNav } from './primeng/menunav.primeng';
import {MenubarModule} from 'primeng/menubar';
// import { MenuBar } from './primeng/menubar.primeng';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {TableModule} from 'primeng/table';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { AlumnoService } from './services/alumno.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AccordionModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BreadcrumbModule,
    MenubarModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    ProgressSpinnerModule
  ],
  providers: [
    AlumnoService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
