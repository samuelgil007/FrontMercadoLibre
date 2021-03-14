import { Component, OnInit, ViewChild } from '@angular/core';
import { MercadoLibreService } from '../services/mercado-libre.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(private mercadoLibreService: MercadoLibreService) { }
  pagina = 1;
  busqueda = ""
  resultados = []
  total = 1
  ngOnInit(): void {
  }

  realizarBusqueda() {
    let busqueda2 = this.busqueda.replace(" ", "%");
    this.resultados = []
      this.mercadoLibreService
        .busqueda(busqueda2,0)
        .subscribe(
          (res) => {
            console.log(res)
            this.resultados = res.results
            this.total = res.paging.total > 1000 ? 1000: res.paging.total;
            
          },
          (err) => {
            console.log(err)
          },
        );
    
  }

  paginador(paginaDestino){
    let busqueda2 = this.busqueda.replace(" ", "%");
    this.mercadoLibreService
    .busqueda(busqueda2,(paginaDestino-1)*50)
    .subscribe(
      (res) => {
        console.log(res)
        this.resultados = res.results
      },
      (err) => {
        console.log(err)
      },
    );
  }  
}
