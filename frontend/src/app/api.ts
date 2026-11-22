import {Injectable,inject} from '@angular/core';
    import {HttpClient} from '@angular/common/http';
    export interface Product {id:number;name:string;price:number;quantity:number;selected:boolean}
    export interface Customer {id:number;name:string;email:string}
    @Injectable({providedIn:'root'})
    export class Api {
      private http=inject(HttpClient); private base='http://localhost:8083';
      products(){return this.http.get<Product[]>(this.base+'/products')}
      create(p:Omit<Product,'id'>){return this.http.post<Product>(this.base+'/products',p)}
      remove(id:number){return this.http.delete<void>(this.base+'/products/'+id)}
      toggle(id:number){return this.http.patch<Product>(this.base+'/products/'+id+'/selection',{})}
      customers(){return this.http.get<Customer[]>(this.base+'/customers')}
      customer(c:Omit<Customer,'id'>){return this.http.post<Customer>(this.base+'/customers',c)}
      bills(){return this.http.get<any[]>(this.base+'/bills')}
      bill(id:number){return this.http.get<any>(this.base+'/bills/'+id)}
      createBill(customerId:number,productId:number,quantity:number){return this.http.post<any>(this.base+'/bills',{customerId,lines:[{productId,quantity}]})}
    }
