import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Add RouterModule import
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Import HttpClientModule

import { ChartjsModule } from '@coreui/angular-chartjs';
// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
// import { RealGraphComponent } from './RealGraphComponent/RealGraphComponent';

import {
  AccordionModule,
  AlertModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  ModalModule,
  NavbarModule,
  NavModule,
  PaginationModule,
  PlaceholderModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TableModule,
  TabsModule,
  ToastModule,
  TooltipModule,
  UtilitiesModule,
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule, // Add RouterModule here
    HttpClientModule, // Add HttpClientModule here
    ButtonModule,
    ButtonGroupModule,
    GridModule,
    IconModule,
    CardModule,
    UtilitiesModule,
    DropdownModule,
    SharedModule,
    FormModule,
    NavbarModule,
    CollapseModule,
    NavModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ListGroupModule,
    PlaceholderModule,
    ProgressModule,
    SpinnerModule,
    TabsModule,
    TooltipModule,
    CarouselModule,
    PaginationModule,
    PopoverModule,
    TableModule,
    ModalModule,
    ToastModule,
    ChartjsModule,
    AlertModule,
    BrowserModule,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule, // Add RouterModule here
    HttpClientModule, // Add HttpClientModule here
    ButtonModule,
    ButtonGroupModule,
    GridModule,
    IconModule,
    CardModule,
    UtilitiesModule,
    DropdownModule,
    SharedModule,
    FormModule,
    NavbarModule,
    CollapseModule,
    NavModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ListGroupModule,
    PlaceholderModule,
    ProgressModule,
    SpinnerModule,
    TabsModule,
    TooltipModule,
    CarouselModule,
    PaginationModule,
    PopoverModule,
    TableModule,
    ModalModule,
    ToastModule,
    ChartjsModule,
    AlertModule,
  ],
//   declarations: [
//     AppComponent,
//     // RealGraphComponent
//   ],
})
export class NplModule {}

// @NgModule({
// })
// export class AppModule { }

