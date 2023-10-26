import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PageProduit, Produit } from '../model/produit.model';
import { AppUser } from '../model/utilisateur.model';
import {UUID} from 'angular2-uuid'
import { HttpClient, HttpHeaders } from '@angular/common/http';

const PRODUCT_API = 'http://127.0.0.1:8000/api/products/view/all';
const API = 'http://127.0.0.1:8000/api/products'

const httpOptions = {
  headers : new HttpHeaders({'Content-type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  private produits! : Produit[];
  authenticatedUser : AppUser |undefined;

  constructor(private http : HttpClient) {
  }

  ngOnInit(): void {
  }
   public getAllProducts(token:string) : Observable<any>{
    return this.http.get(PRODUCT_API,httpOptions);
   }

   public getAll() : Observable<any>{
    return this.http.get(PRODUCT_API,httpOptions);
   }

   public Pro(id : any): Observable<any>{
    return this.http.get(API+`/${id}`,httpOptions);
   }

   public create (title : string, description : string, price : number) :Observable<any> {
    return this.http.post(API,{
      title,
      description,
      price
    },httpOptions)
   }
}
