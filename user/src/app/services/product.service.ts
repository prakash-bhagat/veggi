import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ProductModelServer, ServerResponse} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private SERVER_URL = environment.SERVER_URL;
  constructor(private http: HttpClient) { }

  /* This is to fetch all products from the backend server */
  getAllProducts(numberOfResults= 100) : Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL + '/products/' , {
       params: {
     limit: numberOfResults.toString()
       }
    });
  }

  /* GET SINGLE PRODUCT FROM SERVER*/
  getSingleProduct(id: number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(this.SERVER_URL + '/products/' + id);
  }

  /*GET PRODUCTS FROM FRUITS CATEGORY */
  getProductsFruits() : Observable<ServerResponse>  {
    return this.http.get<ServerResponse>(this.SERVER_URL + '/products/fruits');
   }

   /*GET PRODUCTS FROM VEGETABLES CATEGORY */
  getProductsVegetables() : Observable<ServerResponse>  {
    return this.http.get<ServerResponse>(this.SERVER_URL + '/products/vegetables');
   }

   getProductsDairy() : Observable<ServerResponse>  {
    return this.http.get<ServerResponse>(this.SERVER_URL + '/products/dairy');
   }

 
  
}
