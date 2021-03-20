import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MercadoLibreService } from '../services/mercado-libre.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private mercadoLibreService: MercadoLibreService) { }
  sub: Subscription;
  producto;
  opiniones;
  descuento = false;
  owner;
  porcentajeDescuento;
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.mercadoLibreService
        .busquedaProductoPorID(params.id)
        .subscribe(
          (res) => {
            /* console.log(res[0].body) */
            this.producto = res[0].body;
            this.descuento =  this.producto.original_price==null? false: true;
            this.porcentajeDescuento = Math.round((1 - (this.producto.price/this.producto.original_price))*100);
            this.mercadoLibreService
            .busquedaUsuario(this.producto.seller_id)
            .subscribe(
              (res) => {
                /* console.log(res); */
                this.owner = res;
              },
              (err) => {
                console.log(err)
              },
            );
          },
          (err) => {
            console.log(err)
          },
        );

      this.mercadoLibreService
        .busquedaOpinionesProducto(params.id)
        .subscribe(
          (res) => {
            /* console.log(res); */
            this.opiniones = res;

          },
          (err) => {
            console.log(err)
          },
        );
    });


  }

}
