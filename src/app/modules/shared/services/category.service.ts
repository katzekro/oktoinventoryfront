import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor( private http: HttpClient ) {

   }

   //Obtener todas las categorias
   getAllCategories(){ 
    const endpointGetAllCategories = `${base_url}/categories`;
    return this.http.get(endpointGetAllCategories);
   }

   //Guardar Categoria
   saveCategory( body:any ){
    const endpointSaveCategory = ` ${base_url}/categories `;
    return this.http.post(endpointSaveCategory, body);
   }

}
