import { Pagination } from './models/pagination';
import { Product } from './models/product';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  products: Product[] = [];

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    // check this localhost address when API project is run
    this.http.get<Pagination<Product[]>>('https://localhost:5001/api/products').subscribe({
      next: response => this.products = response.data, // what to do next when we get response
      error: error => console.log(error), // what to do when when error is caught
      complete: () => {
        console.log('request completed');
        console.log('extra statement');
      }
    })
  }
}
