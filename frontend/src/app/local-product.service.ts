import {Injectable} from '@angular/core';import {Product} from './api';
        // Étape intermédiaire du TP : service en mémoire avant la migration HttpClient.
        @Injectable({providedIn:'root'})
        export class LocalProductService {
          private products:Product[]=[{id:1,name:'Ordinateur Portable',price:1300,quantity:10,selected:true}];
          getAllProducts(){return [...this.products]}
          deleteProduct(p:Product){this.products=this.products.filter(x=>x.id!==p.id)}
        }
