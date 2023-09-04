import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { LoginComponent } from './login/login.component';
import { ProduitsComponent } from './produits/produits.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { ReportingComponent } from './reporting/reporting.component';

@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent,
    LoginComponent,
    ProduitsComponent,
    UtilisateursComponent,
    ReportingComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
