import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto-idx.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: ProductoInterface[] = [];
  productosFiltrado: ProductoInterface[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos() {

    return new Promise(( resolve, reject ) => {
      this.http.get('https://angular-html-ana.firebaseio.com/productos_idx.json')
    .subscribe((respuesta: ProductoInterface[]) => {
      this.productos = respuesta;
      this.cargando = false;
      resolve();
    });
    });
  }

  getProducto(id: String){
   return this.http.get(`https://angular-html-ana.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto(termino: String) {
    if (this.productos.length === 0) {
      // cargar productos
      this.cargarProductos().then(() => {
        // ejecutar después de tener los productos
      })
    } else {
      // aplicar filtro
    }
    this.productosFiltrado = this.productos.filter(producto => {
      return true;
    });
    console.log(this.productosFiltrado);
  }

  private filtrarProductos( termino: string ) {

    // console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0  ) {
        this.productosFiltrado.push( prod );
      }

    });


  }
}
