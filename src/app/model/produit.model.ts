export interface Produit {
  id    : string;
  nom   : string;
  prix  : number;
  promotion : boolean;
}
export interface PageProduit{
  produits : Produit[];
  page : number;
  size : number;
  total: number;
} 
