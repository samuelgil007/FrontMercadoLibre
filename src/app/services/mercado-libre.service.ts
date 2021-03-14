import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MercadoLibreService {

  private URL = 'https://api.mercadolibre.com/sites/MCO/search?q='; 
  private URL2 = 'https://api.mercadolibre.com/users/'
  constructor(private http: HttpClient,
    private router:Router) { }

    busqueda(texto, offset){
      return this.http.get<any>(this.URL + texto+ '&offset='+ offset)  ;
    }

    busquedaUsuario(id){
      return this.http.get<any>(this.URL2 + id);
    }
}
