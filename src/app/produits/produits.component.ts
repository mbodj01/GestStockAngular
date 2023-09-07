import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { AppUser } from '../model/utilisateur.model';
import { ProduitsService } from '../services/produits.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  public userJson : any;
  public user : any;
  public userData : any;
  produits! : Array<Produit> ;
  errorMessage: any;
  ngOnInit(): void {
    this.produits=[
      {id:1,nom:"ordinateur",prix:150000,promotion:true},
      {id:2,nom:"sac",prix:10000, promotion:false },
      {id:3,nom:"telephone",prix:130000 ,promotion:false},
      {id:4,nom:"table",prix:15000,promotion:true},
    ];
  }
  constructor(
    public produitsService : ProduitsService,
  ){
    this.userData = localStorage.getItem("authUser")
    this.userJson = JSON.parse(this.userData)
    this.user = this.userJson.role;
    console.log(this.user)
  }


  handleGetAllProduits(){
      this.produitsService.getAllProducts().subscribe(
        {
          next : (data)=>{
            this.produits=data;
          },
          error : (err)=>{
            this.errorMessage = err;
          }
        }
      );
  }

}
