import { Component, OnInit, ViewChild } from '@angular/core';
import { MercadoLibreService } from '../services/mercado-libre.service';

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
  total = 1;
  owners = new Object
  ngOnInit(): void {
    setInterval(() => {
      localStorage.setItem('owners', JSON.stringify(this.owners));
    }, 1000);
    this.busqueda = JSON.parse(localStorage.getItem('busqueda')) != null ? JSON.parse(localStorage.getItem('busqueda')) : "";
    this.resultados = JSON.parse(localStorage.getItem('resultados')) != null ? JSON.parse(localStorage.getItem('resultados')) : [];
    this.total = JSON.parse(localStorage.getItem('total'));
    this.pagina = JSON.parse(localStorage.getItem('pagina'));
    this.owners = JSON.parse(localStorage.getItem('owners')) != null ? JSON.parse(localStorage.getItem('owners')) : {};
  }

  realizarBusqueda() {
    this.owners = {}
    this.pagina = 1;
    localStorage.setItem('busqueda', JSON.stringify(this.busqueda));
    let busqueda2 = this.busqueda.replace(" ", "%");
    this.resultados = []
    this.mercadoLibreService
      .busqueda(busqueda2, 0)
      .subscribe(
        (res) => {
          /* console.log(res) */
          this.pagina = 1;
          this.resultados = res.results
          let string = '';
          let i = 0;
          while (i < this.resultados.length) {
            if (i == 0) {
              string += this.resultados[i].seller.id;
              i++
            }
            else {
              string += ',' + this.resultados[i].seller.id
              i++
            }
            if (i == 19 || i == 39 || i == 50) {
              this.mercadoLibreService
                .busquedaUsuarioMultiget(string)
                .subscribe(
                  (res) => {
                    res.forEach(element => {
                      this.owners[element.body.id] = element.body.nickname
                    });

                  },
                  (err) => {
                    console.log(err)
                  },
                );
              string = ''
            }
          }
          console.log(this.owners)
          localStorage.setItem('resultados', JSON.stringify(this.resultados));
          this.total = res.paging.total > 1000 ? 1000 : res.paging.total;
          localStorage.setItem('total', JSON.stringify(this.total));
        },
        (err) => {
          console.log(err)
        },
      );
  }

  paginador(paginaDestino) {
    this.owners = {}
    this.pagina = paginaDestino;
    let busqueda2 = this.busqueda.replace(" ", "%");
    this.mercadoLibreService
      .busqueda(busqueda2, (paginaDestino - 1) * 50)
      .subscribe(
        (res) => {
          /*  console.log(res)  */
          this.resultados = res.results;
          let string = '';
          let i = 0;
          while (i < this.resultados.length) {
            if (i == 0) {
              string += this.resultados[i].seller.id;
              i++
            }
            else {
              string += ',' + this.resultados[i].seller.id
              i++
            }
            if (i == 19 || i == 39 || i == 50) {
              this.mercadoLibreService
                .busquedaUsuarioMultiget(string)
                .subscribe(
                  (res) => {
                    res.forEach(element => {
                      this.owners[element.body.id] = element.body.nickname
                    });

                  },
                  (err) => {
                    console.log(err)
                  },
                );
              string = ''
            }
          }
          console.log(this.owners)
          localStorage.setItem('resultados', JSON.stringify(this.resultados));
          localStorage.setItem('pagina', JSON.stringify(paginaDestino));
        },
        (err) => {
          console.log(err)
        },
      );
  }
}
