import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { Produit } from '../model/produit.model';
import { AppUser } from '../model/utilisateur.model';
import { ProduitsService } from '../services/produits.service';
import { UUID } from 'angular2-uuid';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { first, Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { __param } from 'tslib';

const PRODUCT_API = 'http://127.0.0.1:8000/api/products/view/all';
const API = 'http://127.0.0.1:8000/api/products'

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  productFormGroup! : FormGroup;
  createFormGroup! : FormGroup;
  public productJson : any;
  public pdt: any;
  public Product! : [];
  public produitData : any;
  produits! : Array<Produit> ;
  errorMessage: any;
  searchFormGroup! : FormGroup;
  currentPage : number = 0;
  affiche : number;
  pageSize : number;
  totalPages :number;
  currentAction : string ="all";
  headers: any;
  username!: string;
  authToken!: string;
  status: string;
  title: any;
  description: any;
  prix: any;
  creePar: any;
  id: any;
  ngOnInit(): void {
    this.getAllProducts()
    this.productFormGroup=this.fb.group({
      title : this.fb.control(this.title),
      description : this.fb.control(this.description),
      prix : this.fb.control(this.prix),
    })

    this.createFormGroup=this.fb.group({
      c_title : this.fb.control(""),
      c_description : this.fb.control(""),
      c_price : this.fb.control(""),
    })
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control(null),
    });

  }
  constructor(
    private http : HttpClient,
    private fb :FormBuilder,
    public produitsService : ProduitsService,
    public tokenStorage : TokenStorageService,
  ){}


  public getAllProducts(){
    this.produitsService.getAll()
    .pipe(first())
    .subscribe({
      next: (response)=>{
        console.log(response);

        this.productJson = response.data.data;
        this.totalPages = response.data.last_page
        this.pageSize = response.data.per_page;
      },
      error: (error) =>{
        console.error(error);
      }
    })

  }
  products(id : any){
    this.produitsService.Pro(id)
    .pipe(first())
    .subscribe({
      next : (response) =>{
        this.id = response.data.id;
        this.title = response.data.title;
        this.description = response.data.description;
        this.prix = response.data.price;
        this.creePar = response.data.user.name;
        this.productFormGroup=this.fb.group({
          title : this.fb.control(this.title),
          description : this.fb.control(this.description),
          prix : this.fb.control(this.prix),
        })

        console.log(this.productFormGroup.value);

      },
      error : (error) =>{
        console.error(error);

        this.errorMessage = error.message;
      }
    });
  }

  goToPage(i: number){
     this.produitsService.getAll()
     .pipe(first())
     .subscribe({
      next : (response)=>{
      {
        this.currentPage = i;
         this.affiche = response.data.links.currentPage.label;
          // response.data.current_page = i;
          // this.productJson = response.data.data;
          console.log(this.currentPage);

      }
    }
  })
}

  deleteProduit(id : any){
    this.http.delete(API+`/${id}`)
    .subscribe({
      next : (response) =>{
        this.status = 'Produit supprimer avec succes'
        window.location.reload();
      },
      error : (error) =>{
        console.error(error);

        this.errorMessage = error.message;
      }
    });
  }

  modif(id : any): void{
    this.http.put<any>(API+`/${id}`,{}, {params: {"title": this.productFormGroup.value.title, "description": this.productFormGroup.value.description, "price": this.productFormGroup.value.prix}})
    .subscribe({
      next : (response) =>{
        console.log(response);
        window.location.reload();
      },
      error : (error) =>{
        console.error(error);
        this.errorMessage = error.message;
      }
    });
  }

  ajoutProduit(){
    let c_title =  this.createFormGroup.value.c_title;
    let c_description =  this.createFormGroup.value.c_description;
    let c_price =  this.createFormGroup.value.c_price;
    this.produitsService.create(c_title,c_description,c_price)
    .subscribe({
      next : (response) =>{
          console.log(response);
          window.location.reload();
      },
      error : (error) =>{
        console.error(error);
        this.errorMessage = error.message;
      }
    });
  }
}
