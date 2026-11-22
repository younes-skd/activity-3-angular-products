import {Component,inject,OnInit,signal} from '@angular/core';
    import {FormsModule} from '@angular/forms';
    import {CurrencyPipe} from '@angular/common';
    import {Api,Product} from './api';
    @Component({standalone:true,imports:[FormsModule,CurrencyPipe],template:`
    <div class="d-flex justify-content-between align-items-center mb-4"><div><p class="text-secondary mb-1">CATALOGUE</p><h1>Gestion des produits</h1></div><span class="badge text-bg-primary">{{products().length}} produits</span></div>
    @if(error()){<div class="alert alert-danger" role="alert">{{error()}} <button class="btn btn-sm btn-outline-danger" (click)="load()">Réessayer</button></div>}
    <div class="card shadow-sm p-4 mb-4"><h2 class="h5">Ajouter un produit</h2><form #f="ngForm" (ngSubmit)="add()" class="row g-3">
    <div class="col-md-5"><label for="name" class="form-label">Nom</label><input id="name" class="form-control" name="name" [(ngModel)]="draft.name" required></div>
    <div class="col-md-3"><label for="price" class="form-label">Prix (€)</label><input id="price" type="number" min="0" step="0.01" class="form-control" name="price" [(ngModel)]="draft.price" required></div>
    <div class="col-md-2"><label for="quantity" class="form-label">Quantité</label><input id="quantity" type="number" min="0" step="1" class="form-control" name="quantity" [(ngModel)]="draft.quantity" required></div>
    <div class="col-md-2 d-flex align-items-end"><button class="btn btn-primary w-100" [disabled]="f.invalid || busy()">Ajouter</button></div></form></div>
    <div class="card shadow-sm p-4"><label class="form-label" for="search">Rechercher</label><input id="search" class="form-control mb-3" [(ngModel)]="search" placeholder="Filtrer par nom…">
    @if(loading()){<p role="status">Chargement du catalogue…</p>} @else {
    <div class="table-responsive"><table class="table table-hover"><thead><tr><th>ID</th><th>Nom</th><th>Prix</th><th>Stock</th><th>Sélection</th><th>Action</th></tr></thead><tbody>
    @for(p of filtered();track p.id){<tr><td>{{p.id}}</td><td>{{p.name}}</td><td>{{p.price|currency:'EUR'}}</td><td>{{p.quantity}}</td><td><button [disabled]="busy()" class="btn btn-sm" [class.btn-success]="p.selected" [class.btn-outline-secondary]="!p.selected" (click)="toggle(p)">@if(p.selected){<i class="bi bi-check-circle"></i> Sélectionné}@else{Non sélectionné}</button></td><td><button [disabled]="busy()" class="btn btn-outline-danger btn-sm" (click)="remove(p)" [attr.aria-label]="'Supprimer '+p.name"><i class="bi bi-trash"></i></button></td></tr>} @empty {<tr><td colspan="6">Aucun produit trouvé.</td></tr>}
    </tbody></table></div>}</div>`})
    export class Products implements OnInit {
      private api=inject(Api); products=signal<Product[]>([]); loading=signal(true);busy=signal(false);error=signal('');search='';
      draft={name:'',price:0,quantity:1,selected:false};
      ngOnInit(){this.load()}
      filtered(){return this.products().filter(p=>p.name.toLowerCase().includes(this.search.toLowerCase()))}
      fail(){this.error.set('La requête a échoué. Vérifiez que le backend est démarré.');this.loading.set(false);this.busy.set(false)}
      load(){this.loading.set(true);this.error.set('');this.api.products().subscribe({next:p=>{this.products.set(p);this.loading.set(false)},error:()=>this.fail()})}
      add(){if(!this.draft.name.trim()||this.draft.price<0||this.draft.quantity<0)return;this.busy.set(true);this.api.create({...this.draft,name:this.draft.name.trim()}).subscribe({next:()=>{this.draft={name:'',price:0,quantity:1,selected:false};this.busy.set(false);this.load()},error:()=>this.fail()})}
      toggle(p:Product){this.busy.set(true);this.api.toggle(p.id).subscribe({next:updated=>{this.products.update(all=>all.map(x=>x.id===p.id?updated:x));this.busy.set(false)},error:()=>this.fail()})}
      remove(p:Product){if(!confirm('Supprimer '+p.name+' ?'))return;this.busy.set(true);this.api.remove(p.id).subscribe({next:()=>{this.products.update(all=>all.filter(x=>x.id!==p.id));this.busy.set(false)},error:()=>this.fail()})}
    }
