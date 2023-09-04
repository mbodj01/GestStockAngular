import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { LoginComponent } from './login/login.component';
import { ProduitsComponent } from './produits/produits.component';
import { ReportingComponent } from './reporting/reporting.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';

const routes: Routes = [
  {path : "",component : LoginComponent},
  {path : "login",component : LoginComponent},
  {path : "dashboard", component : DashbordComponent,children:[
    {path : "reporting",component : ReportingComponent},
    {path : "produit",component : ProduitsComponent},
    {path : "utilisateur",component : UtilisateursComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
