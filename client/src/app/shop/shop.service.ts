/*
  The Service used for all Shop related functions.  
 */

import { Type } from './../shared/models/type';
import { Pagination } from '../shared//models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brand';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  // all the urls will be appended after this one
  baseUrl = 'https://localhost:5001/api/';
  // to make any Http Requests we need the client and in the const we will initialise it
  constructor(private http: HttpClient) { }
  
  // Loads the entire products with provided attributes
  getProducts(shopParams: ShopParams) {
    // Keeping same name as params will automatically add the attributes at the end of the url
    let params = new HttpParams();

    // check each params and append accordingly
    if (shopParams.brandId > 0) params = params.append('brandId', shopParams.brandId);
    if (shopParams.typeId) params = params.append('typeId', shopParams.typeId); 
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber);
    params = params.append('pageSize', shopParams.pageSize);
    if (shopParams.search) params = params.append('search', shopParams.search);

    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products', {params});
  }

  // get all brands
  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + 'products/brands');
  }
  
  // get all types
  getTypes() {
    return this.http.get<Type[]>(this.baseUrl + 'products/types');
  }
}
