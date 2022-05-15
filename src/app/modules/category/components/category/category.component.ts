import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor( private categoryService: CategoryService ) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  getAllCategories(){
    this.categoryService.getAllCategories()
        .subscribe( (data:any) => {
          console.log('%ccategory.component.ts line:19 data', 'color: green', data);
          this.proccessCategoriesResponse(data);
        },( error:any ) => {
          console.log('%cerror category.component.ts line:21 ', 'color: red; display: block; width: 100%;', error);
        })
  }

  proccessCategoriesResponse(resp:any){
    const dataCategory: CategoryElement[] =[];
    
    if( resp.metadata[0].code == "00" ){

      let listCategory = resp.categoryResponse.category;
     
      listCategory.forEach( (element:CategoryElement) => {

        dataCategory.push( element );

      });
      
      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);

    }

  }

}

//interfaces TODO averiguar donde se tiene que mover no me gusta que este aqui
export interface CategoryElement {
  id:number;
  description:string;
  name:string;
}