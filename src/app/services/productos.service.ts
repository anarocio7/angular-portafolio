import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto-idx.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: ProductoInterface[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }
  private cargarProductos() {
    this.http.get('https://angular-html-ana.firebaseio.com/productos_idx.json')
    .subscribe((respuesta: ProductoInterface[]) => {
      this.productos = respuesta;
      console.log(respuesta);
      this.cargando = false;
    });
  }
}
