import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Produit } from '../model/produit.model';
import { AppUser } from '../model/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  private produits! : Produit[];
  authenticatedUser : AppUser |undefined;

  constructor() {
    this.produits=[
      {id:1,nom:"ordinateur",prix:150000,promotion:true},
      {id:2,nom:"sac",prix:10000, promotion:false },
      {id:3,nom:"telephone",prix:130000 ,promotion:false},
      {id:4,nom:"table",prix:15000,promotion:true},
    ];

   }
   public getAllProducts() : Observable<Produit[]>{
    return of(this.produits);
   }

  //  public hasRole(role:string) : boolean{
  //   return this.authenticatedUser!.role.includes(role);
  // }
}
