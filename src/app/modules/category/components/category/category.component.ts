import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { CategoryService } from '../../../shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  

  constructor(  private categoryService: CategoryService,
                public dialog: MatDialog,
                private snackBar: MatSnackBar ) { }

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

  //Nueva Categoria Ventana Modal
  openCategoryDialog(){
    const dialogRef = this.dialog.open( NewCategoryComponent, {
      width:'450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if( result === 1 ){
        this.openSnackBar("Se ha creado un registor nuevo ", "Operacion Existosa");
        this.getAllCategories();
      } else if( result === 2 ){
        this.openSnackBar("Error al crear un nuevo recurso", "Fail");
      }

    });
  }

  edit( id:number, name:string, description:string ){
    const dialogRef = this.dialog.open( NewCategoryComponent, {
      width:'450px',
      data: { id: id, name: name, description: description} });

    dialogRef.afterClosed().subscribe( result =>{
      if( result == 1 ){
        this.openSnackBar( "Actualizado", "Operacion Existosa" );
        this.getAllCategories();
      }else if( result == 2 ){
        this.openSnackBar("Ocurrio un error", "Error");
      }
    });
  }

  delete( id:number ){
    const dialogRef = this.dialog.open( ConfirmComponent, {
      data: { id: id} });

    dialogRef.afterClosed().subscribe( result =>{
      if( result == 1 ){
        this.openSnackBar( "Eliminacion", "Operacion Existosa" );
        this.getAllCategories();
      }else if( result == 2 ){
        this.openSnackBar("Ocurrio un error", "Error");
      }
    });
  }

  openSnackBar( message: string, action: string ) : MatSnackBarRef<SimpleSnackBar> {
    return  this.snackBar.open(message,action,{
      duration: 2000
    })
  }

}

//interfaces TODO averiguar donde se tiene que mover no me gusta que este aqui
export interface CategoryElement {
  id:number;
  description:string;
  name:string;
}